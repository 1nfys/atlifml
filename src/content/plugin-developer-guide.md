# Plugin Developer Guide

atlifm includes a modular plugin engine that lets users and developers add external commands, file analyzers, and workflow automation without modifying or recompiling the core application. Plugins come in two flavors: declarative `.conf` files and scripts executed as child processes, and native C++ shared libraries loaded in-process through a stable C ABI.

***

## 1. Overview and Architecture

Plugins are plain-text files located in `~/.config/atlifm/plugins/`:

* **`.conf` plugins**: one `.conf` file defines one plugin; the file base name is the plugin ID (for example, `vscode.conf` has the ID `vscode`).
* **Script plugins**: executable `*.sh`, `*.py`, and `*.bash` files in the same directory are registered automatically; the ID is the base name without the extension.
* **Dynamic discovery**: atlifm scans and loads plugins on startup; plugins can be added, edited, or removed without rebuilding.
* **Directory override**: set the `ATLIFM_CONFIG_DIR` environment variable to redirect all configuration lookups, which is useful for testing with an isolated profile.
* **Conflicts**: when a script and a `.conf` file share the same base name, the `.conf` definition wins and the script is ignored. A same-named `.conf` or script also takes over the menu entry of a native `.so` plugin, although the plugin still services its overrides, previews, and hooks.
* **C++ plugins**: a compiled `*.so` in the same directory exporting `atlifm_plugin_init` is loaded in-process through a stable C ABI; see section 9.

Plugin integration points:

* Context menu: `Plugins` submenu, enabled per selection.
* Cheat sheet: `F1` overlay; plugins with a custom action appear in the `PLUGINS` section.
* Action engine: custom actions are bindable in `keybinds.conf`, and built-in operations can be intercepted via overrides.
* Preview pane: preview plugins can replace the built-in preview for matching files.
* Event hooks: background commands triggered by application events.
* Native host: compiled plugins register actions, overrides, previews, and hooks through the in-process host API and share the same menus and dispatcher.

When a plugin configuration contains invalid values, the offending entries are skipped and the reasons are recorded in the plugin's `rejected` list, which is shown as a tooltip in the `Plugins` submenu.

***

## 2. Configuration Parameters

| Key           | Type    | Description                                                                                                             |
| ------------- | ------- | ----------------------------------------------------------------------------------------------------------------------- |
| `Name`        | String  | Required. Label displayed in context menus and the cheat sheet.                                                         |
| `Exec`        | String  | Required. Command line to run. Parsed with shell-like quoting, so `Exec = sh -c "echo hi"` works.                       |
| `Type`        | String  | Optional. Set to `preview` to turn the plugin into a preview plugin.                                                    |
| `Extensions`  | List    | Optional. Comma-separated file extensions (`cpp, .HPP` is normalized to `.cpp, .hpp`). If omitted, every file matches. Plugins with extensions never match directories. |
| `AppliesTo`   | String  | Target filter: `files`, `dirs`, or `any` (default: `any`).                                                              |
| `Detach`      | Boolean | `true`, `1`, or `yes` launches the process detached in the background (suitable for GUI apps); `false` captures output into the terminal output overlay. |
| `Description` | String  | Tooltip description for the plugin entry.                                                                               |
| `Action`      | String  | Registers a custom action ID that can be bound to keys in `keybinds.conf`.                                              |
| `Keys`        | String  | Default keyboard shortcut for the action (for example, `Ctrl+Alt+V`). Users may rebind or disable it like any built-in action. |
| `Override`    | List    | Comma-separated built-in action IDs to intercept.                                                                       |
| `Hook`        | List    | Comma-separated event names to run the plugin on: `on_start`, `on_navigate`, `on_select`. The keys `Hook` and `Hooks` are equivalent. |

Parsing rules:

* Keys are case-insensitive; values may be wrapped in double quotes (the quotes are stripped).
* Lines starting with `#` and blank lines are ignored.
* `Extensions` values are lowercased and a leading dot is added automatically.

