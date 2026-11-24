import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";
import { contributions, hiddenRepos, profile, projects } from "../data/profile";
import { useGithubRepos } from "../hooks/useGithubRepos";
import { ContributedRepo, Repo } from "../types";

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
const pretty = (name: string) => name.replace(/[-_.]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
const searchUrl = (key: string) =>
  `https://github.com/${profile.github}?tab=repositories&q=${encodeURIComponent(key)}`;

interface CardData {
  key: string;
  title: string;
  blurb: string;
  tech: string[];
  url: string;
  homepage?: string | null;
  stars?: number;
  note?: string;
}

function findRepo(repos: Repo[], keys: string[]): Repo | undefined {
  return repos.find((r) => keys.some((k) => norm(r.name).includes(k)));
}

function findContributed(list: ContributedRepo[], keys: string[]): ContributedRepo | undefined {
  return list.find((c) => keys.some((k) => c.fullName.toLowerCase() === k));
}

const card = (c: CardData) => (
  <motion.article
    key={c.key}
    layout
    className="card"
    initial={{ opacity: 0, scale: 0.96 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.96 }}
    transition={{ type: "spring", stiffness: 380, damping: 34 }}
  >
    <h3>{c.title}</h3>
    <p>{c.blurb}</p>
    {c.tech.length > 0 && (
      <ul className="tech">
        {c.tech.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    )}
    <div className="card-foot">
      <a href={c.url} target="_blank" rel="noopener noreferrer">
        View repository
      </a>
      {c.homepage && (
        <a href={c.homepage} target="_blank" rel="noopener noreferrer">
          Live demo
        </a>
      )}
      {c.stars ? (
        <span className="stars" title="GitHub stars">
          {c.stars} stars
        </span>
      ) : null}
      {c.note && <span className="badge">{c.note}</span>}
    </div>
  </motion.article>
);

interface Props {
  activeSkill: string | null;
  onClear: () => void;
}

export default function Projects({ activeSkill, onClear }: Props) {
  const gh = useGithubRepos(profile.github);

  const { own, contributed } = useMemo(() => {
    const used = new Set<number>();
    const curated: CardData[] = projects.map((p) => {
      const repo = findRepo(gh.repos, p.repoKeys);
      if (repo) used.add(repo.id);
      return {
        key: p.title,
        title: p.title,
        blurb: repo?.description || p.blurb,
        tech: p.tech,
        url: repo?.html_url ?? searchUrl(p.repoKeys[0]),
        homepage: repo?.homepage,
        stars: repo?.stargazers_count,
      };
    });
    const hidden = new Set(hiddenRepos);
    const auto: CardData[] = gh.repos
      .filter((r) => !used.has(r.id) && !hidden.has(r.name.toLowerCase()))
      .map((r) => ({
        key: `repo-${r.id}`,
        title: pretty(r.name),
        blurb: r.description || "New repository, description coming soon.",
        tech: r.language ? [r.language] : [],
        url: r.html_url,
        homepage: r.homepage,
        stars: r.stargazers_count,
        note: "New",
      }));

    const seen = new Set<string>();
    const curatedContrib: CardData[] = contributions.map((p) => {
      const c = findContributed(gh.contributed, p.repoKeys);
      if (c) seen.add(c.fullName);
      return {
        key: p.title,
        title: p.title,
        blurb: p.blurb,
        tech: p.tech,
        url: c?.html_url ?? `https://github.com/${p.repoKeys[0]}`,
        note: c ? `${c.commits} commits` : "Contributor",
      };
    });
    const autoContrib: CardData[] = gh.contributed
      .filter((c) => !seen.has(c.fullName))
      .map((c) => ({
        key: `contrib-${c.fullName}`,
        title: pretty(c.name),
        blurb: c.description || `Commits to ${c.fullName}.`,
        tech: [],
        url: c.html_url,
        note: `${c.commits} commits`,
      }));

    return { own: [...curated, ...auto], contributed: [...curatedContrib, ...autoContrib] };
  }, [gh.repos, gh.contributed]);

  const show = (c: CardData) => !activeSkill || c.tech.includes(activeSkill);
  const ownCards = own.filter(show);
  const conCards = contributed.filter(show);

  return (
    <section id="work" className="section wrap">
      <div className="section-head">
        <h2>Projects</h2>
        {activeSkill && (
          <button type="button" className="clear" onClick={onClear}>
            Showing {ownCards.length + conCards.length} using {activeSkill}. Clear filter
          </button>
        )}
      </div>
      {gh.status === "error" && (
        <p className="note" role="status">
          Live repo data is unavailable ({gh.message}). Links open your repository search instead.
        </p>
      )}
      <motion.div layout className="grid">
        <AnimatePresence mode="popLayout">{ownCards.map(card)}</AnimatePresence>
      </motion.div>
      {ownCards.length === 0 && <p className="note">No projects use {activeSkill} yet.</p>}
      {conCards.length > 0 && (
        <>
          <h3 className="sub">Contributions to other repositories</h3>
          <motion.div layout className="grid">
            <AnimatePresence mode="popLayout">{conCards.map(card)}</AnimatePresence>
          </motion.div>
        </>
      )}
    </section>
  );
}
