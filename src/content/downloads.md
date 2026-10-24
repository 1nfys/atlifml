# Downloads

atlifm **1.0.2** is available as prebuilt packages for Linux on **x86_64** and **aarch64**, as a self-contained appimage, and as source.

Every artifact is attached to the [GitHub release](https://github.com/1nfys/atlifm/releases/latest). Binary packages use the qt 6 libraries provided by your distribution; the appimage bundles qt and runs on distributions with glibc 2.38 or newer.

atlifm is also published through [Fedora copr](https://copr.fedorainfracloud.org/coprs/1nfys/atlifm/), the [Ubuntu ppa](https://launchpad.net/~1nfys/+archive/ubuntu/atlifm) and the [openSUSE Build Service](https://build.opensuse.org/package/show/home:1nfys/atlifm), which carries a zypper repository for openSUSE Tumbleweed and repositories for Debian, Ubuntu and Fedora.

***

## Packaging Status

<!-- support-matrix -->

The table lists the release range covered by prebuilt packages. Older distributions ship qt older than 6.5, so the appimage (glibc 2.38+) or a source build with qt 6.5+ is the supported path there.

***

## Release Artifacts

| System | Package | Architectures |
| :--- | :--- | :--- |
| Arch Linux / Manjaro | `atlifm-1.0.2-1-x86_64.pkg.tar.zst` | x86_64 |
| Debian / Ubuntu | `atlifm_1.0.2-1_amd64.deb`, `atlifm_1.0.2-1_arm64.deb` | x86_64, aarch64 |
| Fedora / rhel | `atlifm-1.0.2-1.fc44.x86_64.rpm`, `atlifm-1.0.2-1.fc44.aarch64.rpm` | x86_64, aarch64 |
| Alpine Linux | `atlifm-1.0.2-r0-x86_64.apk`, `atlifm-1.0.2-r0-aarch64.apk` | x86_64, aarch64 |
| Any glibc 2.38+ distribution | `atlifm-1.0.2-x86_64.appimage`, `atlifm-1.0.2-aarch64.appimage` | x86_64, aarch64 |
| obs repository | openSUSE Tumbleweed, Debian 13, Ubuntu 26.04, Fedora 43 / 44 | x86_64, aarch64 |
| Source | `atlifm-1.0.2.tar.gz`, `atlifm_1.0.2.orig.tar.gz` | all |

The release page also contains debug symbols, the Debian source package (`.dsc`, `.debian.tar.xz`) and the rpm source package (`.src.rpm`).

***

## Arch Linux / Manjaro

Download the pacman package from the [release page](https://github.com/1nfys/atlifm/releases/latest), then install it:

```bash
sudo pacman -U atlifm-1.0.2-1-x86_64.pkg.tar.zst
```

To build the package locally from this repository:

```bash
sh packaging/scripts/make-src-tarball.sh . packaging/arch
cd packaging/arch
makepkg -si
```

The pkgbuild is aur-ready, but atlifm is not currently published in the aur.

***

## Debian / Ubuntu

Ubuntu users can install from the ppa:

```bash
sudo add-apt-repository ppa:1nfys/atlifm
sudo apt update
sudo apt install atlifm
```

On Debian, Ubuntu and their derivatives, install the `.deb` from the release page directly:

```bash
sudo apt install ./atlifm_1.0.2-1_amd64.deb     # x86_64
sudo apt install ./atlifm_1.0.2-1_arm64.deb     # aarch64
```

`apt` resolves the qt 6 runtime dependencies automatically. If your distribution ships qt older than 6.5, use the appimage instead.

***

## Fedora / rhel

The package is published in copr for Fedora 43-45 and epel 10:

```bash
sudo dnf copr enable 1nfys/atlifm
sudo dnf install atlifm
```

On rhel 10 / CentOS Stream 10, enable epel first:

```bash
sudo dnf install epel-release
sudo dnf copr enable 1nfys/atlifm
sudo dnf install atlifm
```

Alternatively, install the rpm from the release page:

```bash
sudo dnf install ./atlifm-1.0.2-1.fc44.x86_64.rpm     # x86_64
sudo dnf install ./atlifm-1.0.2-1.fc44.aarch64.rpm    # aarch64
```

***

## openSUSE Build Service

The [obs project](https://build.opensuse.org/package/show/home:1nfys/atlifm) publishes signed repositories for openSUSE Tumbleweed, Debian 13, Ubuntu 26.04 and Fedora 43/44. Installing from a repository gives you updates through the normal package manager.

### openSUSE Tumbleweed

```bash
sudo zypper addrepo https://download.opensuse.org/repositories/home:/1nfys/openSUSE_Tumbleweed/home:1nfys.repo
sudo zypper refresh
sudo zypper install atlifm
```

### debian 13

```bash
sudo apt install -y curl gnupg
sudo install -d -m 0755 /etc/apt/keyrings
curl -fsSL https://download.opensuse.org/repositories/home:/1nfys/Debian_13/Release.key \
  | gpg --dearmor | sudo tee /etc/apt/keyrings/home_1nfys.gpg > /dev/null
echo 'deb [signed-by=/etc/apt/keyrings/home_1nfys.gpg] https://download.opensuse.org/repositories/home:/1nfys/Debian_13/ /' \
  | sudo tee /etc/apt/sources.list.d/atlifm.list
sudo apt update && sudo apt install atlifm
```

if debian asks to add the openpgp key (`caec40f2bd9e9e1edb00d7caa31425f3388313de`) or reports missing public key, the command above imports the obs key into `/etc/apt/keyrings/home_1nfys.gpg` and attaches it via `signed-by`

### ubuntu 26.04

```bash
sudo install -d -m 0755 /etc/apt/keyrings
curl -fsSL https://download.opensuse.org/repositories/home:/1nfys/xUbuntu_26.04/Release.key \
  | gpg --dearmor | sudo tee /etc/apt/keyrings/home_1nfys.gpg > /dev/null
echo 'deb [signed-by=/etc/apt/keyrings/home_1nfys.gpg] https://download.opensuse.org/repositories/home:/1nfys/xUbuntu_26.04/ /' \
  | sudo tee /etc/apt/sources.list.d/atlifm.list
sudo apt update && sudo apt install atlifm
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
sudo apk add --allow-untrusted ./atlifm-1.0.2-r0-x86_64.apk     # x86_64
sudo apk add --allow-untrusted ./atlifm-1.0.2-r0-aarch64.apk    # aarch64
```

For a repository build, copy `packaging/alpine/` into your aports clone and run `abuild checksum && abuild -r`.

***

## appimage

The appimage is a single self-contained file and does not install anything into the system. It requires glibc 2.38 or newer:

```bash
chmod +x atlifm-1.0.2-x86_64.appimage
./atlifm-1.0.2-x86_64.appimage
```

If fuse is unavailable, run it with `--appimage-extract-and-run`. To integrate it with the desktop, move the file to a permanent location and create a launcher for it, or use an appimage manager such as Gearlever.

***

## Build From Source

A C++23 compiler (gcc 13+ or clang 16+) and qt 6.5+ are required. Install the dependencies for your distribution:

```bash
# Arch Linux / Manjaro
sudo pacman -S base-devel gcc cmake ninja qt6-base qt6-svg

# Fedora / rhel
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

Make sure `~/.local/bin` is in `path`. The installed binary can also serve as the xdg portal backend; see the [User Guide](/docs/user-guide#6-xdg-desktop-portal-setup).

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
