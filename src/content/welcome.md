# Welcome to atlifm

**atlifm** (Awesome Terminal-Like Interface File Manager) is a fast, keyboard and mouse driven file manager for Linux designed with clean terminal aesthetics and modern desktop features.

Built from scratch in **C++23** and **Qt6**, atlifm combines the density, speed, and monospace typography of terminal file managers with full mouse interaction, smooth tabs, instant previews, drag-and-drop, and FreeDesktop system integration.

***

## Philosophy & Core Design Principles

Default file managers on modern Linux distributions typically fall into one of two extremes:

1. **Bulky gui file managers** (such as gnome Nautilus) with huge padding, oversized rounded corners, and sluggish responsiveness.
2. **Strictly keyboard-only tui managers** (such as yazi or ranger) where mouse usage is either secondary or completely unsupported.

atlifm bridges this gap. It preserves the strict monospace, border-aligned, zero-animation aesthetics of a terminal while delivering complete gui convenience.

***

## Highlights

* **Multi-pane Miller columns**: parent folder on the left, current folder in the center, preview on the right. Columns collapse automatically in narrow windows.
* **Multiple independent windows**: every launch opens a separate, standalone window that tiling window managers can tile side by side. Each window maintains its own tabs and navigation history.
* **Strict double-click file opening**: prevents accidental file execution on simple item selection; a single click strictly focuses items.
* **Deep OS drag and drop**: outbound and inbound file dragging between atlifm and external applications (Telegram, Discord, Chromium, GIMP, LibreOffice, or terminal windows) with dark drag badges. Dragging with Alt held down displays a micro-menu with Copy, Move, and Symlink options.
* **Top tabs with independent history**: tabs shrink dynamically, can be scrolled with the mouse wheel, closed with middle click, and pinned with `Ctrl+P`. Each tab keeps its own forward and backward navigation history.
* **Multi-engine preview pane**: hardware accelerated image and svg viewer with interactive zoom and pan; code viewer with a line number gutter and syntax highlighting for C++, Rust, Python, Bash, and many other languages; recursive directory tree inspector; and a 16-byte binary hex dump.
* **Video and pdf preview**: video thumbnails via `ffmpegthumbnailer` or `ffmpeg`, scrollable pdf pages via `pdftoppm` with `J` / `K` navigation when the preview pane has focus, background rendering, disk lru cache, and neighbor prefetch.
* **Search and quick jumps**: `fd` file and folder name search (`Ctrl+Shift+F`), `rg` / `grep` content search (`Ctrl+Shift+D`), fuzzy palette over the current folder (`Ctrl+Shift+P`), and `zoxide` directory jumps (`Ctrl+Shift+G`). Native fallback works without external tools.
* **Network places and remote shares**: connect to `sftp://`, `smb://`, `ftp://`, `ftps://`, `\\server\share`, and bare IPs via an in-window connection form. Passwords are saved in the system keyring via `libsecret`, custom ssh keys are managed per host in `~/.ssh/atlifm/*.conf`, and navigation continues transparently through gvfs fuse.
* **Interactive in-place archive browsing**: browse archive hierarchies (.zip, .tar.gz, .7z, .rar) directly inside the preview pane, box-select multiple entries with a rubberband, open internal files, or drag them out without full extraction.
* **Archive extraction and creation**: the context menu includes Extract Here (`Ctrl+Alt+X`) and Extract In, and Compress packs the current selection into a new archive.
* **Bulk operations**: multi-select bulk rename overlay (`F2`), multi-line batch file and folder creation (`Ctrl+Shift+A`), trash cleanup, and permanent delete.
* **Properties overlay and disk usage**: `Alt+Enter` or the context menu opens a compact file inspector with permissions shown as `[ ]` / `[x]` markers. For a drive root, a Disk Usage console with per-folder progress bars and live background scan appears in the same overlay.
* **Background tasks registry**: file operations (copy, move, trash, delete, compression) run in the background with transfer speeds, eta, progress bars, cancellation tokens, and log viewing. `Alt+W` toggles the tasks overlay.
* **Full undo and redo**: a complete transaction history for file operations with `Ctrl+Z` and `Ctrl+Y` / `Ctrl+Shift+Z`. Pressing `Ctrl+Z` while a copy or move is still running cancels it with rollback.
* **Extensible plugin system**: custom actions, rebindable shortcuts, overrides of nearly every built-in operation, preview plugins, event hooks, automatically discovered shell scripts, and native C++ plugins (abi v1).
* **Customizable layout and persistence**: window size on floating wms, sidebar and column widths, optional panel toggles (`show_tabs`, `show_bookmarks`, `show_status_bar`, `show_parent_column`, `show_preview`), font family, and font size via `theme.conf`. `Ctrl+Shift+S` persists the layout to `layout.ini`, while `Ctrl+Shift+R` resets it to theme defaults.
* **Native xdg Desktop Portal FileChooser & Default File Manager**: a built-in backend so browsers and desktop applications use atlifm for file chooser dialogs and folder viewing (`atlifm --setdefault`).
* **FreeDesktop Trash support**: compliant trash management with safe moves to trash, undo rollback, and a dedicated Clear Bin action.

***

## Project at a Glance

| Item | Value |
| ---- | ----- |
| Version | 1.0.2 |
| Language and toolkit | C++23, Qt6 |
| License | MIT |
| Source code | `https://github.com/1nfys/atlifm` |
| Downloads | [GitHub Releases](https://github.com/1nfys/atlifm/releases/latest) |
| Configuration | Plain text files in `~/.config/atlifm/` |
| Interface languages | English |

***

## Where to Go Next

* **Downloads**: prebuilt packages for Arch, Debian/Ubuntu, Fedora/rhel, openSUSE Tumbleweed, Alpine, the appimage, and source builds.
* **User Guide**: keyboard shortcuts, the interactive cheat sheet, portal setup, daily usage, search, background tasks, and theme customization.
* **Plugin Developer Guide**: the plugin engine in depth, including custom actions, overrides, preview plugins, event hooks, script plugins, environment variables, and the native C++ abi.
* **Configuration Reference**: every configuration file, key, layout option, and environment variable in one place.
