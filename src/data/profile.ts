import { Project } from "../types";

export const profile = {
  name: "Sudarshan Naik",
  role: "Full stack developer and Android specialist",
  summary:
    "I build responsive React front ends, Java and Django back ends, and Android apps with Kotlin and Firebase.",
  about:
    "I work across web and mobile, from database design to the screen people tap. I like projects with a clear user, such as blood inventory, student records, expense tracking and travel booking, and I build them to be simple to use and easy to maintain.",
  github: "SudarshanNaik67",
  avatar: "https://avatars.githubusercontent.com/u/195913316?s=400&v=4",
  email: "naiksudarshan898@gmail.com",
  linkedin: "https://www.linkedin.com/in/sudarshan-naik67",
};

export const skillGroups: { label: string; skills: string[] }[] = [
  { label: "Front end", skills: ["React", "JavaScript", "HTML", "CSS"] },
  { label: "Mobile", skills: ["Kotlin", "Firebase"] },
  { label: "Back end", skills: ["Java", "Spring Boot", "Python", "Django", "PHP"] },
  { label: "Data", skills: ["MySQL", "SQLite"] },
];

export const projects: Project[] = [
  { title: "Blood Bank Management System", blurb: "Tracks blood inventory and donations in one place.", tech: ["HTML", "CSS", "JavaScript", "MySQL"], repoKeys: ["bloodbank", "blood"] },
  { title: "React Portfolio", blurb: "This site: a typed React portfolio that reads its repo data from GitHub.", tech: ["React", "JavaScript", "CSS"], repoKeys: ["portfolio"] },
  { title: "Resume Builder", blurb: "Create and customise professional resumes in the browser.", tech: ["Java", "Spring Boot"], repoKeys: ["resumebuilder", "resume"] },
  { title: "Tours and Travels App", blurb: "Android app that connects travellers with tour operators.", tech: ["Java", "Kotlin", "Firebase"], repoKeys: ["tour", "travel"] },
  { title: "Expense Tracker", blurb: "Record spending and keep budgets on track.", tech: ["Python", "Django", "SQLite"], repoKeys: ["expense"] },
  { title: "Student Data Management", blurb: "Manage student records and academic operations.", tech: ["PHP", "MySQL", "HTML"], repoKeys: ["student"] },
];
