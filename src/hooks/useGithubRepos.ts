import { useEffect, useState } from "react";
import { Repo } from "../types";

type State =
  | { status: "loading"; repos: Repo[] }
  | { status: "ready"; repos: Repo[] }
  | { status: "error"; repos: Repo[]; message: string };

const TTL_MS = 10 * 60 * 1000;

/** Fetches a user's public, non-fork repos from the GitHub REST API (cached per tab for 10 minutes). */
export function useGithubRepos(username: string): State {
  const [state, setState] = useState<State>({ status: "loading", repos: [] });

  useEffect(() => {
    const cacheKey = `gh-repos:${username}`;
    try {
      const raw = sessionStorage.getItem(cacheKey);
      if (raw) {
        const cached = JSON.parse(raw) as { t: number; repos: Repo[] };
        if (Date.now() - cached.t < TTL_MS) {
          setState({ status: "ready", repos: cached.repos });
          return;
        }
      }
    } catch {
      /* storage unavailable: fetch normally */
    }

    const controller = new AbortController();
    fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`, {
      signal: controller.signal,
      headers: { Accept: "application/vnd.github+json" },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status === 403 ? "GitHub rate limit reached" : `GitHub returned ${res.status}`);
        }
        return res.json() as Promise<Repo[]>;
      })
      .then((all) => {
        const repos = all.filter((r) => !r.fork);
        try {
          sessionStorage.setItem(cacheKey, JSON.stringify({ t: Date.now(), repos }));
        } catch {
          /* ignore */
        }
        setState({ status: "ready", repos });
      })
      .catch((err: Error) => {
        if (err.name !== "AbortError") setState({ status: "error", repos: [], message: err.message });
      });

    return () => controller.abort();
  }, [username]);

  return state;
}
