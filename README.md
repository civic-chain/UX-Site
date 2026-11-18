# CivicChain V2

Private design workshop for polished CivicChain public pages and Vercel preview
links. The repo is intentionally small: one public site, one design system, and
enough checks to catch visible regressions without preserving old experiments.

## First 30 Minutes

If you are new to the project, read in this order:

1. `README.md` - map of routes, edit locations, dependencies, and commands.
2. `AGENTS.md` - agent behavior contract, protected owners, and stop conditions.
3. `_ops/PROJECT-ROADMAP.md` - current stage and what still matters.
4. The nearest folder `AGENTS.md` before editing code in a governed folder.
5. The matching local skill before specialized work: `2civic-design` for brand
   and design-system work, `2civic-img-gen` for image generation, and `gsap-*`
   for motion.

This is a Next.js App Router project: TypeScript, React 19, Tailwind CSS v4,
CSS modules/global CSS in `app/styles/`, GSAP only through `components/motion/`,
and Playwright for visible route checks.

## Live Surfaces

| Need | Open |
| --- | --- |
| Live preview | https://civicchain-v2.vercel.app |
| Main landing | `/` |
| Archived first landing | `/landing-v1` |
| Old v2 preview link | `/landing-v2` redirects to `/` |
| Related pages | `/about`, `/how-it-works`, `/civic-chain-demo` |
| Audience pages (hero badges link here) | `/residents`, `/vendors` |
| Brand/design-system docs | `/brand` and its docs child routes |
| Resources | `/resources`, `/resources/municipal-payment-delays` |

Current stage and priority live in `_ops/PROJECT-ROADMAP.md`.

Live route contracts live in `tests/visual/route-contracts.ts`. Retired route
families stay retired unless a new owner decision reopens them; 404 smoke for
historical routes is ad hoc during route-wiring work, not a default visual gate.

## How The App Hangs Together

- `app/(site)/layout.tsx` wraps every public `(site)` page with
  `SiteHeader` and `SiteFooter` from `components/site/`.
- `/` is assembled in `app/(site)/page.tsx`; its route-owned sections live in
  `app/(site)/_sections/`.
- `/landing-v1` is a noindex archive with its own copied section files.
- `/landing-v2` is only a redirect to `/`; do not put new truth there.
- `/civic-chain-demo` is standalone in `app/civic-chain-demo/` and does not use
  the `(site)` shell.
- `/brand` documents the live design system. Its pages are under
  `app/(site)/brand/`; shared primitives stay in `components/ui/`; token/type
  metadata stays in `lib/design-system-*`; policy checks stay in
  `scripts/checks/design-system/`.
- Runtime code must not import `_docs/**` or `_workspace/**`. Approved runtime
  assets live in `public/design-assets/**`, `public/landing/**`, or protected
  `public/brand/**` (plus the record-flow animation's own
  `public/how-diagram-assets/`).
- Image performance: the site is a static export with `next/image`
  `unoptimized`, so there is no build-time resizing. Keep runtime illustration
  WebP sized to how they display — cap the longest edge around 1200px and
  re-encode at ~q80 before committing. Below-fold decorative art loads lazily
  (`next/image` default); only true LCP images (hero, header logo) keep
  `priority`/`loading="eager"`.

## Commands

```bash
npm install
npm run dev
npm run lint
PLAYWRIGHT_PORT=3311 npm run test:visual:brand
PLAYWRIGHT_PORT=3311 npm run test:visual
```

- `npm run dev` opens the local site at `http://localhost:3000`.
- `npm run lint` checks TypeScript, CSS syntax/policy, advisory design-system
  warnings, assets, and instruction drift.
- `npm run check:design-system` reports design-system hardening warnings without
  blocking active visual iteration.
- `npm run test:visual:brand` checks the brand docs and component playgrounds.
- `npm run test:visual` checks route contracts, accessibility, mobile safety,
  overflow, touch targets, contrast, and motion basics.

## Edit Page Text

There is no CMS. Text lives in code files.

| Page or surface | Text owner |
| --- | --- |
| `/` | `app/(site)/_sections/<section>-section.tsx` |
| `/landing-v1` | `app/(site)/landing-v1/_sections/*.tsx` |
| `/about` | `app/(site)/about/page.tsx` |
| `/how-it-works` | `app/(site)/how-it-works/page.tsx` |
| `/residents`, `/vendors` | `app/(site)/residents/content.ts`, `app/(site)/vendors/content.ts` (shared layout: `app/(site)/_audience/audience-page.tsx`). Planned features go only in `comingNext`. |
| Dotted-underline term notes | `app/(site)/_glossary.tsx`; mark a word as `[[id\|text]]` in strings or `<GlossaryTerm id="...">` in JSX |
| "The Money Moves" animation (`#record-flow` iframe) | `public/how-diagram.html` is a GENERATED file, see below |
| `/civic-chain-demo` | `app/civic-chain-demo/demo-console-v2.tsx` |
| Hidden contact draft | `app/(site)/_contact/page.tsx` |
| `/brand` docs | `app/(site)/brand/page.tsx`, child `page.tsx` files, and `app/(site)/brand/content.ts` |
| `/resources` | `app/(site)/resources/_articles-meta.ts` |
| `/resources/<slug>` | `app/(site)/resources/<slug>/content.ts` |
| Shared header/footer | `components/site/site-header.tsx`, `components/site/site-footer.tsx` |

