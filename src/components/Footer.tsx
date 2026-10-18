import { REPO_URL, SITE_REPO_URL } from "../docs";

export default function Footer() {
  return (
    <footer className="footer">
      <span className="dim">atlifm</span>
      <span className="sep">·</span>
      <span className="dim">MIT</span>
      <span className="sep">·</span>
      <a href={REPO_URL} target="_blank" rel="noreferrer">
        github.com/1nfys/atlifm
      </a>
      <span className="sep">·</span>
      <a href={SITE_REPO_URL} target="_blank" rel="noreferrer">
        site source
      </a>
    </footer>
  );
}