### Identifier Validation Rules

The `Action` ID and every entry in `Override` must satisfy strict validation:

* Must begin with a lowercase ASCII letter (`a-z`).
* May only contain lowercase ASCII letters, digits (`0-9`), and underscores (`_`).
* **Sudo protection**: any ID containing `sudo` (case-insensitive) is rejected to prevent accidental privilege escalation.

Rejected identifiers are removed during parsing and their reasons are collected in the plugin's `rejected` list. IDs are also re-validated at execution time as defense in depth, so an invalid or sudo-related override can never run.

***

## 3. Environment Variables and Execution Context

Every plugin process receives contextual information through the environment:

| Variable           | Value                                                                                                                              |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| `ATLIFM_DIR`       | Absolute path of the current directory.                                                                                            |
| `ATLIFM_SELECTION` | Newline-separated list of absolute paths for all currently selected items.                                                         |
| `ATLIFM_FILE`      | First selected path, or empty when nothing is selected.                                                                            |
| `ATLIFM_TARGET`    | First selected path; falls back to the current directory.                                                                          |
| `ATLIFM_PID`       | Process ID of the running atlifm instance.                                                                                         |
| `ATLIFM_ACTION`    | The plugin's own `Action` ID when it defines one; `preview` for preview plugins. Not set when the plugin has no `Action`.          |

Selected item paths are also appended as trailing positional arguments after the command specified in `Exec`. Running a plugin from an empty background selection targets the current directory itself: the directory path is appended instead.

The child process starts with `ATLIFM_DIR` as its working directory, and atlifm waits up to 3 seconds for it to start; a failure to start is reported as an alert or in the overlay title.

### Terminal Output Overlay

When `Detach = false`, the process runs with merged `stdout` and `stderr`. Its output streams in real time into the TUI overlay positioned in the bottom-right corner of the window:

* The title shows `▸ name: running…` and switches to `done` or `failed (exit N)` when the process finishes.
* Output chunks are buffered so UTF-8 characters and lines are never split mid-sequence (up to 5000 blocks are kept).
* `Esc` hides the overlay; the process is not killed and keeps running.

Detached plugins (`Detach = true`) run with `startDetached` and do not capture output; a short status-bar message confirms the launch.

***

## 4. Custom Actions and Shortcuts

A plugin can register its own action ID:

```ini
Action = open_in_vscode
Keys = Ctrl+Alt+V
```

* The action appears in the cheat sheet (`F1`) under the `PLUGINS` section as soon as the plugin defines an `Action`.
* `Keys` provides a default binding; the user may rebind or disable it in `keybinds.conf` exactly like a built-in action.
* Action IDs that collide with built-in action IDs are discarded.
* The action is triggered from the `Plugins` submenu, from the default shortcut, or from any key the user assigns.

***

## 5. Overriding Built-In Operations

Plugins can intercept standard actions using the `Override` key. When an overridden action is triggered, atlifm runs the plugin command instead of the built-in implementation:

```ini
Override = rename, open_terminal
```

How overriding works:

* Overrides cover the whole application surface: keyboard actions (any ID from `keybinds.conf`), context menu items, including those without hotkeys, mouse paths (back/forward buttons, double-click open), the tab bar context menu, the bookmarks panel menu, and dialogs such as `Open With`.
* Privileged flows are excluded: sudo, polkit, and desktop portal operations never pass through the plugin dispatcher, and any override ID containing `sudo` is rejected at parse time.
* An override only fires when the plugin matches the current selection: `AppliesTo` and `Extensions` are checked against every selected item. If the plugin does not match, the built-in behavior runs unchanged.
* With an empty selection (background context menu), the override applies unconditionally.
* When several plugins override the same action, C++ plugins are tried first, then `.conf` plugins in alphabetical load order; the first plugin that returns "handled" wins.

### Supported Override Targets

