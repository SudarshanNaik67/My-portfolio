import { MotionConfig } from "framer-motion";
import { useState } from "react";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import { profile } from "./data/profile";

export default function App() {
  const [skill, setSkill] = useState<string | null>(null);

  return (
    <MotionConfig reducedMotion="user">
      <nav className="nav">
        <div className="wrap nav-in">
          <a href="#top" className="brand">{profile.name}</a>
          <div className="links">
            <a href="#work">Projects</a>
            <a href="#skills">Skills</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>
      <main id="top">
        <Hero />
        <Projects activeSkill={skill} onClear={() => setSkill(null)} />
        <Skills active={skill} onSelect={setSkill} />
        <section id="about" className="section wrap narrow">
          <h2>About</h2>
          <p className="about">{profile.about}</p>
        </section>
      </main>
      <footer id="contact" className="footer">
        <div className="wrap">
          <h2>Contact</h2>
          <div className="actions">
            <a className="btn primary" href={`mailto:${profile.email}`}>{profile.email}</a>
            <a className="btn" href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a className="btn" href={`https://github.com/${profile.github}`} target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
          <p className="copy">© {new Date().getFullYear()} {profile.name}</p>
        </div>
      </footer>
    </MotionConfig>
  );
}
