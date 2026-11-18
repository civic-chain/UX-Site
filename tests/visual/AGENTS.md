# Visual Tests Agent Instructions

This folder checks user-visible breakage, not taste for taste's sake.

## When To Run

- For route, layout, motion, touch-safety, contrast, or mobile-readability changes, run focused Playwright.
- For a new route contract or changes across several surfaces, run full `npm run test:visual`.
- If only documents or agent instructions changed, Playwright is not needed.

## Relevant Rules

- `_ops/rules/landing-design-and-brand.md` - visual language, design layer, what counts as visible breakage.
- `_ops/rules/landing-copy.md` - which copy is untouchable.
- `_ops/rules/agent-discipline.md` - behavior and default chain.

## Local Rules

- Browser truth beats "looks fine in code."
- Stable route anchors (`#hero`, `#portal-hub`, `#site-header`, etc.) are a user-visible contract; tests should reach them through helpers like `section(page, "<id>")`.
- Add a test only for a user-visible contract or recurring breakage.
- Do not turn visual tests into exact-copy policing or personal taste checks.
- No PNG snapshot baselines in the active phase; if pixel diff is needed for a specific contract, justify it in the task file first.
- Keep detailed commands and spec lists in `tests/visual/README.md`.
