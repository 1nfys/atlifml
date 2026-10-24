# User Guide

Comprehensive documentation for installing, configuring, and daily usage of atlifm.

***

## 1. System Requirements & Dependencies

atlifm requires a Linux distribution with qt 6.5 or newer. A monospace Nerd Font (such as JetBrainsMono Nerd Font) is recommended; if none is installed, atlifm falls back to DejaVu Sans Mono.

Prebuilt packages for Arch Linux, Debian/Ubuntu, Fedora/rhel, openSUSE Tumbleweed, Alpine, and the self-contained appimage are listed on the [Downloads](/docs/downloads) page. The dependencies below are only needed when building from source.

### Arch Linux / Manjaro

```bash
sudo pacman -S base-devel gcc cmake ninja qt6-base qt6-svg
```

### Fedora / rhel

```bash
sudo dnf install gcc-c++ cmake ninja-build qt6-qtbase-devel qt6-qtsvg-devel
```

### openSUSE Tumbleweed

```bash
sudo zypper install gcc-c++ cmake ninja qt6-base-devel qt6-svg-devel
```

### Ubuntu / Debian

```bash
sudo apt install build-essential cmake ninja-build qt6-base-dev qt6-base-private-dev libqt6svg6-dev
```

### Optional External Tools

atlifm functions fully out of the box without any external cli tools, but seamlessly detects and leverages the following optional utilities for maximum speed and rich media preview:

| Tool | Used For | Fallback When Missing |
| :--- | :--- | :--- |
| `fd` / `fdfind` | Fast file and directory name search (`Ctrl+Shift+F`) | Recursive native filesystem scan |
| `rg` (ripgrep) | Lightning-fast text search inside files (`Ctrl+Shift+D`) | `grep -E` |
| `zoxide` | Frecent directory jumping (`Ctrl+Shift+G`) | Bookmarks jump menu |
| `ffmpegthumbnailer` or `ffmpeg` | Video thumbnail extraction in the preview pane | Generic video icon |
| `poppler-utils` (`pdftoppm`, `pdfinfo`) | Multi-page pdf preview rendering | Plain file details |
| `gvfs`, `gvfs-fuse`, `gvfs-smb` | Remote shares (`sftp://`, `smb://`, `ftp://`) | Remote network connections disabled |


***

## 2. Compilation and Installation

Most users should install a prebuilt package from the [Downloads](/docs/downloads) page. To build atlifm from source, use CMake and Ninja:

```bash
git clone https://github.com/1nfys/atlifm.git
cd atlifm
cmake -B build -G Ninja -DCMAKE_BUILD_TYPE=Release
ninja -C build
```

To install atlifm into `~/.local`:

```bash
cmake --install build --prefix ~/.local
update-desktop-database ~/.local/share/applications
atlifm --setup-portal
```

The binary accepts a directory as an optional argument (`atlifm ~/Downloads`) and serves as the xdg portal backend when launched with `--portal`.

***

## 3. Keyboard Shortcuts & Action Reference

atlifm ships with **54** reboundable actions grouped into six sections. Every keybinding can be customized in `~/.config/atlifm/keybinds.conf` or directly in the interactive cheat sheet (`F1`).

### Direct Navigation & Mouse Controls

Some physical controls are handled directly by the widgets:

| Control | Action |
| --- | ------ |
| `Up` / `Down` or `k` / `j` | Move cursor up / down |
| `Enter`, double click, or `Right` | Open focused file or enter folder |
| `Left` / `Backspace` | Navigate to parent folder |
| `Space` | Toggle selection on focused item and advance cursor to next item |
| `J` / `K` | Scroll pdf pages up / down when preview pane has focus |
| Mouse wheel on tab bar | Scroll through open tabs |
| Middle click on a tab | Close that tab |
| Single click | Focus item (files open strictly on double-click) |
| `Alt` + Mouse Drag | Drop micro-menu with Copy, Move, or Symlink |

### Tabs

| Action ID | Default Keys | Description |
| :--- | :--- | :--- |
| `new_tab` | `Ctrl+T` | Open new tab in `$HOME` |
| `close_tab` | `Ctrl+W`, `Ctrl+F4` | Close active tab |
| `reopen_tab` | `Ctrl+Shift+T` | Reopen recently closed tab |
| `pin_tab` | `Ctrl+P` | Pin / unpin active tab |
| `next_tab` | `Ctrl+Tab`, `Ctrl+PgDown` | Switch to next tab |
| `prev_tab` | `Ctrl+Shift+Tab`, `Ctrl+PgUp` | Switch to previous tab |
| `tab_1` .. `tab_9` | `Ctrl+1` .. `Ctrl+9` | Switch directly to tabs 1 through 9 |
| `open_in_new_tab` | `Ctrl+Return`, `Ctrl+Enter` | Open selected folder in new tab |

