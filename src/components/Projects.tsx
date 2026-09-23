import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";
import { profile, projects } from "../data/profile";
import { useGithubRepos } from "../hooks/useGithubRepos";
import { Project, Repo } from "../types";

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

function findRepo(repos: Repo[], keys: string[]): Repo | undefined {
  return repos.find((r) => keys.some((k) => norm(r.name).includes(k)));
}

function repoUrl(project: Project, repo?: Repo): string {
  return (
    repo?.html_url ??
    `https://github.com/${profile.github}?tab=repositories&q=${encodeURIComponent(project.repoKeys[0])}`
  );
}

interface Props {
  activeSkill: string | null;
  onClear: () => void;
}

export default function Projects({ activeSkill, onClear }: Props) {
  const gh = useGithubRepos(profile.github);

  const cards = useMemo(
    () =>
      projects
        .map((project) => ({ project, repo: findRepo(gh.repos, project.repoKeys) }))
        .filter(({ project }) => !activeSkill || project.tech.includes(activeSkill)),
    [gh.repos, activeSkill]
  );

  return (
    <section id="work" className="section wrap">
      <div className="section-head">
        <h2>Projects</h2>
        {activeSkill && (
          <button type="button" className="clear" onClick={onClear}>
            Showing {cards.length} using {activeSkill}. Clear filter
          </button>
        )}
      </div>
      {gh.status === "error" && (
        <p className="note" role="status">
          Live repo data is unavailable ({gh.message}). Links open your repository search instead.
        </p>
      )}
      <motion.div layout className="grid">
        <AnimatePresence mode="popLayout">
          {cards.map(({ project, repo }) => (
            <motion.article
              key={project.title}
              layout
              className="card"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 380, damping: 34 }}
            >
              <h3>{project.title}</h3>
              <p>{repo?.description || project.blurb}</p>
              <ul className="tech">
                {project.tech.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <div className="card-foot">
                <a href={repoUrl(project, repo)} target="_blank" rel="noopener noreferrer">
                  View repository
                </a>
                {repo?.homepage && (
                  <a href={repo.homepage} target="_blank" rel="noopener noreferrer">
                    Live demo
                  </a>
                )}
                {repo && repo.stargazers_count > 0 && (
                  <span className="stars" title="GitHub stars">{repo.stargazers_count} stars</span>
                )}
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
      {cards.length === 0 && <p className="note">No projects use {activeSkill} yet.</p>}
    </section>
  );
}
