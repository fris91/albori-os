# Upstream Analysis

Initial analysis of upstream README files and official documentation before cloning; followed by inspection of CMake configurations, build systems, and licence inventories at the commits pinned in `workspace.lock.json`.

Ubuntu Touch is a collection of packages, a root filesystem, and hardware ports — no single repository constitutes a complete distribution. Four active upstreams were selected for the first phase:

| Component | Build system and structure | Albori role |
|-----------|---------------------------|-------------|
| [lomiri](https://gitlab.com/ubports/development/core/lomiri) | `qml/` shell/launcher/wizard, `src/` C++, `tests/`, `debian/`; CMake ≥3.7, Qt5; `clickable.yaml` requires Clickable ≥8.7, framework `ubuntu-touch-24.04-1.x`, amd64 | Minimal UI patches on Drawer, Shell, and Albori surface injection |
| [lomiri-system-settings](https://gitlab.com/ubports/development/core/lomiri-system-settings) | `src/qml/`, `plugins/`, `lib/`, `tests/`, `debian/`; CMake ≥3.24, C++17 and Qt5, GSettings, D-Bus, polkit, systemd | Category list and branding; existing backends untouched |
| [lomiri-ui-toolkit](https://gitlab.com/ubports/development/core/lomiri-ui-toolkit) | Components, themes, examples, tests and packaging; CMake/Qt5/Qt6 | Reference clone only; no patches applied |
| [lomiri-schemas](https://gitlab.com/ubports/development/core/lomiri-schemas) | CMake ≥3.16, data-only project; GSettings and AccountsService interfaces; LGPL-2.1+ | Schemas 0.1.13 installed from pinned source inside the dev container to satisfy the main shell's runtime requirement; no patches |

The UI toolkit main branch does not guarantee binary compatibility with the Qt5 shell. Use the dependencies from the Clickable build environment for Lomiri tests. Validate packages together before replacing distribution toolkit components. Legacy GitHub `unity8` repositories redirect to the GitLab development tree.

**Sources:** [UBports system development docs](https://docs.ubports.com/en/latest/systemdev/index.html), [local testing and crossbuilder](https://docs.ubports.com/en/latest/systemdev/testing-locally.html), README and build files from the four clones. Pinning `main` is a development baseline, not a certification of a package set for a stable OTA channel.
