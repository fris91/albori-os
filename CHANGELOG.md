# Changelog

All notable changes to Albori OS are documented here.  
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).  
Versioning follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Albori UI surface: Home, Multitask (task manager), Drawer, Control Centre
- Bottom gesture navigation: swipe up → Home, hold → Multitask
- Edge gesture navigation: swipe from left/right edge → Back
- AlboriSystemControls: D-Bus bindings for Wi-Fi, Bluetooth, brightness, volume, torch, rotation, silent mode
- Design system integration: Geist and Bodoni Moda fonts, Alba accent `#F5834A`, design tokens
- Lenovo TB-8505F device port: compose, verify and rebuild tooling for WSL
- PowerVR GE8320 keyboard fix: `QML_DISABLE_DISTANCEFIELD=1`, `UC_SHAPE_MIPMAPS=1` via systemd drop-ins
- `config/tb8505f-overlay/`: device-specific system configuration overlay
- `tools/compose-lenovo-image-wsl.sh`: image composition with `/./ ` path validation and rsync overlay
- `tools/verify-albori-image-wsl.sh`: post-compose image integrity checks
- `tools/rebuild-tb8505f-image-wsl.sh`: one-shot build + compose + verify
- Albori Marketplace placeholder: curated app list from UBports catalog
- Full English documentation: README, CONTRIBUTING, CHANGELOG, all docs/

### Changed
- `Shell.qml`: `alboriSurfaceActive` now activates on tablet form factor (was phone-only)
- `Shell.qml`: Albori surface wrapped in a design-scale scaler (`units.gu(1)/8`)
- App IDs corrected for Ubuntu Touch 24.04 click package naming
- All project documentation translated from Italian to English

### Fixed
- Boot hang caused by lomiri binary built with `.` prefix paths in the stage
- Compose script false failure (`SIGPIPE` from `strings | grep -q` under `pipefail`)
- Keyboard characters missing or unreadable on PowerVR GPU
