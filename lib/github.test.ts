import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchGitHubSnapshot } from "@/lib/github";

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("fetchGitHubSnapshot resilience", () => {
  it("returns null when the network is unavailable (fetch rejects)", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
    const snapshot = await fetchGitHubSnapshot("TechXTT", ["TechXTT/TORM"]);
    expect(snapshot).toBeNull();
  });

  it("returns null when the user request is non-200 (e.g. rate limited)", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse({ message: "rate limited" }, 403)));
    const snapshot = await fetchGitHubSnapshot("TechXTT", ["TechXTT/TORM"]);
    expect(snapshot).toBeNull();
  });

  it("degrades to partial data when a single repo fails, and treats release 404 as no release", async () => {
    const fetchMock = vi.fn(async (input: string | URL | Request) => {
      const url = String(input);
      if (url.endsWith("/users/TechXTT")) {
        return jsonResponse({ public_repos: 46, followers: 26 });
      }
      if (url.endsWith("/repos/TechXTT/TORM")) {
        return jsonResponse({
          stargazers_count: 5,
          language: "Go",
          pushed_at: "2026-06-01T00:00:00Z",
          description: "x",
        });
      }
      if (url.endsWith("/repos/TechXTT/TORM/releases/latest")) {
        return jsonResponse({}, 404); // no release
      }
      if (url.endsWith("/repos/TechXTT/missing")) {
        return jsonResponse({ message: "Not Found" }, 404); // repo unreadable
      }
      return jsonResponse({ message: "Not Found" }, 404);
    });
    vi.stubGlobal("fetch", fetchMock);

    const snapshot = await fetchGitHubSnapshot("TechXTT", ["TechXTT/TORM", "TechXTT/missing"]);

    expect(snapshot).not.toBeNull();
    expect(snapshot!.user).toEqual({ publicRepos: 46, followers: 26 });
    expect(snapshot!.repos["TechXTT/TORM"]).toMatchObject({ stars: 5, language: "Go" });
    expect(snapshot!.repos["TechXTT/TORM"].latestRelease).toBeUndefined();
    expect(snapshot!.repos["TechXTT/missing"]).toBeUndefined();
    expect(snapshot!.totalStars).toBe(5);
  });
});