### Navigation & Sorting

| Action ID | Default Keys | Description |
| :--- | :--- | :--- |
| `focus_path` | `Ctrl+L`, `Alt+D`, `F4` | Focus address / path input |
| `parent_dir` | `Alt+Up` | Navigate to parent directory |
| `go_back` | `Alt+Left` | Navigate back in history |
| `go_forward` | `Alt+Right` | Navigate forward in history |
| `go_home` | `Alt+Home` | Jump to Home directory |
| `first_item` | `Home` | Move cursor to first item in folder |
| `last_item` | `End` | Move cursor to last item in folder |
| `quick_jump` | `Alt+Space` | Open Quick Jump menu |
| `toggle_bookmarks` | `Ctrl+B`, `Ctrl+\`, `F9` | Toggle bookmarks sidebar |
| `toggle_hidden` | `Ctrl+H`, `Ctrl+.` | Show / hide hidden files and dotfiles |
| `refresh` | `Ctrl+R`, `F5` | Reload directory contents |
| `tasks` | `Alt+W` | Background tasks overlay (progress, speed, eta, logs) |
| `sort_name` | `Alt+1` | Sort items by Name |
| `sort_size` | `Alt+2` | Sort items by Size |
| `sort_date` | `Alt+3` | Sort items by Modification Date |
| `sort_type` | `Alt+4` | Sort items by File Type |

*Note on `quick_jump`: `Alt+Space` is used instead of bare `g` because typing printable characters triggers instant type-ahead filtering in the file list.*

### Layout

| Action ID | Default Keys | Description |
| :--- | :--- | :--- |
| `save_layout` | `Ctrl+Shift+S` | Save current splitter widths, panels, and window size to `layout.ini` |
| `reset_layout` | `Ctrl+Shift+R` | Delete `layout.ini` and reset layout to `theme.conf` defaults |

### File Operations

| Action ID | Default Keys | Description |
| :--- | :--- | :--- |
| `cut` | `Ctrl+X` | Cut selected items to clipboard |
| `copy` | `Ctrl+C` | Copy selected items to clipboard |
| `paste` | `Ctrl+V` | Paste clipboard contents |
| `copy_path` | `Ctrl+Shift+C` | Copy full absolute path to clipboard |
| `copy_rel_path` | `Ctrl+Alt+C` | Copy relative path to clipboard |
| `extract_here` | `Ctrl+Alt+X` | Extract archive into current folder |
| `select_all` | `Ctrl+A` | Select all items in current view |
| `undo` | `Ctrl+Z` | Undo last operation (also cancels active copy/move with rollback) |
| `redo` | `Ctrl+Y`, `Ctrl+Shift+Z` | Redo last file operation |
| `rename` | `F2` | Inline rename focused item (or Bulk Rename on multi-selection) |
| `trash` | `Del` | Move selection to FreeDesktop Trash |
| `delete_perm` | `Shift+Del` | Permanently delete selection |
| `new_folder` | `Ctrl+Shift+N` | Create new directory prompt |
| `new_file` | `Ctrl+N`, `Ctrl+Alt+N` | Create new empty file prompt |
| `create_bulk` | `Ctrl+Shift+A` | Create multiple files and folders in batch |
| `properties` | `Alt+Return`, `Alt+Enter` | Properties overlay and disk usage |

### Search & Filter

| Action ID | Default Keys | Description |
| :--- | :--- | :--- |
| `filter` | `Ctrl+F` | Open transient fuzzy filter bar |
| `cancel` | `Esc` | Clear filter / close active overlay / clear selection |

### General

| Action ID | Default Keys | Description |
| :--- | :--- | :--- |
| `help` | `F1`, `?` | Open interactive cheat sheet |
| `quit` | `Ctrl+Q` | Quit atlifm |

***

## 4. Advanced Features in Depth

### Network Places & Remote Shares

Paste a network address directly into the address bar (`Ctrl+L` or `Alt+D`) and press `Enter`. atlifm detects the scheme and opens an integrated in-window connection form instead of a detached system dialog:

| Address Format | Protocol | Default Port |
| :--- | :--- | :--- |
| `ftp://server/path` | Plain ftp | `21` |
| `ftps://server/path` | ftp over explicit tls | `21` |
| `ftpis://server/path` | ftp over implicit tls | `990` |
| `sftp://user@server/path` | sftp (ssh File Transfer Protocol) | `22` |
| `smb://server/share/path` | smb / Windows network share | `445` |
| `\\server\share\folder` | Windows-style unc path | `445` |
| `192.168.1.10` or `192.168.1.10:22` | sftp by default, protocol selectable in form | `22` |
| `user@server:2222` | sftp with custom port | `2222` |

