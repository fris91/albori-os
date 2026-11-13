# Verification Log

Records of build, flash, and runtime verification results.

## 2026-11-11 — Initial workspace and upstream UI

The Albori surface replaced the upstream mobile menu composition rather than patching only icons and colours. Ten kit paths were rendered, plus Home and Settings in light mode, and Home/Control/Personalisation at 320×700. Qt5 UI screenshots are in `docs/previews/`. All assets and fonts load locally. The shell now injects real Ayatana Sound and DateTime indicator menus into Home. Incremental build and smoke test complete successfully. Service data is not verifiable in the test mocks and must be confirmed in a live phone session.

## 2026-11-12 — Boot fix and device flash

**Problem:** The device (Lenovo TB-8505F) hung at the splash screen after flashing. Root cause: the lomiri binary in the composed image was built with `.` as the install prefix, producing `/./ ` paths that the dynamic linker cannot resolve.

**Fix:** Rewrote `tools/compose-lenovo-image-wsl.sh` to validate that no binary in the stage contains `/./ ` paths before writing the image. The compose script now also uses a here-string for the binary check to avoid SIGPIPE false failures under `pipefail`. The device boots to the Lomiri session after reflashing.

## 2026-11-12 — Albori UI surface on tablet

**Problem:** The Albori surface was not appearing on the TB-8505F. The activation condition in `Shell.qml` checked `usageScenario === "phone"`, which is never true on a tablet.

**Fix:** Changed the condition to `usageScenario !== "desktop"`. The surface now activates on both phone and tablet form factors.

**Problem:** The UI appeared at half the intended size. The Albori design system uses 1 gu = 8 px; on the device `units.gu(1)` is larger than 8 px, causing the surface to render at a fraction of its design size.

**Fix:** Wrapped the surface in a scale transform: `designScale = Math.max(1, units.gu(1) / 8)`. Width and height are divided by the scale, then the item is scaled back up with `transformOrigin: TopLeft`.

## 2026-11-12 — Keyboard text fix (pending device confirmation)

**Problem:** Keyboard characters were missing or unreadable on the PowerVR GE8320 GPU. Qt's distance-field glyph cache does not render correctly on this GPU.

**Fix applied:** Added systemd drop-ins in `config/tb8505f-overlay/`:
- `usr/lib/systemd/user/maliit-server.service.d/50-albori-powervr-text.conf`: sets `QML_DISABLE_DISTANCEFIELD=1` and `UC_SHAPE_MIPMAPS=1`
- `usr/lib/environment.d/50-albori-powervr.conf`: sets `UC_SHAPE_MIPMAPS=1` for all user services

**Status:** Fix is in the image. Confirmation on device pending.

## Known unverified items

- Network indicator action names (`wifi.enable`, `airplane.enabled`, `mobiledata.enabled`) — assumed from indicator source code, not confirmed at runtime.
- In-app back gesture — the side-edge swipe returns to the previous Albori screen, not to the previous page inside an app (Ubuntu Touch apps do not expose a system-level back action).
- Task manager live previews — cards show icon and name only; live screenshots are not available from the QML app model.
