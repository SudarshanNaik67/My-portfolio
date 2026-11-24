import { Project } from "../types";

export const profile = {
  name: "Sudarshan Naik",
  role: "Final-Year Computer Science & Engineering Student",
  summary:
    "B.Tech CSE student with a minor in Cyber Security, software development internship experience, and growing skills in C++, Python, SQL, networking, databases, and information security.",
  about:
    "I am a final-year B.Tech Computer Science & Engineering student with a minor in Cyber Security and a Diploma in Computer Engineering. I have software design and development internship experience and have built projects across cybersecurity, Android development, web applications, and databases. I am continuously developing my technical skills and looking for opportunities to learn, contribute, and grow in cybersecurity or software development.",
  github: "SudarshanNaik67",
  avatar: `${process.env.PUBLIC_URL}/photo.jpg`,
  resume: `${process.env.PUBLIC_URL}/Sudarshan_Naik_Resume.pdf`,
  email: "naiksudarshan898@gmail.com",
  linkedin: "https://www.linkedin.com/in/sudarshan-naik67",
};

export const skillGroups: { label: string; skills: string[] }[] = [
  {
    label: "Programming",
    skills: ["C++", "Python", "SQL"],
  },
  {
    label: "Cybersecurity",
    skills: [
      "Information Security Fundamentals",
      "Networking Fundamentals",
    ],
  },
  {
    label: "Development",
    skills: ["Java", "Android", "HTML", "CSS", "PHP"],
  },
  {
    label: "Database & Tools",
    skills: ["MySQL", "PostgreSQL", "Git", "GitHub"],
  },
];

export const projects: Project[] = [
  {
    title: "CryptoCheck",
    blurb:
      "File protection and integrity tool (in progress): password-based encryption and hash verification are done, and a digital-signature module is in development.",
    tech: ["Python", "Tkinter", "Hashing"],
    repoKeys: ["cryptocheck", "crypto"],
  },
  {
    title: "Coffee Order App",
    blurb:
      "Android coffee ordering application with separate Admin and User roles, menu management, cart, and order tracking.",
    tech: ["Java", "Android SDK", "Gradle"],
    repoKeys: ["cofee", "coffee"],
  },
  {
    title: "Travel App",
    blurb:
      "Android application for exploring travel destinations with onboarding, destination listings, detail pages, Firebase, and Google Maps.",
    tech: ["Java", "Android XML", "Firebase", "Google Maps API"],
    repoKeys: ["travel"],
  },
  {
    title: "Student Records Management System",
    blurb:
      "Web-based student records management system with admin login and database integration.",
    tech: ["PHP", "MySQL"],
    repoKeys: ["student"],
  },
  {
    title: "Secure Doc Pipeline",
    blurb:
      "DLP microservice pipeline: a FastAPI scanner finds and masks credit cards, SSNs, emails and AWS keys, stores a metadata-only audit record in MongoDB, then forwards the clean file to a service that uploads it to Box.",
    tech: ["Python", "FastAPI", "MongoDB", "DLP"],
    repoKeys: ["securedoc"],
  },
  {
    title: "Portfolio Website",
    blurb:
      "Personal portfolio built with React, TypeScript and Framer Motion, reading live project data from the GitHub REST API.",
    tech: ["React", "TypeScript", "Framer Motion"],
    repoKeys: ["portfolio"],
  },
  {
    title: "Resume Builder",
    blurb: "Resume builder desktop app built with Java Swing.",
    tech: ["Java", "Swing"],
    repoKeys: ["resumebuilder"],
  },
];

/** Public repos you contributed to but do not own. Anything not listed here is still picked up automatically. */
export const contributions: Project[] = [
  {
    title: "KHAAD Setu",
    blurb:
      "Flutter app for Indian farmers: soil health scan, fertilizer suggestions, weather and mandi prices, scheme matching and an offline village-center mode. Owned by pvtltdpratik; my commits cover screen and app-setup updates, platform files and README fixes.",
    tech: ["Flutter", "Dart"],
    repoKeys: ["pvtltdpratik/khaadsetu"],
  },
];

/** Repo names (lowercase) that should never get an automatic card. */
export const hiddenRepos: string[] = ["sudarshannaik67", "sudarshannaik67.github.io"];
