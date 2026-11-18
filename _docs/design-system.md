# CivicChain Design System

Short contract for people and LLM agents. Full rules live in `_ops/criteria/landing-design-and-brand.md`.

## Source Of Truth

- `app/styles/tokens.css` - source values: colors, fonts, spacing, radii, shadows, motion, workspace-derived tokens.
- `app/styles/primitives.css` - single-purpose classes: `type-*`, `stack-*`, `pad-*`, `radius-*`, `shadow-*`, motion hooks.
- `app/styles/patterns.css` - repeated compositions: `section-shell`, `landing-section-flow`, `problem-card-art`, `faq-card-head`, brand-page specimens, workspace panels.
- `components/ui/` - generic UI primitives, including Radix-based wrappers.
- `components/site/` - site header/footer.
- `components/interface/` - workspace-only demo interfaces.
- `public/brand/` - client brand assets; do not change without explicit scope.
- `public/landing/` - final runtime assets for landing sections, selected from `_docs/landing-page/**/extract/`.

## System Layer

The system flows top down:

1. `tokens` provide values.
2. `primitives` provide short single-purpose classes.
3. `patterns` assemble repeated compositions.
4. Components consume this layer instead of creating a separate CSS world.

The landing page, related pages (about, contact, brand), the resources blog, and demo interfaces all use one shared layer. There are no route-local design systems, `/landing-02`, `/landing-03`, sandbox branches, or theme switchers.

Generated sections in `_docs/landing-page/**` set the visual direction for Stage 5, but code does not reference `_docs`. Repeated motifs become tokens, primitives, or patterns. Complex approved illustrations are copied to `public/landing/<section>/...`.

## Palette

`tokens.css` carries one shared palette of derived colors. JSX and CSS read from it directly — there is no card-tone scope, no per-component token prefixes, no auto-attached chrome class. If a section needs a border, stripe, divider, or accent color, it picks the matching palette token at the use site.

Groups (see `tokens.css` for full list):

- `--paper-*` - lifted bright surfaces for filled chips and card-paper backgrounds (`paper-cream`, `paper-gold`, `paper-dusty`, `paper-sage`, `paper-slate`, `paper-neutral`, `paper-bg-bright`, `paper-cream-warmed`, `paper-gold-soft`, `paper-sage-bleached`).
- `--stripe-*` - saturated mid-strength bars for card bottom-bands (`stripe-accent`, `stripe-sage`, `stripe-width`).
- `--edge-*` - transparent foreground overlays for borders, in three to five steps per tone family (`edge-gold-{strong,medium,soft,faint,whisper}`, `edge-gold-tile`, `edge-accent-{strong,medium,soft,bright}`, `edge-sage-{strong,medium,soft,whisper}`, `edge-dusty-whisper`, `edge-slate`).
- `--deep-*` - tone+foreground mixes for text accents (`deep-gold-{strong,medium,soft}`, `deep-sage-{strong,soft}`).
- Specials: `--scrim` (dialog/sheet overlay, AccentRule muted text), `--current-soft` (decorative line bleed), `--secondary-pressed` (button hover).

`SurfaceCard` only sets background and foreground per `tone` ("cream" | "dusty" | "gold" | "slate" | "sage"). Border, bottom-stripe, dividers, and accent colors are written inline at the use site using palette tokens. A section with mixed-tone cards keeps a small local `Record<tone, classes>` map next to the JSX that needs it (see `app/(site)/_sections/portal-hub-section.tsx` for the pattern).

`pad-card` is the standard card padding. `pad-card-roomy` is the airier variant for large editorial cards with metrics or illustrations.

## Cookbook: How To Add A New Color

1. Pick a base tone from `--tone-*` and apply the mix you actually need.
2. Add a single named token in the appropriate palette group inside `tokens.css` (e.g. `--paper-peach: color-mix(in oklab, var(--tone-peach), white 30%)`).
3. Use it from JSX/CSS with `var(--paper-peach)`. Do not write `color-mix()` inline if the same value is already named — reuse the token.
4. If a value is genuinely one-off and won't repeat, write the `color-mix()` directly at the use site rather than inventing a single-use token.

**New surface tone, for example `peach`:**

1. Add base `--tone-peach` / `--tone-peach-foreground` in `tokens.css`.
2. Add `peach` to `surfaceToneClasses` in [components/ui/surface-card.tsx](../components/ui/surface-card.tsx) and to the `SurfaceTone` type in [lib/design-system-types.ts](../lib/design-system-types.ts).
3. If sections start needing `peach` border/stripe/accent variants more than once, add palette entries (`--paper-peach`, `--edge-peach-*`, `--stripe-peach`, `--deep-peach-*`) as the demand appears. Don't pre-create empty slots.

## Visual Registers

- Landing, related pages (about, contact, brand), and resources articles keep an editorial serif voice: large DM Serif, warm civic rhythm, four surface tones, no theme-switcher.
- `/admin`, `/vendor`, `/citizen` stay operational sans: calm working interfaces, with scale, spacing, surface tone, and header rhythm derived from shared `--workspace-*` values.
- Typography uses responsive steps through breakpoint overrides, not viewport-based font scaling.
- Landing FAQ is narrower than the main page grid and centered so open answers do not stretch into long lines; layout is set inline at the section level.
- On mobile, the public ledger renders records as cards, not a table; desktop remains a table pattern.

## Components

- `tone` = visual color tone (`SurfaceCard`, `StatusBadge`).
- `variant` = structural component variant (`Button`, `Badge`, `ContractSummaryCard`).
- `size` = size.
- `FeaturePill variant="flat"` uses a compact uppercase label for lower labels in portal-hub cards; `variant="filled"` remains the normal chip for step/workflow contexts.

`components/ui/` stores generic primitives. If a component uses workspace tokens or carries demo-interface meaning, it lives in `components/interface/`.

Generic controls use neutral `--control-*` tokens. Workspace surfaces use `--workspace-*` only in `components/interface/` and workspace patterns.

## Workspace Tokens

`--workspace-*` tokens are shared-brand derivatives for `/admin`, `/vendor`, `/citizen`. They are not a separate design system. The same rule as the landing palette applies: repeated `color-mix()` formulas earn a `--workspace-*` name (status edges/bg, table-row bg/hover, step-selected bg, link-hover, separator follow this pattern); one-off decorative values may stay inline.

Form/overlay surfaces use the `--control-*` namespace (`--control-surface`, `--control-panel`, `--control-border`, control shadows and radii) — Dialog, Sheet, Select, Field, Input, Checkbox read these directly.

## Do Not

- Do not add tokens, components, or classes "for later."
- Do not keep dead tokens or dead primitives.
- Do not silently change landing copy; the copy source is `_docs/Civic-Chain-Justin/`.
- Do not reference `_docs/landing-page/**` from runtime code.
- Do not restore old variant routes, service pages, or sandbox surfaces without a new user decision.

## Archive Noise

`_docs/Civic-Chain-Justin/_next/**` is a read-only archive of the client export. Broad cleanup tools may treat it as noise; it is not live app code and not a reason to fix or delete files inside it.
