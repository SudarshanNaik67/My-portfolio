import { projects, skillGroups } from "../data/profile";
import Section from "./Section";

interface Props {
  active: string | null;
  onSelect: (skill: string | null) => void;
}

export default function Skills({ active, onSelect }: Props) {
  return (
    <Section id="skills" kicker="SKILLS" title="Toolkit">
      <p className="note">Select a skill to filter the projects that use it.</p>
      <div className="skillgrid">
        {skillGroups.map((group) => (
          <div key={group.label} className="skillcat">
            <h3>{group.label.toUpperCase()}</h3>
            <div className="pills">
              {group.skills.map((skill) => {
                const count = projects.filter((p) => p.tech.includes(skill)).length;
                const on = active === skill;
                return (
                  <button
                    key={skill}
                    type="button"
                    className={`pill${on ? " active" : ""}`}
                    aria-pressed={on}
                    onClick={() => {
                      onSelect(on ? null : skill);
                      if (!on) document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    {skill}
                    {count > 0 ? ` (${count})` : ""}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
