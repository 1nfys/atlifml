# Configuration Reference

Complete reference for every atlifm configuration file, key, layout setting, and environment variable.

***

## 1. Configuration Directory

All user configuration lives in `~/.config/atlifm/`. The directory can be relocated with the `ATLIFM_CONFIG_DIR` environment variable, which is respected by every subsystem (keybinds, theme, layout, plugins, sorting):

```bash
ATLIFM_CONFIG_DIR=/tmp/atlifm-test atlifm
```

On first launch atlifm materializes missing defaults:

* `keybinds.conf` with all 54 actions and their default keys,
* `theme.conf` with the active palette atoms, layout toggles, and commented component defaults,
* `plugins/example.conf` as a commented template.

Existing files are never overwritten, and a deleted `example.conf` is not recreated. Additional files (`layout.ini`, `sorting.ini`) are created on demand.

| Path | Purpose |
| :--- | :--- |
| `~/.config/atlifm/keybinds.conf` | Keyboard action bindings |
| `~/.config/atlifm/theme.conf` | Palette, UI component colors, window size, fonts, layout toggles, and search settings |
| `~/.config/atlifm/layout.ini` | Saved column and sidebar widths, panel visibility, and window dimensions (`Ctrl+Shift+S`) |
| `~/.config/atlifm/plugins/` | Plugin definitions (`.conf`), script plugins (`*.sh`, `*.py`, `*.bash`), and native C++ plugins (`*.so`) |
| `~/.config/atlifm/sorting.ini` | Per-directory sort mode and direction (managed automatically) |
| `~/.config/atlifm/ssh_keys.ini` | Remembered SFTP private key file paths per host/port/user (`chmod 600`) |
| `~/.cache/atlifm/undo_backups/` | Backup storage used by undo and redo operations |
| `~/.cache/atlifm/thumbnails/` | Disk LRU cache for generated image, video, and PDF thumbnails |

***

## 2. keybinds.conf

The file maps action IDs to key combinations:

```ini
new_tab = Ctrl+T
close_tab = Ctrl+W, Ctrl+F4
quick_jump = Alt+Space
tasks = Alt+W
filter = Ctrl+F
```

* Every line is formatted as `action_id = Key1, Key2`.
* An empty value disables the action (`quick_jump = `).
* The file is generated with all 54 actions and defaults on first launch; comments and ordering are preserved when bindings are edited from the in-app cheat sheet (`F1`).
* Invalid key sequences are silently skipped; `Escape`, `Delete`, `PageDown`, and `PageUp` are normalized to their canonical names (`Esc`, `Del`, `PgDown`, `PgUp`).
* Plugin actions appear here too: a plugin's `Keys` value is used as the default until the user overrides or disables it.
* Duplicate combinations are skipped at startup with a warning to prevent ambiguous shortcuts.

The complete action list, grouped into six sections (TABS, NAVIGATION & SORTING, LAYOUT, FILE OPERATIONS, SEARCH & FILTER, GENERAL), is available in the User Guide and directly in the `F1` cheat sheet.

***

## 3. theme.conf

Flat `key = value` format. Lines starting with `#` are comments; unknown keys are ignored. Colors accept `#rrggbb` or `#aarrggbb` (with alpha). Any key that is not present falls back to the built-in default, and component keys fall back through the palette.

### Window, Font & Panels

| Key | Default | Description |
| :--- | :--- | :--- |
| `window_width` | `1200` | Initial window width in pixels (accepted range 400 to 7680). Alias: `default_width`. |
| `window_height` | `750` | Initial window height in pixels (accepted range 300 to 4320). Alias: `default_height`. |
| `sidebar_width` | `180` | Bookmarks sidebar width in pixels (accepted range 80 to 800). |
| `font_family` | auto | Font family. Auto-detection order: JetBrainsMono Nerd Font, JetBrainsMono NF, DejaVu Sans Mono. |
| `font_size` | `13` | Font size in pixels (accepted range 8 to 48). Scales UI text as well as directly painted rows and tabs. |
| `show_tabs` | `true` | Show or hide the top tab bar. |
| `show_bookmarks` | `true` | Show or hide the left bookmarks sidebar. |
| `show_status_bar` | `true` | Show or hide the bottom status bar. |
| `show_parent_column` | `true` | Show or hide the parent Miller column. |
| `show_preview` | `true` | Show or hide the right preview pane. |
| `parent_column_width` | `300` | Initial parent column width in pixels. |
| `preview_width` | `420` | Initial preview pane width in pixels. |
| `first_run` | `true` | one-time default file manager prompt on startup. set to `false` to suppress the prompt. |

