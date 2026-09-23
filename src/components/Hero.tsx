import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { profile } from "../data/profile";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${x}px ${y}px, rgba(44, 91, 255, 0.13), transparent 70%)`;

  return (
    <header
      className="hero"
      onPointerMove={(e) => {
        const b = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - b.left);
        y.set(e.clientY - b.top);
      }}
    >
      <motion.div className="hero-glow" style={{ background: spotlight }} aria-hidden />
      <div className="wrap hero-grid">
        <div>
          <h1 className="hero-name" aria-label={profile.name}>
            {profile.name.split(" ").map((word, i) => (
              <span className="mask" key={word} aria-hidden>
                <motion.span
                  className="word"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease, delay: 0.1 + i * 0.12 }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.55 }}
          >
            <p className="hero-role">{profile.role}</p>
            <p className="hero-summary">{profile.summary}</p>
            <p className="status"><span className="dot" />Open to full stack and Android roles</p>
            <div className="actions">
              <a className="btn primary" href="#work">See my projects</a>
              <a className="btn" href={`mailto:${profile.email}`}>Email me</a>
              <a className="btn" href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
          </motion.div>
        </div>
        <motion.img
          className="avatar"
          src={profile.avatar}
          alt={`Portrait of ${profile.name}`}
          initial={{ opacity: 0, scale: 0.94, rotate: -3 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.3 }}
          whileHover={{ rotate: 2, scale: 1.02 }}
        />
      </div>
    </header>
  );
}
