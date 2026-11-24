import { profile } from "../data/profile";
import Section from "./Section";

export default function Contact() {
  return (
    <Section id="contact" className="contact" kicker="CONTACT" title="Let's connect">
      <p className="note">Open to internships and entry-level roles in cybersecurity or software development.</p>
      <div className="btnrow">
        <a className="btn" href={`mailto:${profile.email}`}>Email Me</a>
        <a className="btn" href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a className="btn" href={`https://github.com/${profile.github}`} target="_blank" rel="noopener noreferrer">GitHub</a>
      </div>
    </Section>
  );
}
