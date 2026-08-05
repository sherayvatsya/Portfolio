import SlideShow from "@/components/slide-show";
import { Button } from "@/components/ui/button";
import { TypographyP } from "@/components/ui/typography";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

const BASE_PATH = "/assets/projects-screenshots";
const PLACEHOLDER_IMG = "/assets/logo-dark.svg";

const MaskIcon = ({ src, title }: { src: string; title?: string }) => (
  <span
    role="img"
    aria-label={title}
    className="block bg-current"
    style={{
      width: "1em",
      height: "1em",
      WebkitMaskImage: `url(${src})`,
      maskImage: `url(${src})`,
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskPosition: "center",
      maskPosition: "center",
      WebkitMaskSize: "contain",
      maskSize: "contain",
    }}
  />
);

const ProjectsLinks = ({ live }: { live?: string }) => {
  if (!live || live === "#") return null;
  return (
    <div className="flex flex-col md:flex-row items-center justify-start gap-3 my-3 mb-8">
      <Link
        className="font-mono underline flex gap-2"
        rel="noopener"
        target="_new"
        href={live}
      >
        <Button variant={"default"} size={"sm"}>
          Visit Website
          <ArrowUpRight className="ml-3 w-5 h-5" />
        </Button>
      </Link>
    </div>
  );
};

export type Skill = {
  title: string;
  bg: string;
  fg: string;
  icon: ReactNode;
};

const brand = (title: string, file: string): Skill => ({
  title,
  bg: "black",
  fg: "white",
  icon: <MaskIcon src={`/assets/logos/${file}`} title={title} />,
});

const PROJECT_SKILLS = {
  html: brand("HTML5", "html5-mono.svg"),
  css: brand("CSS3", "css3-mono.svg"),
  js: brand("JavaScript", "javascript-mono.svg"),
  react: brand("React.js", "react-mono.svg"),
  node: brand("Node.js", "nodedotjs-mono.svg"),
  express: brand("Express.js", "express-mono.svg"),
  mongo: brand("MongoDB", "mongodb-mono.svg"),
  python: brand("Python", "python-mono.svg"),
};

export type Project = {
  id: string;
  category: string;
  title: string;
  src: string;
  screenshots: string[];
  skills: { frontend: Skill[]; backend: Skill[] };
  content: React.ReactNode | any;
  github?: string;
  live: string;
};

const projects: Project[] = [
  {
    id: "hostel-complaint",
    category: "Web Application",
    title: "Hostel Complaint Management System",
    src: "/assets/projects-screenshots/hostelcare.png",
    screenshots: [],
    live: "https://hostel-complaint-system-amber.vercel.app/",
    github: "https://github.com/sherayvatsya/Hostel-Complaint-System",
    skills: {
      frontend: [
        PROJECT_SKILLS.html,
        PROJECT_SKILLS.css,
        PROJECT_SKILLS.js,
        PROJECT_SKILLS.react,
      ],
      backend: [
        PROJECT_SKILLS.node,
        PROJECT_SKILLS.express,
        PROJECT_SKILLS.mongo,
      ],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono">
            A deployed web application replacing a paper-based complaint process with logging, tracking, and resolving hostel maintenance issues.
          </TypographyP>
          <ProjectsLinks live={this.live} />
        </div>
      );
    },
  },
  {
    id: "todo-list",
    category: "Web Application",
    title: "To-Do List App",
    src: "/assets/projects-screenshots/taskflow.png",
    screenshots: [],
    live: "https://to-do-list-app-beta-neon.vercel.app/signin.html",
    github: "https://github.com/sherayvatsya/TO-DO-LIST-APP",
    skills: {
      frontend: [
        PROJECT_SKILLS.html,
        PROJECT_SKILLS.css,
        PROJECT_SKILLS.js,
      ],
      backend: [],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono">
            A deployed task manager featuring user sign-in, persistent state storage across sessions, and complete CRUD operations.
          </TypographyP>
          <ProjectsLinks live={this.live} />
        </div>
      );
    },
  },
  {
    id: "inside-computer",
    category: "Educational",
    title: "Inside a Computer",
    src: "/assets/projects-screenshots/corex.png",
    screenshots: [],
    live: "https://inside-a-computer-jet.vercel.app",
    github: "https://github.com/sherayvatsya/Inside-a-Computer",
    skills: {
      frontend: [
        PROJECT_SKILLS.html,
        PROJECT_SKILLS.css,
        PROJECT_SKILLS.js,
      ],
      backend: [],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono">
            An interactive educational web app offering a fully responsive, visual walkthrough of hardware components and computer systems architecture.
          </TypographyP>
          <ProjectsLinks live={this.live} />
        </div>
      );
    },
  },
  {
    id: "linear-search",
    category: "Visualization",
    title: "Linear Search Visualizer",
    src: "/assets/projects-screenshots/linear-search.png",
    screenshots: [],
    live: "https://sherayvatsya.github.io/Linaer-Search/applications.html",
    github: "https://github.com/sherayvatsya/Linear-Search-Visualizer",
    skills: {
      frontend: [
        PROJECT_SKILLS.html,
        PROJECT_SKILLS.css,
        PROJECT_SKILLS.js,
      ],
      backend: [],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono">
            An animated step-by-step visualizer for the Linear Search algorithm with interactive user controls for playback speed and color-coded state transitions.
          </TypographyP>
          <ProjectsLinks live={this.live} />
        </div>
      );
    },
  },
];

export default projects;
