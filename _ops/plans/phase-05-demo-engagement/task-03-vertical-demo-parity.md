# Task 03 · Vertical Demo Parity

Applicable criteria: `_ops/criteria/landing-design-and-brand.md`, `_ops/criteria/process.md`.

## Цель

Bring `/admin`, `/vendor`, and `/citizen` to the same baseline as `/topsham`. They do not need to be as deep — they are secondary demos — but they must share the workspace token layer, use the same stat card and table patterns, and not look visually inconsistent when a client clicks between them.

The test: if a client navigates from `/topsham` to `/admin`, the transition should feel like moving between sections of the same product, not switching between two different projects.

## Подшаги

1. **Audit current state of each demo.**
   Read `app/admin/page.tsx`, `app/vendor/page.tsx`, `app/citizen/page.tsx` and their component files. For each, answer:
   - Does it use `--workspace-*` tokens for backgrounds, borders, and semantic colors?
   - Does it use `radius-workspace-card` for panels?
   - Does it have stat cards? Do they match the Topsham pattern (icon top-right, value, sub-line, delta)?
   - Does it have a data table? Does it use `<Table>` from `components/ui/table`?
   - Does it have any panel header patterns (title + sub-caption + right-side badge/status)?
   - What raw `<button>` or inline style violations remain after task-01?

2. **Apply workspace token layer where missing.**
   Any panel, card, or surface currently using hardcoded hex/rgba or landing-layer tokens (`--tone-*`, `--paper-*`) should be updated to the appropriate `--workspace-*` equivalent. Do not introduce new tokens — use what already exists.

3. **Align stat cards.**
   If any demo has a stat/KPI card, align it to the Topsham pattern: `radius-workspace-card border border-[color:var(--workspace-border)] bg-[color:var(--workspace-panel)] p-4` with label top-left, icon top-right (16px InterfaceIcon), display value, sub-caption, and optional delta row at the bottom separated by a border-t. See `topsham-demo.tsx` lines 363–381 for the reference implementation.

4. **Align data tables.**
   Any data table must use `<Table>` from `components/ui/table`, with `<TableHeader>`, `<TableBody>`, `<TableRow>`, `<TableHead>`, `<TableCell>`. The "Anchored" / status chips must use the StatusChip pattern from task-04 (if task-04 has landed) or a consistent inline span pattern until then.

5. **Add BannerFlag where appropriate.**
   Each demo should show at least one contextually appropriate `BannerFlag` — a success/info for chain status, or a warning for any threshold condition. This adds product depth and demonstrates the component in context.

6. **Verify visual consistency.**
   Open all four demos in browser side-by-side. The panel chrome, typography scale, and color language should read as one system.

## Готово

- [ ] `/admin`, `/vendor`, `/citizen` all use `--workspace-*` tokens — no landing-layer or hardcoded colors in their workspace surfaces.
- [ ] Stat cards (where present) match the Topsham pattern.
- [ ] Data tables (where present) use `<Table>` from `components/ui/table`.
- [ ] At least one `BannerFlag` appears in each demo with contextually accurate content.
- [ ] No new raw `<button>` violations introduced.
- [ ] `npm run lint:types` clean.
- [ ] `npm run build` clean.
- [ ] Visual side-by-side review passes — the four demos read as one product.

## Красные Линии

- Do not add new data constants or fake stats without user approval — use or extend what already exists in the codebase.
- Do not rebuild demo interfaces from scratch. Align what exists to the shared pattern layer.
- Do not make these demos as deep as Topsham (Sheet drill-down, filter controls, etc.) — the target is baseline parity, not feature parity.
- Do not change the landing pages or shared primitives as a side-effect of this task.

## Проверка

- Manual browser review of all four demos at 1280px and 375px.
- `npm run lint:eslint 2>&1 | grep "components/interface"`
- `npm run lint:types`
- `npm run build`

## Status

- Status: closed.
- Depends on: task-01 (compliance fixes must land first).
- Can run in parallel with task-02 after task-01 is closed.

## Closeout Evidence

**Audit findings per demo:**
- `/admin` (`admin-console.tsx`): Already used workspace tokens throughout. `StatCard` present (via `adminOverviewMetrics`). DataTable uses `<Table>` primitives via `<DataTable>` wrapper. No raw button violations. Missing: `BannerFlag`.
- `/vendor` (`vendor-portal.tsx`): Two icon containers used `--accent-surface` (landing-layer token) instead of `--workspace-info-bg`. All other surfaces on workspace tokens. No DataTable issues. Missing: `BannerFlag`.
- `/citizen` (`citizen-ledger.tsx`): Already used workspace tokens. `StatCard` present (via `citizenOverviewMetrics`). `LedgerTable` uses `<Table>` primitives. No violations. Missing: `BannerFlag`.

**Token layer changes:**
- `vendor-portal.tsx`: `bg-[color:var(--accent-surface)]` → `bg-[color:var(--workspace-info-bg)]` at two icon container divs (MCC lock icon, line ~141; upload icon, line ~294).

**Stat card alignment:**
- All three demos use the shared `<StatCard>` component. `stat-card.tsx` was updated in this task to match the Topsham pattern: `workspace-panel p-4`, `type-caption mb-2` label, `type-title tabular-nums` value, `type-caption mt-0.5` detail.

**Table alignment:**
- `/admin`: `<DataTable>` wrapper over `<Table>` primitives — already correct.
- `/vendor`: `<DataTable>` wrapper — already correct. Payment history table also uses `<Table>` primitives directly.
- `/citizen`: `<LedgerTable>` uses `<Table>` primitives — already correct.

**BannerFlag additions:**
- `admin-console.tsx`: `BannerFlag variant="success"` with shield icon, "Chain Healthy · All records anchored", Stellar/SAR anchor status — rendered above the overview stats section.
- `vendor-portal.tsx`: `BannerFlag variant="success"` with shield icon, "SAR Anchored · XRP Ledger", CRN-2026-PLW-0042 SAR anchor confirmation — rendered after `ContractSummaryCard` and before the contract detail grid.
- `citizen-ledger.tsx`: `BannerFlag variant="info"` with shield icon, "Public Record · Verification Available", stellar.expert self-serve verification message — rendered above the overview stats section.
- All three use `@/components/ui/banner-flag` (BannerFlag lives in `components/ui/`, not `components/interface/`).

**Visual consistency review:**
- All four demos share: `workspace-panel` card chrome, `type-caption`/`type-title` stat card scale, `<DataTable>`/`<Table>` table pattern, `BannerFlag` chain-status banner at the top of the authenticated view. Token language is consistent across the workspace surface layer.

**Verification:**
- `npm run lint:eslint` — 0 errors, 1 pre-existing unused-var warning in `onboarding-wizard.tsx` (unrelated)
- `npm run lint:types` — clean
- `npm run build` — clean, all 15 routes prerendered

## Cited Criteria

- `_ops/criteria/landing-design-and-brand.md`
- `_ops/criteria/process.md`