Everything triggered by the action engine is overridable, including:

* Keyboard and menu file operations: `rename`, `cut`, `copy`, `paste`, `trash`, `delete_perm`, `new_folder`, `new_file`, `select_all`, `undo`, `redo`, `properties`.
* Opening flows: `open` (file opening; directory navigation is never overridden), `open_with`, `open_terminal`, `extract_here`, `extract_in`, `compress`.
* Clipboard and bookmarks: `copy_path`, `copy_name`, `copy_rel_path`, `bookmark`, `remove_bookmark`, `clear_trash`.
* Navigation and sorting: `go_back`, `go_forward`, `parent_dir`, `go_home`, `refresh`, `sort_name`, `sort_size`, `sort_date`, `sort_type`.
* Tabs: `new_tab`, `close_tab`, `reopen_tab`, `duplicate_tab`, `pin_tab`, `close_others`, `next_tab`, `prev_tab`.

***

## 6. Preview Plugins

Set `Type = preview` to replace the built-in preview pane for matching files:

```ini
Name = JSON Preview
Exec = python3 -m json.tool
Extensions = .json
Type = preview
```

Behavior:

* Preview plugins apply to plain files only; `Extensions` and `AppliesTo` are honored.
* The file path is appended as the last argument, and the working directory is the file's parent directory.
* The plugin runs with `ATLIFM_ACTION=preview`, merged `stdout`/`stderr`, and a 3-second time limit.
* Non-empty `stdout` is displayed as plain text in the preview pane.
* If the plugin fails, times out, or prints nothing, atlifm transparently falls back to the built-in preview.

***

## 7. Event Hooks

The `Hook` key runs a plugin in the background when application events occur:

```ini
Hook = on_start, on_navigate
```

| Event         | Fired when                                                   |
| ------------- | ------------------------------------------------------------ |
| `on_start`    | atlifm is launched.                                          |
| `on_navigate` | The current directory changes.                               |
| `on_select`   | The selection in the current directory changes.              |

* Event names are case-insensitive, and the keys `Hook` and `Hooks` are equivalent.
* All matching plugins run for each event, detached, with their output ignored.
* Hooks receive the same environment variables as regular runs. `on_start` and `on_navigate` fire with an empty path list, so `ATLIFM_FILE` is empty and `ATLIFM_TARGET` falls back to the current directory; `on_select` receives the current selection.

***

## 8. Script Plugins

Any executable file named `*.sh`, `*.py`, or `*.bash` inside the plugins directory is registered as a plugin automatically:

* The plugin ID is the file name without the extension (`backup.py` has the ID `backup`).
* The menu label defaults to the ID, and the script runs directly via its shebang.
* Script plugins behave like a plain `Detach = false` plugin with `AppliesTo = any` and no extension filter.
* A same-named `.conf` file takes precedence and disables the script entry.
* The file must be executable (`chmod +x`) or it is not discovered.

Example `~/.config/atlifm/plugins/count_lines.sh`:

```bash
#!/bin/sh
# counts lines in each selected file
for f in "$@"; do
    wc -l "$f"
done
```

Its output appears in the overlay when the script is launched from the `Plugins` submenu.

***

## 9. C++ plugins (ABI v1)

plugins are shared libraries (`*.so`) placed in the plugins directory and loaded in-process. They use a stable C ABI declared in `atlifm-core/atlifm-plugin-api.h` and participate in the same menus, keybindings, override dispatcher, preview pane, and hook system as `.conf` plugins.

### Building and Installing

```sh
c++ -shared -fPIC -Iatlifm-core -O2 -o hello.so hello-plugin.cpp
mkdir -p ~/.config/atlifm/plugins
cp hello.so ~/.config/atlifm/plugins/
```

A complete example lives in `examples/hello-plugin/hello-plugin.cpp`. The library exports two symbols:

