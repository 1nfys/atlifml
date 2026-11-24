import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import mainShot from "../assets/main-window.png";
import chooserShot from "../assets/file-chooser.png";
import LogoDots from "../components/LogoDots";
import { REPO_URL } from "../docs";

const RELEASES_URL = "https://github.com/1nfys/atlifm/releases/latest";
const RELEASE_URL = "https://github.com/1nfys/atlifm/releases/tag/v1.0.5";

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
    text: "drag files out to Telegram, Discord, Chromium, GIMP or terminal windows and back. alt-drag opens copy, move and symlink.",
  },
  {
    title: "tabs with history",
    text: "every tab keeps its own forward and backward navigation history. tabs shrink, scroll and can be pinned.",
  },
  {
    title: "multi-engine preview",
    text: "image and SVG zoom/pan, syntax highlighted code, directory tree, 16-byte hex dump, video thumbnails and scrollable PDF pages.",
  },
  {
    title: "search & quick jumps",
    text: "fd name search, rg content search, fuzzy current-folder palette and zoxide directory jumps with native fallback.",
  },
  {
    title: "network places",
    text: "sftp, smb, ftp, ftps, bare IP and Windows UNC shares with an in-window connection form, libsecret passwords and managed SSH keys.",
  },
  {
    title: "interactive archives",
    text: "browse zip, tar.gz, 7z and rar in the preview pane, rubberband box select entries, drag out to any app without full extraction.",
  },
  {
    title: "bulk operations",
    text: "F2 opens the live bulk rename overlay, Ctrl+Shift+A creates files/folders in batch, with trash management and permanent deletion.",
  },
  {
    title: "properties & disk usage",
    text: "Alt+Enter opens a compact inspector with permissions. drive roots get a disk usage console with progress bars.",
  },
  {
    title: "background tasks",
    text: "copy, move, delete and archives run in the background with transfer speed, ETA and logs. Alt+W opens the tasks overlay.",
  },
  {
    title: "xdg desktop portal",
    text: "set atlifm as the system file picker so browsers and desktop apps use its dialogs for open and save.",
  },
  {
    title: "full undo / redo",
    text: "Ctrl+Z and Ctrl+Y for move, copy and delete. pressing Ctrl+Z during a running copy cancels it with rollback.",
  },
  {
    title: "extensible plugins",
    text: "custom actions, overrides, previews, hooks, shell scripts and native C++ plugins through a stable C ABI.",
  },
  {
    title: "cheat sheet",
    text: "F1 opens the keyboard overlay. click a key and press a new combination: bindings apply live and persist.",
  },
  {
    title: "layout persistence",
    text: "Ctrl+Shift+S persists column widths, panel toggles and window size to layout.ini. Tiling WMs keep their tile geometry.",
  },
  {
    title: "strict visual style",
    text: "flat zero-radius panels, monospace JetBrains Mono and a fully recolorable palette through theme.conf.",
  },
];

