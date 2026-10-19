import { useMemo } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import Markdown from "../components/Markdown";
import SupportMatrix from "../components/SupportMatrix";
import { buildToc, docs } from "../docs";

export default function DocsPage() {
  const { slug } = useParams();
  const index = docs.findIndex((d) => d.slug === slug);
  const doc = docs[index] ?? docs[0];
  const toc = useMemo(() => buildToc(doc.body), [doc]);
  const [intro, rest] = doc.body.split("<!-- support-matrix -->");
  const previous = index > 0 ? docs[index - 1] : undefined;
  const next = index >= 0 && index < docs.length - 1 ? docs[index + 1] : undefined;

  return (
    <main className="docs-layout">
      <aside className="docs-side">
        <div className="side-head">library</div>
        {docs.map((d) => (
          <NavLink
            key={d.slug}
            to={`/docs/${d.slug}`}
            className={({ isActive }) => `side-link${isActive ? " active" : ""}`}
          >
            <span className="n">{d.num}</span>
            <span>{d.title}</span>
          </NavLink>
        ))}
        <div className="side-foot">
          <span>atlifm</span>
          <span>v1.0.0</span>
        </div>
      </aside>

      <article className="docs-body">
        <div className="crumbs">
          <Link to="/">~</Link>
          <span className="crumb-sep">/</span>
          <Link to="/docs/welcome">docs</Link>
          <span className="crumb-sep">/</span>
          <span className="accent">{doc.slug}</span>
          <span className="crumbs-meta">{doc.num} / {docs.length}</span>
        </div>
        {rest !== undefined ? (
          <>
            <Markdown body={intro} />
            <SupportMatrix />
            <Markdown body={rest} />
          </>
        ) : (
          <Markdown body={doc.body} />
        )}

        <nav className="doc-pager">
          {previous ? (
            <Link className="pager-link" to={`/docs/${previous.slug}`}>
              <span className="pager-key">← previous</span>
              <span className="pager-title">{previous.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link className="pager-link pager-next" to={`/docs/${next.slug}`}>
              <span className="pager-key">next →</span>
              <span className="pager-title">{next.title}</span>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </article>

      <aside className="docs-toc">
        <div className="side-head">preview</div>
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
