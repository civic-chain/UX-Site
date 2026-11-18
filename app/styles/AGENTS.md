# Styles Agent Instructions

This folder is the shared CivicChain design-system layer.

## File Roles

- `tokens.css` - source values plus the shared palette (`--paper-*`, `--stripe-*`, `--edge-*`, `--deep-*`, plus specials like `--scrim`, `--current-soft`, `--secondary-pressed`). Repeated `color-mix()` formulas earn a palette name here; one-off decorative formulas may stay inline at the use site.
- `primitives.css` - single-purpose base classes: `type-*`, `stack-*`, `pad-*`, `radius-*`, `shadow-*`, motion hooks.
- `patterns.css` - repeated compositions only: `section-shell`, `landing-section-flow`, `problem-card-art`, `faq-card-head`, brand-page specimens, workspace shells. There is no `.card-tone-*` scope and no chrome-helper classes — JSX reads palette tokens directly per use site.
- Cookbook for adding a new color: `_docs/design-system.md` Palette section.

## Relevant Criteria

When working in this folder, read these first:

- `_ops/criteria/landing-design-and-brand.md` - untouchable tokens, brand, design-layer anti-goals.
- `_ops/criteria/process.md` - do not create files, tokens, or classes without need; when rules conflict, rewrite instead of accumulating.
- `_ops/criteria/agent-discipline.md` - behavior and default chain.

## Local Rules

- Do not add a token without a real visual reason and repeated use at least 3 times in the project.
- Do not create a class that duplicates an existing base class or pattern.
- Do not add styles for a single landing route as a new design layer.
- Demo interfaces may receive working patterns, but they must stay derived from the shared brand.
- When adding a custom property outside `:root`, extend `cssTokenSelectorAllowlist` in `lib/design-policy.ts`; otherwise lint will block it.
- After edits in this folder, run `npm run lint`.

`tokens.css` is open during current Stage 5 for generated-section iteration; before and after this stage, check the rule in `landing-design-and-brand.md`.
