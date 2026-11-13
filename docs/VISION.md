# Albori OS — Vision & Roadmap

*November 2026*

## What is Albori OS?

Albori OS is a mobile operating system built on Ubuntu Touch, designed for users who refuse to trade their privacy for convenience. It runs on Android hardware, replaces the Google/Apple stack entirely, and gives the user full control over their device — from the kernel up. Albori is not a fork of Android. It is a Linux-first, open-source mobile OS with its own identity, its own UI, and its own ecosystem built around freedom.

## The Problem We Solve

Every major mobile operating system today is built around a business model, not a user model. Android is Google's data collection infrastructure. iOS is Apple's walled garden. Both track your location, your app usage, your contacts, your behavior — and sell that data or use it to serve you ads. You have no real choice: opt out, and the phone stops working.

Users are not the customer. They are the product.

Albori OS exists to fix this. It runs no Google services, no Apple services, no telemetry by default. The user owns their device.

## Our Target User

Albori is not for everyone — and that is a feature, not a bug.

Our user is someone who has already made a conscious choice to leave the mainstream mobile ecosystem. They may be a developer or engineer who runs Linux on their desktop and wants the same on their phone, a journalist or activist who needs genuine privacy guarantees, a privacy-conscious individual tired of surveillance capitalism, or an open-source enthusiast who wants full control over their hardware.

They do not need TikTok. They need a phone that does not spy on them.

## Privacy by Design

Privacy is not an add-on in Albori — it is the architecture.

Albori ships with no Google Play Services, no Firebase Analytics, no ad SDKs, no telemetry, and no mandatory account. Encrypted storage is on by default. DNS-over-HTTPS with a privacy-respecting resolver is the default network path. Per-app controls for camera, microphone, and location are built into the system UI.

Because Albori is built on Ubuntu Touch (which runs on Linux), there is no Android permission model to work around, no hidden system services, and no manufacturer bloatware. The codebase is open source from kernel to UI — auditable by anyone.

## App Ecosystem Strategy

We do not compete with the Google Play Store on volume. We compete on trust.

The Albori Marketplace is a curated repository of applications that meet our privacy standards. Every app listed must be open source (or at minimum have an auditable privacy policy), declare all network connections it makes, contain no telemetry or tracking libraries, and respect the user's permission settings without workarounds.

The marketplace starts with the existing Ubuntu Touch / UBports app catalog — messaging apps (Telegram, Matrix, Signal, Delta Chat), email clients, maps, utilities — and grows from there. Our long-term goal is to become the default destination for privacy-respecting mobile apps, attracting developers aligned with our values: Nextcloud, ProtonMail, Signal, and similar open-source projects.

We do not ship a compatibility layer for Android apps. Users who choose Albori are choosing to leave that ecosystem. We build for that choice.

## Hardware Compatibility

Albori runs on Android hardware using [Halium](https://halium.org/) — a Linux compatibility layer that reuses the device's existing Android drivers without requiring them to be open source. This means Albori can run on a wide range of devices without vendor cooperation.

Albori is currently developed and tested on the **Lenovo TB-8505F** (codename `akita_row_wifi`). Any device with an official Ubuntu Touch port from [UBports](https://ubports.com/) is a candidate for Albori compatibility.

Device support expands through community contributions. If you have a device with an unlockable bootloader and a working Ubuntu Touch or Halium port (Android 9 / Halium 9 or Android 11 / Halium 11 base), you can contribute a port. We maintain a compatibility list and provide compose tooling and verification scripts to help porters.

We do not promise compatibility with every Android phone. Hardware support depends on existing kernel work. We build on what the community has already built.

## Roadmap

**Phase 1 — Foundation (current)**
Albori OS boots, runs its own UI, and is daily-driver capable on the Lenovo TB-8505F. The core experience is stable: home screen, app launcher, gesture navigation, control center with real system toggles, and keyboard. The Albori Marketplace shows the existing Ubuntu Touch app catalog.

**Phase 2 — Privacy Features**
We integrate the privacy tools that define Albori's identity: a per-app firewall visible in the system UI, granular permission management, encrypted storage configuration, VPN one-tap integration, and a network activity monitor so users can see what their apps are doing. These are built into the Albori surface, not installed as separate apps.

**Phase 3 — Ecosystem Growth**
The marketplace grows with native apps built for Albori. We establish partnerships with open-source projects aligned with our values. We expand device support through community ports. Albori becomes a recognized platform in the privacy-first mobile space — a genuine alternative to GrapheneOS, CalyxOS, and /e/OS, distinguished by its Linux-native architecture and original UI.

## How to Contribute

Albori is built in public. We welcome contributions at every level.

**Developers:** The UI is built in QML/Qt on top of Lomiri (the Ubuntu Touch shell). If you know QML, C++, or Linux system programming, there is work for you.

**Device Porters:** If you have a device with an existing Halium or Ubuntu Touch base, we want to help you bring Albori to it. We provide compose tooling, verification scripts, and documentation.

**App Developers:** Build a native app for Albori using the QML SDK. If your app respects user privacy, we will list it in the marketplace.

**Testers:** Flash Albori on a supported device and report what breaks. Bug reports, hardware compatibility notes, and UX feedback all move the project forward.

**Translators:** Albori should be accessible in every language. If you can help translate the UI or documentation, reach out.

All contributions are welcome. The only requirement is that you share our commitment to user privacy and software freedom.