### Search Configuration

| Key | Default | Description |
| :--- | :--- | :--- |
| `search_hidden` | `true` | Include dotfiles and hidden folders in search results. |
| `search_ignored` | `false` | When `false`, respects `.gitignore` files; `true` passes `--no-ignore` to `fd` and `rg`. |
| `search_max_results`| `1500` | Maximum number of search results gathered before stopping. |

### Layout Persistence (`layout.ini`)

When you press `Ctrl+Shift+S`, the currently active splitter widths (including preview panes widened past 1000 px), panel visibility toggles, and floating window size are saved to `~/.config/atlifm/layout.ini`.

* On subsequent launches, `layout.ini` takes precedence over `theme.conf` layout defaults.
* Pressing `Ctrl+Shift+R` deletes `layout.ini`, restores the `theme.conf` defaults immediately, and updates the status bar with `Layout default`.
* Under tiling window managers (Hyprland, Sway, i3, Niri, River), the window size is controlled by the compositor, so atlifm never forces a window resize.

### Palette

The `dark` flag and the base palette define the overall look:

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

### UI Components

Every key below is optional. When it is missing, the value is inherited from the palette or from a parent role:

| Key | Inherits from | Target |
| :--- | :--- | :--- |
| `border` | surface1 | All borders, splitter handles, separators |
| `selection_bg` | accent | Selection in lists and bookmarks |
| `selection_fg` | accent_fg | Selection text |
| `hover_bg` | surface0 | Hover highlight |
| `drop_bg` | surface1 | Drag & drop target, right-click target |
| `drop_border` | accent | Drag & drop target border and text |
| `tab_bg` | base | Tab bar background |
| `tab_fg` | dim | Inactive tab |
| `tab_active_bg` | base | Active tab background |
| `tab_active_fg` | accent | Active tab number prefix |
| `tab_active_text` | text | Active tab name |
| `tab_hover_bg` | hover_bg | Tab under the cursor |
| `tab_close_fg` | subtext | Tab close button |
| `tab_close_hover_fg` | red | Tab close button under the cursor |
| `menu_bg` | mantle | Context menu background |
| `menu_fg` | text | Context menu text |
| `menu_border` | border | Context menu border |
| `menu_selected_bg` | selection_bg | Selected menu item background |
| `menu_selected_fg` | selection_fg | Selected menu item text |
| `menu_disabled_fg` | dim | Disabled menu item |
| `input_bg` | mantle | Text input background |
| `input_fg` | text | Text input text |
| `input_border` | border | Text input border |
| `input_focus_border` | accent | Focused text input border |
| `button_bg` | mantle | Button background |
| `button_fg` | text | Button text |
| `button_border` | border | Button border |
| `button_hover_bg` | selection_bg | Button under the cursor |
| `button_hover_fg` | selection_fg | Button text under the cursor |
| `checkbox_border` | border | Checkbox frame |
| `checkbox_checked_bg` | selection_bg | Checked checkbox fill |
| `scrollbar_bg` | base | Scrollbar track |
| `scrollbar_handle` | surface1 | Scrollbar handle |
| `scrollbar_handle_hover` | accent | Scrollbar handle under the cursor |
| `rubberband_border` | accent | Selection rubber band border |
| `rubberband_bg` | accent at alpha 60 | Selection rubber band fill |
| `overlay_bg` | base | Overlay panels (Properties, Tasks, Search, Open With) |
| `overlay_border` | accent | Overlay panel border (2 px) |
| `badge_bg` | crust | Drag & drop badge background |
| `badge_border` | accent | Drag & drop badge border |
| `badge_fg` | text | Drag & drop badge text |

***

## 4. plugins/

Plugin definitions live in `~/.config/atlifm/plugins/`. Each `.conf` file defines one plugin, executable `*.sh`, `*.py`, and `*.bash` files are registered as script plugins automatically, and compiled `*.so` libraries are loaded in-process as native C++ plugins (ABI v1).

