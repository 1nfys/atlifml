import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import mainShot from "../assets/main-window.png";
import chooserShot from "../assets/file-chooser.png";
import { REPO_URL } from "../docs";

const RELEASES_URL = "https://github.com/1nfys/atlifm/releases/latest";
const RELEASE_URL = "https://github.com/1nfys/atlifm/releases/tag/v1.0.0";

const features = [
  {
    title: "miller columns",
    kind: "layout",
    text: "parent folder, current folder and preview side by side. the preview pane collapses automatically when the window gets narrow.",
  },
  {
    title: "double-click opening",
    kind: "mouse",
    text: "a single click only selects and focuses. accidental execution of files is impossible by design.",
  },
  {
    title: "os drag & drop",
    kind: "dnd",
    text: "drag files out to Telegram, Discord, Chromium, GIMP or terminal windows and back. alt-drag opens copy, move and symlink.",
  },
  {
    title: "tabs with history",
    kind: "tabs",
    text: "every tab keeps its own forward and backward navigation history. tabs shrink, scroll and can be pinned.",
  },
  {
    title: "multi-engine preview",
    kind: "preview",
    text: "image and SVG viewer with zoom and pan, code viewer with syntax highlighting, directory tree and a 16-byte hex dump.",
  },
  {
    title: "interactive archives",
    kind: "archive",
    text: "browse zip, tar.gz, 7z and rar hierarchies inside the preview, open internal files or drag them out without extraction.",
  },
  {
    title: "properties & disk usage",
    kind: "inspector",
    text: "Alt+Enter opens a compact inspector with permissions. drive roots get a disk usage console with progress bars.",
  },
  {
    title: "xdg desktop portal",
    kind: "system",
    text: "set atlifm as the system file picker so browsers and desktop apps use its dialogs for open and save.",
  },
  {
    title: "full undo / redo",
    kind: "history",
    text: "Ctrl+Z and Ctrl+Y for move, copy and delete. pressing Ctrl+Z during a running copy cancels it with rollback.",
  },
  {
    title: "extensible plugins",
    kind: "plugins",
    text: "custom actions, overrides, previews, hooks, shell scripts and native C++ plugins through a stable C ABI.",
  },
  {
    title: "cheat sheet",
    kind: "keys",
    text: "F1 opens the keyboard overlay. click a key and press a new combination: bindings apply live and persist.",
  },
  {
    title: "strict visual style",
    kind: "theme",
    text: "flat zero-radius panels, monospace JetBrains Mono and a fully recolorable palette through theme.conf.",
  },
];

const installs = {
  arch: {
    label: "arch linux",
    channel: "pacman",
    note: "x86_64 package from the release page. for other architectures build the PKGBUILD.",
    commands: ["sudo pacman -U atlifm-1.0.0-1-x86_64.pkg.tar.zst"],
    download: {
      label: "pkg.tar.zst",
      href: `${RELEASES_URL}/download/atlifm-1.0.0-1-x86_64.pkg.tar.zst`,
    },
  },
  fedora: {
    label: "fedora / rhel",
    channel: "copr",
    note: "the copr repository builds for fedora and epel chroots.",
    commands: ["sudo dnf copr enable 1nfys/atlifm", "sudo dnf install atlifm"],
    download: {
      label: "rpm",
      href: `${RELEASES_URL}/download/atlifm-1.0.0-1.fc44.x86_64.rpm`,
    },
  },
  ubuntu: {
    label: "ubuntu",
    channel: "ppa",
    note: "launchpad builds for the current ubuntu series. use the .deb on other releases.",
    commands: [
      "sudo add-apt-repository ppa:1nfys/atlifm",
      "sudo apt update",
      "sudo apt install atlifm",
    ],
    download: {
      label: ".deb",
      href: `${RELEASES_URL}/download/atlifm_1.0.0-1_amd64.deb`,
    },
  },
  debian: {
    label: "debian",
    channel: "apt",
    note: "standalone package, x86_64 shown. an arm64 build is available on the release page.",
    commands: ["sudo apt install ./atlifm_1.0.0-1_amd64.deb"],
    download: {
      label: ".deb",
      href: `${RELEASES_URL}/download/atlifm_1.0.0-1_amd64.deb`,
    },
  },
  obs: {
    label: "obs repository",
    channel: "debian 13",
    note: "signed repository built on the openSUSE Build Service. ubuntu 26.04 and fedora 44 repos are in the download guide.",
    commands: [
      "echo 'deb https://download.opensuse.org/repositories/home:/1nfys/Debian_13/ /' | sudo tee /etc/apt/sources.list.d/atlifm.list",
      "curl -fsSL https://download.opensuse.org/repositories/home:/1nfys/Debian_13/Release.key | gpg --dearmor | sudo tee /etc/apt/trusted.gpg.d/atlifm.gpg > /dev/null",
      "sudo apt update && sudo apt install atlifm",
    ],
    download: {
      label: "obs project",
      href: "https://build.opensuse.org/package/show/home:1nfys/atlifm",
    },
  },
  alpine: {
    label: "alpine",
    channel: "apk",
    note: "x86_64 package, aarch64 is attached to the same release.",
    commands: ["sudo apk add --allow-untrusted ./atlifm-1.0.0-r0-x86_64.apk"],
    download: {
      label: ".apk",
      href: `${RELEASES_URL}/download/atlifm-1.0.0-r0-x86_64.apk`,
    },
  },
  appimage: {
    label: "appimage",
    channel: "portable",
    note: "self-contained bundle, no installation into the system.",
    commands: ["chmod +x atlifm-1.0.0-x86_64.AppImage", "./atlifm-1.0.0-x86_64.AppImage"],
    download: {
      label: "appimage",
      href: `${RELEASES_URL}/download/atlifm-1.0.0-x86_64.AppImage`,
    },
  },
  source: {
    label: "source",
    channel: "cmake",
    note: "requires a C++23 compiler and Qt 6.5 or newer.",
    commands: [
      "git clone https://github.com/1nfys/atlifm.git",
      "cmake -B atlifm/build -G Ninja -DCMAKE_BUILD_TYPE=Release",
      "ninja -C atlifm/build",
      "cmake --install atlifm/build --prefix ~/.local",
    ],
    download: { label: "tarball", href: RELEASE_URL },
  },
} as const;

