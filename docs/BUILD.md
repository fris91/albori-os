# Build Guide

This guide covers building the Albori OS system image for the Lenovo TB-8505F and running the UI preview on a development machine.

## Prerequisites

| Tool | Version | Purpose |
|------|---------|---------|
| Python | 3.10+ | Workspace tooling |
| Git | 2.x | Source management |
| WSL2 | Ubuntu 22.04+ | Image composition (Windows) |
| Clickable | 8.7+ | arm64 cross-compilation |
| Docker | 20.10+ | Clickable build environment |
| fastboot | any | Device flashing |

On Windows, `fastboot` is bundled with Android SDK Platform Tools. If it is not in your PATH, locate it with:

```powershell
Get-ChildItem -Path $env:LOCALAPPDATA -Recurse -Filter fastboot.exe -ErrorAction SilentlyContinue |
  Select-Object -First 1 -ExpandProperty FullName
```

Then set an alias for the session:

```powershell
Set-Alias fastboot "C:\path\to\fastboot.exe"
```

## Workspace Bootstrap

```bash
python tools/workspace.py bootstrap   # clone and patch all upstreams
python tools/workspace.py check       # verify state
python -m unittest discover -s tests -v
```

## UI Preview (desktop, no device required)

From WSL:

```bash
bash tools/run-design-wsl.sh
```

Opens **Albori OS · Native Preview** directly in a Qt window. Requires `qmlscene` and the lomiri QML imports from the patched sources.

## Building the System Image

### Quick rebuild (QML changes only)

When only QML files changed and the stage is already populated, skip the compilation step:

```bash
cd /mnt/e/workspace/albori-os
sudo bash tools/compose-lenovo-image-wsl.sh
sudo bash tools/verify-albori-image-wsl.sh
```

### Full rebuild (C++ or QML changes)

```bash
sudo bash tools/rebuild-tb8505f-image-wsl.sh
```

This builds the Settings and Shell packages (arm64, via Clickable), then runs compose and verify. Set `REBUILD_SHELL=1` to force a shell rebuild even if the binary is present.

### What compose does

1. Mounts the base `ubuntu.img` (ext4, ~4 GB) from the verified UBports port.
2. Rsyncs `sources/lomiri/.clickable/arm64/stage/usr/` and `stage/etc/` onto the image, excluding build-only directories (`include/`, `cmake/`, `pkgconfig/`, `doc/`).
3. Applies `config/tb8505f-overlay/` with correct ownership and permissions.
4. Validates that no binary contains `/./ ` paths (a sign of a stage built with prefix `.`).
5. Checks that `Shell.qml`, `liblomiri-private`, the Lomiri QML directory, and `lomiri-systemd-wrapper` are present.

Output: `build/arm64/images/albori-os-tb8505f-prealpha.img`

## Flashing

Boot the device into Fastboot Mode: hold **Volume Down + Power** until the fastboot screen appears.

From PowerShell:

```powershell
fastboot flash system E:\workspace\albori-os\build\arm64\images\albori-os-tb8505f-prealpha.img
fastboot reboot
```

> **Tip:** Save a backup before flashing a new image:
> ```bash
> cp --sparse=always build/arm64/images/albori-os-tb8505f-prealpha.img \
>    build/arm64/images/albori-os-tb8505f-last-known-good.img
> ```

## Exporting Upstream Patches

After editing files inside `sources/<component>/`:

```bash
git add -N path/to/changed/file
python tools/workspace.py export
```

This regenerates the patch files in `patches/`. Do not edit patch files directly.

## Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| Boot hangs after splash | Binary built with `.` prefix paths in stage | Run compose; the script validates and rejects stale stages |
| `fastboot` not recognised | Not in PATH | Use the PowerShell snippet above to locate and alias it |
| Keyboard characters missing | PowerVR GPU distance-field cache corruption | Overlay drop-ins set `QML_DISABLE_DISTANCEFIELD=1`; reflash the image |
| Compose exits with SIGPIPE error | Old version of compose script | Pull latest; the script uses here-strings instead of pipes for binary checks |
