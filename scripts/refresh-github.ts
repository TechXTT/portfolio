/**
 * Refresh `data/github-snapshot.json` from the GitHub API.
 *
 * Run locally or in CI: `npm run refresh-data` (needs Node 18+ for global fetch).
 * Auth is optional via `GITHUB_TOKEN` (raises the rate limit). The companion
 * GitHub Action commits the file only when it changes, giving a git audit trail
 * and a recent fallback for fresh builds / API outages.
 *
 * This script is intentionally self-contained (it does not import the
 * server-only `lib/github.ts`) but reuses its types so the shapes stay in sync.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { profile, projects } from "../data/portfolio";
import type { GitHubSnapshot, RepoSnapshot } from "../lib/github";

const API = "https://api.github.com";

function headers(): Record<string, string> {
  const h: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "martin-bozhilov-portfolio-refresh",
  };
  if (process.env.GITHUB_TOKEN) h.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  return h;
}

async function getJSON<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { headers: headers() });
    if (!res.ok) {
      console.warn(`[refresh] ${res.status} ${res.statusText} for ${url}`);
      return null;
    }
    return (await res.json()) as T;
  } catch (error) {
    console.warn(`[refresh] request failed for ${url}:`, error);
    return null;
  }
}

async function fetchRepo(slug: string): Promise<RepoSnapshot | null> {
  const [owner, repo] = slug.split("/");
  const data = await getJSON<{
    stargazers_count: number;
    language: string | null;
    pushed_at: string;
    description: string | null;
  }>(`${API}/repos/${owner}/${repo}`);
  if (!data) return null;

  const release = await getJSON<{ tag_name: string }>(
    `${API}/repos/${owner}/${repo}/releases/latest`
  );

  return {
    stars: data.stargazers_count,
    language: data.language ?? undefined,
    lastPushed: data.pushed_at,
    latestRelease: release?.tag_name,
    description: data.description ?? undefined,
  };
}

async function main() {
  const repos = projects
    .map((p) => p.repo)
    .filter((r): r is string => Boolean(r));

  const user = await getJSON<{ public_repos: number; followers: number }>(
    `${API}/users/${profile.githubUsername}`
  );
  if (!user) {
    console.error("[refresh] could not read user — leaving snapshot unchanged");
    process.exit(0);
  }

  const reposMap: Record<string, RepoSnapshot> = {};
  let totalStars = 0;
  for (const slug of repos) {
    const live = await fetchRepo(slug);
    if (!live) continue;
    reposMap[slug] = live;
    totalStars += live.stars ?? 0;
  }

  const snapshot: GitHubSnapshot = {
    user: { publicRepos: user.public_repos, followers: user.followers },
    repos: reposMap,
    totalStars,
    fetchedAt: new Date().toISOString(),
  };

  const here = dirname(fileURLToPath(import.meta.url));
  const out = resolve(here, "../data/github-snapshot.json");

  // Compare ignoring `fetchedAt` so we only commit on real data changes.
  const next = { ...snapshot, fetchedAt: "" };
  let prevMatches = false;
  try {
    const prev = JSON.parse(readFileSync(out, "utf8")) as GitHubSnapshot;
    prevMatches = JSON.stringify({ ...prev, fetchedAt: "" }) === JSON.stringify(next);
  } catch {
    prevMatches = false;
  }

  if (prevMatches) {
    console.log("[refresh] no data changes — snapshot left as-is");
    return;
  }

  writeFileSync(out, `${JSON.stringify(snapshot, null, 2)}\n`, "utf8");
  console.log(`[refresh] wrote ${out} (${repos.length} repos, ${totalStars} stars)`);
}

main();
