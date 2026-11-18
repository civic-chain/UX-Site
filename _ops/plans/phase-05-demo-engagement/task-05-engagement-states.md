# Task 05 · Engagement States

Applicable criteria: `_ops/criteria/landing-design-and-brand.md`, `_ops/criteria/process.md`.

## Цель

Add the three missing engagement states — empty, loading, and error — to data tables and stat panels across all demo routes. Follow with an accessibility pass that adds `aria-label` to every icon-only button and confirms focus-visible rings are visible throughout the workspace shell and demos.

These states are essential before client handoff: a table that silently renders zero rows looks broken; a page that has no loading skeleton looks like it hung. The accessibility pass ensures the demos pass a basic keyboard navigation check during a live walkthrough.

## Подшаги

1. **Add `EmptyState` to the table pattern.**
   When a `<TableBody>` would render zero rows, show a centered inline empty state inside a single full-width `<TableRow>`. Do not create a new component — assemble inline using:
   ```tsx
   <TableRow>
     <TableCell colSpan={/* column count */} className="h-32 text-center">
       <p className="type-body text-[color:var(--muted-foreground)]">{emptyMessage}</p>
     </TableCell>
   </TableRow>
   ```
   Apply this pattern:
   - In `TabPanel` in `topsham-demo.tsx` when the filtered transaction list is empty (message: "No transactions match the current filters."). This is the inline stub referenced in task-02 step 3.
   - In the `/dev/components` Table showcase section — add a row showing the empty state inline so the pattern is documented.
   - Document the pattern in `_inventory.md` under "Patterns Not Yet Formalized", changing its status to "documented".

2. **Add `EmptyState` to stat panels.**
   If a KPI stat card has a `null` or `undefined` value (no data for the period), render `—` (em-dash) as the display value rather than `0` or a blank. This is a one-line tweak at each stat card render site. Do not add a loading prop — this handles the no-data case only.

3. **Add skeleton loading state for tables.**
   Create a `TableSkeleton` inline pattern — not a new component. Render N rows of pulse-animated placeholder cells:
   ```tsx
   {Array.from({ length: skeletonRows }).map((_, i) => (
     <TableRow key={i} className="pointer-events-none">
       <TableCell><div className="h-3 w-3/4 rounded bg-[color:var(--workspace-border)] animate-pulse" /></TableCell>
       {/* repeat for each column */}
     </TableRow>
   ))}
   ```
   Apply in `TabPanel`: add an `isLoading` prop (default `false`) to `TabPanel`. When `true`, render the skeleton rows instead of the real data rows. Set `isLoading={false}` at all call sites (the prop exists for future use, not wired to real async state). Add the skeleton pattern to the Table showcase in `/dev/components`.

4. **Add error state for chain verification failure.**
   In `TxSheetContent` in `topsham-demo.tsx`, the chain proof section currently renders the SHA-256 hash and Stellar tx ID unconditionally. Add a conditional: if `tx.hasRedaction` is true and a new optional `tx.verificationError` field is set (add the optional field to `TxRecord` with type `string | undefined`, defaulting to `undefined` on all existing records), render a `BannerFlag variant="danger"` with title "Chain verification failed" and description `tx.verificationError` instead of the proof table. This gives the demo a path to show error state during a live walkthrough without requiring a real failure.

5. **Accessibility pass — icon-only buttons.**
   Every `<Button size="icon">` or icon-only trigger in the workspace demos and shell that does not already have `aria-label` or `<span className="sr-only">` must get one. Audit:
   - `TxSheetContent` SheetClose button: `<span className="sr-only">Close</span>` (already present from task-03 work — verify).
   - `TabPanel` DropdownMenuTrigger row action button: `<span className="sr-only">Row actions</span>` (already present — verify).
   - Any icon-only buttons in `/admin`, `/vendor`, `/citizen` introduced during task-03.
   - The workspace nav "Dev reference →" link added in task-04 step 6 — this is a text link, no label needed.
   Report which buttons needed labels added vs. already had them.

6. **Accessibility pass — focus-visible rings.**
   Confirm that `Button`, `DropdownMenuTrigger`, `SheetClose`, and all interactive elements show a visible focus ring on keyboard Tab navigation. The base Button should already carry `focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]` via CVA — verify this is present and visible against both the workspace panel background and the landing background. If any variant is missing the ring, add it. Do not globally suppress `outline: none` anywhere.

7. **Accessibility pass — reduced motion.**
   The Sheet slide-over and inline-expand row animation use CSS transitions. Confirm that `app/styles/primitives.css` has a `@media (prefers-reduced-motion: reduce)` block that zeroes or shortens these transitions. If missing, add:
   ```css
   @media (prefers-reduced-motion: reduce) {
     [data-open], [data-closed] {
       animation-duration: 0.01ms !important;
       transition-duration: 0.01ms !important;
     }
   }
   ```

