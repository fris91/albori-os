# Albori OS — Design System

Albori OS is an experimental European, privacy-minded mobile operating system built on the UBports / Ubuntu Touch and Lomiri upstreams. The name means "dawn / beginnings". The product goal: a phone you would want to use every day — Italian high-end feel (precision, speed, restraint) without automotive decoration.

**One product surface:** the mobile shell (lock screen, home, app drawer, control centre, settings, store, updater).

## Sources

- `albori-os/` (attached codebase; repo `fris91/albori-os`, private). Read: `README.md`, `branding/tokens.json`, `branding/albori-logo.svg`, `branding/albori-splash.png`, `docs/adr/0002-mobile-design.md`, `docs/adr/0004-project-name.md`, `docs/ROADMAP.md`, colour/size values in `patches/lomiri.patch` and `patches/lomiri-system-settings.patch`.
- The product brief (Italian) supplied when this system was created: palette, ten screens, icon pack, motion and accessibility requirements.

**What the codebase defines:** obsidian `#101114`, surface `#1B1D22`, text `#F5F4F0`, muted `#B7BBC5`, accent yellow `#FFD43B`; grid unit (gu) with spacing 2gu, rows/touch targets 7gu, corner radius 3gu; "system sans-serif"; the half-sun logo. It defines **no component library** — every component here is authored from the brief (see Intentional additions).

**Where brief and codebase differ:** the codebase accent is yellow `#FFD43B`; the brief asks for a "dawn light" accent between amber and coral. This system uses **Alba `#F5834A`** as the default accent and keeps the codebase yellow as the selectable accent **Sole**. The logo is recoloured to Alba orange (original yellow files kept).

## Concept

- **Three materials, one light.** Ossidiana, grafite, porcellana for everything; the dawn accent only for the primary action, selections and small identity details (the clock colon, the top edge of the app drawer, the glow at the base of every app icon).
- **Flat lists, hairlines, pills.** Long menus are full-bleed rows with inset hairlines — not stacks of rounded cards. Containers use 24px (3gu), controls are pills.
- **Glass only over the wallpaper** (notifications, dock, widgets, search). Everything else is opaque.
- **A Bodoni clock.** The one serif in the system, for the lock-screen time and large numerals.
- **State never by colour alone.** Switches carry I/O marks, toggles show a state word, badges pair tone with an icon.

## Content fundamentals

- **Language:** natural Italian. Sentence case everywhere ("Scarica e installa", never "Scarica E Installa" or all caps). The only uppercase is the 11px overline section label.
- **Person:** informal "tu", mostly implied through imperatives: "Scorri in su per sbloccare", "Tocca per attivare". The system never says "io/noi".
- **Buttons:** verb first, 1–3 words: "Installa", "Riavvia e installa", "Chiudi tutte", "Rispondi".
- **Subtitles:** a comma list of what's inside: "Wi-Fi, rete mobile, Bluetooth".
- **Facts over promises:** say what happened, when, and how to check it. "Fotocamera usata da Messaggi ieri alle 21:14", "Firma del pacchetto valida · controllata il 9 nov 2026", "Il registro è salvato solo su questo dispositivo". Never "sicuro al 100%", "impossibile da violare".
- **Numbers:** Italian formatting — decimal comma ("1,4 GB"), 24-hour time ("07:12"), short dates ("mar 11 nov"), middle dot `·` as separator.
- **Empty and error states:** plain and useful: "Nessun risultato per “gi”. Prova con il nome di un’app, di un contatto o di un file."
- **No emoji, no exclamation marks, no "Ops!".**

## Visual foundations

