# Licences and Attribution

Files in `COPYING*`, headers, and `debian/copyright` inside each source clone are preserved as-is. This document is a preliminary technical analysis to organise development. A full per-file and per-dependency review is required before any distribution.

## Albori OS project files

Source files authored by the Albori OS project are released under the **GNU General Public License v3.0** (`GPL-3.0-or-later`). See the top-level [LICENSE](../LICENSE) file.

## Third-party components

| Component | Observed licence | Role |
|-----------|-----------------|------|
| [lomiri](https://gitlab.com/ubports/development/core/lomiri) | GPL-3.0-or-later | Shell and launcher — UI patches applied |
| [lomiri-system-settings](https://gitlab.com/ubports/development/core/lomiri-system-settings) | GPL-3.0-or-later | Settings app — category list and branding patches applied |
| [lomiri-ui-toolkit](https://gitlab.com/ubports/development/core/lomiri-ui-toolkit) | LGPL-3.0-or-later | QML component library — reference clone, no patches |
| [lomiri-schemas](https://gitlab.com/ubports/development/core/lomiri-schemas) | LGPL-2.1-or-later | GSettings and AccountsService schemas — installed from pinned source |
| Geist (font) | SIL Open Font Licence 1.1 | UI typeface |
| Bodoni Moda (font) | SIL Open Font Licence 1.1 | Display typeface |
| Lucide Icons | ISC Licence | UI iconography |

## Notes

- Ubuntu Touch as a whole is a collection of packages, root filesystem, and device ports with varied licences. Consult each package's `debian/copyright` for authoritative information.
- Vendor driver blobs on the device are proprietary and are not redistributed by this project. Halium reuses them in place on the device without modification.
- The design system assets provided under `design/reference/` are project-internal reference material and are not redistributed.
