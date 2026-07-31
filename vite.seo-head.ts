import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { Plugin } from "vite";
import { ARCHIVED_PROJECTS, projects } from "./src/data/projects";
import {
  personSchema,
  SITE_URL,
  softwareApplicationSchema,
} from "./src/data/seo";

const OG_IMAGE =
  "https://res.cloudinary.com/dojj6zxs3/image/upload/v1785309937/og_gmtxeu.png";

interface HeadData {
  path: string;
  title: string;
  description: string;
  ogType: string;
  jsonLd: object[];
}

const HEADS: Record<string, HeadData> = {
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
    title: "Aman Aziz — Resume, Projects & Records",
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
};

function tag(content: string): string {
  return `  ${content}`;
}

function headMarkup(head: HeadData): string {
  const url = `${SITE_URL}${head.path}`;
  const tags = [
    tag(`<title>${head.title}</title>`),
    tag(`<meta name="description" content="${head.description}">`),
    tag('<meta name="robots" content="index,follow">'),
    tag(`<meta property="og:type" content="${head.ogType}">`),
    tag(`<meta property="og:url" content="${url}">`),
    tag(`<meta property="og:title" content="${head.title}">`),
    tag(`<meta property="og:description" content="${head.description}">`),
    tag('<meta property="og:site_name" content="Aman Aziz">'),
    tag('<meta property="og:locale" content="en_US">'),
    tag(`<meta property="og:image" content="${OG_IMAGE}">`),
    tag('<meta name="twitter:card" content="summary_large_image">'),
    tag('<meta name="twitter:site" content="@amancooks">'),
    tag('<meta name="twitter:creator" content="@amancooks">'),
    tag(`<meta name="twitter:title" content="${head.title}">`),
    tag(`<meta name="twitter:description" content="${head.description}">`),
    tag(`<meta name="twitter:image" content="${OG_IMAGE}">`),
    tag(`<link rel="canonical" href="${url}">`),
    tag(
      `<script type="application/ld+json" data-seo-jsonld="static">${JSON.stringify(head.jsonLd)}</script>`
    ),
  ];
  return tags.join("\n");
}

/**
 * Replace the template's static SEO tags with per-route markup while preserving
 * everything else in the <head> — critically the Vite-injected module script and
 * stylesheet that bootstrap the app.
 *
 * The template head is a known region: <title> through the canonical <link>.
 * We cut that region out and insert the per-route markup before </head>, keeping
 * charset, favicon, viewport, theme-color, and Vite's assets intact.
 */
function rebuildHead(html: string, markup: string): string {
  const headStart = html.indexOf("<head>");
  const headEnd = html.indexOf("</head>");
  if (headStart === -1 || headEnd === -1) {
    return html;
  }

  const seoStart = html.indexOf("<title>", headStart);
  if (seoStart === -1) {
    return html;
  }

  // The template's static SEO block ends with the canonical <link>; everything
  // after it (theme-color, Vite's <script>/<link> assets) must be preserved.
  const canonicalIdx = html.indexOf('<link rel="canonical"', seoStart);
  const seoEnd =
    canonicalIdx === -1 ? headEnd : html.indexOf(">", canonicalIdx) + 1;

  const before = html.slice(0, seoStart);
  const after = html.slice(seoEnd);

  return `${before}\n${markup}\n${after}`;
}

/**
 * Inject static per-route <head> markup into the built HTML files (no browser,
 * no runtime deps). The Seo component mirrors the same data at runtime so
 * client navigation keeps head tags in sync with the prerendered snapshots.
 */
export function seoHeadPlugin(): Plugin {
  return {
    name: "seo-static-head",
    apply: "build",
    closeBundle: {
      sequential: true,
      handler() {
        const dist = join(process.cwd(), "dist");
        const indexHtml = join(dist, "index.html");
        if (!existsSync(indexHtml)) {
          return;
        }
        const base = readFileSync(indexHtml, "utf8");

        for (const [route, head] of Object.entries(HEADS)) {
          const rendered = rebuildHead(base, headMarkup(head));
          const rel = route === "/" ? "" : route.slice(1);
          const dir = rel ? join(dist, rel) : dist;
          mkdirSync(dir, { recursive: true });
          writeFileSync(join(dir, "index.html"), rendered);
          if (route === "/") {
            writeFileSync(join(dist, "200.html"), rendered);
          }
          console.log(`seo-head: wrote head for ${route}`);
        }
      },
    },
  };
}
