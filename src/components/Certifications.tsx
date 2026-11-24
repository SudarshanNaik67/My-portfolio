import { certifications } from "../data/profile";
import Section from "./Section";

export default function Certifications() {
  return (
    <Section id="certifications" kicker="CERTIFICATIONS" title="Learning, verified">
      <div className="certs">
        {certifications.map((c) => (
          <div key={c.name} className="cert panel">
            <div className="name">{c.name}</div>
            <div className="issuer">{c.issuer}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}
