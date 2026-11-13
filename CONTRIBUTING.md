# Contributing to Albori OS

Thank you for your interest in contributing. Albori is built in public and welcomes contributions at every level.

## Code of Conduct

Be respectful. We are building a project around user freedom — treat contributors the same way.

## Ways to Contribute

### Developers
The UI is built in QML/Qt on top of Lomiri (the Ubuntu Touch shell). If you know QML, C++, or Linux system programming, there is work for you. Start by reading [docs/BUILD.md](docs/BUILD.md) and the architecture overview in the README.

### Device Porters
If your device has an unlockable bootloader and an existing Ubuntu Touch or Halium port (Android 9 / Halium 9 or Android 11 / Halium 11), you can bring Albori to it. See [device-ports/](device-ports/) for existing port notes and tooling.

### App Developers
Build a native app for Albori using the QML SDK. Apps that meet our privacy standards will be listed in the Albori Marketplace. Requirements: open source or auditable privacy policy, no telemetry or tracking libraries, all network connections declared.

### Testers
Flash Albori on a supported device and report what breaks. Bug reports, hardware compatibility notes, and UX feedback all move the project forward. Open an issue with your device model, the image version, and steps to reproduce.

### Translators
Albori should be accessible in every language. UI strings live in `branding/`. Open a pull request with your translations or reach out first if the language is not yet set up.

## Development Workflow

1. Fork the repository and create a branch from `albori/main`.
2. Make your changes. If you are modifying upstream sources, edit inside `sources/<component>/` and export with `python tools/workspace.py export`.
3. Run the test suite: `python -m unittest discover -s tests -v`.
4. Open a pull request against `albori/main` with a clear description of what changes and why.

## Commit Style

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(ui): add swipe-up gesture for home navigation
fix(keyboard): apply QML_DISABLE_DISTANCEFIELD for PowerVR GPUs
docs: translate BUILD.md to English
```

Keep commits focused. One logical change per commit.

## Patches to Upstream

Patches live in `patches/` and are exported from the source clones. Do not edit patch files directly — edit the source, then run `python tools/workspace.py export`. Each patch must apply cleanly to the pinned upstream commit in `workspace.lock.json`.

## Privacy Standard

All contributions to Albori must respect user privacy. We will not merge code that:

- Sends data to any third-party server without explicit user consent
- Introduces telemetry, analytics, or crash reporting without an opt-in
- Adds a dependency on Google, Meta, Apple, or Amazon services
- Circumvents the user's permission settings
