export interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  fork: boolean;
}

/** A public repo you do not own but have commits in (found through GitHub's commit search). */
export interface ContributedRepo {
  fullName: string;
  name: string;
  html_url: string;
  description: string | null;
  commits: number;
  lastCommit: string;
}

export interface Project {
  title: string;
  blurb: string;
  tech: string[];
  /** Lowercase fragments used to find this project's repo by name (or "owner/repo" for contributions). */
  repoKeys: string[];
}
