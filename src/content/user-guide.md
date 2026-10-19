# User Guide

Comprehensive documentation for installing, configuring, and daily usage of atlifm.

***

## 1. System Requirements & Dependencies

atlifm requires a Linux distribution with Qt 6.5 or newer. A monospace Nerd Font is recommended; if none is installed, atlifm falls back to DejaVu Sans Mono.

Prebuilt packages for Arch Linux, Debian/Ubuntu, Fedora/RHEL, Alpine, every architecture and the self-contained AppImage are listed on the [Downloads](/docs/downloads) page. The dependencies below are only needed when building from source.

### Arch Linux / Manjaro

```bash
sudo pacman -S base-devel gcc cmake ninja qt6-base qt6-svg
```

### Fedora / RHEL

```bash
sudo dnf install gcc-c++ cmake ninja-build qt6-qtbase-devel qt6-qtsvg-devel
```

### Ubuntu / Debian

```bash
sudo apt install build-essential cmake ninja-build qt6-base-dev qt6-base-private-dev libqt6svg6-dev
```

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

The binary accepts a directory as an optional argument (`atlifm ~/Downloads`) and is also used as the XDG portal backend when launched with `--portal`.

***

## 3. Keyboard Shortcuts & Action Reference

atlifm ships with 47 reboundable actions grouped into five sections. Every keybinding can be customized in `~/.config/atlifm/keybinds.conf` or directly in the interactive cheat sheet (`F1`).

### Direct Keys

Some physical keys are handled by the file list itself and are not part of the action table:

| Key | Action |
| --- | ------ |
| `Up` / `Down` or `k` / `j` | Move the cursor |
| `Enter`, double click, or `Right` | Open the focused file or enter the folder |
| `Left` / `Backspace` | Go to the parent folder |
| `Space` | Select the focused item and move to the next one |
| Mouse wheel on the tab bar | Scroll through tabs |
| Middle click on a tab | Close that tab |
| Single click | Focus an item (files open only on double click) |

### Tabs

| Action ID          | Default Keys                  | Description                        |
| ------------------ | ----------------------------- | ---------------------------------- |
| `new_tab`          | `Ctrl+T`                      | Open new tab in `$HOME`            |
| `close_tab`        | `Ctrl+W`, `Ctrl+F4`           | Close active tab                   |
| `reopen_tab`       | `Ctrl+Shift+T`                | Reopen recently closed tab         |
| `pin_tab`          | `Ctrl+P`                      | Pin / unpin active tab             |
| `next_tab`         | `Ctrl+Tab`, `Ctrl+PgDown`     | Switch to next tab                 |
| `prev_tab`         | `Ctrl+Shift+Tab`, `Ctrl+PgUp` | Switch to previous tab             |
| `tab_1` .. `tab_9` | `Ctrl+1` .. `Ctrl+9`          | Switch directly to tab 1 through 9 |

### Navigation & Sorting

