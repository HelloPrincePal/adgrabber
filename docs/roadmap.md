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
| Log generated video IDs (database) | Not started | GitHub Pages cannot persist this. Store video ID + timestamp + coarse metadata only — **never raw debug JSON**. Off by default until a flag is on. Vendor (Supabase, Cloudflare D1, etc.) is an ADR in `docs/decisions/`. Privacy: [security-privacy.md](security-privacy.md). |
| Staged rollout (preview → cohort → geo → 100%) | Not started | Not native to GitHub Pages. See [deployment.md](deployment.md). |
| CDN / edge in front of Pages | Not started | Required for real geo canaries. ADR when chosen. |

## How agents should update this file

When a roadmap item ships, move it to **Now**, set status, and add a CHANGELOG Unreleased or version entry. Do not mark later items done because docs exist.
