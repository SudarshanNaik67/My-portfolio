import { MotionConfig } from "framer-motion";
import { useState } from "react";
import About from "./components/About";
import Background from "./components/Background";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Resume from "./components/Resume";
import Skills from "./components/Skills";
import { profile } from "./data/profile";

export default function App() {
  const [skill, setSkill] = useState<string | null>(null);

  return (
    <MotionConfig reducedMotion="user">
      <Background />
      <nav className="nav">
        <a href="#top" className="brand mono">{profile.name}</a>
        <div className="links">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#work">Projects</a>
          <a href="#resume">Resume</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>
      <main id="top">
        <Hero />
        <div className="wrap">
          <About />
          <Skills active={skill} onSelect={setSkill} />
          <Projects activeSkill={skill} onClear={() => setSkill(null)} />
          <Certifications />
          <Experience />
          <Resume />
          <Contact />
        </div>
      </main>
      <footer>Built by {profile.name}, Chhatrapati Sambhajinagar, Maharashtra, India</footer>
    </MotionConfig>
  );
}