| Action ID          | Default Keys            | Description                     |
| ------------------ | ----------------------- | ------------------------------- |
| `focus_path`       | `Ctrl+L`, `Alt+D`, `F4` | Focus address / path input      |
| `parent_dir`       | `Alt+Up`                | Navigate to parent directory    |
| `go_back`          | `Alt+Left`              | Navigate back in history        |
| `go_forward`       | `Alt+Right`             | Navigate forward in history     |
| `go_home`          | `Alt+Home`              | Jump to Home directory          |
| `quick_jump`       | `g`                     | Open Quick Jump menu            |
| `toggle_bookmarks` | `Ctrl+B`, `Ctrl+\`, `F9`| Toggle bookmarks sidebar        |
| `toggle_hidden`    | `Ctrl+H`, `Ctrl+.`      | Toggle hidden files             |
| `refresh`          | `Ctrl+R`, `F5`          | Reload directory contents       |
| `sort_name`        | `Alt+1`                 | Sort items by Name              |
| `sort_size`        | `Alt+2`                 | Sort items by Size              |
| `sort_date`        | `Alt+3`                 | Sort items by Modification Date |
| `sort_type`        | `Alt+4`                 | Sort items by File Type         |

Sort modes are remembered per folder: atlifm stores the per-directory mode and direction automatically and restores them when you return to the folder.

### File Operations

| Action ID       | Default Keys              | Description                             |
| --------------- | ------------------------- | --------------------------------------- |
| `cut`           | `Ctrl+X`                  | Cut selected items to clipboard         |
| `copy`          | `Ctrl+C`                  | Copy selected items to clipboard        |
| `paste`         | `Ctrl+V`                  | Paste clipboard contents                |
| `copy_path`     | `Ctrl+Shift+C`            | Copy full absolute path to clipboard    |
| `copy_rel_path` | `Ctrl+Alt+C`              | Copy relative path to clipboard         |
| `extract_here`  | `Ctrl+Alt+X`              | Extract archive into current folder     |
| `select_all`    | `Ctrl+A`                  | Select all items in current view        |
| `undo`          | `Ctrl+Z`                  | Undo last operation (also cancels a running copy or move with rollback) |
| `redo`          | `Ctrl+Y`, `Ctrl+Shift+Z`  | Redo last file operation                |
| `rename`        | `F2`                      | Inline rename focused item              |
| `trash`         | `Del`                     | Move selection to FreeDesktop Trash     |
| `delete_perm`   | `Shift+Del`               | Permanently delete selection            |
| `new_folder`    | `Ctrl+Shift+N`            | Prompt to create new directory          |
| `new_file`      | `Ctrl+N`, `Ctrl+Alt+N`    | Prompt to create new file               |
| `properties`    | `Alt+Return`, `Alt+Enter` | Open properties and permissions overlay |

### Search & Filter

| Action ID | Default Keys  | Description                           |
| --------- | ------------- | ------------------------------------- |
| `filter`  | `Ctrl+F`, `/` | Open transient fuzzy filter prompt    |
| `cancel`  | `Esc`         | Clear filter prompt / clear selection |

### General

| Action ID | Default Keys | Description                  |
| --------- | ------------ | ---------------------------- |
| `help`    | `F1`, `?`    | Open interactive cheat sheet |
| `quit`    | `Ctrl+Q`     | Quit atlifm                  |

***

## 4. In-App Keybinding Editor (F1)

Pressing `F1` or `?` opens the interactive cheat sheet overlay:

* **Remapping**: Click on any shortcut button and press the desired key combination.
* **Disabling**: Press `Backspace` while recording to disable the shortcut.
* **Canceling**: Press `Esc` to cancel recording without making changes.
* **Resetting**: Right-click any shortcut to access `Reset to default` or `Disable`.
* **Persistence**: All edits are immediately saved to `~/.config/atlifm/keybinds.conf`.

Custom plugin actions appear in the same overlay under the `PLUGINS` section as soon as a plugin defines an `Action`.

***

## 5. XDG Desktop Portal Setup

atlifm provides an integrated XDG Desktop Portal FileChooser backend. When enabled, desktop browsers (Chromium, Firefox, Helium, Brave) and GTK/Qt applications automatically use atlifm for Open File and Save File dialogs.

To configure atlifm as your default file picker:

```bash
atlifm --setup-portal
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

## 6. Theme Customization

Themes are stored in `~/.config/atlifm/theme.conf`. The syntax uses simple `key = #rrggbb` values (or `#aarrggbb` to specify an alpha channel). Any key that is not present falls back to the built-in default.

### Window & Font

| Key | Default | Description |
| --- | ------- | ----------- |
| `window_width` | `1200` | Initial window width in pixels |
| `window_height` | `750` | Initial window height in pixels |
| `sidebar_width` | `180` | Bookmarks sidebar width in pixels |
| `font_family` | auto | Font family. The default auto-detection order is JetBrainsMono Nerd Font, JetBrainsMono NF, then DejaVu Sans Mono |
| `font_size` | `13` | Font size in pixels; scales UI text as well as directly painted rows and tabs |

The aliases `default_width` and `default_height` are accepted for the window size keys.

### Palette

The `dark` flag and the base palette define the overall look. The default palette is a dark terminal-style scheme:

| Key | Default | Purpose |
| --- | ------- | ------- |
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
```

Individual UI components (borders, tabs, menus, inputs, buttons, scrollbars, overlays, and more) can be recolored with dedicated keys. See the Configuration Reference page for the complete key table.

***

## 7. Plugins

Extend atlifm with external commands from `~/.config/atlifm/plugins/`. Each `.conf` file defines one plugin; executable `*.sh`, `*.py`, and `*.bash` files in the same directory are picked up as script plugins automatically. Compiled C++ plugins (`*.so`) loaded in-process through a stable ABI are supported as well.

Key capabilities:

* **Custom actions and shortcuts**: a plugin can register a new action that becomes bindable in `keybinds.conf` and appears in the cheat sheet (`F1`) under `PLUGINS`.
* **Overrides**: intercept nearly every built-in operation, keyboard actions, context menus, mouse paths, tab bar, bookmarks panel, with your own command; sudo, polkit, and portal flows are excluded.
* **Preview plugins**: replace the built-in preview pane for matching file types with your own command output.
* **Event hooks**: run commands in the background on `on_start`, `on_navigate`, and `on_select` events.
* **C++ plugins**: shared libraries that register actions, overrides, previews, and hooks through an in-process C ABI.

Plugin commands receive the current directory, the current selection, and additional context in environment variables. The Plugin Developer Guide covers the full configuration format, environment variables, validation rules, the native C++ ABI, and practical examples.