The connection form provides input fields for protocol, host or ip, port, remote path, username, password, ssh private key path (sftp), domain (smb), anonymous/guest login, and **Remember password**. Passwords are never written to plaintext configuration files: checking **Remember password** safely saves the credential in your system keyring via `libsecret`.

For sftp connections:
* The optional **ssh key** field accepts a private key path (`~` is expanded) or opens a file picker with `...`.
* The password field becomes the key passphrase hint and can be remembered like a normal password.
* Atlifm does not duplicate private keys: it inserts a managed `Include` directive in `~/.ssh/config` and maintains per-host `IdentityFile` entries under `~/.ssh/atlifm/*.conf`.
* Remembered key paths (not passphrases or key contents) are tracked in `~/.config/atlifm/ssh_keys.ini` with owner-only (`0600`) permissions.
* The **Accept unknown ssh host key** checkbox allows trusting new host fingerprints on first connection.

Once mounted, navigation continues transparently through the gvfs fuse path under `/run/user/<uid>/gvfs/`.

*Public sftp Test Server*: Connect to `sftp://demo@test.rebex.net/` (user `demo`, password `password`, port `22`, enable **Accept unknown ssh host key**) for an instant sanity check.

### Interactive In-Place Archives

Selecting any supported archive file (`.zip`, `.tar.gz`, `.tgz`, `.tar.bz2`, `.tar.xz`, `.7z`, `.rar`) immediately displays its directory tree inside the right preview pane without unpacking the whole file.

* **Browse & Open**: Expand directories, inspect metadata, and double-click or press `Enter` on any internal file to view or open it directly.
* **Rubberband Box Selection**: Drag a selection rectangle with the mouse across archive rows to select multiple items at once. Standard `Shift+Click`, `Ctrl+Click`, and `Ctrl+A` gestures work inside the archive tree as well.
* **Drag Out & Clipboard Copy**: Drag selected entries straight out of the archive pane into atlifm tabs, Miller columns, or external desktop applications (browsers, editors, chat apps). Alternatively, press `Ctrl+C` inside the archive pane to copy selected items to the clipboard and paste them anywhere.
* **Extraction Hotkeys**: Press `Ctrl+Alt+X` to extract the entire archive into the current folder, or use the context menu for `Extract Here` and `Extract In`.

### Search & Quick Jumps

atlifm provides four dedicated search modes accessible via hotkeys:

1. **File & Folder Name Search (`Ctrl+Shift+F`)**: Uses `fd` (or built-in recursive traversal) to locate files across subdirectories. Exact matches are prioritized, followed by fuzzy subsequence matching.
2. **Content Search (`Ctrl+Shift+D`)**: Uses `ripgrep` (`rg`) to search text inside files, falling back to `grep -E`. `rg` runs with `--no-messages` to prevent `Permission denied` spam.
3. **Current Folder Palette (`Ctrl+Shift+P`)**: A rapid fuzzy palette scoped strictly to entries in the current folder. Useful for quickly homing in on files in large directories without recursive overhead.
4. **Directory Jump (`Ctrl+Shift+G`)**: Queries `zoxide` for frecent directory jumps. If `zoxide` is not installed, it displays your bookmarks list as a fallback.

In any search overlay, `Up` / `Down` navigates the focus without modifying your selections. Pressing `Enter` opens the item (or jumps to the matched file line in content search), while `Shift+Enter` reveals the item in its containing folder.

### Bulk Operations

* **Bulk Rename Overlay**: Select two or more items and press `F2`. An interactive panel opens with fields for search and replace (supporting regular expressions), adding prefixes or suffixes, and sequential numbering with custom padding. A live preview table displays original and resulting names side by side.
* **Bulk Creation (`Ctrl+Shift+A`)**: Opens a multi-line text input dialog. Type or paste file names (one per line). Names ending with `/` are created as directories; all others are created as empty files.
* **Trash & Permanent Deletion**: Press `Del` to move selected files to FreeDesktop Trash safely, or `Shift+Del` for permanent deletion. Moving to trash is fully tracked in transaction history: pressing `Ctrl+Z` immediately undoes the operation and restores the files.

