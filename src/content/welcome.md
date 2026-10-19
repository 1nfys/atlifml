# Welcome to atlifm

**atlifm** (Awesome Terminal-Like Interface File Manager) is a fast, keyboard and mouse driven file manager for Linux designed with clean terminal aesthetics and modern desktop features.

Built from scratch in **C++23** and **Qt6**, atlifm combines the density, speed, and monospace typography of terminal file managers with full mouse interaction, smooth tabs, instant previews, drag-and-drop, and FreeDesktop system integration.

***

## Philosophy & Core Design Principles

Default file managers on modern Linux distributions typically fall into one of two extremes:

1. **Bulky GUI file managers** (such as GNOME Nautilus) with huge padding, oversized rounded corners, and sluggish responsiveness.
2. **Strictly keyboard-only TUI managers** (such as yazi or ranger) where mouse usage is either secondary or completely unsupported.

atlifm bridges this gap. It preserves the strict monospace, border-aligned, zero-animation aesthetics of a terminal while delivering complete GUI convenience.

***

## Highlights

* **Multi-pane Miller columns**: parent folder on the left, current folder in the center, preview on the right. The preview pane collapses automatically when the window is narrow.
* **Strict double-click file opening**: prevents accidental file execution on simple item selection; a single click strictly focuses items.
* **Deep OS drag and drop**: outbound and inbound file dragging between atlifm and external applications (Telegram, Discord, Chromium, GIMP, LibreOffice, or terminal windows) with dark drag badges. Dragging with Alt held down displays a micro-menu with Copy, Move, and Symlink options.
* **Top tabs with independent history**: tabs shrink dynamically, can be scrolled with the mouse wheel, closed with middle click, and pinned with `Ctrl+P`. Each tab keeps its own forward and backward navigation history.
* **Multi-engine preview pane**: hardware accelerated image and SVG viewer with interactive zoom and pan; code viewer with a line number gutter and syntax highlighting for C++, Rust, Python, Bash, and many other languages; recursive directory tree inspector; and a 16-byte binary hex dump.
* **Interactive in-place archive browsing**: browse archive hierarchies (.zip, .tar.gz, .7z, .rar, and others) directly inside the preview pane, open internal files, or drag them out without full extraction.
* **Archive extraction and creation**: the context menu includes Extract Here and Extract In, and Compress packs the current selection into a new archive.
* **Properties overlay and disk usage**: `Alt+Enter` or the context menu opens a compact file inspector with permissions shown as `[ ]` / `[x]` markers. For a drive root, a Disk Usage console with per-folder progress bars and a live scan appears in the same overlay.
* **Full undo and redo**: a complete transaction history for file operations with `Ctrl+Z` and `Ctrl+Y` / `Ctrl+Shift+Z`. Pressing `Ctrl+Z` while a copy or move is still running cancels it with rollback.
* **Extensible plugin system**: custom actions, rebindable shortcuts, overrides of nearly every built-in operation, preview plugins, event hooks, automatically discovered shell scripts, and native C++ plugins.
* **Customizable window and font**: default window size, bookmarks sidebar width, font family, and font size via `theme.conf`.
* **Native XDG Desktop Portal FileChooser**: a built-in backend so browsers and desktop applications use atlifm for Open File and Save File dialogs.
* **FreeDesktop Trash support**: compliant trash management with a dedicated Clear Bin action.

***

## Project at a Glance

| Item | Value |
| ---- | ----- |
| Language and toolkit | C++23, Qt6 |
| License | MIT |
| Source code | `https://github.com/1nfys/atlifm` |
| Downloads | [GitHub Releases](https://github.com/1nfys/atlifm/releases/latest) |
| Configuration | Plain text files in `~/.config/atlifm/` |
| Interface languages | English |

***

## Where to Go Next

* **Downloads**: prebuilt packages for Arch, Debian/Ubuntu, Fedora/RHEL, openSUSE Tumbleweed, Alpine, the AppImage, and source builds.
* **User Guide**: keyboard shortcuts, the interactive cheat sheet, portal setup, daily usage, and theme customization.
* **Plugin Developer Guide**: the plugin engine in depth, including custom actions, overrides, preview plugins, event hooks, script plugins, environment variables, and the native C++ ABI.
* **Configuration Reference**: every configuration file, key, and environment variable in one place.
