# UI Components Agent Instructions

This folder contains generic CivicChain UI primitives.

## Relevant Rules

- `2civic-design` skill (invoke it) - single authority for design law, the component catalog, prop vocabulary, and the surface-color contract.
- `_ops/rules/landing-design-and-brand.md` - brand and public-page visual rules.
- `_ops/rules/process.md` - no unnecessary components or files.
- `_ops/rules/agent-discipline.md` - default action chain.

## Local Rules

- Keep only generic primitives here: Button, Badge, Dialog, Select, Table, SurfaceCard, and similar components.
- Radix-based wrappers stay here, even with one current consumer, if their API is generic.
- Prop vocabulary: `tone` for visual color, `variant` for structure, `size` for
  size.
- `Button`, `Tabs`, and `Badge` are the single shared button, tab, and label
  owners. Look is all props (variant/size/tone, icon by name); call sites never
  build a second control. `Tabs` composes `Button`; `Badge` absorbed FeaturePill.
- Reuse + extension before new components. Add a new primitive only after real
  reuse or an explicit owner decision.
- Surface color contract, prop vocabulary, and the component catalog live in the
  `2civic-design` skill (`reference/components.md`) — invoke it before changing a
  component's color behavior or public API. Cardinal rule even if you skip it:
  controls (`Button`/`Tabs`) read the surface `--ctl-*` contract and inherit the
  surrounding surface; labels (`Badge`/`IconChip`) keep their own palette via
  their `inherit` default. Hierarchy rides `variant`; color rides the surface.
