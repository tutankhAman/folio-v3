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
