import { ARCHIVED_PROJECTS, type Project, projects } from "./projects";

const SITE_URL = "https://aamn.dev";

export const OG_IMAGE =
  "https://res.cloudinary.com/dojj6zxs3/image/upload/v1785309937/og_gmtxeu.png";

const SOCIAL_URLS = {
  github: "https://github.com/tutankhAman",
  x: "https://x.com/amancooks",
  linkedin: "https://linkedin.com/in/aman-aziz",
  instagram: "https://instagram.com/rxse_s__",
};

export function personSchema(): object {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Aman Aziz",
    url: SITE_URL,
    image:
      "https://res.cloudinary.com/dojj6zxs3/image/upload/v1785309937/og_gmtxeu.png",
    jobTitle: "Software Engineer & Co-founder",
    description:
      "Final-year CS student, Co-founder and Frontend Lead at Singularity Works, and twice a national hackathon winner. Building systems and interfaces at the intersection of design and engineering.",
    email: "mailto:amanaziz2020@gmail.com",
    sameAs: [
      SOCIAL_URLS.github,
      SOCIAL_URLS.x,
      SOCIAL_URLS.linkedin,
      SOCIAL_URLS.instagram,
    ],
    knowsAbout: [
      "React",
      "TypeScript",
      "Next.js",
      "Node.js",
      "Tailwind CSS",
      "UI/UX Design",
      "Full-stack development",
    ],
  };
}

export function softwareApplicationSchema(project: Project): object {
  const url =
    project.links.find((l) => l.href !== "#")?.href ??
    `${SITE_URL}/#${project.id}`;
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.name,
    description: project.description,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url,
    author: personSchema(),
    datePublished: project.year,
  };
}

export function creativeWorkSchema(project: Project): object {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.description,
    creator: personSchema(),
    datePublished: project.year,
  };
}

export interface RouteSeo {
  path: string;
  title: string;
  description: string;
  ogType: string;
  jsonLd: object[];
}

/**
 * Single source of truth for per-route SEO head data. Consumed by the static
 * Vite plugin (build-time HTML) and the runtime Seo component (client nav),
 * so the two can never drift.
 */
export const ROUTE_SEO: Record<string, RouteSeo> = {
  "/": {
    path: "/",
    title: "Aman Aziz — Systems & Interfaces",
    description:
      "Designing systems that feel inevitable. Clean interfaces. Brutal efficiency. Code and aesthetics locked together, built to scale, built to last.",
    ogType: "website",
    jsonLd: [personSchema()],
  },
  "/tldr": {
    path: "/tldr",
    title: "Aman Aziz — tldr, Projects & Records",
    description:
      "Aman Aziz — final-year CS student, Co-founder and Frontend Lead at Singularity Works. National hackathon winner. Builds Larity, Saltwise, and systems at the intersection of design and engineering.",
    ogType: "profile",
    jsonLd: [
      personSchema(),
      ...projects.map((p) => softwareApplicationSchema(p)),
      ...ARCHIVED_PROJECTS.map((p) => ({
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: p.title,
        description: p.description,
        creator: personSchema(),
      })),
    ],
  },
  "/test": {
    path: "/test",
    title: "Test Page",
    description: "",
    ogType: "website",
    jsonLd: [],
  },
};

export { SITE_URL };