| Symbol                                        | Required | Purpose                                                                                      |
| --------------------------------------------- | -------- | -------------------------------------------------------------------------------------------- |
| `int atlifm_plugin_init(const AtlifmHostApi*)` | Yes      | Registers the plugin's capabilities. Return `0` on success; any non-zero value aborts loading. |
| `void atlifm_plugin_shutdown(void)`            | No       | Called right before the library is unloaded at application exit.                              |

Always validate the ABI before registering:

```c++
extern "C" int atlifm_plugin_init(const AtlifmHostApi* api) {
    if (!api || api->abi_version != ATLIFM_PLUGIN_ABI_VERSION) return 1;
    ...
}
```

Registrations are only accepted while `atlifm_plugin_init` runs; the host copies every descriptor and owns the registries afterwards.

### Host API

| Function                                       | Description                                                                                                                       |
| ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `host_version()`                                | atlifm version string.                                                                                                            |
| `output_write(text)`                            | Appends text to the terminal output overlay of the current run. Available inside actions and overrides, not inside hooks.         |
| `notify(message)`                               | Shows a short status bar message.                                                                                                 |
| `run_command(line, detach)`                     | Runs an external command. `detach = 0` streams merged output into the current overlay; `detach = 1` launches it in the background. Selection paths are appended to the command line like for `.conf` plugins. Returns `0` on success. |
| `refresh()`                                     | Reloads directory listings and bookmarks after on-disk changes.                                                                   |
| `register_action(desc)`                         | Registers a menu action; see below. Returns `0` on success.                                                                       |
| `register_override(action_id, fn, user)`        | Intercepts a built-in action; see below. Returns `0` on success.                                                                  |
| `register_preview(extensions, render, user)`    | Replaces the preview pane for matching extensions; `extensions` is required.                                                      |
| `register_hook(event, fn, user)`                | Subscribes to `on_start`, `on_navigate`, or `on_select`.                                                                          |
| `log(level, message)`                           | Writes to the atlifm log (`info`, `warning`, `error`).                                                                            |

### Invocation Context

Every callback receives an `AtlifmInvocation`:

```c++
typedef struct AtlifmInvocation {
    uint32_t struct_size;
    const char* event;
    const char* action;
    const char* cwd;
    const char* const* selection;
    size_t selection_count;
} AtlifmInvocation;
```

All strings are UTF-8 and remain valid only for the duration of the call; copy anything you need to keep.

### Actions

```c++
static int hello(const AtlifmInvocation* inv, void* user) {
    auto* api = static_cast<const AtlifmHostApi*>(user);
    api->output_write("hello from plugin\n");
    return 0;
}

AtlifmActionDesc d{};
d.struct_size = sizeof d;
d.id = "hello_banner";
d.name = "Hello Banner";
d.description = "Example action";
d.keys = "Ctrl+Alt+H";
d.applies_to = "any";
d.extensions = ".log,.txt";
d.run = hello;
d.user = const_cast<AtlifmHostApi*>(api);
api->register_action(&d);
```

Actions appear in the `Plugins` submenu, can be rebound in `keybinds.conf`, and show up in the cheat sheet (`F1`) under `PLUGINS`. The optional `enabled` callback hides the entry when it returns `0` or less. Action IDs must be unique across all plugins.

### Overrides

```c++
api->register_override("rename", on_rename, user);
```

Return `1` to consume the event, or `0` to fall back to the next plugin in the chain, then to built-in behavior. Native overrides are tried before `.conf` overrides. The override surface, matching rules, and sudo protection described in section 5 apply unchanged.

### Previews

```c++
static void render(const char* path, AtlifmWriteFn write, void* write_user, void* user) {
    const char* text = "custom preview\n";
    write(write_user, text, std::strlen(text));
}
api->register_preview(".hello", render, user);
```

`render` runs in a worker thread: only call `write()` from it and never touch the UI or other host functions. Empty output falls back to the built-in preview.

### Hooks

