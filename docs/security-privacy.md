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

- Persist **YouTube video ID**, timestamp, and optional coarse metadata (for example country at CDN granularity) only.
- **Never** persist the raw debug JSON blob.
- Logging must be **off by default** and gated by a feature flag (see [deployment.md](deployment.md)).
- Add consent, retention, and a deletion story before collecting.
- Choose a backend in an ADR; do not improvise a secret endpoint in client JS with a hardcoded key (that key would be public).

## Agent rules

- Do not add new third-party scripts without an explicit request.
- Do not commit files from `Assets/` that are dashboard exports (even if someone renames them to `.txt`).
- Do not put secrets in `CNAME`, HTML comments, or `docs/`.
