import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const site = JSON.parse(await readFile("src/site-meta.json", "utf8"));
const SITE_URL = site.siteUrl.replace(/\/$/, "");
const OG_IMAGE = site.ogImage;
const template = await readFile("dist/index.html", "utf8");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function softwareApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: site.siteName,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Linux",
    description: site.description,
    url: `${SITE_URL}/`,
    downloadUrl: "https://github.com/1nfys/atlifm/releases/latest",
    softwareVersion: "1.0.0",
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
  };
}

function docMeta(doc) {
  const canonical = `${SITE_URL}/docs/${doc.slug}/`;
  return {
    title: `${doc.title} - ${site.siteName} documentation`,
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
        name: site.siteName,
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

function notFoundMeta() {
  return {
    title: `Page not found - ${site.siteName}`,
    description: "The requested page does not exist on the atlifm website.",
    canonical: `${SITE_URL}/`,
    type: "website",
    noindex: true,
    jsonLd: null,
  };
}

function renderSeo(meta) {
  const robots = meta.noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large";
  const tags = [
    `<title>${escapeHtml(meta.title)}</title>`,
    `<meta name="description" content="${escapeHtml(meta.description)}" />`,
    `<meta name="author" content="1nfys" />`,
    `<meta name="robots" content="${robots}" />`,
    `<link rel="canonical" href="${escapeHtml(meta.canonical)}" />`,
    `<meta property="og:type" content="${meta.type}" />`,
    `<meta property="og:site_name" content="${escapeHtml(site.siteName)}" />`,
    `<meta property="og:title" content="${escapeHtml(meta.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
    `<meta property="og:url" content="${escapeHtml(meta.canonical)}" />`,
    `<meta property="og:image" content="${escapeHtml(OG_IMAGE)}" />`,
    `<meta property="og:image:alt" content="atlifm main window" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(OG_IMAGE)}" />`,
  ];

  if (meta.jsonLd) {
    tags.push(`<script type="application/ld+json" id="page-schema">${JSON.stringify(meta.jsonLd)}</script>`);
  }

  return tags.map((tag) => `    ${tag}`).join("\n");
}

function renderPage(meta) {
  if (!template.includes("<!-- seo:start -->") || !template.includes("<!-- seo:end -->")) {
    throw new Error("SEO markers not found in dist/index.html");
  }

  return template.replace(
    /<!-- seo:start -->[\s\S]*?<!-- seo:end -->/,
    `<!-- seo:start -->\n${renderSeo(meta)}\n    <!-- seo:end -->`,
  );
}

const rootMeta = {
  title: site.title,
  description: site.description,
  canonical: `${SITE_URL}/`,
  type: "website",
  noindex: false,
  jsonLd: softwareApplicationJsonLd(),
};

await writeFile("dist/index.html", renderPage(rootMeta));
await writeFile("dist/404.html", renderPage(notFoundMeta()));

for (const doc of site.docs) {
  const directory = join("dist/docs", doc.slug);
  await mkdir(directory, { recursive: true });
  await writeFile(join(directory, "index.html"), renderPage(docMeta(doc)));
}

const docsIndex = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Documentation - ${escapeHtml(site.siteName)}</title>
    <link rel="canonical" href="${SITE_URL}/docs/welcome/" />
    <meta name="robots" content="noindex, follow" />
    <meta http-equiv="refresh" content="0; url=${SITE_URL}/docs/welcome/" />
    <script>location.replace("${SITE_URL}/docs/welcome/");</script>
  </head>
  <body>
    <p><a href="${SITE_URL}/docs/welcome/">Continue to the documentation</a></p>
  </body>
</html>
`;

await mkdir("dist/docs", { recursive: true });
await writeFile("dist/docs/index.html", docsIndex);
console.log(`prerendered ${site.docs.length} documentation pages`);
