# AdGrabber – Design Notes

> UI improvement ideas, design decisions, and exploration notes. This is intent for a future redesign, not a description of the live site.

---

## Current State (v1 – 2024)

The original design is a single-page static site with:

- A header with logo + LinkedIn CTA
- A hero section with headline, subtitle, and a search bar
- A 3-step instructional flow with images
- A fixed footer

### What Works Well

- Clear 3-step flow is easy to follow
- Simple, single-purpose tool – no clutter
- Clean color palette (light gray background)

### Areas for Improvement

| Area | Issue | Proposed Fix |
|------|-------|--------------|
| **Typography** | Default Arial, feels generic | Use modern font (Inter / Outfit) from Google Fonts |
| **Search Bar** | Small, not prominent enough | Larger input, add placeholder animation, better contrast |
| **Step Cards** | Flat, lack visual depth | Add subtle shadows, rounded corners, hover effects |
| **Footer** | Fixed at bottom, overlaps content on short screens | Make it part of the page flow, not fixed |
| **Responsiveness** | Not fully optimized for mobile | Add proper media queries, stack steps vertically |
| **Colors** | Mostly gray, lacks vibrancy | Introduce accent gradients, subtle background patterns |
| **Micro-interactions** | None | Add hover effects, button transitions, copy feedback animation |
| **Result Display** | Plain text, uses `alert()` | Inline toast/snackbar notification instead |
| **Accessibility** | No focus states, no ARIA labels | Add keyboard navigation support |
| **Meta / SEO** | Missing meta description, OG tags | Add proper meta tags for social sharing |

---

## Design Goals

1. **Modern & Clean** – Move from a plain HTML feel to a polished, professional landing page
2. **User-Friendly** – Make the core action (paste → get link) as intuitive as possible
3. **Mobile-First** – Ensure it works beautifully on all devices
4. **Fast** – Keep it lightweight (no frameworks, pure HTML/CSS/JS) unless a later ADR says otherwise
5. **Delightful** – Add micro-animations that make the experience feel premium

---

## Reference Palette (Exploration)

| Token | Value | Usage |
|------|-------|--------|
| `--bg-primary` | `#FAFAFA` | Page background |
| `--bg-card` | `#FFFFFF` | Step cards, search area |
| `--accent` | `#FF4D4D` | YouTube-inspired red accent |
| `--accent-gradient` | `linear-gradient(135deg, #FF4D4D, #FF8C42)` | CTAs, hover states |
| `--text-primary` | `#1A1A1A` | Headlines |
| `--text-secondary` | `#666666` | Body copy |
| `--border-light` | `#E5E5E5` | Subtle borders |

---

## UI Exploration

Binary mockups and the Pencil file are **archived**, not loaded by the site:

- [archive/design-2026-03/](../archive/design-2026-03/)
- See [archive/README.md](../archive/README.md)

Do not copy those assets into `Assets/` or `index.html` without an explicit product decision. Ship redesign work behind the staged-rollout approach in [deployment.md](deployment.md) and [roadmap.md](roadmap.md).

---

*Last updated: October 2026*
