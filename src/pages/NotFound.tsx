import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="landing">
      <section className="hero notfound">
        <div className="panel error-panel">
          <h1>
            <span className="red">error:</span> path not found
          </h1>
          <p className="dim">the requested route does not exist in this archive.</p>
          <div className="hero-actions">
            <Link className="btn btn-primary" to="/">
              ▸ back to overview
            </Link>
            <Link className="btn" to="/docs/welcome">
              ▸ documentation
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