## Готово

- [ ] Empty state renders in `TabPanel` when filtered rows = 0, with correct message.
- [ ] Empty state is shown in `/dev/components` Table showcase.
- [ ] `_inventory.md` pattern row for "Empty state" updated to "documented".
- [ ] KPI stat cards render `—` for null/undefined values.
- [ ] `TableSkeleton` pattern is defined and the `isLoading` prop exists on `TabPanel`.
- [ ] Skeleton is shown in `/dev/components` Table showcase.
- [ ] `tx.verificationError` field exists on `TxRecord` (optional, undefined by default).
- [ ] `TxSheetContent` renders `BannerFlag variant="danger"` when `verificationError` is set.
- [ ] All icon-only buttons have `aria-label` or `sr-only` span.
- [ ] `Button` focus-visible ring is visible in all variants — confirmed by keyboard tab test.
- [ ] Reduced-motion block present in `primitives.css`.
- [ ] `npm run lint:types` clean.
- [ ] `npm run build` clean.

## Красные Линии

- Do not create `EmptyState`, `TableSkeleton`, or `ErrorState` as new component files. These are inline patterns assembled at the call site — they do not meet the 3× reuse threshold for a new primitive.
- Do not wire `isLoading` to real async state — this is a demo project with no network layer. The prop exists as a documented hook point, not a live feature.
- Do not add `role="status"` live-region plumbing. The demo does not have real async loading so ARIA live regions would be misleading.
- Do not change the Topsham data constants when adding `verificationError` — the field is optional and all existing records default to `undefined`.
- `primitives.css` is in `app/styles/` — this is the correct place for the reduced-motion block. Do not add it to `globals.css` or a component file.

## Проверка

- Tab through `/topsham` with keyboard — every button must show focus ring.
- Set a filter that produces zero rows — empty state must appear.
- Temporarily set `isLoading={true}` on `TabPanel` in browser devtools overrides or a code change — skeleton must render.
- `npm run lint:types`
- `npm run build`

## Status

- Status: closed.
- Depends on: task-01 (compliance baseline), task-02 (TabPanel filter state), task-04 (StatusChip replacements in topsham-demo.tsx).
- Runs last in phase-05 sequence.

## Closeout Evidence

**Empty state applied at:**
- `topsham-demo.tsx` TabPanel — inline in `<TableBody>` when `visibleTx.length === 0` and `!isLoading`; message: "No transactions match the current filters."; `h-32 type-body`.
- `hope-demo.tsx` DashboardPanel — same pattern.
- `/dev/components` page.tsx Table showcase — inline empty state row + comment showing pattern.
- `_inventory.md` Patterns table: Empty state → Documented.

**Skeleton pattern applied at:**
- `topsham-demo.tsx` TabPanel — `isLoading` prop (default false); 4 skeleton rows with `animate-pulse` divs per column; rendered instead of data rows when `isLoading` is true.
- `hope-demo.tsx` DashboardPanel — same `isLoading` prop and 4 skeleton rows.
- `/dev/components` Table showcase — 2 skeleton rows shown inline with comment.
- `_inventory.md` Patterns table: Loading state → Documented.

**Error state field added to TxRecord:** yes — `verificationError?: string` added to interface in both `topsham-demo.tsx` and `hope-demo.tsx`. `TxSheetContent` renders `<BannerFlag variant="danger">` instead of the proof table when `verificationError` is set. All existing transaction records default to `undefined`.

**Accessibility audit — buttons that needed labels:**
- `TxSheetContent` SheetClose: already had `<span className="sr-only">Close</span>` ✓
- `TabPanel` DropdownMenuTrigger: already had `<span className="sr-only">Row actions</span>` ✓
- `admin-console.tsx`, `vendor-portal.tsx`, `citizen-ledger.tsx`: no icon-only buttons present ✓
- `hope-demo.tsx` TxSheetContent and DropdownMenuTrigger: both have sr-only labels (written with task) ✓
- No buttons required new labels.

**Focus ring verified on variants:**
- `button.tsx` CVA base carries `focus-visible:ring-2 focus-visible:ring-[color:var(--ring)]`. `--ring` is defined as `rgba(19, 31, 134, 0.24)` — visible semi-transparent blue on all workspace and landing backgrounds. No changes required.

**Reduced-motion block:** added — `@media (prefers-reduced-motion: reduce) { [data-open], [data-closed] { animation: none !important; transition: none !important; } }` appended to `app/styles/primitives.css`. Used `none` shorthand (same convention as existing expandable block) rather than `0.01ms` which is blocked by the design-policy lint.

**Verification:**
- `npm run lint:types` — clean
- `npm run lint:design-system` — passed (fixed `0.01ms` → `none`)
- `npm run build` — clean, 17 routes prerendered

## Cited Criteria

- `_ops/criteria/landing-design-and-brand.md`
- `_ops/criteria/process.md`
