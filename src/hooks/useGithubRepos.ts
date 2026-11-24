import { useEffect, useState } from "react";
import { ContributedRepo, Repo } from "../types";

interface State {
  status: "loading" | "ready" | "error";
  repos: Repo[];
  contributed: ContributedRepo[];
  message?: string;
}

interface CommitItem {
  repository: { full_name: string; name: string; html_url: string; description: string | null; private: boolean };
  commit: { author: { date: string } };
}

const TTL_MS = 10 * 60 * 1000;
const API = "https://api.github.com";
const headers = { Accept: "application/vnd.github+json" };

function readCache<T>(key: string): T | null {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const c = JSON.parse(raw) as { t: number; data: T };
    return Date.now() - c.t < TTL_MS ? c.data : null;
  } catch {
    return null;
  }
}

function writeCache<T>(key: string, data: T): void {
  try {
    sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), data }));
  } catch {
    /* storage unavailable: skip caching */
  }
}

async function getJson<T>(url: string, signal: AbortSignal): Promise<T> {
  const res = await fetch(url, { signal, headers });
  if (!res.ok) {
    throw new Error(res.status === 403 ? "GitHub rate limit reached" : `GitHub returned ${res.status}`);
  }
  return res.json() as Promise<T>;
}

function groupCommits(items: CommitItem[]): ContributedRepo[] {
  const map = new Map<string, ContributedRepo>();
  for (const { repository: r, commit } of items) {
    if (r.private) continue;
    const date = commit.author.date;
    const prev = map.get(r.full_name);
    if (prev) {
      prev.commits += 1;
      if (date > prev.lastCommit) prev.lastCommit = date;
    } else {
      map.set(r.full_name, {
        fullName: r.full_name,
        name: r.name,
        html_url: r.html_url,
        description: r.description,
        commits: 1,
        lastCommit: date,
      });
    }
  }
  return Array.from(map.values()).sort((a, b) => (a.lastCommit < b.lastCommit ? 1 : -1));
}

/**
 * Live GitHub data, fetched in the visitor's browser (cached per tab for 10 minutes):
 * your public non-fork repos, plus public repos you have commits in but do not own.
 */
export function useGithubRepos(username: string): State {
  const [state, setState] = useState<State>({ status: "loading", repos: [], contributed: [] });

  useEffect(() => {
    const ownKey = `gh-repos:${username}`;
    const conKey = `gh-contrib:${username}`;
    const cachedOwn = readCache<Repo[]>(ownKey);
    const cachedCon = readCache<ContributedRepo[]>(conKey);
    if (cachedOwn && cachedCon) {
      setState({ status: "ready", repos: cachedOwn, contributed: cachedCon });
      return;
    }

    const controller = new AbortController();
    const own: Promise<Repo[]> = cachedOwn
      ? Promise.resolve(cachedOwn)
      : getJson<Repo[]>(`${API}/users/${username}/repos?per_page=100&sort=pushed`, controller.signal).then((all) => {
          const repos = all.filter((r) => !r.fork);
          writeCache(ownKey, repos);
          return repos;
        });
    const q = encodeURIComponent(`author:${username} -user:${username}`);
    const con: Promise<ContributedRepo[]> = cachedCon
      ? Promise.resolve(cachedCon)
      : getJson<{ items: CommitItem[] }>(`${API}/search/commits?q=${q}&per_page=100&sort=author-date&order=desc`, controller.signal)
          .then((d) => {
            const list = groupCommits(d.items);
            writeCache(conKey, list);
            return list;
          })
          .catch((e: Error) => {
            if (e.name === "AbortError") throw e;
            return [] as ContributedRepo[];
          });

    Promise.all([own, con])
      .then(([repos, contributed]) => setState({ status: "ready", repos, contributed }))
      .catch((err: Error) => {
        if (err.name !== "AbortError") setState({ status: "error", repos: [], contributed: [], message: err.message });
      });

    return () => controller.abort();
  }, [username]);

  return state;
}
