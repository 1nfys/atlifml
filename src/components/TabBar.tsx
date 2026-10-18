import { NavLink, useLocation } from "react-router-dom";
import { REPO_URL } from "../docs";

export default function TabBar() {
  const { pathname } = useLocation();
  const inDocs = pathname.startsWith("/docs");

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
        <NavLink to="/docs/welcome" className={`tab${inDocs ? " active" : ""}`}>
          <span className="n">2:</span>
          <span className="t">docs</span>
        </NavLink>
      </nav>
      <div className="tabbar-right">
        <a className="gh-btn" href={REPO_URL} target="_blank" rel="noreferrer">
          <span className="gh-mark">↗</span> github
        </a>
      </div>
    </header>
  );
}
