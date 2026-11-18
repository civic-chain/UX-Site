# Phase 05 · Demo Engagement and Component Completeness

## Цель

Take the demo interfaces from functional to compelling. The demos — particularly `/topsham` — are the primary client-facing proof-of-concept for CivicChain. This phase establishes formal guidelines for demo interaction depth, resolves outstanding primitive compliance issues, and ensures every demo inherits the shared workspace design system consistently. A parallel deliverable is a complete component library at `/dev/components` that doubles as the Stage 7 handoff document for the demo layer.

This phase does not touch landing pages (Phase 04 scope). It runs after Phase 04 task-05 closes and before Stage 6 client delivery.

## Strategy Anchor

- ROADMAP Stage 5 mentioned demos as secondary ("demos inherit the design system") but set no quality bar. Phase 05 defines and closes that gap.
- The component library at `/dev/components` serves two audiences: contributors during development and the client's LLM agent at Stage 7 handoff.
- Demo quality is a direct client signal — a polished `/topsham` is more persuasive than any landing page copy.
- Design rules for the workspace layer live in `_ops/criteria/landing-design-and-brand.md`. No parallel token namespace for demos — they read the same `--workspace-*` tokens.

## Scope

**In scope:**
- `/topsham` — primary client demo, highest priority
- `/admin`, `/vendor`, `/citizen` — secondary demos, parity pass
- `/dev/components` — component library showcase completeness
- `components/interface/` — primitive compliance cleanup
- `components/ui/` — missing showcase entries and pattern formalization

**Out of scope:**
- Landing page visual changes (Phase 04 / Stage 5)
- New data or API connections (production is Stage 7+)
- `/pitch` route (out-of-scope project-wide)
- Theme-switcher or parallel token namespaces (anti-goal per AGENTS.md)
- Pixel-perfect demo screenshots or imagegen cycles

## Sequence

| Task | File | What it does | Status |
|---|---|---|---|
| 01 | [task-01-demo-primitive-compliance.md](task-01-demo-primitive-compliance.md) | Replace raw `<button>`/`<input>`/`<select>` with proper UI primitives across all demo interfaces. Resolve inline style violations. Prerequisite for all other tasks. | closed |
| 02 | [task-02-topsham-depth.md](task-02-topsham-depth.md) | Mobile responsiveness sweep, transaction filter controls, budget-category-to-table linking, first-visit orientation. | closed |
| 03 | [task-03-vertical-demo-parity.md](task-03-vertical-demo-parity.md) | Admin, vendor, citizen demos reach the same workspace token consistency and interaction depth as Topsham. | closed |
| 04 | [task-04-component-library-completeness.md](task-04-component-library-completeness.md) | Showcase all remaining `components/ui/` primitives. Formalize StatusChip and KPI stat card as named patterns. | closed |
| 05 | [task-05-engagement-states.md](task-05-engagement-states.md) | Empty states, loading states, error states for tables and data panels. Accessibility pass: focus rings, ARIA labels on icon-only buttons. | closed |

Tasks 01 and 04 can run in parallel. Tasks 02 and 03 depend on 01. Task 05 runs last.

## Acceptance Criteria

- [x] `npm run lint` passes with no new violations introduced in `components/interface/`.
- [x] Topsham demo is usable and readable on a 375px mobile viewport.
- [x] `/admin`, `/vendor`, `/citizen` use `--workspace-*` tokens consistently with Topsham — no route-local color overrides.
- [x] `/dev/components` covers every primitive in `components/ui/` with a live example and usage note.
- [x] StatusChip is a named primitive used consistently across all demos — no inline-assembled status labels.
- [x] Every data table and data panel has an empty-state and an error-state.
- [x] All icon-only buttons have `aria-label` or `<span className="sr-only">`.

## Phase Closeout

**Status: closed.** All 5 tasks complete. `npm run build` clean, 17 routes prerendered.

**Deliverables shipped:**
- `/topsham` — full three-tab demo (TLaaS, TIF, Vendors) with filter controls, CategoryBar-to-table scroll, row expand + Sheet slide-over, chain proof, audit timeline, copy actions.
- `/hope` — Town of Hope, Maine TLaaS demo with real FY 2024 data from the 2025 Annual Town Report. Password `hope2026`.
- `/admin`, `/vendor`, `/citizen` — workspace token consistency, BannerFlag per-demo, StatCard canonical pattern.
- `/dev/components` — full primitive showcase including Progress, Expandable, Breadcrumb, StatusChip, KPI stat card pattern, empty state, skeleton loading.
- `components/ui/status-chip.tsx` — new primitive, 5 states, used across all demos.
- Engagement states: `isLoading` prop + skeleton rows on all TabPanel/DashboardPanel instances; empty state at h-32/type-body; `verificationError` field + BannerFlag danger in TxSheetContent.
- Accessibility: sr-only labels on all icon-only buttons; focus-visible rings verified; `prefers-reduced-motion` block in `primitives.css` covering `[data-open]`/`[data-closed]`.

## Verification

- After each task: `npm run lint` (focus on `components/interface/` errors).
- After visible changes: manual review in browser at 375px and 1280px.
- Before closing the phase: `npm run build` clean, no type errors.
- No Playwright visual contracts exist yet for demo routes — browser review is the gate.

## Cited Criteria

- `_ops/criteria/landing-design-and-brand.md`
- `_ops/criteria/process.md`
- `_ops/criteria/client-feedback-cycle.md`
