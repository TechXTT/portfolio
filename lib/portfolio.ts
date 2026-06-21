import {
  profile,
  projects,
  stats,
  type PortfolioProject,
  type ProjectLive,
  type Stat,
} from "@/data/portfolio";
import { fetchGitHubSnapshot, type GitHubSnapshot } from "@/lib/github";
import seedJson from "@/data/github-snapshot.json";

/**
 * Merge layer between authored content (`data/portfolio.ts`) and live GitHub
 * data (`lib/github.ts`).
 *
 * Rule everywhere: **authored copy always wins.** Live values only overwrite
 * numbers/metadata or fill empty fallbacks. If there is no snapshot at all, the
 * authored data is returned completely unchanged.
 */

export type PortfolioData = {
  stats: Stat[];
  projects: PortfolioProject[];
  /** ISO timestamp of the snapshot used, or null when none was available. */
  lastUpdated: string | null;
};

/**
 * Committed seed snapshot (optionally refreshed by the GitHub Action). Acts as
 * a fallback so a fresh build or an API outage still has recent numbers. An
 * empty `fetchedAt` means "no seed yet" and is treated as absent.
 */
const seed = seedJson as unknown as GitHubSnapshot;

function usableSeed(): GitHubSnapshot | null {
  return seed.fetchedAt ? seed : null;
}

/** The repo this project syncs from, narrowed to a string. */
function projectRepos(): string[] {
  return projects
    .map((p) => p.repo)
    .filter((repo): repo is string => Boolean(repo));
}

/** Apply live numbers/release to the hero stats. Authored value is the fallback. */
function applyStats(snapshot: GitHubSnapshot | null): Stat[] {
  if (!snapshot) return stats;

  const tormRepo = projects.find((p) => p.title === "TORM")?.repo;
  const latestRelease = tormRepo ? snapshot.repos[tormRepo]?.latestRelease : undefined;

  return stats.map((stat) => {
    switch (stat.key) {
      case "repos":
        return snapshot.user.publicRepos > 0
          ? { ...stat, value: String(snapshot.user.publicRepos) }
          : stat;
      case "followers":
        return { ...stat, value: String(snapshot.user.followers) };
      case "release":
        return latestRelease ? { ...stat, value: `TORM ${latestRelease}` } : stat;
      default:
        return stat;
    }
  });
}

/** Attach live metadata to each project; never overwrite non-empty authored copy. */
function applyProjects(snapshot: GitHubSnapshot | null): PortfolioProject[] {
  if (!snapshot) return projects;

  return projects.map((project) => {
    if (!project.repo) return project;
    const repoSnap = snapshot.repos[project.repo];
    if (!repoSnap) return project; // repo missing from snapshot → authored fallback

    const live: ProjectLive = {
      stars: repoSnap.stars,
      language: repoSnap.language,
      lastPushed: repoSnap.lastPushed,
      latestRelease: repoSnap.latestRelease,
    };

    // Description fallback: only used when the authored description is empty.
    const authored = project.description?.trim();
    const description = authored ? project.description : repoSnap.description ?? project.description;

    return { ...project, live, description };
  });
}

/**
 * Pure merge: given a snapshot (or null), produce the enriched portfolio data.
 * Exported for unit testing — no network involved.
 */
export function buildPortfolio(snapshot: GitHubSnapshot | null): PortfolioData {
  return {
    stats: applyStats(snapshot),
    projects: applyProjects(snapshot),
    lastUpdated: snapshot?.fetchedAt || null,
  };
}

/**
 * Server entry point: fetch the live snapshot (falling back to the committed
 * seed, then to authored data) and return the merged portfolio.
 */
export async function getPortfolioData(): Promise<PortfolioData> {
  const live = await fetchGitHubSnapshot(profile.githubUsername, projectRepos());
  const snapshot = live ?? usableSeed();
  return buildPortfolio(snapshot);
}
