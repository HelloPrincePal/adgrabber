# Changelog

All notable changes to the AdGrabber project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [Unreleased]

### Added
- Flagged anonymous usage telemetry: `logEvent()` in `script.js` sends outcome, ad ID, clipboard result and time zone to a private Google Sheet via Apps Script. Off by default (`TELEMETRY_ENABLED = false`). ADR: `docs/decisions/2026-10-01-google-sheets-telemetry.md`
- Shared, gitignored `plans/` folder for all AI agents (`AGENTS.md`, Cursor rule, `.claude/settings.json`)
- Compliance status section in `docs/security-privacy.md`
- `privacy.html` privacy notice, linked from the footer
- `consent.js`: consent banner only for EEA/UK/CH time zones, Google Consent Mode v2 defaults, Clarity `consentv2`, and a footer "Privacy settings" opt-out for everyone

### Changed
- `#result` is built with `textContent` / DOM nodes instead of `innerHTML` string interpolation
- Hotjar now loads from `consent.js` (after consent in EEA/UK/CH) instead of an inline tag
- Paste box is masked from Clarity and Hotjar recordings

### Added (repo hygiene)
- Agent-ready docs: `AGENTS.md`, `docs/architecture.md`, `docs/roadmap.md`, `docs/security-privacy.md`, `docs/deployment.md`, Cursor project rule
- `.gitignore` for OS junk, env/secrets, and spreadsheet/CSV exports
- `archive/design-2026-03/` for Pencil explorations and generated mockups (not used by the live site)

### Planned
- UI overhaul for a more modern, user-friendly experience (see `docs/design-notes.md`; ship via staged rollout, not an unflagged rewrite)
- Improved typography (Google Fonts integration)
- Enhanced step cards with shadows and hover effects
- Better mobile responsiveness
- Inline copy-success feedback (replace `alert()`)
- Accessibility improvements (focus states, ARIA labels)
- SEO meta tags and Open Graph support
- Preview deploys, feature flags, and geo/percentage canaries (see `docs/deployment.md`)

---

## [1.0.0] – 2024

### Added
- Initial launch of AdGrabber at [www.adgrabber.in](https://www.adgrabber.in)
- Landing page with hero section, search bar, and 3-step instructions
- Core JavaScript logic to parse YouTube ad debug info and extract video ID
- Auto-copy ad video link to clipboard
- Brand assets (logo, favicon, step illustrations)
- Analytics integration (Google Analytics, Hotjar, Microsoft Clarity)
- LinkedIn CTA button in header
- Custom domain configuration via CNAME
- MIT License

---

*This project was originally created in 2024 by [Prince Pal](https://www.linkedin.com/in/theprincepal/).*
