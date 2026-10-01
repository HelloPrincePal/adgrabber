# Security and privacy

## Public vs secret

| Kind | Examples | Treat as |
|------|----------|----------|
| Public client measurement IDs | GA4 `G-9XNYBZTE9K`, Hotjar `5038796`, Clarity `u1hm6r18jy` in `index.html` | Expected in a public page. Do not rotate as if leaked. Do not paste dashboard **exports** into the repo. |
| Must never be in git | `.env`, API keys, `*.pem`, analytics CSVs/XLSX, Clarity/GA dumps | Blocked by `.gitignore` (`*.csv`, `*.xlsx`, `.env*`). |
| User-pasted debug JSON | YouTube “Copy debug info” | Stays in the browser today. May include campaign/advertiser fields beyond `addocid`. |

GitHub Pages serves the repository root. A committed file can be fetched from `www.adgrabber.in`. That is why exports and PII do not belong in this repo.

## Current product

- No authentication.
- No server-side store of generated links.
- Third-party analytics observe **page** behavior (sessions, heatmaps), not a first-party log of which video IDs were extracted.

## Future: generated-link telemetry

If we add a database of links visitors generate:

- Persist **YouTube video ID**, timestamp, outcome, clipboard result, and browser time zone only.
- **Never** persist the raw debug JSON blob.
- Logging must be **off by default** and gated by a feature flag (see [deployment.md](deployment.md)).
- Add consent, retention, and a deletion story before collecting.
- Choose a backend in an ADR; do not improvise a secret endpoint in client JS with a hardcoded key (that key would be public).

## Compliance status (Oct 2026)

Engineering summary, not legal advice. Before the telemetry launches, have someone qualified review it.

### Where we stand today

| Area | Status |
|------|--------|
| Privacy policy / notice | `privacy.html`, linked in the footer. Covers the ad-link log, GA4, Clarity and Hotjar. Contact: the owner's personal Gmail. |
| Consent banner | `consent.js`: shown **only** when the browser time zone is in the EEA/UK/CH. Elsewhere: no banner, tags run, and "Privacy settings" in the footer lets anyone opt out. The choice is stored in `localStorage` (`adg_consent`). |
| GA4 | Consent Mode v2: in the consent region, `analytics_storage` is denied until Accept. Elsewhere it's granted, with a Google-geo `region` default as a backup so EEA/UK/CH visitors whose clock isn't European stay cookieless. Ad signals are always denied. |
| Session recording (Hotjar, Clarity) | In the consent region, Hotjar loads only after Accept. Clarity gets `consentv2` and is cookieless until then (Microsoft also enforces this itself). The paste box is masked (`data-clarity-mask`, `data-hj-suppress`). |
| First-party data we store | None until `TELEMETRY_ENABLED` is turned on; then the anonymous Sheets log. |

Known limits: time-zone detection can be fooled by VPNs or odd clock settings (Google's geo backup covers GA4, not Hotjar).

### By region

| Region / law | Applies to AdGrabber? | What it requires from us |
|--------------|----------------------|--------------------------|
| **EU GDPR + ePrivacy Art. 5(3)** | Yes, for any EU visitor, whatever company size. | Consent before non-essential cookies, storage, or tracking scripts (EDPB Guidelines 2/2023 also cover pixels and beacons). A privacy notice. A lawful basis for each purpose. Data processing agreements (DPAs) with vendors. Data subject rights. |
| **UK GDPR + PECR** | Yes, for UK visitors. | Same as the EU in practice. Consent for analytics cookies. A notice. |
| **India DPDP Act 2023 + DPDP Rules 2025** | Yes. Indian operator, `.in` domain. Most duties phase in by ~May 2027. | A notice and consent for personal data, purpose limits, deletion when no longer needed, and a grievance contact. Anonymous data is out of scope. |
| **US: CCPA/CPRA + other state laws** | Thresholds (revenue / volume) are almost certainly not met. | Nothing mandatory yet. A notice plus honoring Global Privacy Control is cheap good practice. |
| **Brazil LGPD** | Yes, for Brazilian visitors. No small-site exemption for notice. | A notice and a lawful basis. Anonymized data is out of scope. |
| Canada PIPEDA, Australia Privacy Act, Singapore PDPA, Japan APPI | Low exposure at this size. | Covered if we meet the GDPR baseline above. |
| China PIPL | Effectively none (YouTube is blocked there). | No action. |
| YouTube / Google ToS | We do not use the YouTube API and do not scrape. Ad video IDs are public. | Keep it this way. Do not proxy or download videos. |

### Telemetry data rules (planned generated-link log)

The design goal is that the dataset is **not personal data**. That keeps it largely outside GDPR, DPDP, and LGPD.

- **Collect:** `addocid` (the ad's public video ID), a server-side timestamp, the outcome (`success`, `invalid_json`, `missing_addocid`), and the clipboard result. Store it in a private Google Sheet on the owner's personal account ([ADR](decisions/2026-10-01-google-sheets-telemetry.md)).
- **Location:** the browser's time zone only (for example `Asia/Kolkata`). The IP is never stored; Google sees it at the network level as the platform, as with GA4.
- **Never collect:** the raw debug JSON, the video the user was watching (that is viewing history), `cpn` or other session IDs, IP address, user-agent string, cookies, localStorage IDs, or fingerprints.

Why this is anonymous: the ad ID identifies an advertiser's public asset, not a person. With no IP, ID, or watched-video field, a row cannot be linked back to a visitor.

### Before launch

1. ~~Privacy notice page linked in the footer.~~ Done (`privacy.html`).
2. ~~EEA/UK/CH-only consent banner gating Hotjar, Clarity and GA4.~~ Done (`consent.js`).
3. Retention (promised on `privacy.html`, not automated yet): delete monthly tabs older than 24 months (a time-driven Apps Script trigger, or by hand yearly).
4. Vendor terms: personal Google accounts have no DPA. That's acceptable only because the data is anonymous. Revisit if any personal data is ever added.
5. Lock the Google account (2-Step Verification or a passkey). Never share the raw sheet as "Anyone with the link"; share named Viewers, or a summary-only sheet via `IMPORTRANGE`.
6. Backend recorded in [decisions/2026-10-01-google-sheets-telemetry.md](decisions/2026-10-01-google-sheets-telemetry.md).

## Agent rules

- Do not add new third-party scripts without an explicit request.
- Do not commit files from `Assets/` that are dashboard exports (even if someone renames them to `.txt`).
- Do not put secrets in `CNAME`, HTML comments, or `docs/`.