`register_hook("on_start" | "on_navigate" | "on_select", fn, user)` subscribes to the same events as `.conf` hooks. Hooks run in the GUI thread, share the invocation context, and have no output overlay.

### Protection, Precedence, and Failure Handling

* IDs containing `sudo` (case-insensitive) are rejected for actions and overrides; sudo, polkit, and portal flows never reach the dispatcher.
* A `.conf` or script plugin with the same base name takes over the `Plugins` menu entry, but the plugin keeps servicing its overrides, previews, and hooks.
* A library that fails to load (missing symbol, ABI mismatch, non-zero `atlifm_plugin_init`) is skipped, its registrations are rolled back, and the reason is written to the atlifm log.
* All callbacks except the preview `render` run in the GUI thread, keep them fast and delegate heavy work to `run_command`.

***

## 10. Practical Plugin Examples

### Example A: Code Editor Launcher

Launch VS Code on selected files or folders without capturing output:

`~/.config/atlifm/plugins/vscode.conf`

```ini
Name = Open in VS Code
Exec = code
AppliesTo = any
Detach = true
Description = Launch Visual Studio Code on selected items
Action = open_in_vscode
Keys = Ctrl+Alt+V
```

### Example B: Git Diff Viewer

Inspect changes for a file in the interactive terminal overlay:

`~/.config/atlifm/plugins/git_diff.conf`

```ini
Name = Git Diff
Exec = git diff
AppliesTo = files
Detach = false
Description = View git diff in terminal overlay
Action = git_diff
Keys = Ctrl+Alt+D
```

### Example C: Image Optimizer

Optimize PNG files in place using `oxipng`:

`~/.config/atlifm/plugins/optimize_png.conf`

```ini
Name = Optimize PNG
Exec = oxipng -o 4 --strip all
Extensions = .png
AppliesTo = files
Detach = false
Description = Losslessly compress PNG images
```

### Example D: Custom Terminal Launcher Override

Override the built-in terminal action with a specific terminal emulator:

`~/.config/atlifm/plugins/foot_term.conf`

```ini
Name = Launch Foot Terminal
Exec = foot
AppliesTo = any
Detach = true
Description = Open Foot terminal in current directory
Override = open_terminal
```

### Example E: Preview Plugin for Markdown

Render a Markdown outline directly into the preview pane:

`~/.config/atlifm/plugins/md_outline.conf`

```ini
Name = Markdown Outline
Exec = grep -n "^#"
Extensions = .md, .markdown
Type = preview
Description = Show Markdown headings as a text outline
```

Files without headings produce an empty output, so the built-in preview is used automatically.

### Example F: Event Hook for a Session Log

Append every visited directory to a log file:

`~/.config/atlifm/plugins/nav_log.sh`

```bash
#!/bin/sh
printf '%s\n' "$ATLIFM_DIR" >> "$HOME/atlifm-navigation.log"
```

```ini
# ~/.config/atlifm/plugins/nav_log.conf
Name = Navigation Log
Exec = /home/user/.config/atlifm/plugins/nav_log.sh
Hook = on_navigate
```

***

## 11. Tips and Troubleshooting

* Invalid `Action` or `Override` values never fail silently: hover the plugin entry in the `Plugins` submenu to see the rejection reason.
* Use `ATLIFM_CONFIG_DIR` for an isolated test profile: `ATLIFM_CONFIG_DIR=/tmp/atlifm-test atlifm`.
* Prefer absolute paths for GUI launchers so the command resolves regardless of `PATH`.
* Detached plugins never block the interface, and streaming plugins keep atlifm fully responsive while the overlay fills.
* Preview plugins should print plain text; ANSI color sequences are shown literally since the preview page is a plain text viewer.
* plugins: verify your compiler flags (`-shared -fPIC`) and the ABI check; a non-zero return from `atlifm_plugin_init` quietly skips the library. Keep action IDs unique and remember that preview `render` runs off the GUI thread.
