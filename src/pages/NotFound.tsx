import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="notfound-page">
      <div className="notfound-path">
        <span className="dim">~/</span>
        <span className="red">path not found</span>
      </div>
      <div className="notfound-panel">
        <div className="notfound-icon">[ ]</div>
        <h1>this folder is empty</h1>
        <p>the requested route does not exist on this site.</p>
        <div className="hero-actions">
          <Link className="btn btn-primary" to="/">
            back to overview
          </Link>
          <Link className="btn" to="/docs/welcome">
            documentation
          </Link>
        </div>
      </div>
    </main>
  );
}
