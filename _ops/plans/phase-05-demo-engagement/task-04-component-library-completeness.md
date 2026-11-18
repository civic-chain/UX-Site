# Task 04 · Component Library Completeness

Applicable criteria: `_ops/criteria/landing-design-and-brand.md`, `_ops/criteria/process.md`.

## Цель

Close the gap between what exists in `components/ui/` and what is showcased at `/dev/components`. Every primitive a contributor or the client's LLM agent might reach for should have a live example with a usage note. Also formalize two patterns that are assembled inline everywhere but never named: StatusChip and the KPI stat card.

This task can run in parallel with task-01 — it touches only the showcase page and adds no new primitives to the design system unless a genuine reuse case is proven.

## Подшаги

1. **Showcase `Progress`.**
   `components/ui/progress.tsx` wraps Radix Progress. Add a `ProgressDemo` export to `_demos.tsx` and a `ShowcaseSection` in `page.tsx`. Show at least: default accent fill at various percentages (25%, 50%, 82%), a warning-colored variant using `indicatorClassName="bg-[color:var(--workspace-warning)]"`, and a usage note about `value` being 0–100.

2. **Showcase `Expandable`.**
   `components/ui/expandable.tsx` is the accordion primitive used in the landing FAQ and TIF contract variables panel. Add an `ExpandableDemo` to `_demos.tsx` showing single-open mode (wrap in `<ExpandableScope groupMode="single">`) and multi-open mode. Use civic-flavored content (FAQ items or budget categories). Usage note: `data-open` drives CSS animation in `primitives.css`; the component handles state, keyboard, and ARIA.

3. **Showcase `Breadcrumb`.**
   `components/ui/breadcrumb.tsx` is a standard nav primitive. Add a `BreadcrumbDemo` showing a two-level path (e.g., "Dashboard / Disbursements") and a three-level path (e.g., "Town of Topsham / FY 2026 / Public Works"). Usage note: wraps in `<nav aria-label="breadcrumb">` automatically.

4. **Formalize StatusChip as a pattern.**
   The Anchored / Redacted / Pending status label is assembled inline in every table as a `<span className="type-caption rounded border ...">`. This is repeated in at least five places across demo interfaces and the component library. Add a `StatusChip` function to a new file `components/ui/status-chip.tsx`:
   - Props: `status: "anchored" | "redacted" | "pending" | "active" | "expiring"`
   - Renders the correct workspace-token color pair (success for anchored/active, warning for redacted/expiring, muted for pending)
   - Replace all inline-assembled status spans in `topsham-demo.tsx` and `page.tsx` with `<StatusChip status="anchored" />` etc.
   - Add a `StatusChipDemo` to `_demos.tsx` showing all five states.

5. **Document the KPI stat card pattern.**
   The stat card (label, icon, display value, sub-caption, delta row) is assembled inline in Topsham and should not become a new component — it has only one confirmed use site after task-03. Instead, add a `ShowcaseBlock` inside the existing Table section (or a new "Patterns" section) showing the assembled markup and a comment in `_inventory.md` linking to the reference implementation in `topsham-demo.tsx`.

6. **Add `/dev/components` link to the workspace nav.**
   The component library is useful during active development but is never linked from anywhere. Add a small "Dev reference →" text link in the footer of the workspace shell (visible only in development / non-production builds) so contributors can reach it without typing the URL manually.

## Готово

- [ ] `Progress` has a live showcase with percentage variants and warning color.
- [ ] `Expandable` has a live showcase with single-open and multi-open modes.
- [ ] `Breadcrumb` has a live showcase with two- and three-level paths.
- [ ] `StatusChip` component exists in `components/ui/status-chip.tsx` with five states.
- [ ] All inline-assembled status spans in `topsham-demo.tsx` and `page.tsx` replaced with `<StatusChip>`.
- [ ] `StatusChipDemo` is shown in `/dev/components`.
- [ ] KPI stat card pattern is documented (either as a showcase block or an inventory note).
- [ ] Every row in the `_inventory.md` primitive status table shows ✓.
- [ ] `npm run lint:types` clean.
- [ ] `npm run build` clean.

## Красные Линии

- Do not create new UI primitives unless a genuine 3× reuse case is proven (AGENTS.md rule). StatusChip qualifies; the KPI card does not yet.
- Do not add Storybook, a design token viewer, or a theme-switcher to the library page (anti-goals per AGENTS.md).
- The dev-reference link must be conditional on the dev environment — do not expose it on the public Netlify URL.
- Keep `_demos.tsx` as a single "use client" file — do not split into per-component demo files.

## Проверка

- Open `/dev/components` in browser and visually verify each new section.
- `npm run lint:types`
- `npm run build`

## Status

- Status: closed.
- Depends on: nothing (can run in parallel with task-01).
- StatusChip step depends on task-01 being complete for `topsham-demo.tsx` replacements.

## Closeout Evidence

**Primitives showcased:**
- `Progress` — `ProgressDemo` in `_demos.tsx`; three fills (accent at 25/50/82%, warning at 82%, success at 54%); usage note on `indicatorClassName` + `h-1.5 bg-workspace-surface` pattern for workspace bars.
- `Expandable` — `ExpandableDemo` in `_demos.tsx`; single-open (ExpandableScope + group="single") and multi-open (default) demos; civic-flavored FAQ/budget content.
- `Breadcrumb` — `BreadcrumbDemo` in `_demos.tsx`; two-level ("Dashboard / Disbursements") and three-level ("Town of Topsham / FY 2026 / Public Works") demos.

**StatusChip: added + replacements made in:**
- New file: `components/ui/status-chip.tsx` — 5 states (anchored, active, redacted, expiring, pending); success/warning/muted token pairs via lookup map.
- `topsham-demo.tsx` — 2 inline status spans replaced (Redacted at line ~728, Anchored at line ~730).
- `app/dev/components/page.tsx` — 3 inline status spans replaced (2× Anchored, 1× Redacted in the Table showcase).
- `StatusChipDemo` added to `_demos.tsx`; `StatusChip` showcased in page.tsx with all 5 states.

**KPI card documented at:**
- New ShowcaseSection "Patterns — KPI stat card" in `page.tsx` showing 4 live `<StatCard>` examples.
- `_inventory.md` Patterns table updated to mark KPI stat card as complete.

**Dev reference link:**
- Added to `workspace-shell.tsx` `SidebarFooter` conditional on `process.env.NODE_ENV === "development"`. Shows only in `npm run dev`, never on the Netlify static export (NODE_ENV=production at build time).

**Inventory:**
- `_inventory.md` UI Primitive Status table: Progress, Expandable, Breadcrumb marked ✓; StatusChip row added.
- Patterns Not Yet Formalized: StatusChip and KPI stat card marked Complete.

**Verification:**
- `npm run lint:eslint` — 0 errors, 1 pre-existing unused-var warning (onboarding-wizard.tsx)
- `npm run lint:types` — clean
- `npm run build` — clean, all 15 routes prerendered

## Cited Criteria

- `_ops/criteria/landing-design-and-brand.md`
- `_ops/criteria/process.md`
