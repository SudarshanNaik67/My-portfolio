import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { profile, taglines } from "../data/profile";

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let swap: number | undefined;
    const timer = window.setInterval(() => {
      setVisible(false);
      swap = window.setTimeout(() => {
        setIndex((n) => (n + 1) % taglines.length);
        setVisible(true);
      }, 400);
    }, 3200);
    return () => {
      window.clearInterval(timer);
      window.clearTimeout(swap);
    };
  }, []);

  const name = profile.name.toUpperCase();

  return (
    <header className="hero">
      <motion.div
        className="hero-in"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="avatar">
          <div className="in">
            <span>SN</span>
            <img
              src={profile.avatar}
              alt={`Portrait of ${profile.name}`}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        </div>
        <div className="eyebrow">PORTFOLIO // {name}</div>
        <h1>{name}</h1>
        <div className="tagline">
          <span style={{ opacity: visible ? 1 : 0 }}>{taglines[index]}</span>
        </div>
        <div className="btnrow">
          <a className="btn" href="#work">See my projects</a>
          <a className="btn" href="#resume">Resume</a>
          <a className="btn" href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a className="btn" href={`https://github.com/${profile.github}`} target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </motion.div>
      <div className="scrollcue">
        <div>SCROLL</div>
        <div className="dot" />
      </div>
    </header>
  );
}
