import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { docs } from "./docs";
import siteMeta from "./site-meta.json";

const SITE_URL = siteMeta.siteUrl.replace(/\/$/, "");
const OG_IMAGE = siteMeta.ogImage;

export interface PageMeta {
  title: string;
  description: string;
  canonical: string;
  type: "website" | "article";
  noindex: boolean;
  jsonLd: Record<string, unknown> | null;
}

function docMeta(slug: string): PageMeta | null {
  const doc = docs.find((item) => item.slug === slug);
  if (!doc) return null;

  const canonical = `${SITE_URL}/docs/${doc.slug}/`;
  return {
    title: `${doc.title} - ${siteMeta.siteName} documentation`,
    description: doc.description,
    canonical,
    type: "article",
    noindex: false,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      headline: doc.title,
      description: doc.description,
      url: canonical,
      mainEntityOfPage: canonical,
      isPartOf: {
        "@type": "WebSite",
        name: siteMeta.siteName,
        url: `${SITE_URL}/`,
      },
      author: {
        "@type": "Person",
        name: "1nfys",
        url: "https://github.com/1nfys",
      },
    },
  };
}

export function getPageMeta(pathname: string): PageMeta {
  const path = pathname.replace(/\/+$/, "") || "/";

  if (path === "/") {
    return {
      title: siteMeta.title,
      description: siteMeta.description,
      canonical: `${SITE_URL}/`,
      type: "website",
      noindex: false,
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: siteMeta.siteName,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Linux",
        description: siteMeta.description,
        url: `${SITE_URL}/`,
        downloadUrl: "https://github.com/1nfys/atlifm/releases/latest",
        softwareVersion: "1.0.2",
        license: "https://opensource.org/licenses/MIT",
        image: OG_IMAGE,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        author: {
          "@type": "Person",
          name: "1nfys",
          url: "https://github.com/1nfys",
        },
        sameAs: ["https://github.com/1nfys/atlifm"],
      },
    };
  }

  if (path === "/docs") {
    return docMeta("welcome") ?? notFoundMeta();
  }

  const match = /^\/docs\/([^/]+)$/.exec(path);
  if (match) {
    return docMeta(match[1]) ?? notFoundMeta();
  }

  return notFoundMeta();
}

function notFoundMeta(): PageMeta {
  return {
    title: `Page not found - ${siteMeta.siteName}`,
    description: "The requested page does not exist on the atlifm website.",
    canonical: `${SITE_URL}/`,
    type: "website",
    noindex: true,
    jsonLd: null,
  };
}

function setMeta(attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function setCanonical(href: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!element) {
    element = document.createElement("link");
    element.rel = "canonical";
    document.head.appendChild(element);
  }
  element.href = href;
}

function setJsonLd(data: Record<string, unknown> | null) {
  let element = document.getElementById("page-schema") as HTMLScriptElement | null;
  if (!data) {
    element?.remove();
    return;
  }
  if (!element) {
    element = document.createElement("script");
    element.type = "application/ld+json";
    element.id = "page-schema";
    document.head.appendChild(element);
  }
  element.textContent = JSON.stringify(data);
}

export function usePageMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = getPageMeta(pathname);
    document.title = meta.title;
    setMeta("name", "description", meta.description);
    setMeta("name", "robots", meta.noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large");
    setCanonical(meta.canonical);
    setMeta("property", "og:type", meta.type);
    setMeta("property", "og:site_name", siteMeta.siteName);
    setMeta("property", "og:title", meta.title);
    setMeta("property", "og:description", meta.description);
    setMeta("property", "og:url", meta.canonical);
    setMeta("property", "og:image", OG_IMAGE);
    setMeta("property", "og:image:alt", "atlifm main window");
    setMeta("property", "og:image:width", "1200");
    setMeta("property", "og:image:height", "630");
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", meta.title);
    setMeta("name", "twitter:description", meta.description);
    setMeta("name", "twitter:image", OG_IMAGE);
    setJsonLd(meta.jsonLd);
  }, [pathname]);
}
