import { Project } from "../types";

export const profile = {
  name: "Sudarshan Naik",
  role: "Final-Year Computer Science & Engineering Student",
  summary:
    "B.Tech CSE student with a minor in Cyber Security, software development internship experience, and growing skills in C++, Python, SQL, networking, databases, and information security.",
  about:
    "I am a final-year B.Tech Computer Science & Engineering student with a minor in Cyber Security and a Diploma in Computer Engineering. I have software design and development internship experience and have built projects across cybersecurity, Android development, web applications, and databases. I am continuously developing my technical skills and looking for opportunities to learn, contribute, and grow in cybersecurity or software development.",
  github: "SudarshanNaik67",
  avatar: "https://avatars.githubusercontent.com/u/195913316?s=400&v=4",
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
      "Secure file protection and integrity verification tool with password-based encryption, hashing, and digital signatures.",
    tech: ["Python", "Tkinter", "Hashing", "Digital Signatures"],
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
];
