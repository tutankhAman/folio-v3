import type { Project } from "./projects";

const SITE_URL = "https://aamn.dev";

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

export { SITE_URL };
