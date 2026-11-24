import { experience } from "../data/profile";
import Section from "./Section";

export default function Experience() {
  return (
    <Section id="experience" kicker="EXPERIENCE" title="Where I've worked">
      <div className="timeline">
        {experience.map((x) => (
          <div key={x.role} className="tl-item">
            <div className="role">{x.role}</div>
            <div className="org">{x.org}</div>
            <div className="when">{x.when}</div>
            <p>{x.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
