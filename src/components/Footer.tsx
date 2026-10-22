import { REPO_URL, SITE_REPO_URL } from "../docs";

export default function Footer() {
  return (
    <footer className="footer">
      <span className="footer-path">~/atlifm</span>
      <span className="sep">|</span>
      <span>MIT</span>
      <span className="footer-spacer" />
      <a href={REPO_URL} target="_blank" rel="noreferrer">
        github.com/1nfys/atlifm
      </a>
      <span className="sep">·</span>
      <a href={SITE_REPO_URL} target="_blank" rel="noreferrer">
        site source
      </a>
      <span className="sep">·</span>
      <span>v1.0.1</span>
    </footer>
  );
}
