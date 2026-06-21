import { afterEach, describe, expect, it, vi } from "vitest";
import { projects, stats } from "@/data/portfolio";
import type { GitHubSnapshot } from "@/lib/github";
import { buildPortfolio } from "@/lib/portfolio";

const TORM = projects.find((p) => p.title === "TORM")!;
const XOLTO = projects.find((p) => p.title === "xolto")!;

function makeSnapshot(overrides?: Partial<GitHubSnapshot>): GitHubSnapshot {
  return {
    user: { publicRepos: 99, followers: 77 },
    repos: {
      [TORM.repo!]: {
        stars: 42,
        language: "Go",
        lastPushed: "2026-06-01T00:00:00Z",
        latestRelease: "v1.0.0",
        description: "live torm description",
      },
      [XOLTO.repo!]: {
        stars: 7,
        language: "Go",
        lastPushed: "2026-05-01T00:00:00Z",
        latestRelease: undefined,
      },
    },
    totalStars: 49,
    fetchedAt: "2026-06-21T12:00:00Z",
    ...overrides,
  };
}

describe("buildPortfolio", () => {
  it("(a) applies live numbers while preserving authored copy", () => {
    const result = buildPortfolio(makeSnapshot());

    // live stats applied
    expect(result.stats.find((s) => s.key === "repos")?.value).toBe("99");
    expect(result.stats.find((s) => s.key === "followers")?.value).toBe("77");
    expect(result.stats.find((s) => s.key === "release")?.value).toBe("TORM v1.0.0");

    const torm = result.projects.find((p) => p.title === "TORM")!;
    // live metadata attached
    expect(torm.live).toEqual({
      stars: 42,
      language: "Go",
      lastPushed: "2026-06-01T00:00:00Z",
      latestRelease: "v1.0.0",
    });
    // authored copy untouched (not replaced by the GitHub description)
    expect(torm.description).toBe(TORM.description);
    expect(torm.subtitle).toBe(TORM.subtitle);
    expect(torm.badge).toBe(TORM.badge);

    expect(result.lastUpdated).toBe("2026-06-21T12:00:00Z");
  });

  it("(b) returns authored data unchanged when snapshot is null", () => {
    const result = buildPortfolio(null);

    expect(result.stats).toEqual(stats);
    expect(result.projects).toEqual(projects);
    expect(result.projects.every((p) => p.live === undefined)).toBe(true);
    expect(result.lastUpdated).toBeNull();
  });

  it("(c) keeps authored fallback for a repo missing from the snapshot", () => {
    const snapshot = makeSnapshot({
      repos: {
        [TORM.repo!]: {
          stars: 42,
          language: "Go",
          lastPushed: "2026-06-01T00:00:00Z",
          latestRelease: "v1.0.0",
        },
      },
    });

    const result = buildPortfolio(snapshot);
    const xolto = result.projects.find((p) => p.title === "xolto")!;

    expect(xolto.live).toBeUndefined();
    expect(xolto.description).toBe(XOLTO.description);

    // the present repo is still enriched
    expect(result.projects.find((p) => p.title === "TORM")?.live?.stars).toBe(42);
  });

  it("does not overwrite a non-empty authored description with the GitHub one", () => {
    const result = buildPortfolio(makeSnapshot());
    const torm = result.projects.find((p) => p.title === "TORM")!;
    expect(torm.description).not.toBe("live torm description");
  });
});

describe("getPortfolioData (mocked fetcher)", () => {
  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("wires the live snapshot through the merge", async () => {
    vi.resetModules();
    vi.doMock("@/lib/github", () => ({
      fetchGitHubSnapshot: vi.fn().mockResolvedValue(makeSnapshot()),
    }));
    const { getPortfolioData } = await import("@/lib/portfolio");
    const data = await getPortfolioData();

    expect(data.stats.find((s) => s.key === "followers")?.value).toBe("77");
    expect(data.lastUpdated).toBe("2026-06-21T12:00:00Z");
  });

  it("falls back to authored data when the fetcher returns null", async () => {
    vi.resetModules();
    vi.doMock("@/lib/github", () => ({
      fetchGitHubSnapshot: vi.fn().mockResolvedValue(null),
    }));
    const { getPortfolioData } = await import("@/lib/portfolio");
    const data = await getPortfolioData();

    expect(data.stats).toEqual(stats);
    expect(data.projects).toEqual(projects);
    expect(data.lastUpdated).toBeNull();
  });
});
