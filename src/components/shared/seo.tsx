import { useEffect } from "react";

interface SeoProps {
  title: string;
  description: string;
  /** Absolute canonical URL. Defaults to https://aamn.dev/ */
  canonical?: string;
  /** Absolute path-safe path for og:url. e.g. "/tldr" */
  path?: string;
  ogImage?: string;
  ogType?: string;
  jsonLd?: object[];
  /** Emit <meta name="robots" content="noindex"> (e.g. for scaffolding/404 pages). */
  noindex?: boolean;
}

const SITE_URL = "https://aamn.dev";
const DEFAULT_OG_IMAGE =
  "https://res.cloudinary.com/dojj6zxs3/image/upload/v1785309937/og_gmtxeu.png";

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
 * canonical, OpenGraph, Twitter, and JSON-LD into <head>. Runs client-side
 * during React Router navigation and is captured by prerendering so the same
 * tags exist in the static HTML served to crawlers.
 */
export function Seo({
  title,
  description,
  canonical,
  path = "/",
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  jsonLd,
  noindex = false,
}: SeoProps) {
  useEffect(() => {
    const url = canonical ?? `${SITE_URL}${path}`;

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
    upsertMeta("property", "og:image", ogImage);
    upsertMeta("property", "og:type", ogType);
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", ogImage);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertLink("canonical", url);

    // Manage JSON-LD: remove any existing JSON-LD block (prerendered static or
    // previously injected by this component), then re-emit the current schema.
    for (const el of document.querySelectorAll("script[data-seo-jsonld]")) {
      el.remove();
    }
    if (jsonLd && jsonLd.length > 0) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-seo-jsonld", "true");
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, [title, description, canonical, path, ogImage, ogType, jsonLd, noindex]);

  return null;
}
