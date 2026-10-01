# AdGrabber

**Save Your Favorite YouTube Ads Instantly!**

AdGrabber is a lightweight web tool that lets you capture and share YouTube ads with a direct video link. No sign-ups, no installs — just paste, click, and share.

**Live:** [www.adgrabber.in](https://www.adgrabber.in)

---

## How It Works

1. **Copy Debug Info** — Right-click on any YouTube ad and select *"Copy debug info"*
2. **Paste & Search** — Paste the debug info into the AdGrabber search bar and click *Find*
3. **Get the Link** — The ad's YouTube link is instantly copied to your clipboard

---

## Tech Stack

- **HTML5** — Semantic, accessible markup
- **CSS3** — Responsive styling with flexbox
- **Vanilla JavaScript** — Zero-dependency ad-link extraction
- **GitHub Pages** — Static hosting with custom domain

---

## Project Structure

```
adgrabber/
├── Assets/                 # Brand assets used by the live page
├── archive/                # Historical design binaries (not used at runtime)
├── design/                 # Pointer to design notes and archive
├── docs/                   # Architecture, roadmap, security, deployment
├── plans/                  # Local agent plans (gitignored, never pushed)
├── .claude/settings.json   # Claude Code: plans go to plans/
├── .cursor/rules/          # Cursor agent rules
├── .gitignore
├── AGENTS.md               # Map for coding agents
├── CHANGELOG.md
├── CNAME                   # Custom domain (www.adgrabber.in)
├── consent.js              # EU-only consent banner, loads Hotjar
├── index.html              # Landing page
├── LICENSE
├── privacy.html            # Privacy notice
├── README.md
├── script.js               # Debug info → video link
└── styles.css
```

---

## Docs

| Doc | Purpose |
|-----|---------|
| [docs/architecture.md](docs/architecture.md) | How the site works today |
| [docs/roadmap.md](docs/roadmap.md) | Progress: now / next / later |
| [docs/security-privacy.md](docs/security-privacy.md) | What must not be committed; future telemetry rules |
| [docs/deployment.md](docs/deployment.md) | GitHub Pages today; staged rollout later |
| [docs/design-notes.md](docs/design-notes.md) | Redesign intent (not implemented) |
| [AGENTS.md](AGENTS.md) | Instructions for AI coding agents |

---

## Analytics

AdGrabber uses page-level usage insights (not a log of generated ad links):

- **Google Analytics** (GA4)
- **Hotjar** — Heatmaps and session recordings
- **Microsoft Clarity** — Behavior analytics

Built, but switched off: an anonymous log of generated ad video IDs to a private Google Sheet. Design is in [docs/architecture.md](docs/architecture.md#usage-telemetry-google-sheets-flag-off). Privacy rules and the compliance gaps we have today are in [docs/security-privacy.md](docs/security-privacy.md#compliance-status-oct-2026).

---

## License

This project is licensed under the [MIT License](LICENSE).

© 2024 [Prince Pal](https://www.linkedin.com/in/theprincepal/)
