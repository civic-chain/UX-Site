---
name: 1tailwind-dev
description: >
  Use automatically whenever a task touches Tailwind, CSS, styling, layout,
  responsive behavior, design tokens, className logic, UI variants, CSS files,
  PostCSS, theme variables, visual regressions, or frontend component styling.
  Keep visual changes owner-aware, token-based, responsive, verifiable in a
  browser, and resistant to CSS/code bloat: extra wrappers, variants, tokens,
  utilities, overrides, breakpoints, and "just in case" states. Skip backend-only
  work and UI copy tasks that do not affect styling or layout.
---

# Tailwind Dev

## Result

Tailwind/CSS changes produce the requested visual result with the least new CSS,
classes, wrappers, and variant surface that still remains inspectable and
verifiable.

## Work Path

1. Classify the style owner before editing: token, layout/composition,
   component/block, variant/exception, or global override.
2. Inspect the rendered UI when possible. Check at least desktop, mobile, long
   content, hover/focus/disabled/loading, dark mode if present, and overflow.
3. Run the code-budget gate: can this be fixed by deleting a conflicting class,
   using an existing token/variant, changing one owner, or relying on intrinsic
   layout? Add new CSS/classes/wrappers only after those fail.
4. Prefer existing tokens, components, variants, and local patterns. Add an
   arbitrary value, custom utility, or global CSS rule only with a current owner.
5. Use static Tailwind class strings. Map props to complete classes; do not build
   class names with string interpolation.
6. Make the smallest visual change, then do a delete pass: remove conflicting
   utilities, redundant wrappers, stale variants, unused tokens, and override
   patches.

## Reference Routes

- Read `references/agent-css-method.md` when the task is broad, ambiguous, or
  risks creating style debt.
- Read `references/tailwind-patterns.md` when editing className logic, variants,
  tokens, Tailwind v4 theme CSS, `@apply`, `@utility`, `clsx`, `cva`, or
  `tailwind-merge`.
- Read `references/defensive-layout.md` when fixing layout, overflow,
  responsive behavior, long content, flex/grid, container queries, or sticky /
  scroll issues.
- Read `references/verification.md` when choosing checks, browser screenshots,
  visual regression, lint/format tooling, or closeout evidence.

## Guardrails

- Do not fix CSS by stacking another override before identifying the owner.
- Do not add `!important`, ID selectors, deep descendant selectors, or global
  rules unless the target is third-party/unowned markup or a deliberate base
  layer.
- Do not use `className` as an unlimited escape hatch for reusable components;
  prefer named `variant`, `size`, `tone`, `density`, and `state`.
- Do not add a new token, variant, wrapper, breakpoint, utility, animation, or
  state matrix unless an existing owner cannot express the current requirement.
- Do not accept visual green from source reading only. Render or screenshot when
  the task changes layout, spacing, color, motion, or responsive behavior.

## Closeout

Report only:

```md
Changed: <paths>
Checked: <commands/screenshots/viewports>
Risk: <remaining visual/style risk or none>
```
