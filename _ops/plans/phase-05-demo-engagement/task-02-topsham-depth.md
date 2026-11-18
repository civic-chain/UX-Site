# Task 02 · Topsham Demo Depth

Applicable criteria: `_ops/criteria/landing-design-and-brand.md`, `_ops/criteria/client-feedback-cycle.md`, `_ops/criteria/process.md`.

## Цель

Make `/topsham` feel like a real municipal finance product. It is the primary client-facing demo and the strongest proof-of-concept for CivicChain. Four improvements: mobile readability, table filtering, budget-to-table linking, and a first-visit orientation banner. Each is independent; they can ship separately.

## Подшаги

1. **Mobile responsiveness sweep (375px viewport).**
   Open the demo at 375px and walk through every panel: login screen, vertical picker, all three tab panels (TLaaS, TIF, Vendors), and the Sheet slide-over. Identify: any text that overflows or truncates unreadably, any touch target below 44px, any horizontal scroll introduced by the table, any stat cards that stack awkwardly. Fix each issue at the component level using responsive Tailwind classes. The transactions table columns already use `hidden sm:table-cell` for Category and Method — verify these hide correctly. The Sheet panel is `max-w-md w-full` which should be fine; confirm on real device or browser devtools.

2. **Transaction table filter controls.**
   Add a small filter bar above the transactions table in `TabPanel`. Show three segmented controls (implemented as a group of `<Button variant="ghost">` pills with an active state): "All", the tab's category label (e.g., "Department" for TLaaS), and "Method". Clicking a category filter narrows `data.transactions` by `tx.category`; clicking a method filter narrows by `tx.method`. Both filters compose (AND). A "Clear" link resets to All. State lives in `TabPanel` as `filterCategory: string | null` and `filterMethod: string | null`. The filter bar only renders if `data.transactions.length > 2`.

3. **Budget category → transactions table linking.**
   In the category bars section, make each `CategoryBar` clickable. Clicking a bar sets `filterCategory` (from step 2) to that category name and scrolls the transactions table into view via a `useRef`. Add a subtle hover state to each bar (cursor-pointer, slight background tint on hover). If the category has zero matching transactions, show an empty state in the table (see task-05 for the empty state component — stub a simple inline message here in the meantime: "No transactions in this category for the current period.").

4. **First-visit orientation BannerFlag.**
   Add a `BannerFlag variant="info"` at the top of the TabPanel grid (above the FiscalBannerCard) that appears only on first render. Message: "This is a live demo. All figures are real FY 2026 data for the Town of Topsham, Maine, anchored to Stellar Testnet. Click any transaction row to verify the chain proof." Include a dismiss button (stores `dismissed` in `useState` — no persistence needed for a demo). This banner only shows on the TLaaS tab first visit; TIF and Vendors do not repeat it.

## Готово

- [ ] Demo is navigable and readable at 375px — no horizontal overflow, all text legible, touch targets ≥44px.
- [ ] Filter bar renders above transactions table on all three tab panels.
- [ ] Filtering by category narrows the displayed rows correctly.
- [ ] Filtering by method narrows correctly and composes with category filter.
- [ ] "Clear" resets both filters.
- [ ] Clicking a CategoryBar sets the category filter and scrolls to the table.
- [ ] Orientation BannerFlag appears on TLaaS first render and dismisses on click.
- [ ] `npm run lint:types` clean after changes.

## Красные Линии

- Do not change the data (TLAAS, TIF, VENDORS constants). Filter is a client-side view over the existing data.
- Do not add a backend or localStorage — this is a demo, state lives in component memory only.
- Do not break the inline expand or Sheet behaviors introduced in phase 04.
- Mobile fixes should use responsive Tailwind classes at the component level — do not add a separate mobile layout tree.
- The filter bar must not introduce raw `<button>` elements (use `<Button>`).

## Проверка

- Manual browser review at 375px and 1280px after each step.
- `npm run lint:types`
- `npm run build`

## Status

- Status: closed.
- Depends on: task-01 (raw button fixes in `topsham-demo.tsx` must land first).

## Closeout Evidence

**Mobile sweep findings (375px):**
- UtilizationRing (80px wide) hid behind `hidden sm:flex` on the FiscalBannerCard ring container — removes cramping on xs alongside the 32px-font YTD number.
- Tab bar buttons gained `min-h-[44px]` — previous `py-2.5` + `type-caption` was ~36px, below WCAG touch-target minimum.
- Status column (`hidden sm:table-cell`) — at xs only Payee, Date, Amount, and actions are visible, preventing horizontal overflow. Category (`hidden md:table-cell`) and Method (`hidden sm:table-cell`) were already hidden; this brings the xs column count down to 4 visible.
- Sidebar already `lg:sticky` below content on xs — no change needed.
- Sheet `max-w-md w-full` correct; vertical picker `sm:grid-cols-3` stacks cleanly on xs.

**Filter controls:**
- `filterCategory: string | null` and `filterMethod: string | null` state added to `TabPanel`.
- `uniqueCategories` and `uniqueMethods` derived from `data.transactions` at render time.
- `visibleTx` computed by ANDing both filters.
- Filter bar rendered inside transactions card (below header, above table) only when `data.transactions.length > 2`.
- Two pill groups: `data.categoryLabel` group and "Method" group. Active pill: info-border + info-bg. "Clear" appears only when a filter is active.
- Empty state message renders in `<TableBody>` when `visibleTx.length === 0`.

**Budget-to-table linking:**
- `CategoryBar` gained optional `onClick?: () => void` prop; when provided, the wrapper div gets `cursor-pointer`, negative margin / positive padding trick for hover zone, and `hover:bg-[color:var(--workspace-surface)] transition-colors`.
- `txTableRef = useRef<HTMLDivElement>` attached to the transactions card div.
- `handleCategoryBarClick(name)` sets `filterCategory` then scrolls to table with 50ms delay (allows re-render to settle before scroll).
- All category bars pass their name via `onClick`.

**Orientation banner:**
- `showOrientationBanner?: boolean` prop added to `TabPanel`.
- `bannerDismissed: boolean` useState tracks in-session dismiss.
- `BannerFlag variant="info"` with shield icon, "Live Demo" title, and full description renders above FiscalBannerCard when `showOrientationBanner && !bannerDismissed`.
- Dismiss `<Button>` passed via `action` prop.
- `TopshamnDashboard` passes `showOrientationBanner={tab === "tlaas"}` — TIF and Vendors tabs receive `false`.

**Verification:**
- `npm run lint:types` — clean
- `npm run build` — clean, all 14 routes

## Cited Criteria

- `_ops/criteria/landing-design-and-brand.md`
- `_ops/criteria/client-feedback-cycle.md`
- `_ops/criteria/process.md`
