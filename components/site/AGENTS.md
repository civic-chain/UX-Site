# Site Components Agent Instructions

This folder is the shared site shell: `<SiteHeader />` and `<SiteFooter />` for every live page in the `(site)` route group (landing, about, brand, resources, articles).

## Folder Structure

- `site-header.tsx` - logo and main navigation (`/about`, `/how-it-works`, `/civic-chain-demo`).
- `site-footer.tsx` - copyright plus `/about` and `mailto:` links.

## Relevant Rules

- `2civic-design` skill (invoke it) - single authority for design law and the
  design-system code contract.
- `_ops/rules/landing-design-and-brand.md` - project brand boundaries.
- `_ops/rules/landing-copy.md` - shell text (copyright, links) is English and ship-it-fast.
- `_ops/rules/process.md` - components are created only for real reuse (at least 2 consumers). Site shell qualifies: landing-01 plus about, contact, brand, resources, and article routes.
- `_ops/rules/agent-discipline.md` - behavior and default chain.

## Local Rules

- `SiteFooter` stays static: no internal state, no client bundle (`'use client'`). `SiteHeader` is a client component — it owns only the mobile hamburger menu's open/close state. Keep that the sole client state; do not expand the client surface without proven need.
- `SiteHeader` and `SiteFooter` accept an optional `id` (default `site-header` / `site-footer`) so `/brand/big-components` can embed a live copy without a duplicate-id clash. Do not change the defaults — they are the stable anchors.
- Header main navigation owns the live top-level route links `/about`, `/how-it-works`, and `/civic-chain-demo`; direct email remains in footer/contact CTAs, not the header.
- No new icons or illustrations; use only what already exists in `public/brand/`.
- Footer must not link to `/pitch` (out-of-scope route). `/resources` and `/brand` are valid; surface them in the footer only when an explicit task asks for it.
- Do not add components beyond `SiteHeader` and `SiteFooter` without an explicit task; do not turn this into `components/site/{nav,banner,...}`.
