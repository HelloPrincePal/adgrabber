# 2026-10-01: Log generated ad links to a private Google Sheet

Status: accepted (client code shipped with the flag off)

## Context

The owner wants to see which ad links visitors generate and how the tool is used. GitHub Pages can't persist data. Requirements:
- $0 cost and no server to maintain;
- a friendly way to browse the data;
- access only through the owner's login;
- no personal data.

## Decision

- `script.js` sends an anonymous event (`outcome`, `ad_id`, `clipboard`, `tz`) with `navigator.sendBeacon` to a Google Apps Script web app.
- The script validates the event and appends a plain-text row to a private Google Sheet, one tab per month.
- The sheet is owned by the owner's **personal** Google account (`helloprincepal@gmail.com`). AdGrabber is a personal project.
- The sheet is the admin view. There's no `/admin` page.
- `TELEMETRY_ENABLED` in `script.js` is the flag and kill switch.

Details: [architecture.md](../architecture.md#usage-telemetry-google-sheets-flag-off), [security-privacy.md](../security-privacy.md#compliance-status-oct-2026).

## Alternatives considered

- **Cloudflare Worker + D1 + Access at `/admin`.** Stronger ingest controls (Origin check, per-IP rate limit, country), but it means a DNS move, more moving parts, and an admin UI to build. Kept as the upgrade path.
- **Supabase.** Free projects pause after 7 days of inactivity, and it needs a public anon key in the browser.
- **GA4 custom events.** Ad IDs collapse into "(other)".

## Consequences

- The `/exec` URL is public, so anyone can write junk rows. Nobody can read through it. Validation, plain-text writes and a throttle limit the damage, and redeploying gives a new URL.
- There's no IP or country. The browser time zone stands in for region.
- Sheets limits apply: 10M cells, slow past ~100k rows per tab, 30 simultaneous executions. Monthly tabs keep it manageable.
- Security rests on the Google account (2-Step Verification / passkey) and on never sharing the raw sheet by link.
- No DPA on a personal Google account. That's acceptable only because rows are anonymous.
- Before enabling: `privacy.html` and a consent banner for GA4, Hotjar and Clarity.
