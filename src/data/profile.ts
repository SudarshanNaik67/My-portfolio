import { Project } from "../types";

export const profile = {
  name: "Sudarshan Naik",
  role: "Final-Year Computer Science & Engineering Student",
  summary:
    "B.Tech CSE student with a minor in Cyber Security, software development internship experience, and growing skills in C++, Python, SQL, networking, databases, and information security.",
  about:
    "My path into tech did not start in a classroom. I trained as an electrician first, maintaining control panels and inspection systems on a live production line. That hands-on grounding led me to a Diploma in Computer Engineering, and now a B.Tech in Computer Science with a minor in Cyber Security, expected in 2027. These days I build practical software and think seriously about how to secure it, one project at a time.",
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
    title: "Secure Doc Pipeline",
    blurb:
      "DLP microservice pipeline: a FastAPI scanner finds and masks credit cards, SSNs, emails and AWS keys, stores a metadata-only audit record in MongoDB, then forwards the clean file to a service that uploads it to Box.",
    tech: ["Python", "FastAPI", "MongoDB", "DLP"],
    repoKeys: ["securedoc"],
  },
  {
    title: "CryptoCheck",
    blurb:
      "File protection and integrity tool (in progress): password-based encryption and hash verification are done, and a digital-signature module is in development.",
    tech: ["Python", "Tkinter", "Hashing"],
    repoKeys: ["cryptocheck", "crypto"],
  },
  {
    title: "Portfolio Website",
    blurb:
      "Personal portfolio built with React, TypeScript and Framer Motion, reading live project data from the GitHub REST API.",
    tech: ["React", "TypeScript", "Framer Motion"],
    repoKeys: ["portfolio"],
  },
  {
    title: "Student Records Management System",
    blurb:
      "Web-based student records management system with admin login and database integration.",
    tech: ["PHP", "MySQL"],
    repoKeys: ["student"],
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

export const taglines: string[] = [
  "Cybersecurity & Software Enthusiast",
  "B.Tech CSE, Cyber Security Minor (2027)",
  "From Electrician to Engineer",
  "Building Secure, Practical Software",
];

export const certifications: { name: string; issuer: string }[] = [
  { name: "Introduction to Cybersecurity", issuer: "Cisco Networking Academy, Advanced Learner (83/100)" },
  { name: "Cyber Job Simulation", issuer: "Deloitte Australia" },
  { name: "CBROPS: The CIA Triad & Security Approaches", issuer: "Infosys Springboard" },
  { name: "Information Security A-Z: Cyber Security Bootcamp", issuer: "Udemy, 12.5 hours" },
  { name: "Hashgraph Developer Course", issuer: "The Hashgraph Association" },
  { name: "Python for Machine Learning", issuer: "IIT Bombay (Spoken Tutorial), 100%" },
  { name: "RDBMS PostgreSQL", issuer: "IIT Bombay (Spoken Tutorial), 92.5%" },
  { name: "What is Prompt Tuning?", issuer: "IBM SkillsBuild (Adobe Learning Manager)" },
  { name: "Linux on IBM LinuxONE, Intermediate", issuer: "IBM" },
];

export const experience: { role: string; org: string; when: string; text: string }[] = [
  {
    role: "Software Design & Development Intern",
    org: "Modi Innovations Private Limited",
    when: "Jun 2023 to Jul 2023",
    text: "Contributed to front-end development using Windows Forms, HTML, and CSS, with hands-on exposure to SQL Server for handling data within front-end forms.",
  },
  {
    role: "Electrician Apprentice, Instrumentation & Maintenance",
    org: "Can Pack (Glass Bottle Division) India Pvt. Ltd.",
    when: "Jan 2021 to Feb 2022",
    text: "Assisted with automated inspection-camera validation, electrical sensor and control-panel maintenance, and production-line changeovers in a high-speed glass-bottle manufacturing plant.",
  },
];
