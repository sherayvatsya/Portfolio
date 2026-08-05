// thoda zada ts ho gya idhar
export enum SkillNames {
  JS = "js",
  HTML = "html",
  CSS = "css",
  REACT = "react",
  NODEJS = "nodejs",
  EXPRESS = "express",
  MONGODB = "mongodb",
  GIT = "git",
  GITHUB = "github",
  PYTHON = "python",
  C = "c",
  CPP = "cpp",
  SQL = "sql",
  REST = "rest",
}
export type Skill = {
  id: number;
  name: string;
  label: string;
  shortDescription: string;
  color: string;
  icon: string;
};
export const SKILLS: Record<SkillNames, Skill> = {
  [SkillNames.JS]: {
    id: 1,
    name: "js",
    label: "JavaScript",
    shortDescription: "yeeting code into the DOM since '95, no cap! 💯🚀",
    color: "#f0db4f",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  [SkillNames.HTML]: {
    id: 2,
    name: "html",
    label: "HTML5",
    shortDescription: "the internet's granddad, still bussin' fr fr! 💀🔥",
    color: "#e34c26",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  },
  [SkillNames.CSS]: {
    id: 3,
    name: "css",
    label: "CSS3",
    shortDescription: "styling with the ultimate drip, no cap 💁‍♂️🔥",
    color: "#264de4",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  },
  [SkillNames.REACT]: {
    id: 4,
    name: "react",
    label: "React",
    shortDescription: "component-driven frontend wizardry ⚛️🧙‍♂️",
    color: "#61dafb",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  [SkillNames.NODEJS]: {
    id: 5,
    name: "nodejs",
    label: "Node.js",
    shortDescription: "JavaScript said 'sike, I'm backend now', deadass! 🔙🔚",
    color: "#6cc24a",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  [SkillNames.EXPRESS]: {
    id: 6,
    name: "express",
    label: "Express",
    shortDescription: "middlewares go dummy hard, no cap! 🚂💨",
    color: "#ffffff",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  },
  [SkillNames.MONGODB]: {
    id: 7,
    name: "mongodb",
    label: "MongoDB",
    shortDescription: "flexin' with that NoSQL drip, respectfully! 💪🍃",
    color: "#47a248",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  [SkillNames.GIT]: {
    id: 8,
    name: "git",
    label: "Git",
    shortDescription: "the code's personal bodyguard, no cap! 🕵️‍♂️🔄",
    color: "#f1502f",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  [SkillNames.GITHUB]: {
    id: 9,
    name: "github",
    label: "GitHub",
    shortDescription: "sliding into those pull requests, IYKYK! 🐙",
    color: "#ffffff",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  },
  [SkillNames.PYTHON]: {
    id: 10,
    name: "python",
    label: "Python",
    shortDescription: "clean syntax, data science, and scripting magic 🐍✨",
    color: "#3776ab",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  [SkillNames.C]: {
    id: 11,
    name: "c",
    label: "C",
    shortDescription: "pointers, memory allocation, and close-to-metal speed 💾⚡",
    color: "#a8b9cc",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
  },
  [SkillNames.CPP]: {
    id: 12,
    name: "cpp",
    label: "C++",
    shortDescription: "C but with classes, objects, and powerful abstractions 🚀💻",
    color: "#f34b7d",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  },
  [SkillNames.SQL]: {
    id: 13,
    name: "sql",
    label: "SQL",
    shortDescription: "querying databases, relational design, and table joins 📊🗄️",
    color: "#00758f",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  },
  [SkillNames.REST]: {
    id: 14,
    name: "rest",
    label: "REST APIs",
    shortDescription: "designing HTTP endpoints, requests, and payloads 🌐📡",
    color: "#ff6c37",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
  },
};

export type Experience = {
  id: number;
  title: string;
  company: string;
  description?: string[];
  skills?: SkillNames[];
  certificateImage?: string;
};

export const EXPERIENCE: Experience[] = [
  {
    id: 1,
    title: "Introduction to Artificial Intelligence",
    company: "IBM SkillsBuild",
    description: [
      "Gained comprehensive understanding of foundational AI concepts, neural networks, machine learning models, and cognitive computing applications.",
    ],
    certificateImage: "/certificates/Introduction to AI By IBM.png",
  },
  {
    id: 2,
    title: "Prompt Engineering CodeSprint",
    company: "Vedam School of Technology",
    description: [
      "Mastered writing optimized prompts, context window management, system instructions, and leveraging large language models for automation and application logic.",
    ],
    certificateImage: "/certificates/Certificate_Sheray_Vatsya_Prompt_Engineering.jpg",
  },
  {
    id: 3,
    title: "Data Analyst Course",
    company: "Simplilearn",
    description: [
      "Demonstrated initiative and commitment to deepening data analysis skills and advancing career capabilities.",
    ],
    certificateImage: "/certificates/Data Analyst Certificate.png",
  },
  {
    id: 4,
    title: "AI Tools",
    company: "Be10x",
    description: [
      "Explored and applied various AI-powered tools for productivity, content generation, and workflow automation across real-world scenarios.",
    ],
    certificateImage: "/certificates/AI Tools certificate.png",
  },
  {
    id: 5,
    title: "Generative AI",
    company: "LinkedIn Learning",
    description: [
      "Gained hands-on knowledge of generative AI models, their applications in text, image, and code generation, and responsible AI practices.",
    ],
    certificateImage: "/certificates/Generative AI by LinkedIn.png",
  },
  {
    id: 6,
    title: "Web Development Internship",
    company: "Codeveda",
    description: [
      "Completed a professional internship focused on building full-stack web applications, collaborating in team environments, and delivering production-ready code.",
    ],
    certificateImage: "/certificates/Codeveda Internship Certificate.png",
  },
  {
    id: 7,
    title: "IIT Patna Hackathon",
    company: "IIT Patna",
    description: [
      "Participated in a competitive hackathon, developing innovative solutions under time constraints and presenting to a panel of industry judges.",
    ],
    certificateImage: "/certificates/IIT Patna Hackathaon Certificate.png",
  },
  {
    id: 8,
    title: "StartupSprint",
    company: "IIT Ropar",
    description: [
      "Engaged in an entrepreneurship-focused sprint, ideating startup concepts, building MVPs, and pitching to mentors and evaluators.",
    ],
    certificateImage: "/certificates/StartupSprint IIT Ropar certificate.png",
  },
];

export const themeDisclaimers = {
  light: [
    "Warning: Light mode emits a gazillion lumens of pure radiance!",
    "Caution: Light mode ahead! Please don't try this at home.",
    "Only trained professionals can handle this much brightness. Proceed with sunglasses!",
    "Brace yourself! Light mode is about to make everything shine brighter than your future.",
    "Flipping the switch to light mode... Are you sure your eyes are ready for this?",
  ],
  dark: [
    "Light mode? I thought you went insane... but welcome back to the dark side!",
    "Switching to dark mode... How was life on the bright side?",
    "Dark mode activated! Thanks you from the bottom of my heart, and my eyes too.",
    "Welcome back to the shadows. How was life out there in the light?",
    "Dark mode on! Finally, someone who understands true sophistication.",
  ],
};
