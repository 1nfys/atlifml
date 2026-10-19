# Downloads

atlifm **1.0.0** is available as prebuilt packages for Linux on **x86_64** and **aarch64**, as a self-contained AppImage, and as source.

Every artifact is attached to the [GitHub release](https://github.com/1nfys/atlifm/releases/latest). Binary packages use the Qt 6 libraries provided by your distribution; the AppImage bundles Qt and runs on distributions with glibc 2.38 or newer.

atlifm is also published through [Fedora COPR](https://copr.fedorainfracloud.org/coprs/1nfys/atlifm/), the [Ubuntu PPA](https://launchpad.net/~1nfys/+archive/ubuntu/atlifm) and the [openSUSE Build Service](https://build.opensuse.org/package/show/home:1nfys/atlifm), which carries a zypper repository for openSUSE Tumbleweed and repositories for Debian, Ubuntu and Fedora.

***

## Packaging Status

<!-- support-matrix -->

The table lists the release range covered by prebuilt packages. Older distributions ship Qt older than 6.5, so the AppImage (glibc 2.38+) or a source build with Qt 6.5+ is the supported path there.

***

## Release Artifacts

| System | Package | Architectures |
| ------ | ------- | ------------- |
| Arch Linux / Manjaro | `atlifm-1.0.0-1-x86_64.pkg.tar.zst` | x86_64 |
| Debian / Ubuntu | `atlifm_1.0.0-1_amd64.deb`, `atlifm_1.0.0-1_arm64.deb` | x86_64, aarch64 |
| Fedora / RHEL | `atlifm-1.0.0-1.fc44.x86_64.rpm`, `atlifm-1.0.0-1.fc44.aarch64.rpm` | x86_64, aarch64 |
| Alpine Linux | `atlifm-1.0.0-r0-x86_64.apk`, `atlifm-1.0.0-r0-aarch64.apk` | x86_64, aarch64 |
| Any glibc 2.38+ distribution | `atlifm-1.0.0-x86_64.AppImage`, `atlifm-1.0.0-aarch64.AppImage` | x86_64, aarch64 |
| OBS repository | openSUSE Tumbleweed, Debian 13, Ubuntu 26.04, Fedora 43 / 44 | x86_64, aarch64 |
| Source | `atlifm-1.0.0-fixed.tar.gz`, `atlifm_1.0.0.orig.tar.gz` | all |

The release page also contains debug symbols, the Debian source package (`.dsc`, `.debian.tar.xz`) and the RPM source package (`.src.rpm`).

***

## Arch Linux / Manjaro

Download the pacman package from the [release page](https://github.com/1nfys/atlifm/releases/latest), then install it:

```bash
sudo pacman -U atlifm-1.0.0-1-x86_64.pkg.tar.zst
```

To build the package locally from this repository:

```bash
sh packaging/scripts/make-src-tarball.sh . packaging/arch
cd packaging/arch
makepkg -si
```

The PKGBUILD is AUR-ready, but atlifm is not currently published in the AUR.

***

## Debian / Ubuntu

Ubuntu users can install from the PPA:

```bash
sudo add-apt-repository ppa:1nfys/atlifm
sudo apt update
sudo apt install atlifm
```

On Debian, Ubuntu and their derivatives, install the `.deb` from the release page directly:

```bash
sudo apt install ./atlifm_1.0.0-1_amd64.deb     # x86_64
sudo apt install ./atlifm_1.0.0-1_arm64.deb     # aarch64
```

`apt` resolves the Qt 6 runtime dependencies automatically. If your distribution ships Qt older than 6.5, use the AppImage instead.

***

## Fedora / RHEL

The package is published in COPR for Fedora 43-45 and EPEL 10:

```bash
sudo dnf copr enable 1nfys/atlifm
sudo dnf install atlifm
```

On RHEL 10 / CentOS Stream 10, enable EPEL first:

```bash
sudo dnf install epel-release
sudo dnf copr enable 1nfys/atlifm
sudo dnf install atlifm
```

Alternatively, install the RPM from the release page:

```bash
sudo dnf install ./atlifm-1.0.0-1.fc44.x86_64.rpm     # x86_64
sudo dnf install ./atlifm-1.0.0-1.fc44.aarch64.rpm    # aarch64
```

***

## openSUSE Build Service

The [OBS project](https://build.opensuse.org/package/show/home:1nfys/atlifm) publishes signed repositories for openSUSE Tumbleweed, Debian 13, Ubuntu 26.04 and Fedora 43/44. Installing from a repository gives you updates through the normal package manager.

### openSUSE Tumbleweed

```bash
sudo zypper addrepo https://download.opensuse.org/repositories/home:/1nfys/openSUSE_Tumbleweed/home:1nfys.repo
sudo zypper refresh
sudo zypper install atlifm
```

### Debian 13

```bash
echo 'deb https://download.opensuse.org/repositories/home:/1nfys/Debian_13/ /' \
  | sudo tee /etc/apt/sources.list.d/atlifm.list
curl -fsSL https://download.opensuse.org/repositories/home:/1nfys/Debian_13/Release.key \
  | gpg --dearmor | sudo tee /etc/apt/trusted.gpg.d/atlifm.gpg > /dev/null
sudo apt update
sudo apt install atlifm
```

### Ubuntu 26.04

```bash
echo 'deb https://download.opensuse.org/repositories/home:/1nfys/xUbuntu_26.04/ /' \
  | sudo tee /etc/apt/sources.list.d/atlifm.list
curl -fsSL https://download.opensuse.org/repositories/home:/1nfys/xUbuntu_26.04/Release.key \
  | gpg --dearmor | sudo tee /etc/apt/trusted.gpg.d/atlifm.gpg > /dev/null
sudo apt update
sudo apt install atlifm
```

### Fedora 44

```bash
sudo dnf config-manager addrepo \
  --from-repofile=https://download.opensuse.org/repositories/home:/1nfys/Fedora_44/home:1nfys.repo
sudo dnf install atlifm
```

***

## Alpine Linux

```bash
sudo apk add --allow-untrusted ./atlifm-1.0.0-r0-x86_64.apk     # x86_64
sudo apk add --allow-untrusted ./atlifm-1.0.0-r0-aarch64.apk    # aarch64
```

For a repository build, copy `packaging/alpine/` into your aports clone and run `abuild checksum && abuild -r`.

***

## AppImage

The AppImage is a single self-contained file and does not install anything into the system. It requires glibc 2.38 or newer:

```bash
chmod +x atlifm-1.0.0-x86_64.AppImage
./atlifm-1.0.0-x86_64.AppImage
```

If FUSE is unavailable, run it with `--appimage-extract-and-run`. To integrate it with the desktop, move the file to a permanent location and create a launcher for it, or use an AppImage manager such as Gearlever.

***

## Build From Source

A C++23 compiler (GCC 13+ or Clang 16+) and Qt 6.5+ are required. Install the dependencies for your distribution:

```bash
# Arch Linux / Manjaro
sudo pacman -S base-devel gcc cmake ninja qt6-base qt6-svg

# Fedora / RHEL
sudo dnf install gcc-c++ cmake ninja-build qt6-qtbase-devel qt6-qtsvg-devel

# openSUSE Tumbleweed
sudo zypper install gcc-c++ cmake ninja qt6-base-devel qt6-svg-devel

# Debian / Ubuntu
sudo apt install build-essential cmake ninja-build qt6-base-dev qt6-base-private-dev libqt6svg6-dev
```

Then clone and build:

```bash
git clone https://github.com/1nfys/atlifm.git
cd atlifm
cmake -B build -G Ninja -DCMAKE_BUILD_TYPE=Release
ninja -C build
cmake --install build --prefix ~/.local
update-desktop-database ~/.local/share/applications
```

Make sure `~/.local/bin` is in `PATH`. The installed binary can also serve as the XDG portal backend; see the [User Guide](/docs/user-guide#5-xdg-desktop-portal-setup).

***

## After Installation

Run atlifm from the application menu or from a terminal:

```bash
atlifm
atlifm ~/Downloads
```

To make atlifm the default file chooser for browsers and desktop applications:

```bash
atlifm --setup-portal
```

Configuration is created on first launch in `~/.config/atlifm/`. See the [Configuration Reference](/docs/configuration-reference) for the full key list and the [User Guide](/docs/user-guide) for shortcuts.
