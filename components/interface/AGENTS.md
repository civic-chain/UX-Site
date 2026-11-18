# Interface Components Agent Instructions

This folder contains demo-interface components for `/admin`, `/vendor`, `/citizen`.

## Relevant Criteria

- `_ops/criteria/landing-design-and-brand.md` - workspace tokens are derived from the shared brand.
- `_ops/criteria/client-feedback-cycle.md` - the client sees live links; critic-pass is needed before pushing to main.
- `_ops/criteria/process.md` - do not multiply components without real reuse.
- `_ops/criteria/agent-discipline.md` - default action chain.

## Local Rules

- Workspace-only components live here: shell, nav, panels, demo tables, badges, interface icons.
- Do not move generic Radix/UI wrappers here; they stay in `components/ui/`.
- Demo data comes from `lib/interface-fixtures.ts`; it is mock data, not client facts.
- Use `--workspace-*` only as derivatives of the shared brand, not as a separate design system. Repeating `color-mix()` formulas in JSX are forbidden here too — name them as `--workspace-*` tokens (status edges, table-row bg/hover, step-selected, link-hover, separator follow this pattern).
- Do not rename stable section id anchors without an explicit task-scope line.
