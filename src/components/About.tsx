import { profile } from "../data/profile";
import Section from "./Section";

export default function About() {
  return (
    <Section id="about" className="about" kicker="ABOUT" title="A non-traditional path into tech">
      <p>{profile.about}</p>
    </Section>
  );
}
