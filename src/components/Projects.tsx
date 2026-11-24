import { useMemo, useRef, useState } from "react";
import type { KeyboardEvent as KeyEv, MouseEvent as MouseEv } from "react";
import { contributions, hiddenRepos, profile, projects } from "../data/profile";
import { useGithubRepos } from "../hooks/useGithubRepos";
import { ContributedRepo, Repo } from "../types";
import Section from "./Section";

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
  note?: string;
}

function findRepo(repos: Repo[], keys: string[]): Repo | undefined {
  return repos.find((r) => keys.some((k) => norm(r.name).includes(k)));
}

function findContributed(list: ContributedRepo[], keys: string[]): ContributedRepo | undefined {
  return list.find((c) => keys.some((k) => c.fullName.toLowerCase() === k));
}

/** A card that tilts toward the cursor and flips on click to show details. */
function FlipCard({ c }: { c: CardData }) {
  const [flipped, setFlipped] = useState(false);
  const inner = useRef<HTMLDivElement>(null);
  const base = flipped ? 180 : 0;
  const tag = c.tech.length ? c.tech.slice(0, 2).join(", ").toUpperCase() : "REPOSITORY";

  const tilt = (e: MouseEv<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    if (inner.current) inner.current.style.transform = `rotateY(${base - x * 10}deg) rotateX(${y * 10}deg)`;
  };
  const reset = () => {
    if (inner.current) inner.current.style.transform = `rotateY(${base}deg) rotateX(0deg)`;
  };
  const onKey = (e: KeyEv<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setFlipped((f) => !f);
    }
  };
  const stop = (e: MouseEv<HTMLAnchorElement>) => e.stopPropagation();
  const tab = flipped ? 0 : -1;

  return (
    <div
      className={`card${flipped ? " flipped" : ""}`}
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      onClick={() => setFlipped((f) => !f)}
      onKeyDown={onKey}
      onMouseMove={tilt}
      onMouseLeave={reset}
    >
      <div className="card-inner" ref={inner} style={{ transform: `rotateY(${base}deg)` }}>
        <div className="face front">
          <span className="tag">{tag}</span>
          <h3>{c.title}</h3>
          <div className="hint">click to flip</div>
        </div>
        <div className="face back">
          <h3>{c.title}</h3>
          {c.blurb}
          <br />
          <span>
            <a href={c.url} target="_blank" rel="noopener noreferrer" tabIndex={tab} onClick={stop}>
              View repo
            </a>
            {c.homepage && (
              <>
                {" "}
                &nbsp;{" "}
                <a href={c.homepage} target="_blank" rel="noopener noreferrer" tabIndex={tab} onClick={stop}>
                  Live site
                </a>
              </>
            )}
          </span>
          {c.note && <div className="hint">{c.note}</div>}
        </div>
      </div>
    </div>
  );
}

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
        note: "New on GitHub",
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
    <Section id="work" kicker="PROJECTS" title="Projects from my GitHub: click a card to flip it">
      {activeSkill && (
        <button type="button" className="clear" onClick={onClear}>
          Showing {ownCards.length + conCards.length} using {activeSkill}. Clear filter
        </button>
      )}
      {gh.status === "error" && (
        <p className="note" role="status">
          Live repo data is unavailable ({gh.message}). Links open your repository search instead.
        </p>
      )}
      <div className="projects">
        {ownCards.map((c) => (
          <FlipCard key={c.key} c={c} />
        ))}
      </div>
      {ownCards.length === 0 && <p className="note">No projects use {activeSkill} yet.</p>}
      {conCards.length > 0 && (
        <>
          <h3 className="sub">Contributions to other repositories</h3>
          <div className="projects">
            {conCards.map((c) => (
              <FlipCard key={c.key} c={c} />
            ))}
          </div>
        </>
      )}
      <div className="btnrow">
        <a className="btn" href={`https://github.com/${profile.github}?tab=repositories`} target="_blank" rel="noopener noreferrer">
          All repositories on GitHub
        </a>
      </div>
    </Section>
  );
}
