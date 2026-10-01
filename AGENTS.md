# AGENTS.md

Short map for coding agents. Deeper truth lives in `docs/`. Do not paste those files into this one.

## Product

AdGrabber is a static single-page tool: paste YouTube ad debug JSON, extract `addocid`, copy `https://youtu.be/{id}`. Live site: https://www.adgrabber.in

## Production files (behavior)

Touch these only when the user asked for a product change:

- `index.html`
- `script.js`
- `styles.css`
- `consent.js` (EU-only consent banner; loads Hotjar)
- `privacy.html`
- `CNAME`
- `Assets/` (brand images and icons used by the page)

Do not wire `archive/` into the runtime path.

## Hard constraints

- Do **not** implement the full redesign, a database, feature flags, or a new host unless the user explicitly asks.
- Do **not** commit analytics exports, spreadsheets, `.env`, or credentials. `.gitignore` already blocks `*.csv` and `*.xlsx`.
- GitHub Pages publishes the **repo root**. Anything committed can appear at `https://www.adgrabber.in/<path>`. Never put PII or data dumps in the repo.
- Measurement IDs in `index.html` (GA4, Hotjar, Clarity) are public client IDs, not secrets. Do not rotate them or treat them as leaks.
- Prefer small changes. No force-push to `main`.
- Record a new file under `docs/decisions/` before leaving static GitHub Pages (backend, CDN, database vendor).

## Plans

All agents (Claude Code, Cursor, Codex/GPT, others) share one plans folder: `plans/` at the repo root.

- Write every plan to `plans/YYYY-MM-DD-<tool>-<slug>.md` (for example `2026-10-01-cursor-inline-toast.md`). Create the folder if it is missing.
- Do not save plans in tool-specific folders (`~/.claude/plans`, `.cursor/plans`, etc.).
- `plans/` is gitignored. Never commit or force-add it.
- Before starting related work, read existing plans in `plans/`.

## Commands

There is no build, test, or lint toolchain. The site is static files.

- Preview: open `index.html` in a browser, or use any local static server on the repo root.
- After UI changes: exercise paste → Find → clipboard / `#result` on desktop and a narrow viewport.

## Where to read next

| Topic | File |
|-------|------|
| Current system | [docs/architecture.md](docs/architecture.md) |
| Now / Next / Later | [docs/roadmap.md](docs/roadmap.md) |
| Secrets vs public IDs | [docs/security-privacy.md](docs/security-privacy.md) |
| Pages today vs canary later | [docs/deployment.md](docs/deployment.md) |
| Redesign intent | [docs/design-notes.md](docs/design-notes.md) |
| Humans | [README.md](README.md) |
| What shipped | [CHANGELOG.md](CHANGELOG.md) |
| Future ADRs | [docs/decisions/README.md](docs/decisions/README.md) |
