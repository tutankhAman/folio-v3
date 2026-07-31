import { useEffect } from "react";
import { OG_IMAGE, ROUTE_SEO, SITE_URL } from "@/data/seo";

interface SeoProps {
  /** Route key into ROUTE_SEO, e.g. "/" or "/tldr". */
  route: string;
  /** Emit <meta name="robots" content="noindex"> (e.g. for scaffolding pages). */
  noindex?: boolean;
}

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Lightweight, dependency-free head manager. Writes per-route title, meta,
 * canonical, OpenGraph, Twitter, and JSON-LD into <head>. All data comes from
 * the module-level ROUTE_SEO map, so the effect deps stay stable across
 * re-renders (e.g. scroll-driven state on /tldr) and only run on route change.
 * The same map is used at build time by the static-head Vite plugin, so the
 * prerendered HTML and client-side head stay in sync.
 */
export function Seo({ route, noindex = false }: SeoProps) {
  const { title, description, path, ogType, jsonLd } =
    ROUTE_SEO[route] ?? ROUTE_SEO["/"];

  useEffect(() => {
    const url = `${SITE_URL}${path}`;

    document.title = title;
    upsertMeta("name", "description", description);
    if (noindex) {
      upsertMeta("name", "robots", "noindex");
    } else {
      const robots = document.head.querySelector<HTMLMetaElement>(
        'meta[name="robots"]'
      );
      if (robots?.getAttribute("content") === "noindex") {
        robots.remove();
      }
    }
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:image", OG_IMAGE);
    upsertMeta("property", "og:type", ogType);
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", OG_IMAGE);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertLink("canonical", url);

    // Manage JSON-LD: remove any existing JSON-LD block (prerendered static or
    // previously injected by this component), then re-emit the current schema.
    for (const el of document.querySelectorAll("script[data-seo-jsonld]")) {
      el.remove();
    }
    if (jsonLd.length > 0) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-seo-jsonld", "true");
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
    // jsonLd comes from the module-level ROUTE_SEO map, so its reference is
    // stable across re-renders; the effect only re-runs on route change.
  }, [title, description, path, ogType, jsonLd, noindex]);

  return null;
}
