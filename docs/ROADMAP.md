# Roadmap

Phases and exit criteria for Albori OS development. No release dates are promised until hardware and test environments are confirmed. Phone calls, modem behaviour, emergency services, and battery life require real-device testing; static analysis cannot substitute for them.

| Phase | Deliverable | Exit criteria | Status |
|-------|-------------|---------------|--------|
| 0 | Reproducible upstream workspace | Full clones, lock file, branches, patches, and licence inventory | ✅ Done |
| 1a | Initial branding, launcher, and Settings | Source changes exported, local controls pass | ✅ Done |
| 1b | Full Albori UI surface | Qt5 build and tests pass; session and device trial; contrast, scaling, and gesture verified | ✅ Done (pre-alpha) |
| 2 | Hardware and kernel — Lenovo TB-8505F | Boot, recovery, telephony, Wi-Fi, audio, camera, suspend, encryption verified on device | 🔄 In progress |
| 3 | Packages and images | Signed repository, reproducible build, SBOM, OTA update and rollback | ⏳ Planned |
| 4 | Privacy feature layer | Per-app firewall, granular permissions, VPN one-tap, network activity monitor in system UI | ⏳ Planned |
| 5 | Albori Marketplace | Curated app catalog, privacy standard enforced, submission workflow | ⏳ Planned |
| 6 | Additional device ports | Community port tooling, compatibility list, CI for image builds | ⏳ Planned |
| 7 | Local AI (opt-in) | Model licences verified, RAM/power/latency benchmarked, offline operation, sandboxed | 💡 Designed |
| 8 | Desktop continuity | Pairing, granular permissions, disconnect and revoke tested | 💡 Designed |

For the strategic vision behind these phases, see [VISION.md](VISION.md).