- **Colour:** neutrals `--obsidian-*`, `--graphite-*`, `--porcelain-*`; accent ramp `--alba-200…800`. Semantic aliases (`--bg`, `--surface-1/2/3`, `--fg-1/2/3`, `--accent`, `--accent-text`, `--on-accent`, `--hairline`) switch under `[data-theme="light"]`; dark is the default. Alternative accents via `[data-accent="sole|corallo|salvia|adriatico"]`. Status colours are muted and always sit on their `-soft` tint.
- **Type:** Geist (UI), Bodoni Moda (clock/display only), Geist Mono (versions, hashes). Tabular numerals on by default. Scale 11/13/15/17/20/24/32/44, all multiplied by `--text-scale` (0.85–1.3) for the user text-size setting.
- **Spacing:** 4/8/12/16/24/32/48/64; screen margin 16; rows 56 min; touch minimum 48.
- **Radii:** one logic — containers 24, nested 12–16, tiny 6, controls pill, app icons 28%. Device 48.
- **Backgrounds:** the Alba wallpaper is CSS only — a vertical sky, a horizon line at 78%, a half sun and a soft glow, all from `--wall-*` tokens so it follows theme. Variants: `foschia` (glow only), `ossidiana` (solid). No photos, no patterns, no textures. App screens are solid `--bg`.
- **Gradients:** only in the wallpaper and the 2-stop app-icon tile. Never on buttons, cards or text.
- **Borders and shadows:** 1px hairlines (`--hairline`, 10% of foreground) do the layering. `--shadow-2` only for sheets. No inner shadows, no glows.
- **Transparency and blur:** `--surface-glass` + 24px blur, only for elements floating on the wallpaper; a 56% scrim behind control centre, drawer and switcher.
- **Cards:** rare. `--surface-1`, radius 24, no border in dark, hairline in light. Never a coloured left border.
- **Motion:** press 90ms; toggles 160ms; control centre and return to Home 240ms; app open and app switch 320ms. `--ease-scatto` (.2,.9,.25,1) for entrances, `--ease-standard` (.3,0,0,1) for moves, `--ease-exit` for exits. No bounces, no springs past the target. App open scales from 96%; Home settles from 104%; control centre drops 24px from the top; sheets rise 32px. **Riduci movimento** (`[data-motion="reduced"]` or the OS media query): no travel or scale — 120ms cross-fades. These describe intended behaviour, not measured performance.
- **Hover / focus / press:** hover = `--state-hover` overlay (6%); press = `--state-press` (12%) plus scale .97 on buttons and .94 on app icons; focus = 2px `--focus-ring` outline, offset 2.
- **Fixed elements:** status bar 44px top (tap opens control centre), navigation 28px bottom (gesture pill) or 48px (three buttons).
- **Navigation:** gestures — swipe up from the bottom edge = Home, swipe up and hold = app switcher, swipe from a side edge = back, swipe down from the top = control centre. Accessible alternative: three buttons (Indietro, Home, App recenti), set with `NavBar mode="buttons"`.

## Iconography

- **UI icons:** [Lucide](https://lucide.dev) 0.460, loaded from CDN by the `Icon` component. 24px grid, 1.75 stroke, round caps, `currentColor`. The codebase ships no icon set of its own (it inherits Lomiri's Suru icons, not copied here) — **Lucide is a substitution.**
- **App icons:** `AppIcon` puts a Lucide glyph on the Albori tile: 28% radius, 2-stop graphite (or porcelain) surface, 1px machined edge, accent glow rising from the bottom edge. Five styles: `auto`, `grafite`, `porcellana`, `alba`, `contorno`. The 16 system apps are in `ALBORI_APPS`. The glyphs are stock Lucide, not bespoke drawings — a real icon pack still needs to be drawn.
- **Logo:** primary `assets/albori-logo-alba.svg` + `assets/albori-splash-alba.png` — the codebase mark recoloured: half sun as a vertical gradient Sole `#FFD43B` → Alba `#F5834A`, rays in Alba 700 `#B4512B`, on `#101114`. Originals in Sole yellow `#FFD43B` kept as `assets/albori-logo.svg` / `albori-splash.png`. The ADR marks the logo as provisional.
- **Emoji and unicode symbols:** not used as icons.

## Index

- `styles.css` — entry point; imports `tokens/*.css` and `components/components.css`.
- `tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `motion.css`, `base.css`.
- `assets/` — logo SVG/PNG, splash PNG.
- `guidelines/` — specimen cards (Colors, Type, Spacing, Motion, Brand).
- `components/` — React components, each with `.d.ts` and `.prompt.md`.
- `ui_kits/albori-os/` — `index.html` (navigable prototype), `screens.html` (all screens + light/dark comparison), screen sources.
- `SKILL.md` — agent skill entry.

### Components

- **core:** Icon, Button, IconButton, Badge, Chip, ProgressBar
- **forms:** Switch, Checkbox, Radio, Slider, SearchField, SegmentedControl
- **lists:** ListRow, ListGroup, SectionHeader
- **system:** AppIcon, StatusBar, NavBar, QuickToggle, NotificationCard, Sheet, Wallpaper, PhoneFrame

### Intentional additions

The codebase defines no components, so the whole set above is authored from the brief. Beyond a standard set: `Icon` (wrapper for the Lucide glyphs), `AppIcon`, `StatusBar`, `NavBar`, `QuickToggle`, `NotificationCard`, `Wallpaper`, `PhoneFrame` (needed to build OS screens).

## Caveats

- Fonts are Google Fonts substitutes for "system sans-serif"; no font binaries are shipped.
- Accent differs from the codebase (see above).
- App-icon and UI glyphs are Lucide, not an original drawn set.
- Screens are design intent; nothing here is implemented in the Lomiri shell.
