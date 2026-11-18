# Agent CSS Method

Use when the task is broad, ambiguous, or likely to create style debt. Do not
read for simple leaf edits after the owner is obvious.

## Reader Job

Help a smart agent avoid the common CSS failure: adding a local-looking class
that creates an unowned future dependency.

## Owner Layers

Classify before editing:

- **Token**: reusable design value; color role, spacing, radius, shadow,
  typography, breakpoint/container, z-index level.
- **Layout/composition**: spatial relationship; flex/grid flow, gap, wrapping,
  scroll, sticky, intrinsic layout.
- **Component/block**: stable UI object; button, card, field, modal, table row.
- **Variant/exception**: controlled difference; size, tone, density, selected,
  invalid, loading, destructive.
- **Global override**: base styles, uncontrolled Markdown/HTML, third-party
  markup, reset, CSS layers.

Default: choose the smallest layer with real ownership. If one change touches
many unrelated files, stop and reduce change radius.

## Agent Procedure

1. Name the observable result.
2. Identify the existing owner before editing.
3. Try the no-new-code path: delete a conflict, use a current token/variant,
   move one class to the owning element, or let intrinsic layout work.
4. Pick the owner layer with the smallest future blast radius.
5. Change only that layer.
6. Stress the relevant states.
7. Delete redundant classes, wrappers, variants, arbitrary values, or stale CSS.

Internal GPT-5.5 shape:

```text
Result: visible state.
Owner: token / layout / component / variant / global.
Constraints: existing design system, no new source of truth, state matrix.
Evidence: rendered browser check or explicit reason skipped.
Stop: target states pass and delete pass removed avoidable debt.
```

## Failure Modes

- **Override pile**: new class -> breakpoint -> `!important`. Fix owner first.
- **Screenshot fix**: one viewport passes, long content/mobile breaks. Run state
  matrix.
- **Arbitrary drift**: many `w-[317px]`-style values. Promote repeated roles to
  tokens; keep true one-offs local.
- **Variant leak**: callers pass long `className` patches. Add finite variants.
- **Breakpoint theater**: many viewport prefixes solving a container problem.
  Prefer intrinsic layout/container queries.
- **Best-practice cargo cult**: new token/variant/component/CSS layer because it
  is "cleaner". Add it only when it removes current duplication or risk.
- **Global fog**: global selector changes many pages. Move to component/variant
  or isolate in a deliberate layer.

## Smell Radar

Inspect, do not auto-rewrite:

- hard-coded repeated values;
- duplicate selector blocks;
- high-specificity selectors, IDs, `!important`;
- deep nesting;
- global element selectors outside base/prose;
- dynamic Tailwind class construction;
- unbounded component `className`;
- contradictory utilities on one element;
- spacing on repeated children instead of parent gap;
- fixed heights around dynamic content;
- overflow hidden used to hide layout errors.

## Delete Pass

Ask:

- Can `gap-*` replace child margins?
- Can `px-*`, `py-*`, or `size-*` replace side pairs?
- Can parent layout replace a wrapper?
- Can a variant replace repeated conditional classes?
- Can a token replace repeated arbitrary values?
- Can `min-w-0`, `min-h-0`, or `minmax(0,1fr)` solve overflow honestly?
- Can lower specificity or layer order replace override escalation?

Sources:

- https://tailwindcss.com/docs/styling-with-utility-classes
- https://tailwindcss.com/docs/detecting-classes-in-source-files
- https://every-layout.dev/rudiments/composition/
- https://cube.fyi/
- https://digitalcommons.calpoly.edu/theses/1842/
