const supported = [
  { name: "Arch Linux", versions: "rolling", channel: "pacman · pkgbuild" },
  { name: "Manjaro", versions: "rolling", channel: "pacman" },
  { name: "Debian", versions: "13 (trixie) +", channel: "deb · obs" },
  { name: "Ubuntu", versions: "26.04 LTS +", channel: "ppa · obs · deb" },
  { name: "Fedora", versions: "43 - 45", channel: "copr · obs · rpm" },
  { name: "RHEL / CentOS Stream", versions: "10 (EPEL 10)", channel: "copr" },
  { name: "Alpine Linux", versions: "3.22 +", channel: "apk" },
  { name: "Any glibc distribution", versions: "glibc 2.38+", channel: "appimage" },
];

const legacy = [
  { name: "Debian 12 and older", versions: "Qt < 6.5", channel: "source (qt 6.5+)" },
  { name: "Ubuntu 24.04", versions: "Qt 6.4", channel: "appimage · source" },
  { name: "Fedora 42 and older", versions: "not built", channel: "appimage · source" },
  { name: "Alpine 3.21 and older", versions: "not built", channel: "source (musl)" },
];

export default function SupportMatrix() {
  return (
    <div className="support-wrap">
      <div className="support-panel">
        <div className="support-head">
          <span>distribution</span>
          <span>supported releases</span>
          <span className="support-channel">channel</span>
        </div>

        <div className="support-group">prebuilt packages</div>
        {supported.map((row) => (
          <div className="support-row" key={row.name}>
            <span className="support-name">{row.name}</span>
            <div className="support-track">
              <div className="support-fill supported">
                <span>{row.versions}</span>
              </div>
            </div>
            <span className="support-channel">{row.channel}</span>
          </div>
        ))}

        <div className="support-group">older releases</div>
        {legacy.map((row) => (
          <div className="support-row" key={row.name}>
            <span className="support-name">{row.name}</span>
            <div className="support-track">
              <div className="support-fill legacy">
                <span>{row.versions}</span>
              </div>
            </div>
            <span className="support-channel">{row.channel}</span>
          </div>
        ))}

        <div className="support-foot">
          <span className="support-key supported" />
          <span>supported by a prebuilt package</span>
          <span className="support-key legacy" />
          <span>use the AppImage or build from source</span>
          <span className="footer-spacer" />
          <span>atlifm 1.0.0</span>
        </div>
      </div>
    </div>
  );
}
