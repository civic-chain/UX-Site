---
name: civicchain-handoff
description: "Use when editing `.tsx`, `.ts`, `.jsx`, or `.js` in this repo, especially under `app/`, `components/`, or `lib/`. Enforces handoff-oriented structure: colocation, explicit types at public boundaries, sparse why-comments, predictable folder shape, `@/*` imports, no dead files, and shadcn/Radix-friendly public props. Mandatory before structural JS/TS edits in this repo."
---

# Civicchain Handoff

Apply this skill before and during structural JS/TS edits.

## What good looks like

- Put files next to where they are used. Route-specific code stays near the route. Shared code climbs only when it is actually shared.
- Exported components, hooks, and utilities have explicit prop or return types. Internal helpers can rely on inference.
- Comments explain non-obvious intent, invariant, or workaround. Do not narrate what the code does.
- JSDoc belongs only on non-obvious public boundaries, and should stay short.
- Folder shape stays legible: `app/` for routes, `components/ui/` for primitives, `components/<feature>/` for feature composition, `lib/` for non-visual logic/config, `app/styles/` for tokens/primitives/patterns.
- Remove replaced files and orphan exports in the same change.
- Use `@/*` imports rather than deep relative paths.
- Keep naming conventional: PascalCase components, camelCase functions/variables, kebab-case files.
- Public props should follow established React/shadcn patterns: `className` passthrough, composition-friendly surfaces, controlled/uncontrolled support where it matters.

## Decision rules

- If a rule seems to need an exception, first ask whether the capability belongs in the shared layer instead of a page-local workaround.
- If a new abstraction has only one caller and no clear reuse path, it is probably premature.
- If a helper exists only to hide a simple expression, it is probably noise.
- If public TypeScript boundaries, manifests, registries, or route contracts move, finish with `npx tsc --noEmit`; lint alone is not enough for this class of refactor.

## Done when

- A new frontend developer can find things where they expect them.
- The diff does not leave dead files behind.
- The code reads as intentional, not tribal.
- TypeScript still validates the moved boundaries and registries without relying on runtime discovery.
