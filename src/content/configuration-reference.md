# Configuration Reference

Complete reference for every atlifm configuration file, key, and environment variable.

***

## 1. Configuration Directory

All user configuration lives in `~/.config/atlifm/`. The directory can be relocated with the `ATLIFM_CONFIG_DIR` environment variable, which is respected by every subsystem (keybinds, theme, plugins, sorting):

```bash
ATLIFM_CONFIG_DIR=/tmp/atlifm-test atlifm
```

On first launch atlifm materializes missing defaults:

* `keybinds.conf` with all 47 actions and their default keys,
* `theme.conf` with the active palette atoms and commented component defaults,
* `plugins/example.conf` as a commented template.

Existing files are never overwritten, and a deleted `example.conf` is not recreated. Additional files (`sorting.ini`) are created on demand.

| Path | Purpose |
| ---- | ------- |
| `~/.config/atlifm/keybinds.conf` | Keyboard action bindings |
| `~/.config/atlifm/theme.conf` | Palette, UI component colors, window size, fonts |
| `~/.config/atlifm/plugins/` | Plugin definitions (`.conf`), script plugins (`*.sh`, `*.py`, `*.bash`), and native C++ plugins (`*.so`) |
| `~/.config/atlifm/sorting.ini` | Per-directory sort mode and direction (managed automatically) |
| `~/.cache/atlifm/undo_backups/` | Backup storage used by undo and redo operations |

***

## 2. keybinds.conf

The file maps action IDs to key combinations:

```ini
new_tab = Ctrl+T
close_tab = Ctrl+W, Ctrl+F4
quick_jump =          # empty value = action disabled
```

* Every line is `action_id = Key1, Key2`.
* An empty value disables the action.
* The file is generated with all actions and defaults on first launch; comments and ordering are preserved when bindings are edited from the in-app cheat sheet (`F1`).
* Invalid key sequences are silently skipped; `Escape`, `Delete`, `PageDown`, and `PageUp` are normalized to their canonical names.
* Plugin actions appear here too: a plugin's `Keys` value is used as the default until the user overrides or disables it.

The complete action list, grouped by section, is available in the User Guide and directly in the `F1` cheat sheet.

***

## 3. theme.conf

Flat `key = value` format. Lines starting with `#` are comments; unknown keys are ignored. Colors accept `#rrggbb` or `#aarrggbb` (with alpha). Any key that is not present falls back to the built-in default, and component keys fall back through the palette.

### Window and Font

| Key | Default | Description |
| --- | ------- | ----------- |
| `window_width` | `1200` | Initial window width in pixels (accepted range 400 to 7680). Alias: `default_width`. |
| `window_height` | `750` | Initial window height in pixels (accepted range 300 to 4320). Alias: `default_height`. |
| `sidebar_width` | `180` | Bookmarks sidebar width in pixels (accepted range 80 to 800). |
| `font_family` | auto | Font family. Auto-detection order: JetBrainsMono Nerd Font, JetBrainsMono NF, JetBrains Mono, DejaVu Sans Mono, FiraCode Nerd Font. |
| `font_size` | `13` | Font size in pixels (accepted range 8 to 48). Scales UI text as well as directly painted rows and tabs. |

### Palette

The `dark` flag and the base palette define the overall look:

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

### UI Components

Every key below is optional. When it is missing, the value is inherited from the palette or from a parent role, so the default look is reproduced exactly.

| Key | Inherits from | Target |
| --- | ------------- | ------ |
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
| `overlay_bg` | base | Overlay panels (Properties, Open With, dialogs, plugin output) |
| `overlay_border` | accent | Overlay panel border (2 px) |
| `badge_bg` | crust | Drag & drop badge background |
| `badge_border` | accent | Drag & drop badge border |
| `badge_fg` | text | Drag & drop badge text |

### Example

```ini
dark = true

base = #0e0e25
mantle = #0b0b1c
accent = #6bbcc6
accent_fg = #0e0e25
text = #cdd6f4
dim = #6c7086

# Window & Font
window_width = 1400
window_height = 900
sidebar_width = 200
font_family = JetBrainsMono Nerd Font
font_size = 14

# UI components
selection_bg = #6bbcc6
selection_fg = #0e0e25
border = #232348
overlay_border = #6bbcc6
```

***

## 4. plugins/

Plugin definitions live in `~/.config/atlifm/plugins/`. Each `.conf` file defines one plugin, executable `*.sh`, `*.py`, and `*.bash` files are registered as script plugins automatically, and compiled `*.so` libraries are loaded in-process as native C++ plugins (ABI v1).

Quick key reference:

| Key | Required | Purpose |
| --- | -------- | ------- |
| `Name` / `Exec` | yes | Menu label and command |
| `Extensions` / `AppliesTo` | no | File type and target filtering |
| `Detach` | no | Detached launch instead of output capture |
| `Action` / `Keys` | no | Custom bindable action and its default shortcut |
| `Override` | no | Intercept built-in operations |
| `Type = preview` | no | Replace the built-in preview pane |
| `Hook` | no | Run in the background on `on_start`, `on_navigate`, `on_select` |

Full syntax, validation rules, environment variables, and examples are documented in the Plugin Developer Guide.

***

## 5. sorting.ini

Per-directory sort preferences are stored automatically; no manual editing is required.

* Key: the percent-encoded canonical directory path.
* Value: `mode|order`, where mode is the sort column (name, size, date, type) and order is `asc` or `desc`.
* Each column of the Miller view applies the setting of its own directory; the root entry provides the default.
* The file lives next to the other configuration files, so `ATLIFM_CONFIG_DIR` relocates it as well.

***

## 6. Environment Variables

| Variable | Scope | Effect |
| -------- | ----- | ------ |
| `ATLIFM_CONFIG_DIR` | atlifm itself | Replaces `~/.config/atlifm/` for keybinds, theme, plugins, and sorting (useful for isolated test profiles). |

Plugin processes additionally receive:

| Variable | Value |
| -------- | ----- |
| `ATLIFM_DIR` | Current directory path |
| `ATLIFM_SELECTION` | Selected paths, one per line |
| `ATLIFM_FILE` | First selected path (may be empty) |
| `ATLIFM_TARGET` | First selected path, or the current directory |
| `ATLIFM_PID` | atlifm process ID |
| `ATLIFM_ACTION` | Plugin `Action` ID when defined; `preview` for preview plugins |

***

## 7. Command Line

| Invocation | Effect |
| ---------- | ------ |
| `atlifm [directory]` | Open atlifm at the given directory (defaults to the current directory / home). |
| `atlifm --portal` | Run as the XDG desktop portal FileChooser backend (D-Bus activatable). |
| `atlifm --setup-portal` | Install and configure atlifm as the default XDG FileChooser portal backend. |
| `atlifm --help`, `atlifm --version` | Print usage or version information. |
