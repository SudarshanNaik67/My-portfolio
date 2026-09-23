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

export interface Project {
  title: string;
  blurb: string;
  tech: string[];
  /** Lowercase fragments used to find this project's repo by name. */
  repoKeys: string[];
}
