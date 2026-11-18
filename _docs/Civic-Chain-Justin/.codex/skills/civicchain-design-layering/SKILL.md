---
name: civicchain-design-layering
description: Use when editing `app/styles/**`, `app/globals.css`, `app/(interfaces)/interface.css`, `lib/design-policy.ts`, or when introducing new visual values in this repo. Enforces the four-layer contract, fail-closed design-policy invariants, scan-root coverage, arbitrary-token handling, and token-first visual changes. Mandatory for style-system changes.
---

# Civicchain Design Layering

Use this skill whenever a change touches the visual system itself, not just a feature that happens to be styled.

## Layer contract

```text
app/styles/tokens.css       -> values only
app/styles/primitives.css   -> single-job utilities
app/styles/patterns.css     -> layout-only composites
app/(interfaces)/interface.css -> interface-scoped layer
```

- Tokens own raw values.
- Primitives reference tokens via `var(--*)`; they do not hardcode values.
- Patterns own layout and composition only; they do not redefine primitive geometry.
- Interface styling follows the same rule inside the interface scope.

## Fail-closed rules

- If a new visual value appears, add it to tokens first, then consume it.
- If a new CSS partial is added under `app/styles/*` or `app/(interfaces)/*`, update `lib/design-policy.ts` in the same change with the right owner shape: true token files belong in `tokenSourceFiles`, declaration-checked layers belong in `cssDeclarationFiles`, and `cssTokenSelectorAllowlist` grows only where custom properties are intentionally declared.
- Sandbox or variant routes must live inside `app/`. If a top-level path is truly required, update `designPolicy.scanRoots` in the same change.
- When an arbitrary Tailwind token is needed, either promote it to a named token or add it to `designPolicy.allowedArbitraryTokens` immediately. Never leave it as an unexplained warning.
- Keep `@theme inline { --*: var(--*) }` in `app/globals.css`; dropping `inline` breaks imported token passthrough.
- Raw interactive DOM belongs only in `components/ui/*`.
- Do not widen `visualValueIgnoreFiles` to silence declaration checks. A broad ignore is a false-green regression.

## Decision rules

- Before a page-local tweak, ask whether the missing capability really belongs in tokens, primitives, patterns, or shared components first.
- If a design fix works only for one page and weakens the shared system, it is the wrong layer.

## Done when

- The change strengthens or cleanly extends the shared visual system.
- No new raw visual values leak into feature code.
- Design-policy coverage stays complete.
