import { NavLink, useLocation } from "react-router-dom";
import { REPO_URL } from "../docs";

export default function TabBar() {
  const { pathname } = useLocation();
  const inDocs = pathname.startsWith("/docs");
  const inDownloads = pathname === "/docs/downloads";

  return (
    <header className="tabbar">
      <NavLink to="/" className="brand">
        <img src={`${import.meta.env.BASE_URL}atlifm-128.png`} alt="atlifm" width={16} height={16} />
        <span className="lg">atlifm</span>
        <span className="tilde">~</span>
      </NavLink>
      <nav className="tabs">
        <NavLink to="/" end className={({ isActive }) => `tab${isActive && !inDocs ? " active" : ""}`}>
          <span className="n">1:</span>
          <span className="t">overview</span>
        </NavLink>
        <NavLink to="/docs/welcome" className={`tab${inDocs && !inDownloads ? " active" : ""}`}>
          <span className="n">2:</span>
          <span className="t">docs</span>
        </NavLink>
        <NavLink to="/docs/downloads" className={`tab${inDownloads ? " active" : ""}`}>
          <span className="n">3:</span>
          <span className="t">downloads</span>
        </NavLink>
      </nav>
      <div className="tabbar-right">
        <span className="release-state">
          <span className="release-dot" />
          v1.0.2
        </span>
        <a className="gh-btn" href={REPO_URL} target="_blank" rel="noreferrer">
          <span className="gh-mark">↗</span> github
        </a>
      </div>
    </header>
  );
}
