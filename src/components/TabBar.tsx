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
          overview
        </NavLink>
        <NavLink to="/docs/welcome" className={`tab${inDocs && !inDownloads ? " active" : ""}`}>
          documentation
        </NavLink>
        <NavLink to="/docs/downloads" className={`tab${inDownloads ? " active" : ""}`}>
          downloads
        </NavLink>
      </nav>
      <div className="tabbar-right">
        <span className="release-state">v1.0.4</span>
        <a className="gh-btn" href={REPO_URL} target="_blank" rel="noreferrer">
          github
        </a>
      </div>
    </header>
  );
}
