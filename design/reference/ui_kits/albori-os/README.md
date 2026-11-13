# Albori OS — mobile UI kit

- `index.html` — navigable prototype (one phone, jump chips, theme and navigation toggles).
- `screens.html` — all screens front-on, plus Home and Settings in light and dark.
- `os-shell.jsx` — `useOS` state, `Phone` wrapper (status bar, wallpaper, nav bar, transitions), `Header`.
- `screens-a.jsx` — Lock, Home, Drawer + universal search, Control centre.
- `screens-b.jsx` — Settings, Privacy, Personalizzazione.
- `screens-c.jsx` — Multitasking, Store (catalogue + app page), Updates, stub.
- `kit.css` — screen transitions and a few layout helpers.

Screens are registered on `window.AlboriScreens` by key (`lock`, `home`, `drawer`, `control`, `settings`, `privacy`, `personal`, `multitask`, `store`, `updates`). Render any of them with `<Phone initial={{ screen: 'home', themeMode: 'Chiaro' }} />`.

These screens are designed from the product brief; the codebase contains no UI for them beyond colours and sizes.