| Key | Required | Purpose |
| :--- | :--- | :--- |
| `Name` / `Exec` | yes | Menu label and command line |
| `Extensions` / `AppliesTo` | no | File type and target filtering (`files`, `dirs`, `any`) |
| `Detach` | no | Detached launch instead of output capture in overlay |
| `Action` / `Keys` | no | Custom bindable action ID and its default shortcut |
| `Command` / `CommandMode` | no | Status bar command token (`Ctrl+F`) and execution mode (`query` or `action`) |
| `CommandTitle` / `CommandDescription` | no | Tooltip title and description for status bar token completion |
| `CommandPlaceholder` | no | Placeholder hint displayed after the command token in the input bar |
| `Override` | no | Intercept built-in operations (e.g. `rename`, `open_terminal`) |
| `Type = preview` | no | Replace the built-in preview pane with command output |
| `Hook` | no | Run in background on `on_start`, `on_navigate`, `on_select` |

Full syntax, validation rules, environment variables, and examples are documented in the [Plugin Developer Guide](/docs/plugin-developer-guide).

***

## 5. sorting.ini

Per-directory sort preferences are stored automatically; no manual editing is required.

* Key: the percent-encoded canonical directory path.
* Value: `mode|order`, where mode is the sort column (`name`, `size`, `date`, `type`) and order is `asc` or `desc`.
* Each column of the Miller view applies the setting of its own directory; the root entry provides the default.
* The file lives next to the other configuration files, so `ATLIFM_CONFIG_DIR` relocates it as well.

***

## 6. Environment Variables

| Variable | Scope | Effect |
| :--- | :--- | :--- |
| `ATLIFM_CONFIG_DIR` | atlifm itself | Replaces `~/.config/atlifm/` for keybinds, theme, layout, plugins, and sorting. |
| `ATLIFM_PLUGIN_LOG` | Native plugins | Custom log file path for native C++ plugins (defaults to `/tmp/atlifm-hello.log`). |

Plugin child processes additionally receive:

| Variable | Value |
| :--- | :--- |
| `ATLIFM_DIR` | Current directory path |
| `ATLIFM_SELECTION` | Selected paths, one per line |
| `ATLIFM_FILE` | First selected path (empty when selection is empty) |
| `ATLIFM_TARGET` | First selected path; falls back to current directory |
| `ATLIFM_PID` | atlifm process ID |
| `ATLIFM_ACTION` | Plugin `Action` ID when defined; `preview` for preview plugins |
| `ATLIFM_QUERY` | Search query typed after the command token in `Ctrl+F` status bar input |

***

## 7. Optional External Tools

atlifm integrates smoothly with popular Linux command-line tools:

| Utility | Feature | Details |
| :--- | :--- | :--- |
| `fd` / `fdfind` | File & folder search (`Ctrl+Shift+F`) | Fast indexed or parallel directory tree search. |
| `rg` (ripgrep) | Content search (`Ctrl+Shift+D`) | High performance regex search; falls back to `grep -E`. |
| `zoxide` | Quick jump (`Ctrl+Shift+G`) | Directory frecency tracker; falls back to bookmarks. |
| `ffmpegthumbnailer` / `ffmpeg` | Video preview | Generates frame thumbnails for video files in preview pane. |
| `poppler-utils` (`pdftoppm`) | PDF preview | Renders scrollable PDF pages for preview (`J` / `K` keys). |
| `gvfs`, `gvfs-fuse`, `gvfs-smb` | Remote shares | Mounts `sftp://`, `smb://`, and `ftp://` network places under FUSE. |


***

## 8. Command Line Arguments

| Invocation | Effect |
| :--- | :--- |
| `atlifm [directory]` | Open atlifm at the given directory (defaults to current directory / home). |
| `atlifm --setdefault` | install and configure atlifm as the default file manager and filechooser portal backend. |
| `atlifm --setup-file-manager` | install atlifm as the default file manager for the current user. |
| `atlifm --setup-portal` | Install and configure atlifm as the default XDG FileChooser portal backend. |
| `atlifm --file-manager` | run as the org.freedesktop.filemanager1 dbus service. |
| `atlifm --properties <path>` | open the properties panel for the given path. |
| `atlifm --portal` | Run as the XDG desktop portal FileChooser backend (D-Bus activatable). |
| `atlifm --help`, `atlifm --version` | Print usage or version information. |