Copy may move with the page design. Keep claim discipline: factual claims come
from `_docs/facts/*` or derived `_docs/business/*`; stop if requested copy
conflicts with those owners.

The record-flow animation is a standalone static page, not React. Its current
look (2026-10-14: keycap cards, Legacy "aged paper", Civic-Chain "deep ink",
opens on Through Civic-Chain) is generated: edit the files in
`scripts/how-diagram/src/`, then run `npm run build:how-diagram` to rewrite
`public/how-diagram.html`. Never hand-edit the generated file. Textures live in
`public/how-diagram-assets/`. `scripts/how-diagram/build.mjs` explains what each
source file does.

`_workspace/Civic-Chain-Justin/` is historical reference only. It is not active
canon and runtime code must not import from `_workspace/**` or `_docs/**`.

## Local Skills And Design System

Project-local skills are part of the handoff. They are not private notes: use
them when the task matches, and read their `SKILL.md` directly if your agent
runtime does not auto-load them.

- `2civic-design` - single design authority: brand law plus code contract for
  components, surface-color, tokens, and structure.
- `2civic-img-gen` - CivicChain image generation, recovery, chroma-key,
  transparent PNG/WebP, and asset destinations.
- `gsap-*` - motion adapters and GSAP usage rules.
- `illustration-extraction` - extraction workflow for generated landing
  illustrations, currently in `.codex/skills/`.
- `1python-dev` and `1tailwind-dev` - local Claude-side support skills for
  Python and Tailwind/CSS work, currently in `.claude/skills/`.

The `2civic-design` skill ships as readable Markdown in
`.claude/skills/2civic-design/` and `.codex/skills/2civic-design/`; a human can
open `SKILL.md`. Runtime truth lives in the style, component, and policy files
it names. Do not duplicate token or component inventories in README.

During active page iteration, design-policy is intentionally soft for
page-local app routes and `components/site/**`. Shared primitives, tokens,
motion adapters, and protected brand assets remain owner-controlled.

## Local Instructions

Folder `AGENTS.md` files carry local constraints. Check the nearest one before
editing in these areas:

- `app/(site)/` - route ownership, page text, route-local sections, `/brand`,
  resources, and retired route boundaries.
- `components/site/` - shared header/footer shell.
- `components/ui/` - reusable CivicChain primitives.
- `components/motion/` - GSAP adapters and reduced-motion rules.
- `lib/` - design policy, shared types, typography registry, utilities.
- `tests/visual/` - Playwright contracts and when to run them.
- `public/design-assets/` - committed runtime asset bank.
- `_workspace/design-assets/` - generation workspace, not runtime imports.

## What Lives Where

| Area | Purpose |
| --- | --- |
| `app/(site)/` | Public routes and page-local sections |
| `app/(site)/brand/` | Internal technical docs for the brand/design system |
| `components/site/` | Shared site shell |
| `components/ui/` | Reusable UI primitives |
| `components/motion/` | Shared motion adapters |
| `app/styles/` | Global CSS, primitives, and patterns |
| `public/brand/` | Protected client brand assets |
| `public/design-assets/` | Shared runtime asset bank; final WebP/PNG assets may live here before first use |
| `public/landing/` | Landing-only runtime illustrations |
| `public/how-diagram.html` + `public/how-diagram-assets/` | The record-flow animation and its textures (generated, see Edit Page Text) |
| `2civic-design` skill | Single design authority (law + code contract) |
| `_docs/facts/` | Protected product facts and evidence |
| `_docs/business/` | Claim-disciplined business reference |
| `_docs/marketing/` | Derived marketing/spec reference, not live copy |
| `_ops/PROJECT-ROADMAP.md` | Current stage and direction |
| `_ops/plans/` | Task contracts only when work is explicitly task-file scoped |
| `_ops/rules/` | Durable project rules |
| `_ops/findings/` | Side findings and self-learning notes |
| `_workspace/` | Non-canon scratch/reference material; visual drafts here are not pushed as app assets |
| `tests/visual/` | Playwright route and layout contracts |

## Dependency Rules Of Thumb

- Page copy depends on claim owners (`_docs/facts/*`, then derived
  `_docs/business/*`), but runtime pages do not import those docs.
- Page sections may use `components/ui`, `components/site`, `components/motion`,
  `lib/utils`, CSS modules, and assets from `public/**`.
- Route sections must not import GSAP directly; use `components/motion/`.
- Shared UI primitives should not depend on page sections, marketing docs, or
  `_workspace/**`.
- `_workspace/**` is ignored scratch/source material. Move or publish approved
  assets into `public/**` before runtime use.

## Add A Resource Article

1. Create `app/(site)/resources/<new-slug>/content.ts`.
2. Export `meta`, `sections`, and `footer` using the existing article shape.
3. Create `app/(site)/resources/<new-slug>/page.tsx`.
4. Add the article to `app/(site)/resources/_articles-meta.ts`.
5. Run `npm run lint` and a focused visual test.

## Checks

For normal code/design work, run `npm run lint`. Add focused Playwright when the
change touches visible route wiring, layout, motion, touch safety, or contrast.
Design-system policy findings are warnings during active visual iteration; fix
them when hardening for client preview, not while roughing in new visuals.

For Markdown owner changes, use targeted owner reads/search and
`npm run lint:instructions`. The project does not rely on Markdown hooks,
`1md-*` skills, or the `md` CLI by default.
