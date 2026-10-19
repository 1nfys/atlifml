import welcome from "./content/welcome.md?raw";
import downloads from "./content/downloads.md?raw";
import userGuide from "./content/user-guide.md?raw";
import pluginGuide from "./content/plugin-developer-guide.md?raw";
import configReference from "./content/configuration-reference.md?raw";

export const REPO_URL = "https://github.com/1nfys/atlifm";
export const SITE_REPO_URL = "https://github.com/1nfys/atlifml";

export interface DocMeta {
  slug: string;
  title: string;
  num: string;
  body: string;
}

export const docs: DocMeta[] = [
  { slug: "welcome", title: "Welcome to atlifm", num: "1", body: welcome },
  { slug: "downloads", title: "Downloads", num: "2", body: downloads },
  { slug: "user-guide", title: "User Guide", num: "3", body: userGuide },
  { slug: "plugin-developer-guide", title: "Plugin Developer Guide", num: "4", body: pluginGuide },
  { slug: "configuration-reference", title: "Configuration Reference", num: "5", body: configReference },
];

export interface TocItem {
  level: number;
  text: string;
  id: string;
}

function cleanInline(text: string): string {
  return text
    .replace(/`([^`]*)`/g, "$1")
    .replace(/\*\*([^*]*)\*\*/g, "$1")
    .replace(/\*([^*]*)\*/g, "$1")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1");
}

export function slugify(text: string): string {
  return (
    cleanInline(text)
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s_-]/gu, "")
      .trim()
      .replace(/\s+/g, "-") || "section"
  );
}

export function buildToc(markdown: string): TocItem[] {
  const items: TocItem[] = [];
  for (const line of markdown.split("\n")) {
    const match = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!match) continue;
    items.push({ level: match[1].length, text: cleanInline(match[2]), id: slugify(match[2]) });
  }
  return items;
}

export function extractText(children: unknown): string {
  if (children == null || children === false) return "";
  if (typeof children === "string" || typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(extractText).join("");
  if (typeof children === "object" && "props" in (children as { props?: unknown })) {
    return extractText((children as { props: { children?: unknown } }).props?.children);
  }
  return "";
}
