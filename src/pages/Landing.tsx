import { useState } from "react";
import { Link } from "react-router-dom";
import mainShot from "../assets/main-window.png";
import chooserShot from "../assets/file-chooser.png";
import { REPO_URL } from "../docs";

const features = [
  {
    title: "miller columns",
    text: "parent folder, current folder and preview side by side. the preview pane collapses automatically when the window gets narrow.",
  },
  {
    title: "double-click opening",
    text: "a single click only selects and focuses. accidental execution of files is impossible by design.",
  },
  {
    title: "os drag & drop",
    text: "drag files out to Telegram, Discord, Chromium, GIMP or terminal windows and back. alt-drag opens a micro-menu with copy, move and symlink.",
  },
  {
    title: "tabs with history",
    text: "every tab keeps its own forward and backward navigation history. tabs shrink, scroll and can be pinned with Ctrl+P.",
  },
  {
    title: "multi-engine preview",
    text: "image and SVG viewer with zoom and pan, code viewer with line numbers and syntax highlighting, directory tree and a 16-byte hex dump.",
  },
  {
    title: "interactive archives",
    text: "browse zip, tar.gz, 7z and rar hierarchies inside the preview, open internal files or drag them out without full extraction.",
  },
  {
    title: "properties & disk usage",
    text: "Alt+Enter opens a compact inspector with permissions. drive roots get a disk usage console with non-folder sizes.",
  },
  {
    title: "xdg desktop portal",
    text: "set atlifm as the system file picker so browsers and desktop apps use its dialogs for open and save.",
  },
  {
    title: "full undo / redo",
    text: "Ctrl+Z and Ctrl+Y for move, copy and delete operations. pressing Ctrl+Z while a copy is running cancels it with rollback.",
  },
  {
    title: "extensible plugins",
    text: "custom actions, overrides of nearly every built-in operation, previews, hooks, shell scripts and native C++ plugins.",
  },
  {
    title: "cheat sheet",
    text: "F1 opens the keyboard overlay. click a key and press a new combination: bindings apply live and persist to keybinds.conf.",
  },
  {
    title: "strict visual style",
    text: "flat zero-radius panels, monospace JetBrains Mono and a fully recolorable palette through theme.conf.",
  },
];

const distros = {
  arch: {
    label: "arch",
    deps: "sudo pacman -S base-devel gcc cmake ninja qt6-base qt6-svg",
  },
  fedora: {
    label: "fedora",
    deps: "sudo dnf install gcc-c++ cmake ninja-build qt6-qtbase-devel qt6-qtsvg-devel",
  },
  ubuntu: {
    label: "ubuntu",
    deps: "sudo apt install build-essential cmake ninja-build qt6-base-dev qt6-base-private-dev libqt6svg6-dev",
  },
} as const;

type Distro = keyof typeof distros;

