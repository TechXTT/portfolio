import "server-only";

import type { ProjectLive } from "@/data/portfolio";

/**
 * Server-only GitHub REST v3 fetcher.
 *
 * Every network path is wrapped so the caller never has to handle errors:
 * a total failure returns `null`, while a per-repo failure simply omits that
 * repo from the snapshot. The page then falls back to authored data.
 */

/**
 * Per-repo snapshot data. A superset of {@link ProjectLive} that also carries
 * the GitHub `description` so the merge layer can use it as a fallback when the
 * authored description is empty. Only the {@link ProjectLive} subset is ever
 * attached to a project's public `live` field.
 */
export type RepoSnapshot = ProjectLive & {
  description?: string;
};

export type GitHubSnapshot = {
  user: { publicRepos: number; followers: number };
  repos: Record<string, RepoSnapshot>;
  totalStars: number;
  fetchedAt: string;
};

/** Minimal shapes of the GitHub responses we actually read. */
interface GitHubUserResponse {
  public_repos: number;
  followers: number;
}

interface GitHubRepoResponse {
  stargazers_count: number;
  language: string | null;
  pushed_at: string;
  description: string | null;
}

interface GitHubReleaseResponse {
  tag_name: string;
}

const API = "https://api.github.com";
const REVALIDATE_SECONDS = 86_400; // daily

function buildHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "martin-bozhilov-portfolio",
  };
  // Only attach auth when a token is present — unauthenticated still works
  // (just at the lower 60 req/hr limit).
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

/** Fetch + parse JSON, returning `null` on any non-OK status or error. */
async function getJSON<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, {
      headers: buildHeaders(),
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) {
      // 404 etc. — handled as "no data" by callers; warn for visibility.
      console.warn(`[github] ${res.status} ${res.statusText} for ${url}`);
      return null;
    }
    return (await res.json()) as T;
  } catch (error) {
    console.warn(`[github] request failed for ${url}:`, error);
    return null;
  }
}

/** Latest release tag, or `undefined` when the repo has no releases (404). */
async function fetchLatestRelease(owner: string, repo: string): Promise<string | undefined> {
  const release = await getJSON<GitHubReleaseResponse>(
    `${API}/repos/${owner}/${repo}/releases/latest`
  );
  return release?.tag_name;
}

/** Per-repo metadata. Returns `null` if the repo itself can't be read. */
async function fetchRepo(slug: string): Promise<RepoSnapshot | null> {
  const [owner, repo] = slug.split("/");
  if (!owner || !repo) {
    console.warn(`[github] invalid repo slug: "${slug}"`);
    return null;
  }

  const data = await getJSON<GitHubRepoResponse>(`${API}/repos/${owner}/${repo}`);
  if (!data) return null;

  const latestRelease = await fetchLatestRelease(owner, repo);

  return {
    stars: data.stargazers_count,
    language: data.language ?? undefined,
    lastPushed: data.pushed_at,
    latestRelease,
    // exposed for fallback use by the merge layer only.
    description: data.description ?? undefined,
  };
}

/**
 * Build a full snapshot for a user + set of repos.
 *
 * Returns `null` only when the *user* call fails (we treat that as "GitHub is
 * unavailable"). Individual repo failures degrade to partial data.
 */
export async function fetchGitHubSnapshot(
  username: string,
  repos: string[]
): Promise<GitHubSnapshot | null> {
  const user = await getJSON<GitHubUserResponse>(`${API}/users/${username}`);
  if (!user) {
    console.warn(`[github] no user snapshot for "${username}" — falling back to authored data`);
    return null;
  }

  const entries = await Promise.all(
    repos.map(async (slug) => [slug, await fetchRepo(slug)] as const)
  );

  const reposMap: Record<string, RepoSnapshot> = {};
  let totalStars = 0;
  for (const [slug, live] of entries) {
    if (!live) continue;
    reposMap[slug] = live;
    totalStars += live.stars ?? 0;
  }

  return {
    user: { publicRepos: user.public_repos, followers: user.followers },
    repos: reposMap,
    totalStars,
    fetchedAt: new Date().toISOString(),
  };
}
