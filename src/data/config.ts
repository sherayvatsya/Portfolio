const config = {
  title: "Sheray Vatsya | Web Developer & Software Developer",
  description: {
    long: "Explore the portfolio of Sheray Vatsya — Web Developer & Software Developer. Passionate about building web applications with HTML, CSS, JavaScript, React, Node.js, and Python.",
    short:
      "Portfolio of Sheray Vatsya — Web Developer & Software Developer building interactive and scalable web products.",
  },
  keywords: [
    "Sheray Vatsya",
    "portfolio",
    "web developer",
    "software developer",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "HTML",
    "CSS",
    "Python",
  ],
  author: "Sheray Vatsya",
  email: "sherayvatsya@gmail.com",
  site: "https://sherayvatsya.github.io/3d-portfolio-next",

  // for github stars button
  githubUsername: "sherayvatsya",
  githubRepo: "3d-portfolio-next",

  get ogImg() {
    return this.site + "/assets/seo/og-image.png";
  },
  social: {
    linkedin: "https://linkedin.com/in/sherayvatsya",
    github: "https://github.com/sherayvatsya",
  },
};
export { config };
