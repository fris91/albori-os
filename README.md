# Albori OS

A privacy-first mobile operating system built on Ubuntu Touch, with an original Linux-native UI.

Albori runs on Android hardware using [Halium](https://halium.org/), replaces the Google/Apple stack entirely, and gives the user full control over their device — from the kernel up. It is not a fork of Android. It is a Linux-first, open-source mobile OS with its own identity, its own UI, and its own ecosystem built around freedom.

> **Status:** pre-alpha — currently developed and tested on the Lenovo TB-8505F (MT6761, PowerVR GE8320).

---

## Table of Contents

- [Why Albori](#why-albori)
- [Architecture](#architecture)
- [Repository Layout](#repository-layout)
- [Getting Started](#getting-started)
- [Building & Flashing](#building--flashing)
- [Contributing](#contributing)
- [License](#license)

---

## Why Albori

Every major mobile OS today is built around a business model, not a user model. Android is Google's data collection infrastructure. iOS is Apple's walled garden. Both track your location, your app usage, your contacts, and your behaviour.

Albori ships with:

- No Google Play Services, Firebase, or any Google/Meta framework
- No telemetry or usage reporting — not even anonymised
- No mandatory account to use the device
- Encrypted storage on by default
- DNS-over-HTTPS with a privacy-respecting resolver
- Per-app controls for camera, microphone, and location built into the system UI
- Open-source from kernel to UI — auditable by anyone

## Architecture

```
Albori UI (QML / Qt)         ← this repository
      │
Lomiri shell (Ubuntu Touch)  ← patched upstream
      │
Halium (Linux + Android drivers)
      │
Android hardware (vendor blobs untouched)
```

Albori overlays its own QML surface on top of [Lomiri](https://gitlab.com/ubports/development/core/lomiri), the Ubuntu Touch shell. Halium reuses the device's existing Android drivers without requiring them to be open source, enabling broad hardware support without vendor cooperation.

## Repository Layout

```
albori-os/
├── sources/            # Git clones of patched upstreams (gitignored, rebuilt by bootstrap)
├── patches/            # Albori diffs against upstream — the versioned delta
├── branding/           # QML UI surface, themes, icons, fonts, design tokens
├── config/             # Device overlays and system configuration
├── design/             # Design system reference (source of truth for the UI)
├── device-ports/       # Per-device port notes and overlay configs
├── docs/               # Architecture decisions, build guide, roadmap, verification
├── tests/              # Automated tests for the native UI surface
├── tools/              # WSL build scripts, image compose and verify tools
└── workspace.lock.json # Pinned upstream URLs, branches and commits
```

`sources/` contains full Git clones and is excluded from this repository. It is rebuilt deterministically from `workspace.lock.json` using the bootstrap tool.

## Getting Started

**Requirements:** Python 3.10+, Git, WSL2 (for image build on Windows).

```sh
python tools/workspace.py bootstrap   # clone and patch upstreams
python tools/workspace.py check       # verify workspace state
python -m unittest discover -s tests -v
```

`bootstrap` clones the full history, creates the working branch from the pinned commit, and applies patches to fresh clones only. It does not overwrite local changes. If a clone is interrupted, resolve it manually before retrying.

To export changes back to patches after editing a source:

```sh
git add -N <path/to/changed/file>
python tools/workspace.py export
```

## Building & Flashing

See [docs/BUILD.md](docs/BUILD.md) for the full build guide.

Quick reference for the Lenovo TB-8505F from WSL:

```bash
# Build the system image
sudo bash tools/compose-lenovo-image-wsl.sh
sudo bash tools/verify-albori-image-wsl.sh

# Flash (PowerShell, device in fastboot mode)
fastboot flash system build\arm64\images\albori-os-tb8505f-prealpha.img
fastboot reboot
```

## Contributing

Contributions are welcome at every level — code, device ports, app development, testing, and translation. See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

The only requirement is that you share our commitment to user privacy and software freedom.

## License

Source files authored by the Albori OS project are released under the **GNU General Public License v3.0** (see [LICENSE](LICENSE)).

Third-party components (Lomiri, Ubuntu Touch, lomiri-ui-toolkit) retain their original licenses. See [docs/LICENSES.md](docs/LICENSES.md) for a full inventory.