type InstallMethod = keyof typeof installs;

const rail = [
  { href: "#overview", label: "overview" },
  { href: "#features", label: "features" },
  { href: "#plugins", label: "plugins" },
  { href: "#portal", label: "file chooser portal" },
  { href: "#downloads", label: "downloads" },
];

export default function Landing() {
  const [method, setMethod] = useState<InstallMethod>("arch");
  const [activeSection, setActiveSection] = useState("overview");
  const install = installs[method];

  useEffect(() => {
    const onScroll = () => {
      let current = "overview";
      for (const item of rail) {
        const element = document.getElementById(item.href.slice(1));
        if (element && element.getBoundingClientRect().top <= 120) current = item.href.slice(1);
      }
      setActiveSection(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="home">
      <aside className="home-rail">
        <div className="rail-head">places</div>
        {rail.map((item) => (
          <a
            key={item.href}
            className={`rail-item${activeSection === item.href.slice(1) ? " active" : ""}`}
            href={item.href}
          >
            <span className="rail-mark" />
            {item.label}
          </a>
        ))}

        <div className="rail-head rail-head-spaced">release</div>
        <a className="rail-item" href={RELEASES_URL} target="_blank" rel="noreferrer">
          <span className="rail-mark" />
          v1.0.0
          <span className="rail-meta">↗</span>
        </a>
        <a className="rail-item" href={REPO_URL} target="_blank" rel="noreferrer">
          <span className="rail-mark" />
          source
          <span className="rail-meta">↗</span>
        </a>

        <div className="rail-head rail-head-spaced">docs</div>
        <Link className="rail-item" to="/docs/welcome">
          <span className="rail-mark" />
          welcome
        </Link>
        <Link className="rail-item" to="/docs/downloads">
          <span className="rail-mark" />
          download guide
        </Link>
        <Link className="rail-item" to="/docs/user-guide">
          <span className="rail-mark" />
          user guide
        </Link>
      </aside>

      <div className="home-main">
        <section className="hero" id="overview">
          <div className="hero-meta">
            <span className="chip chip-accent">v1.0.0</span>
            <span className="chip">linux</span>
            <span className="chip">wayland · x11</span>
            <span className="chip">c++23 · qt6</span>
            <span className="chip">mit</span>
          </div>
          <h1 className="hero-title">
            atlifm<span className="hero-cursor">_</span>
          </h1>
          <p className="hero-sub">
            terminal style file manager with human friendly features. Miller columns, tabs, interactive archives, drag
            and drop to any app and a built-in XDG desktop portal.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href={RELEASES_URL} target="_blank" rel="noreferrer">
              download v1.0.0
            </a>
            <Link className="btn" to="/docs/welcome">
              documentation
            </Link>
            <a className="btn btn-ghost" href={REPO_URL} target="_blank" rel="noreferrer">
              github ↗
            </a>
          </div>
          <div className="hero-facts">
            <div>
              <span className="fact-key">platform</span>
              <span className="fact-value">x86_64 · aarch64</span>
            </div>
            <div>
              <span className="fact-key">packages</span>
              <span className="fact-value">deb · rpm · pkg.tar.zst · apk · appimage</span>
            </div>
            <div>
              <span className="fact-key">license</span>
              <span className="fact-value">MIT</span>
            </div>
          </div>

          <figure className="shot-figure hero-shot">
            <img src={mainShot} alt="atlifm main window with miller columns, tabs and preview" />
            <figcaption>
              <span>main window</span>
            </figcaption>
          </figure>
        </section>

        <section className="section" id="features">
          <div className="section-head">
            <span className="section-num">01</span>
            <h2 className="section-title">features</h2>
            <span className="section-note">12 core capabilities</span>
          </div>
          <div className="file-panel">
            <div className="file-head">
              <span />
              <span>name</span>
              <span>description</span>
              <span className="file-kind">kind</span>
            </div>
            {features.map((feature, index) => (
              <article className="file-row" key={feature.title}>
                <span className="file-index">{String(index + 1).padStart(2, "0")}</span>
                <span className="file-name">{feature.title}</span>
                <span className="file-desc">{feature.text}</span>
                <span className="file-kind">{feature.kind}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="plugins">
          <div className="section-head">
            <span className="section-num">02</span>
            <h2 className="section-title">plugins</h2>
            <span className="section-note">~/.config/atlifm/plugins/</span>
          </div>
          <div className="split panel-split">
            <div className="split-text">
              <p>
                atlifm is extended from <span className="accent">~/.config/atlifm/plugins/</span>. a plain{" "}
                <span className="accent">.conf</span> file registers a menu command, executable scripts are picked up
                automatically, and native <span className="accent">.so</span> libraries run in-process through a stable
                C ABI.
              </p>
              <ul className="ticks">
                <li>custom actions bindable in keybinds.conf and shown in the F1 cheat sheet</li>
                <li>override nearly every built-in operation, except sudo and polkit flows</li>
                <li>preview plugins replace the preview pane for matching file types</li>
                <li>event hooks fire on start, on navigate and on selection changes</li>
              </ul>
              <div className="hero-actions">
                <Link className="btn" to="/docs/plugin-developer-guide">
                  plugin developer guide
                </Link>
              </div>
            </div>
            <div className="split-code">
              <div className="code-panel">
                <div className="code-head">plugins/example.conf</div>
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
              </div>
              <div className="code-panel">
                <div className="code-head">native plugin</div>
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
          </div>
        </section>

        <section className="section" id="portal">
          <div className="section-head">
            <span className="section-num">03</span>
            <h2 className="section-title">file chooser portal</h2>
            <span className="section-note">xdg desktop portal</span>
          </div>
          <div className="split panel-split portal-split">
            <div className="split-text">
              <p>
                atlifm can serve as the system file chooser through the XDG desktop portal: browsers and desktop apps
                get its dialogs for open and save, with the same bookmarks, columns and keyboard as the main window.
              </p>
              <ul className="ticks">
                <li>native portal backend with open file and save file sessions</li>
                <li>breadcrumb navigation, hidden files toggle and filters</li>
                <li>enable once with atlifm --setup-portal</li>
              </ul>
            </div>
            <figure className="shot-figure">
              <img src={chooserShot} alt="atlifm xdg portal file chooser dialog" />
              <figcaption>
                <span>file chooser</span>
                <span className="caption-meta">xdg portal backend</span>
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="section" id="downloads">
          <div className="section-head">
            <span className="section-num">04</span>
            <h2 className="section-title">downloads</h2>
            <Link className="section-link" to="/docs/downloads">
              all artifacts →
            </Link>
          </div>
          <div className="install">
            <div className="install-nav">
              <div className="install-nav-head">install method</div>
              {(Object.keys(installs) as InstallMethod[]).map((key) => (
                <button
                  key={key}
                  className={`install-tab${method === key ? " active" : ""}`}
                  onClick={() => setMethod(key)}
                >
                  <span>{installs[key].label}</span>
                  <span className="install-channel">{installs[key].channel}</span>
                </button>
              ))}
            </div>
            <div className="install-body">
              <div className="install-top">
                <div>
                  <div className="install-title">{install.label}</div>
                  <p className="install-note">{install.note}</p>
                </div>
                <a className="btn btn-small" href={install.download.href} target="_blank" rel="noreferrer">
                  download {install.download.label} ↗
                </a>
              </div>
              <pre className="codeblock install-code">
                <code>{install.commands.join("\n")}</code>
              </pre>
              <div className="install-foot">
                <span>x86_64 + aarch64</span>
                <span className="sep">|</span>
                <span>debian 13+ · ubuntu 26.04+ · fedora 43-45 · alpine 3.22+</span>
                <span className="footer-spacer" />
                <a href={RELEASES_URL} target="_blank" rel="noreferrer">
                  releases ↗
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