### Background Tasks Registry (`Alt+W`)

File operations—copying, moving, trashing, permanent deletion, and archive packing/unpacking—run asynchronously in dedicated background thread pools (`io` and `thumb`).

* The status bar displays real-time aggregate transfer progress and speed.
* Press `Alt+W` to open the tasks overlay. Each task shows its progress bar, speed in MB/s, estimated time of arrival (eta), and current file.
* Press `Del` to cancel a running task cleanly. If you cancel a copy or move operation, atlifm initiates an automatic rollback of partially transferred files.
* Press `Enter` to inspect the complete log output for a specific task.

### Layout Persistence & Window Management

* **Saving Layout**: Resize the Miller columns, sidebar, or preview pane (even beyond 1000 pixels). Press `Ctrl+Shift+S` to save the exact column proportions, panel visibility, and floating window size to `~/.config/atlifm/layout.ini`.
* **Resetting Layout**: Press `Ctrl+Shift+R` to delete `layout.ini` and revert immediately to the settings defined in `theme.conf`.
* **Tiling Window Managers**: Under Hyprland, Sway, i3, Niri, or River, the compositor manages the outer window dimensions. atlifm honors the compositor tile geometry and restores internal panel proportions without resizing the window.
* **Multiple Windows**: Launching `atlifm [path]` always opens a new, independent window, allowing tiling window managers to tile multiple atlifm instances side by side.

### Elevated Operations (Sudo & Root)

Browsing or mutating root-owned files is handled securely:

* If an active sudo ticket exists, operations execute silently via `sudo -n`.
* When authorization is required, atlifm invokes `pkexec` for a single desktop authorization dialog per batch of operations.
* If no polkit agent is present, atlifm prompts for the sudo password in an inline modal and caches the credential ticket safely.
* Directory listings for root paths are cached hierarchically, so navigating subdirectories does not trigger repeated authorization prompts.

***

## 5. In-App Keybinding Editor (F1)

Pressing `F1` or `?` opens the interactive cheat sheet overlay:

* **Remapping**: Click on any shortcut button and press the desired key combination.
* **Disabling**: Press `Backspace` while recording to disable the shortcut.
* **Canceling**: Press `Esc` to cancel recording without making changes.
* **Resetting**: Right-click any shortcut to access `Reset to default` or `Disable`.
* **Conflict Prevention**: atlifm blocks conflicting shortcuts and warns about duplicates.
* **Persistence**: All edits are immediately saved to `~/.config/atlifm/keybinds.conf`.

Custom plugin actions appear in the same overlay under the `PLUGINS` section as soon as a plugin defines an `Action`.

***

## 6. xdg Desktop Portal Setup

atlifm provides an integrated xdg Desktop Portal FileChooser backend. When enabled, desktop browsers (Chromium, Firefox, Zen, Brave) and gtk/qt applications automatically use atlifm for Open File and Save File dialogs.

To configure atlifm as your default file manager and file picker:

```bash
atlifm --setdefault
```

To configure only the file chooser portal:

```bash
atlifm --setup-portal
```

To configure only the default file manager:

```bash
atlifm --setup-file-manager
```

Or execute the standalone shell script:

```bash
./scripts/setup-portal.sh
```

### What `--setup-portal` does:

1. Installs the portal descriptor into `~/.local/share/xdg-desktop-portal/portals/atlifm.portal`.
2. Installs the D-Bus service into `~/.local/share/dbus-1/services/org.freedesktop.impl.portal.desktop.atlifm.service`.
3. Configures `portals.conf` and `hyprland-portals.conf` in `~/.config/xdg-desktop-portal/` with `org.freedesktop.impl.portal.FileChooser=atlifm`.
4. If Hyprland is detected, ensures a floating window rule is added so the portal opens centered on top of windows.
5. Restarts the user `xdg-desktop-portal` service.

The portal backend process itself is D-Bus activatable: `xdg-desktop-portal` starts `atlifm --portal` on demand.

***

## 7. Theme Customization

Themes are stored in `~/.config/atlifm/theme.conf`. The syntax uses simple `key = #rrggbb` values (or `#aarrggbb` to specify an alpha channel). Any key that is not present falls back to the built-in default.