export default function Landing() {
  const [distro, setDistro] = useState<Distro>("arch");

  return (
    <main className="landing">
      <section className="hero">
        <div className="prompt">
          <span className="accent">~</span>
          <span className="dim">/</span>
          <span className="sapphire">Documents/atlifm</span>
          <span className="dim"> $ </span>
          <span className="caret">▌</span>
        </div>
        <h1 className="hero-title">
          atlifm<span className="dim">_</span>
        </h1>
        <p className="hero-sub">
          terminal style file manager with human friendly features. Miller columns, tabs, interactive archives, drag
          and drop to any app and a built-in XDG desktop portal, written in C++23 with Qt6.
        </p>
        <div className="hero-actions">
          <a className="btn btn-primary" href={REPO_URL} target="_blank" rel="noreferrer">
            ↗ github
          </a>
          <Link className="btn" to="/docs/welcome">
            ▸ documentation
          </Link>
          <a className="btn btn-ghost" href="#install">
            ⤓ install
          </a>
        </div>
        <figure className="shot-figure hero-shot">
          <img src={mainShot} alt="atlifm main window with miller columns, tabs and preview" />
          <figcaption className="dim">miller columns, tabs, bookmarks and preview in ~/Projects/atlifm</figcaption>
        </figure>
      </section>

      <section className="section" id="features">
        <h2 className="section-title">
          <span className="hash">##</span> features
        </h2>
        <div className="feature-grid">
          {features.map((f) => (
            <article className="panel feature" key={f.title}>
              <h3>
                <span className="accent">▸</span> {f.title}
              </h3>
              <p>{f.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="plugins">
        <h2 className="section-title">
          <span className="hash">##</span> plugins
        </h2>
        <div className="split">
          <div className="split-text">
            <p>
              atlifm is extended from <span className="accent">~/.config/atlifm/plugins/</span>. a plain{" "}
              <span className="accent">.conf</span> file registers a menu command, executable scripts are picked up
              automatically, and native <span className="accent">.so</span> libraries run in-process through a stable C
              ABI.
            </p>
            <ul className="ticks">
              <li>custom actions bindable in keybinds.conf and shown in the F1 cheat sheet</li>
              <li>override nearly every built-in operation, except sudo and polkit flows</li>
              <li>preview plugins replace the preview pane for matching file types</li>
              <li>event hooks fire on start, on navigate and on selection changes</li>
            </ul>
            <div className="hero-actions">
              <Link className="btn" to="/docs/plugin-developer-guide">
                ▸ plugin developer guide
              </Link>
            </div>
          </div>
          <div className="split-code">
            <pre className="codeblock">
              <code>
                <span className="dim"># ~/.config/atlifm/plugins/</span>
                {"\n"}
                <span className="accent">Name</span> = Open in VS Code{"\n"}
                <span className="accent">Exec</span> = code{"\n"}
                <span className="accent">Extensions</span> = .cpp, .hpp{"\n"}
                <span className="accent">Detach</span> = true{"\n"}
                <span className="accent">Action</span> = open_in_vscode{"\n"}
                <span className="accent">Keys</span> = Ctrl+Alt+V{"\n"}
              </code>
            </pre>
            <pre className="codeblock">
              <code>
                <span className="dim">$ c++ -shared -fPIC -O2 -o hello.so</span>
                {"\n"}
                <span className="dim">    hello-plugin.cpp</span>
                {"\n"}
                <span className="dim">$ cp hello.so ~/.config/atlifm/plugins/</span>
              </code>
            </pre>
          </div>
        </div>
      </section>

      <section className="section" id="portal">
        <h2 className="section-title">
          <span className="hash">##</span> file chooser portal
        </h2>
        <div className="split">
          <div className="split-text">
            <p>
              atlifm can serve as the system file chooser through the XDG desktop portal: browsers and desktop apps get
              its dialogs for open and save, with the same bookmarks, columns and keyboard as the main window.
            </p>
            <ul className="ticks">
              <li>native portal backend with open file and save file sessions</li>
              <li>breadcrumb navigation, hidden files toggle and filters</li>
              <li>enable once with atlifm --setup-portal</li>
            </ul>
          </div>
          <figure className="shot-figure">
            <img src={chooserShot} alt="atlifm xdg portal file chooser dialog" />
            <figcaption className="dim">xdg portal file chooser as the system open dialog</figcaption>
          </figure>
        </div>
      </section>

      <section className="section" id="install">
        <h2 className="section-title">
          <span className="hash">##</span> install
        </h2>
        <div className="panel install">
          <div className="distro-tabs">
            {(Object.keys(distros) as Distro[]).map((key) => (
              <button
                key={key}
                className={`distro-tab${distro === key ? " active" : ""}`}
                onClick={() => setDistro(key)}
              >
                {distros[key].label}
              </button>
            ))}
          </div>
          <pre className="codeblock">
            <code>{distros[distro].deps}</code>
          </pre>
          <pre className="codeblock">
            <code>
              cmake -B build -G Ninja -DCMAKE_BUILD_TYPE=Release{"\n"}
              ninja -C build{"\n"}
              cmake --install build --prefix ~/.local{"\n"}
              atlifm --setup-portal
            </code>
          </pre>
          <p className="dim">a compiler with C++23 support is required.</p>
        </div>
      </section>
    </main>
  );
}
