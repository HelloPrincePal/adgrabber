# Changelog

All notable changes to the AdGrabber project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [Unreleased]

### Added
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
- Optional database of generated video IDs (flagged, no raw debug JSON)
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
