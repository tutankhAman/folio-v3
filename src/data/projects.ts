export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  role: string;
  year: string;
  category: string;
  tech: string[];
  links: { label: string; href: string }[];
  thumbnail: string;
  /** IDs of HeroImages that should trigger this project overlay on click */
  heroImageIds: string[];
}

export const projects: Project[] = [
  {
    id: "larity",
    name: "Larity",
    tagline: "AI assistant",
    description:
      "An intelligent AI assistant designed to streamline workflows and enhance productivity. Larity combines natural language understanding with a clean, intuitive interface to make AI accessible to everyone.",
    role: "Design & Development",
    year: "2024",
    category: "AI / Product",
    tech: ["React", "TypeScript", "Node.js", "OpenAI", "Tailwind CSS"],
    links: [
      { label: "Visit", href: "#" },
      { label: "GitHub", href: "#" },
    ],
    thumbnail:
      "https://res.cloudinary.com/dojj6zxs3/image/upload/f_auto,q_auto,dpr_auto,fl_progressive/v1770314928/larity_zckjoh.png",
    heroImageIds: ["img-larity-logo", "img-larity-app", "img-larity-banner"],
  },
  {
    id: "singularity-works",
    name: "Singularity Works",
    tagline: "Company",
    description:
      "Co-founded a technology company focused on building innovative software solutions. Singularity Works brings together design and engineering to create products that push boundaries.",
    role: "Co-founder",
    year: "2023",
    category: "Company / Studio",
    tech: ["Next.js", "TypeScript", "Figma", "Vercel"],
    links: [{ label: "Visit", href: "#" }],
    thumbnail:
      "https://res.cloudinary.com/dojj6zxs3/image/upload/f_auto,q_auto,dpr_auto,fl_progressive/v1770314916/singularityworks_ia2feo.png",
    heroImageIds: ["img-web-1"],
  },
  {
    id: "allround",
    name: "Allround",
    tagline: "Web platform",
    description:
      "A comprehensive web platform built for seamless user experiences. Allround focuses on clean architecture and fluid interactions to deliver a polished product.",
    role: "Design & Development",
    year: "2024",
    category: "Web Platform",
    tech: ["React", "TypeScript", "Tailwind CSS", "Node.js"],
    links: [{ label: "Visit", href: "#" }],
    thumbnail:
      "https://res.cloudinary.com/dojj6zxs3/image/upload/f_auto,q_auto,dpr_auto,fl_progressive/v1770314930/allorund_neggya.png",
    heroImageIds: ["img-web-2"],
  },
  {
    id: "oryx",
    name: "Oryx",
    tagline: "Web platform",
    description:
      "A modern web platform designed with precision and care. Oryx emphasizes performance and design quality, creating an experience that feels effortless.",
    role: "Design & Development",
    year: "2024",
    category: "Web Platform",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    links: [{ label: "Visit", href: "#" }],
    thumbnail:
      "https://res.cloudinary.com/dojj6zxs3/image/upload/f_auto,q_auto,dpr_auto,fl_progressive/v1770314896/oryx_gtronv.png",
    heroImageIds: ["img-web-3"],
  },
  {
    id: "verq",
    name: "Verq",
    tagline: "AI software",
    description:
      "AI-powered software that integrates intelligence into everyday workflows. Verq experiments with embedding AI capabilities directly into the tools people use daily.",
    role: "Design & Development",
    year: "2024",
    category: "AI / Software",
    tech: ["React", "TypeScript", "Python", "OpenAI", "Tailwind CSS"],
    links: [
      { label: "Visit", href: "#" },
      { label: "GitHub", href: "#" },
    ],
    thumbnail:
      "https://res.cloudinary.com/dojj6zxs3/image/upload/f_auto,q_auto,dpr_auto,fl_progressive/v1770314865/verq_nxcqwm.png",
    heroImageIds: ["img-verq"],
  },
];

/** Quick lookup: heroImageId → Project */
export const imageToProject = new Map<string, Project>();
for (const project of projects) {
  for (const imgId of project.heroImageIds) {
    imageToProject.set(imgId, project);
  }
}

/** Quick lookup: project name (lowercase) → Project */
export const nameToProject = new Map<string, Project>();
for (const project of projects) {
  nameToProject.set(project.name.toLowerCase(), project);
}

export interface ArchivedProject {
  title: string;
  link?: string;
  stack: string;
  description: string;
}

export const ARCHIVED_PROJECTS: ArchivedProject[] = [
  {
    title: "Chorus",
    stack:
      "Next.js 16, React 19, Electron 35, React Flow, Bun, Elysia, SpacetimeDB, OpenCode SDK, Groq, ArmorIQ, Turborepo",
    description:
      "Spatial mission control for orchestrating parallel AI coding agents across 4,000+ models and 100+ providers. Infinite kanban canvas, local-first execution with mobile remote control, policy guardrails on every agent action. Built with Next.js, Electron, React Flow, SpacetimeDB, and OpenCode SDK. Won 1st place at MLH HackByte 4.0.",
  },
  {
    title: "Attest",
    link: "https://attest-frontend.vercel.app",
    stack:
      "React 19, Vite, TanStack Query, TanStack Router, Recharts, Bun, Elysia",
    description:
      "Ethereum validator performance dashboard that fetches live Beacon chain data and computes missed attestation rewards using the Altair reward model. Tracks 5 validators across selectable windows with per-epoch reward breakdowns, trend charts, and a 90-day SQLite cache. Built with React, TanStack Query, Bun, and Elysia.",
  },
  {
    title: "Pebbles",
    link: "https://pebbles-theta.vercel.app",
    stack:
      "Next.js 16, React 19, TypeScript, Tailwind CSS v4, Yjs, Cloudflare Workers (Hono), Durable Objects, HyperFormula",
    description:
      "Real-time collaborative spreadsheet with virtualized rendering for 100 columns x 10,000 rows. Multi-user editing synced via Yjs CRDTs over Cloudflare Durable Objects, formula evaluation offloaded to a dedicated worker via HyperFormula. Built with Next.js, Tailwind, and Cloudflare Workers.",
  },
  {
    title: "Zippy",
    link: "https://github.com/tutankhAman/zippy",
    stack: "Bun, Puppeteer, Chrome DevTools Protocol, Gemini 3.0 Flash API",
    description:
      "CLI browser automation tool that speedruns Google Cloud Skills Boost courses. Hooks into an existing Chrome session via CDP, auto-completes lessons, solves practice quizzes with Gemini 3.0 Flash, and pauses on graded work for manual approval. Built with Bun and Puppeteer.",
  },
  {
    title: "Arkaiv",
    link: "https://arkaiv.vercel.app",
    stack:
      "Node.js, Express, MongoDB, Playwright, Vite, React, React-Query, Hugging Face Inference API, OpenAI API",
    description:
      "Automated tracker that aggregates and summarizes new AI tools, models, and papers from GitHub, Hugging Face, and arXiv. Daily scraping pipeline with BART-Large-CNN summarization and a subscription-based email digest system. Built with Node.js, Express, MongoDB, and React.",
  },
  {
    title: "VerQ",
    link: "https://verqai.vercel.app",
    stack:
      "React, Vite, Tailwind CSS, Node.js, OpenAI API, Gemini API, Deepgram",
    description:
      "AI-powered interview prep platform that ingests resumes, generates context-specific interview questions, and asks LLM-driven follow-ups. Converts questions to speech via Deepgram for a realistic practice flow. Built with React, Node.js, OpenAI, and Gemini. Won 1st place at Summer of Codefest 2025.",
  },
];
