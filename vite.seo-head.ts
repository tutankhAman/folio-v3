import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { Plugin } from "vite";
import { OG_IMAGE, ROUTE_SEO, SITE_URL } from "./src/data/seo";

// The static head is generated for these routes; all data comes from ROUTE_SEO.
const STATIC_ROUTES = ["/", "/tldr"] as const;

/** Regexes matching the template's static SEO tags, to strip before injection. */
const SEO_TAG_PATTERNS = [
  /<title>[\s\S]*?<\/title>/,
  /<meta\s+name="description"[\s\S]*?>/,
  /<meta\s+property="og:[^"]*"[\s\S]*?>/g,
  /<meta\s+name="twitter:[^"]*"[\s\S]*?>/g,
  /<link\s+rel="canonical"[\s\S]*?>/,
];

function tag(content: string): string {
  return `  ${content}`;
}

function headMarkup(path: string): string {
  const head = ROUTE_SEO[path];
  const url = `${SITE_URL}${path}`;
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
    tag('<meta property="og:image:width" content="1200">'),
    tag('<meta property="og:image:height" content="628">'),
    tag('<meta property="og:image:type" content="image/png">'),
    tag(
      '<meta property="og:image:alt" content="Aman Aziz — Systems & Interfaces">'
    ),
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
 * Strip the template's static SEO tags and insert per-route markup before
 * </head>. Only the known SEO tags are removed — everything else (charset,
 * favicon, viewport, theme-color, and critically Vite's module script and
 * stylesheet) is left untouched, so the app bootstrap can never be dropped.
 */
function rebuildHead(html: string, markup: string): string {
  const headEnd = html.indexOf("</head>");
  if (headEnd === -1) {
    return html;
  }

  let head = html.slice(0, headEnd);
  for (const pattern of SEO_TAG_PATTERNS) {
    head = head.replace(pattern, "");
  }

  return `${head}\n${markup}\n${html.slice(headEnd)}`;
}

/**
 * Inject static per-route <head> markup into the built HTML files (no browser,
 * no runtime deps). Data comes from the same ROUTE_SEO map the runtime Seo
 * component uses, so build-time and client-side head tags cannot drift.
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

        for (const route of STATIC_ROUTES) {
          const rendered = rebuildHead(base, headMarkup(route));
          const rel = route === "/" ? "" : route.slice(1);
          const dir = rel ? join(dist, rel) : dist;
          mkdirSync(dir, { recursive: true });
          writeFileSync(join(dir, "index.html"), rendered);
          console.log(`seo-head: wrote head for ${route}`);
        }
      },
    },
  };
}