### Window, Font & Layout

| Key | Default | Description |
| :--- | :--- | :--- |
| `window_width` | `1200` | Initial window width in pixels (accepted range 400 to 7680). Alias: `default_width`. |
| `window_height` | `750` | Initial window height in pixels (accepted range 300 to 4320). Alias: `default_height`. |
| `sidebar_width` | `180` | Bookmarks sidebar width in pixels (accepted range 80 to 800). |
| `font_family` | auto | Font family. Auto-detection order: JetBrainsMono Nerd Font, JetBrainsMono nf, DejaVu Sans Mono. |
| `font_size` | `13` | Font size in pixels (accepted range 8 to 48); scales ui text as well as directly painted rows and tabs. |
| `show_tabs` | `true` | Show or hide the top tab bar. |
| `show_bookmarks` | `true` | Show or hide the left bookmarks sidebar. |
| `show_status_bar` | `true` | Show or hide the bottom status bar. |
| `show_parent_column`| `true` | Show or hide the parent Miller column. |
| `show_preview` | `true` | Show or hide the right preview pane. |
| `parent_column_width`| `300` | Width of the parent column in pixels. |
| `preview_width` | `420` | Width of the preview column in pixels. |

### Palette

The `dark` flag and the base palette define the overall look. The default palette is a dark terminal-style scheme:

| Key | Default | Purpose |
| :--- | :--- | :--- |
| `dark` | `true` | Dark / light variant flag |
| `base` | `#0e0e25` | Main background |
| `mantle` | `#0b0b1c` | Menus, inputs, secondary surfaces |
| `crust` | `#080816` | The darkest surface (badges) |
| `surface0` | `#181836` | Subtle surfaces and hover fills |
| `surface1` | `#232348` | Borders and separators |
| `surface2` | `#34345e` | Raised elements |
| `overlay0` | `#454570` | Overlay accents |
| `text` | `#cdd6f4` | Primary text |
| `subtext` | `#a6adc8` | Secondary text |
| `dim` | `#6c7086` | Muted and inactive text |
| `accent` | `#6bbcc6` | Selection, focus rings, highlights |
| `accent_fg` | `#0e0e25` | Text drawn on top of the accent color |
| `blue` | `#6bbcc6` | Semantic accent |
| `sapphire` | `#74c7ec` | Semantic accent |
| `yellow` | `#f9e2af` | Semantic accent |
| `green` | `#a6e3a1` | Semantic accent |
| `red` | `#c04a6d` | Semantic accent |
| `mauve` | `#cba6f7` | Semantic accent |
| `peach` | `#c68e6b` | Semantic accent |
| `teal` | `#6bbcc6` | Semantic accent |

### Example

```ini
dark = true

base = #0e0e25
mantle = #0b0b1c
accent = #6bbcc6
accent_fg = #0e0e25
text = #cdd6f4
dim = #6c7086

# Window & font
window_width = 1400
window_height = 900
sidebar_width = 200
font_family = JetBrainsMono Nerd Font
font_size = 14

# Layout
show_tabs = true
show_bookmarks = true
show_preview = true
preview_width = 450
```

Individual ui components (borders, tabs, menus, inputs, buttons, scrollbars, overlays, and badges) can be recolored with dedicated keys. See the [Configuration Reference](/docs/configuration-reference) page for the complete key table.

***

## 8. Plugins

Extend atlifm with external commands from `~/.config/atlifm/plugins/`. Each `.conf` file defines one plugin; executable `*.sh`, `*.py`, and `*.bash` files in the same directory are picked up as script plugins automatically. Compiled C++ plugins (`*.so`) loaded in-process through a stable abi (v1) are supported as well.

Key capabilities:

* **Custom actions and shortcuts**: a plugin can register a new action that becomes bindable in `keybinds.conf` and appears in the cheat sheet (`F1`) under `PLUGINS`.
* **Overrides**: intercept nearly every built-in operation, keyboard actions, context menus, mouse paths, tab bar, bookmarks panel, with your own command; sudo, polkit, and portal flows are excluded.
* **Preview plugins**: replace the built-in preview pane for matching file types with your own command output.
* **Event hooks**: run commands in the background on `on_start`, `on_navigate`, and `on_select` events.
* **C++ plugins**: shared libraries that register actions, overrides, previews, and hooks through an in-process C abi.

The [Plugin Developer Guide](/docs/plugin-developer-guide) covers the full configuration format, environment variables, validation rules, the native C++ abi, and practical examples.
