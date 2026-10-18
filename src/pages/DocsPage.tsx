import { useMemo } from "react";
import { NavLink, useParams } from "react-router-dom";
import Markdown from "../components/Markdown";
import { buildToc, docs } from "../docs";

export default function DocsPage() {
  const { slug } = useParams();
  const doc = docs.find((d) => d.slug === slug) ?? docs[0];
  const toc = useMemo(() => buildToc(doc.body), [doc]);

  return (
    <main className="docs-layout">
      <aside className="docs-side">
        <div className="side-head">documentation</div>
        {docs.map((d) => (
          <NavLink
            key={d.slug}
            to={`/docs/${d.slug}`}
            className={({ isActive }) => `side-link${isActive ? " active" : ""}`}
          >
            <span className="n">{d.num}.</span>
            <span>{d.title}</span>
          </NavLink>
        ))}
      </aside>

      <article className="docs-body">
        <div className="crumbs">
          <span className="dim">atlifm / docs /</span> <span className="accent">{doc.slug}</span>
        </div>
        <Markdown body={doc.body} />
      </article>

      <aside className="docs-toc">
        <div className="side-head">on this page</div>
        {toc.map((item) => (
          <a
            key={item.id}
            className={`toc-link toc-${item.level}`}
            href={`#${item.id}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
              history.replaceState(null, "", `#${item.id}`);
            }}
          >
            {item.text}
          </a>
        ))}
      </aside>
    </main>
  );
}
