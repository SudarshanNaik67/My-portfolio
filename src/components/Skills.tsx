import { motion } from "framer-motion";
import { projects, skillGroups } from "../data/profile";

interface Props {
  active: string | null;
  onSelect: (skill: string | null) => void;
}

export default function Skills({ active, onSelect }: Props) {
  return (
    <section id="skills" className="section wrap">
      <h2>Skills</h2>
      <p className="lede">Select a skill to filter the projects that use it.</p>
      <div className="skill-groups">
        {skillGroups.map((group) => (
          <div key={group.label} className="skill-group">
            <h3>{group.label}</h3>
            <div className="chips">
              {group.skills.map((skill) => {
                const count = projects.filter((p) => p.tech.includes(skill)).length;
                const on = active === skill;
                return (
                  <motion.button
                    key={skill}
                    type="button"
                    className={`chip${on ? " on" : ""}`}
                    aria-pressed={on}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => {
                      onSelect(on ? null : skill);
                      if (!on) document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    {skill}
                    {count > 0 && <span className="count">{count}</span>}
                  </motion.button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