const installs = {
  arch: {
    label: "arch linux",
    channel: "pacman",
    note: "x86_64 package from the release page. for other architectures build the PKGBUILD.",
    commands: ["sudo pacman -U atlifm-1.0.5-1-x86_64.pkg.tar.zst"],
    download: {
      label: "pkg.tar.zst",
      href: `${RELEASES_URL}/download/atlifm-1.0.5-1-x86_64.pkg.tar.zst`,
    },
  },
  fedora: {
    label: "fedora / rhel",
    channel: "copr",
    note: "the copr repository builds for fedora and epel chroots.",
    commands: ["sudo dnf copr enable 1nfys/atlifm", "sudo dnf install atlifm"],
    download: {
      label: "rpm",
      href: `${RELEASES_URL}/download/atlifm-1.0.5-1.fc44.x86_64.rpm`,
    },
  },
  opensuse: {
    label: "opensuse",
    channel: "zypper",
    note: "signed obs repository for openSUSE Tumbleweed, x86_64 and aarch64. zypper resolves the qt6 dependencies.",
    commands: [
      "sudo zypper addrepo https://download.opensuse.org/repositories/home:/1nfys/openSUSE_Tumbleweed/home:1nfys.repo",
      "sudo zypper install atlifm",
    ],
    download: {
      label: "obs repo",
      href: "https://download.opensuse.org/repositories/home:/1nfys/openSUSE_Tumbleweed/",
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
      href: `${RELEASES_URL}/download/atlifm_1.0.5-1_amd64.deb`,
    },
  },
  debian: {
    label: "debian",
    channel: "apt",
    note: "standalone package, x86_64 shown. an arm64 build is available on the release page.",
    commands: ["sudo apt install ./atlifm_1.0.5-1_amd64.deb"],
    download: {
      label: ".deb",
      href: `${RELEASES_URL}/download/atlifm_1.0.5-1_amd64.deb`,
    },
  },
  obs: {
    label: "obs repository",
    channel: "debian 13",
    note: "signed repositories built on the openSUSE Build Service for Debian, Ubuntu, Fedora and openSUSE Tumbleweed. see the download guide for every repo url.",
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
    commands: ["sudo apk add --allow-untrusted ./atlifm-1.0.5-r0-x86_64.apk"],
    download: {
      label: ".apk",
      href: `${RELEASES_URL}/download/atlifm-1.0.5-r0-x86_64.apk`,
    },
  },
  appimage: {
    label: "appimage",
    channel: "portable",
    note: "self-contained bundle, no installation into the system.",
    commands: ["chmod +x atlifm-1.0.5-x86_64.AppImage", "./atlifm-1.0.5-x86_64.AppImage"],
    download: {
      label: "appimage",
      href: `${RELEASES_URL}/download/atlifm-1.0.5-x86_64.AppImage`,
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
        <nav className="rail-group">
          <div className="rail-head">on this page</div>
          {rail.map((item) => (
            <a
              key={item.href}
              className={`rail-item${activeSection === item.href.slice(1) ? " active" : ""}`}
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <nav className="rail-group">
          <div className="rail-head">elsewhere</div>
          <a className="rail-item" href={RELEASES_URL} target="_blank" rel="noreferrer">
            release v1.0.5
          </a>
          <a className="rail-item" href={REPO_URL} target="_blank" rel="noreferrer">
            github repository
          </a>
          <Link className="rail-item" to="/docs/welcome">
            welcome guide
          </Link>
          <Link className="rail-item" to="/docs/downloads">
            download guide
          </Link>
          <Link className="rail-item" to="/docs/user-guide">
            user guide
          </Link>
        </nav>
      </aside>

      <div className="home-main">
        <section className="hero" id="overview">
          <div className="hero-split">
            <div className="hero-content">
              <h1 className="hero-title">
                atlifm<span className="hero-cursor">_</span>
              </h1>
              <p className="hero-sub">
                a terminal style file manager for Linux with human friendly features: Miller columns, tabs, interactive
                archives, drag and drop to any app and a built-in XDG desktop portal.
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href={RELEASES_URL} target="_blank" rel="noreferrer">
                  download v1.0.5
                </a>
                <Link className="text-link" to="/docs/welcome">
                  read the documentation
                </Link>
                <a className="text-link" href={REPO_URL} target="_blank" rel="noreferrer">
                  source on github
                </a>
              </div>
              <p className="hero-note">
                Builds for x86_64 and aarch64 as deb, rpm, pkg.tar.zst, apk and AppImage. Released under the MIT
                license.
              </p>
            </div>

            <div className="hero-visual">
              <LogoDots />
            </div>
          </div>

          <figure className="shot-figure hero-shot">
            <img src={mainShot} alt="atlifm main window with miller columns, tabs and preview" />
            <figcaption>main window with miller columns, tabs and multi-engine preview, version 1.0.5</figcaption>
          </figure>
        </section>

        <section className="section" id="features">
          <h2 className="section-title">features</h2>
          <div className="feature-list">
            {features.map((feature) => (
              <div className="feature-row" key={feature.title}>
                <h3 className="feature-name">{feature.title}</h3>
                <p className="feature-text">{feature.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section" id="plugins">
          <h2 className="section-title">plugins</h2>
          <div className="split">
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
                <Link className="text-link" to="/docs/plugin-developer-guide">
                  read the plugin developer guide
                </Link>
              </div>
            </div>
            <div className="split-code">
              <div>
                <div className="code-label">plugins/example.conf</div>
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
              <div>
                <div className="code-label">native plugin</div>
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
          <h2 className="section-title">file chooser portal</h2>
          <div className="split portal-split">
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
              <figcaption>file chooser portal dialog with instant preview and keyboard filter</figcaption>
            </figure>
          </div>
        </section>

        <section className="section" id="downloads">
          <div className="section-head">
            <h2 className="section-title">downloads</h2>
            <Link className="section-link" to="/docs/downloads">
              every artifact and repository url
            </Link>
          </div>
          <div className="install">
            <div className="install-nav">
              {(Object.keys(installs) as InstallMethod[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  aria-pressed={method === key}
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
                  <h3 className="install-title">{install.label}</h3>
                  <p className="install-note">{install.note}</p>
                </div>
                <a className="btn btn-small" href={install.download.href} target="_blank" rel="noreferrer">
                  download {install.download.label}
                </a>
              </div>
              <pre className="codeblock install-code">
                <code>{install.commands.join("\n")}</code>
              </pre>
              <p className="install-foot">
                Packages cover x86_64 and aarch64 for Debian 13 and newer, Ubuntu 26.04 and newer, Fedora 43 to 45,
                openSUSE Tumbleweed and Alpine 3.22 and newer. Older systems can use the AppImage or build from source.
              </p>
              <a className="text-link install-foot-link" href={RELEASES_URL} target="_blank" rel="noreferrer">
                open the release page
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
