# Site Agent Instructions

`(site)/` is the single route group for every public page on `*.vercel.app` —
landing, related pages, brand, resources — under one shared shell
(`SiteHeader` + `SiteFooter`).

This file auto-loads when you work in this folder. For anything visual or
design-system, it sends you to the `2civic-design` skill — the single design
authority — and carries the cardinal rule below so you do not err even before
invoking it.

## Folder Map

- `layout.tsx` - mounts `<SiteHeader />` + `<SiteFooter />` for the whole group.
- `page.tsx` + `_sections/*.tsx` - current landing-home (`/`): section assembly
  and route-owned section files.
- `landing-v1/` - noindex archive of the first landing-home for reference.
- `landing-v2/page.tsx` - redirect from the old working preview URL to `/`.
- `about/page.tsx`, `how-it-works/page.tsx` - compact related pages.
- `_contact/page.tsx` - hidden preserved contact draft; the private folder is not a live route.
- `/civic-chain-demo` is a standalone source-fidelity demo route outside this
  shared shell; `components/site/site-header.tsx` links to it.
- `brand/` - technical design-system docs (team + handoff LLM, not public
  marketing): `layout.tsx` mounts the shared nav once, `page.tsx` is Overview,
  `content.ts` feeds data tables, child `page.tsx` files own docs sections, and
  `brand/_components/` holds the page-local docs toolkit.
- `resources/` - blog: `page.tsx` + `_articles-meta.ts` (index), and one
  `<slug>/` folder per article (`content.ts` = copy, `page.tsx` = layout).
Retired route families stay gone. Do not recreate them without explicit user
scope; the executable route contract lives in `tests/visual/route-contracts.ts`.

Edit page text where the route keeps it: `content.ts` (brand docs values,
articles), `_articles-meta.ts` (article cards), `_sections/*.tsx` (inline
landing copy), and brand `page.tsx` files (page-local copy).

## Local Rules (unique to this folder)

- Every section keeps a stable id anchor (`#hero`, `#portal-hub`, …) so the
  client can say "change X in #hero". Do not rename without an explicit task.
- Do not add or remove `_sections/*.tsx` or `resources/<slug>/` folders without
  an explicit task scope; a new article also needs a `_articles-meta.ts` entry.
  Active public-page iteration may freely add, replace, or remove route-owned
  sections when the task scope is the page and the result stays claim-disciplined.

## Components and design — invoke 2civic-design

Before any visual, component, or design-system code here, invoke the
`2civic-design` skill — it is the single authority for the brand law, the
component catalog, the prop vocabulary, and the surface-color contract.

During active page/design iteration, design-policy warnings are advisory. Do not
let raw-value, inline-style, arbitrary spacing, or local-control warnings block
getting the screen close to the intended design; use them later as hardening
notes before client preview.

When a task asks to preserve a founder/client reference, route-owned pages may
temporarily use custom markup, copied HTML/CSS/JS, tabs, or raw visual values.
Do not import `_workspace/**` or `_docs/**` into runtime code; copy approved
static source files into runtime owners instead. Promote only stable repeated
parts into `components/ui`.

## References (depth and rationale)

- Design law + design-system code contract → the `2civic-design` skill (invoke
  it). Project brand boundaries (route scope, untouchables) →
  `_ops/rules/landing-design-and-brand.md`.
- Copy ownership and claim discipline → `_ops/rules/landing-copy.md`.
- Behavior and default chain → `_ops/rules/agent-discipline.md`.
- Runtime code never references `_docs/**` or `_workspace/**`; final
  illustrations load only from `public/design-assets/**` or flat
  `public/landing/*.webp`.
- After visible changes: use the focused Playwright command from
  `tests/visual/README.md`.
