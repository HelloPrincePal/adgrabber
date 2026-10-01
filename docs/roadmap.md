# Roadmap and progress

Use this file to see what is done, what is next, and what must wait for an explicit request. Update statuses when work ships.

## Now (done or in this hygiene pass)

| Item | Status |
|------|--------|
| v1 static site (paste debug JSON → YouTube link) | Shipped |
| GitHub Pages + custom domain | Shipped |
| Page analytics (GA4, Hotjar, Clarity) | Shipped |
| Repo hygiene (gitignore, archive, agent docs) | Done in hygiene pass |

## Next (product work — do not start unless asked)

| Item | Status | Notes |
|------|--------|--------|
| Visual / UX redesign | Not started | Intent: [design-notes.md](design-notes.md). Do not unflagged-replace `index.html` in one shot. Use [deployment.md](deployment.md). |
| Replace `alert()` with inline copy feedback | Not started | Called out in design notes and CHANGELOG |
| Accessibility, SEO/OG, mobile layout | Not started | Same sources |

## Later (needs architecture decisions)

| Item | Status | Notes |
|------|--------|--------|
| Privacy page + EU-only consent banner | Built | `privacy.html`, `consent.js`. See [security-privacy.md](security-privacy.md#compliance-status-oct-2026). |
| Log generated video IDs (Google Sheets) | Built, flag off | Client `logEvent` in `script.js` behind `TELEMETRY_ENABLED`. Apps Script + private sheet on the owner's personal Google account ([architecture.md](architecture.md#usage-telemetry-google-sheets-flag-off), [ADR](decisions/2026-10-01-google-sheets-telemetry.md)). Never raw debug JSON. Apps Script URL is set. Turn on once `privacy.html` is live. |
| Staged rollout (preview → cohort → geo → 100%) | Not started | Not native to GitHub Pages. See [deployment.md](deployment.md). |
| CDN / edge in front of Pages | Not started | Required for real geo canaries. ADR when chosen. |

## How agents should update this file

When a roadmap item ships, move it to **Now**, set status, and add a CHANGELOG Unreleased or version entry. Do not mark later items done because docs exist.
