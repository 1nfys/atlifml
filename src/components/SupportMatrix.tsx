const supported = [
  { name: "Arch Linux", versions: "rolling", channel: "pacman, pkgbuild" },
  { name: "Manjaro", versions: "rolling", channel: "pacman" },
  { name: "Debian", versions: "13 (trixie) and newer", channel: "deb, obs" },
  { name: "Ubuntu", versions: "26.04 LTS and newer", channel: "ppa, obs, deb" },
  { name: "Fedora", versions: "43 to 45", channel: "copr, obs, rpm" },
  { name: "openSUSE", versions: "Tumbleweed (rolling)", channel: "zypper, obs, rpm" },
  { name: "RHEL / CentOS Stream", versions: "10 (EPEL 10)", channel: "copr" },
  { name: "Alpine Linux", versions: "3.22 and newer", channel: "apk" },
  { name: "Any glibc distribution", versions: "glibc 2.38 and newer", channel: "appimage" },
];

const legacy = [
  { name: "Debian 12 and older", versions: "Qt older than 6.5", channel: "source (qt 6.5+)" },
  { name: "Ubuntu 24.04", versions: "Qt 6.4", channel: "appimage, source" },
  { name: "Fedora 42 and older", versions: "not built", channel: "appimage, source" },
  { name: "Alpine 3.21 and older", versions: "not built", channel: "source (musl)" },
];

export default function SupportMatrix() {
  return (
    <div className="support-wrap">
      <table className="support-table">
        <thead>
          <tr>
            <th>distribution</th>
            <th>supported releases</th>
            <th>channel</th>
          </tr>
        </thead>
        <tbody>
          <tr className="support-group-row">
            <td colSpan={3}>prebuilt packages</td>
          </tr>
          {supported.map((row) => (
            <tr key={row.name}>
              <td className="support-name">{row.name}</td>
              <td>{row.versions}</td>
              <td className="support-channel">{row.channel}</td>
            </tr>
          ))}
          <tr className="support-group-row">
            <td colSpan={3}>older releases</td>
          </tr>
          {legacy.map((row) => (
            <tr key={row.name}>
              <td className="support-name">{row.name}</td>
              <td>{row.versions}</td>
              <td className="support-channel">{row.channel}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="support-foot">
        Rows in the first table are supported by a prebuilt package. Rows in the second table work through the AppImage
        or a source build.
      </p>
    </div>
  );
}
