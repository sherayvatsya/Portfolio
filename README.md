# 🚀 Sheray Vatsya — 3D Portfolio

Modern 3D developer portfolio with immersive visuals, cinematic animations, and a responsive user experience. Built using Next.js, React, TypeScript, GSAP and Motion.

## ✨ Features

- **Interactive 3D Keyboard** — Custom Spline keyboard where each keycap represents a skill, revealing titles and descriptions on hover/press
- **Buttery Animations** — GSAP + Motion powered scroll, hover, and reveal animations
- **Space Theme** — Floating particles on a dark canvas for a cosmic vibe
- **Light & Dark Mode** — Full theme support with cheeky disclaimer toasts
- **Responsive** — Works across all screen sizes
- **Contact Form** — Email delivery via Resend
- **Analytics** _(optional)_ — Umami analytics integration

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Framework** | Next.js 16, React 19, TypeScript |
| **Styling** | Tailwind CSS, Shadcn UI |
| **Animation** | GSAP, Motion |
| **3D** | Spline Runtime |
| **Email** | Resend |
| **Misc** | Lenis (smooth scroll), Zod, @teispace/next-themes |

---

### Live Demo

🔗 **Portfolio:** https://portfolio-nu-navy-20.vercel.app/

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- npm, pnpm, or yarn

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/sherayvatsya/3d-portfolio-next.git
    cd 3d-portfolio-next
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**

    Copy `.env.example` to `.env.local` and fill in the values:

    ```bash
    cp .env.example .env.local
    ```

    | Variable | Required | Description |
    |---|---|---|
    | `RESEND_API_KEY` | Yes | API key from [Resend](https://resend.com) for the contact form |
    | `NEXT_PUBLIC_WS_URL` | No | WebSocket server URL for realtime features (cursors, chat, presence) |
    | `UMAMI_DOMAIN` | No | Umami analytics script URL |
    | `UMAMI_SITE_ID` | No | Umami website ID |

4. **Run the development server:**

    ```bash
    npm run dev
    ```

5. Open [http://localhost:3000](http://localhost:3000) and see the magic ✨

---


## 🎨 Personalization

All personal info is centralized in [`src/data/config.ts`](src/data/config.ts):

```ts
const config = {
  title: "Sheray Vatsya | Web Developer & Software Developer",
  author: "Sheray Vatsya",
  email: "sherayvatsya@gmail.com",
  site: "https://sherayvatsya.github.io/3d-portfolio-next",
  githubUsername: "sherayvatsya",
  githubRepo: "3d-portfolio-next",
  social: {
    linkedin: "https://linkedin.com/in/sherayvatsya",
    github: "https://github.com/sherayvatsya",
  },
};
```

Other files to customize:

| File | What to change |
|---|---|
| `src/data/projects.tsx` | Projects, screenshots, descriptions, and tech stacks |
| `src/data/constants.ts` | Skills list and work experience |
| `public/Sheray_Vatsya_Resume.pdf` | Résumé PDF for the resume page |
| `public/assets/projects-screenshots/` | Project screenshots (`callhq/`, `broki/`, etc.) |
| `public/assets/seo/og-image.png` | Social share preview image |

### Projects

Screenshots live under `public/assets/projects-screenshots/<project-id>/`. Current projects:

- [Hostel Complaint Management System](https://hostel-complaint-system-amber.vercel.app/)
- [To-Do List App](https://to-do-list-app-beta-neon.vercel.app/signin.html)
- [Inside a Computer](https://inside-a-computer-jet.vercel.app)
- [Linear Search Visualizer](https://sherayvatsya.github.io/Linaer-Search/applications.html)

---


## 🔌 Realtime Features 

The portfolio supports optional realtime features powered by a **separate backend API**:

- 🖱️ **Live cursors** — See other visitors' cursors in realtime
- 👥 **Online presence** — Shows who's currently on the site
- 💬 **Chat** — Live chat between visitors

These features activate automatically when the `NEXT_PUBLIC_WS_URL` environment variable is set. Without it, the portfolio works perfectly fine as a static site — no realtime features, no backend dependency.

---

## 🚀 Deployment

🔗 **Portfolio:** https://portfolio-nu-navy-20.vercel.app/


This site is deployed on **Vercel**. To deploy your own:

1. Push your code to a GitHub repository
2. Connect the repository to [Vercel](https://vercel.com)
3. Add your environment variables in the Vercel dashboard
4. Vercel handles the rest — automatic deployments on every push

---

## 📄 License & Credits

This project is open source and available under the [MIT License](LICENSE).

