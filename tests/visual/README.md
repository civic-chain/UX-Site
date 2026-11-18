# Visual Test Contracts

This folder is a thin Playwright verification layer for frontend regressions users would notice.

It protects:
- public landing and marketing routes
- layout, touch, motion, contrast, overflow, and mobile readability

There are no PNG snapshot baselines: visual fidelity is verified by browser review, not by pixel diff.

Files:
- `landing-contracts.spec.ts`: landing sections, public link routing, record-flow interaction, motion, and `/landing-v2` redirect
- `brand-contracts.spec.ts`: `/brand` interaction contracts, representative readability checks, downloads, and mobile/touch safety
- `live-route-design-system.spec.ts`: all live `(site)` routes keep mobile viewport safety
- `marketing-pages.spec.ts`: `/about`, `/how-it-works`, `/brand`, `/resources`, and article route contracts (shell, sections/gates, footer, representative logo downloads)
- `route-contracts.ts`: shared live, marketing, and standalone demo route contracts
- `surface-safety.spec.ts`: overflow, clipping, overlap, touch targets, contrast, reduced motion, mobile readability
- `helpers.ts`: shared route, geometry, and color helpers

Main commands:
- `PLAYWRIGHT_PORT=3311 npm run test:visual`
- `PLAYWRIGHT_PORT=3311 npm run test:visual:brand`
- `PLAYWRIGHT_PORT=3311 npm run test:visual:routes`
- `PLAYWRIGHT_PORT=3311 npm run test:visual:list`
- `PLAYWRIGHT_PORT=3311 npm run test:visual:ui`

Focused runs:
- `PLAYWRIGHT_PORT=3311 npx playwright test tests/visual/landing-contracts.spec.ts`
- `PLAYWRIGHT_PORT=3311 npx playwright test tests/visual/live-route-design-system.spec.ts`
- `PLAYWRIGHT_PORT=3311 npx playwright test tests/visual/surface-safety.spec.ts -g "<pattern>"`
- If a healthy dev server is already running: `PLAYWRIGHT_HOST=localhost PLAYWRIGHT_PORT=<port> PLAYWRIGHT_REUSE_SERVER=true npx playwright test <spec-or-grep>` when the server URL is `localhost`; keep the default host for servers started by Playwright.

Default posture:
- `npm run lint` stays the main local gate and includes TypeScript plus design-system checks.
- Run focused Playwright when a task changes visible route wiring, layout, motion, touch safety, or contrast.
- Run the full visual suite for new route contracts, cross-surface churn, or an explicit verify/pre-PR pass.
- Use UI Mode, HTML reports, and saved traces for debugging; they are not required final gates.

When adding or changing tests:
- add a test only when it protects a user-visible contract or recurring bug
- prefer role-based checks, manifest/fixture wiring, and postconditions over brittle waits
- update `route-contracts.ts`, `landingPublicSectionIds`, section counts, or link contracts in the same change that alters them
- keep exact-copy policing, taste-only design rules, premature route variants, and manual capture utilities out of this folder
- keep retired route 404 checks out of the default suite; run an ad hoc focused check only when route wiring changes
