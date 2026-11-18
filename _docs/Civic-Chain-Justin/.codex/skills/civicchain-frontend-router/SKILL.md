---
name: civicchain-frontend-router
description: Use at the start of a fresh frontend, design, landing, or React session in this repo when the user asks to fix a section, redesign a landing block, create a page, add a landing route, or extend the visual system. Give the agent one compact orientation pass on current repo reality, owner surfaces, and which narrower skills to load next before editing.
---

# Civicchain Frontend Router

Use this once at the start of a fresh session.

Treat this skill as a router, not a new canon layer. Load the current frontend reality quickly, then hand work off to the real owner surfaces and the narrow skills that should do the actual job.

Keep only live startup-critical routing here. Do not turn this file into a second `frontend-system.md` or a long theory document.

## Trust hierarchy

- If this skill conflicts with `_docs/direction/frontend-system.md`, the nearest local `AGENTS.md`, or the live route owners, trust those files.
- If repo shape changes enough that this startup map is no longer honest, update this skill in the same pass.

## Read in this order

1. `_ops/1-NORTH-STAR.md`
2. `_ops/3-CURRENT-STRATEGY.md`
3. `_ops/learnings.md`
4. The active `_state/YYYY-MM-DD-state.md`, if present
5. `_docs/direction/frontend-system.md`
6. The nearest local `AGENTS.md` for the folder you expect to touch

If the task is mainly about visual direction or atmosphere, also read `_docs/direction/expression.md`.

If the task is about one of the documented landing directions rather than the current live landing, also read `_docs/direction/landing-variants/README.md` plus the relevant `landing-0X/*` files.

## Current reality to lock in first

- The public landing at `/` is route-local under `app/(landing-home)/page.tsx` + `content.ts` + `_sections/`.
- `/landing-02` is also route-local under `app/landing-02/page.tsx` + `content.ts` + `_sections/`.
- Live landings are not manifests and do not register through a section-slot catalog.
- The design-system reference surface is `app/(sandbox)/sandbox/design-system/page.tsx`, with chapter sources under `app/design-system/chapters/`.
- Sandbox is now a small set of explicit internal routes:
  - `app/(sandbox)/sandbox/page.tsx`
  - `app/(sandbox)/sandbox/design-system/page.tsx`
  - `app/(sandbox)/sandbox/previews/page.tsx`
  - `app/(sandbox)/sandbox/workflow-cards/page.tsx`
- Public preview routes render from `app/[slug]/page.tsx`, while sandbox previews provide the internal comparison hub.
- Shared landing code now means small reusable helpers under `components/landing/` plus design-system primitives under `components/ui/`, not a global section machine.
- The repo also has a thin Playwright visual-contract suite under `tests/visual/`; it is a real frontend regression gate for user-visible route, layout, motion, touch, and accessibility checks, not a taste-policing layer or a manual capture dump.
- The three current interface surfaces are:
  - `app/(interfaces)/admin/page.tsx`
  - `app/(interfaces)/vendor/page.tsx`
  - `app/(interfaces)/citizen/page.tsx`

## Owner map

- Product truth and current frontend direction: `_docs/`
- Durable strategy and reusable lessons: `_ops/`
- Current distance-to-goal snapshot: `_state/`
- Root landing copy and page-local section ownership:
  - `app/(landing-home)/content.ts`
  - `app/(landing-home)/_sections/`
- Landing-02 copy and page-local section ownership:
  - `app/landing-02/content.ts`
  - `app/landing-02/_sections/`
- Shared landing helpers and presentation building blocks:
  - `components/landing/`
  - `components/ui/`
- Shared landing types:
  - `lib/landing/types.ts`
- Visual system and design-policy enforcement:
  - `app/styles/tokens.css`
  - `app/styles/primitives.css`
  - `app/styles/patterns.css`
  - `app/globals.css`
  - `app/(interfaces)/interface.css`
  - `lib/design-policy.ts`
- Visual testing and browser-truth contracts:
  - `tests/visual/`
  - `playwright.config.ts`
  - `package.json` visual scripts
- Route placement, sandbox, variants, and preview surfaces:
  - `app/**`
  - `lib/route-previews/content.ts`
- Legacy landing-route redirects still live at `app/variants/[name]/page.tsx`, but that is compatibility routing, not a landing owner model.

## Route the task before editing

- If the user wants to change words, links, proof payload, CTA labels, or FAQ content on a live landing, start in that landing's local `content.ts` and do not edit TSX first.
- If the user wants to change visible section design, refine hierarchy, or invent a better visual treatment for an existing landing block, start in the relevant landing route folder first.
- If the user wants a new page, route placement, sandbox surface, interface surface, or preview destination, start in `app/`.
- If the user wants a new token, primitive, pattern, motion rule, or any shared visual capability, start in `app/styles/` and `lib/design-policy.ts`.
- If the user wants a new live landing, create `app/<route>/page.tsx` plus a local `content.ts` and local section files instead of adding a manifest.
- If the user wants an internal comparison room or reusable demo surface, add an explicit route under `app/(sandbox)/sandbox/` instead of a generic slot entry.
- If the user wants a shared landing helper, promote it into `components/landing/` only after real reuse across routes or sandbox surfaces.
- If the change affects user-visible route wiring, layout behavior, motion behavior, touch safety, or accessibility expectations, inspect `tests/visual/` early and decide whether the visual contract should be updated or at least rerun before calling the work done.

## If a component does not exist

1. Check whether the missing thing is really a shared primitive or pattern first.
2. If it is shared UI infrastructure, prefer `components/ui/` or the shared visual system instead of a page-local workaround.
3. If it is a landing-only composition, keep it in the relevant route folder and keep the owner layer local.
4. If the missing capability is actually content-shape drift, fix `lib/landing/types.ts` only when the shape is truly shared; otherwise fix the route-local content owner instead of hiding it inside props.
5. If the right layer is unclear, prefer the smallest owner surface that keeps the capability reusable without turning one page into the hidden source of truth.

## Skill handoff after this startup pass

Load only the narrow skills that match the actual work:

- `criteria-generator` for non-trivial task framing
- `impeccable` for visible design direction and polish
- `civicchain-handoff` for structural `.tsx`, `.ts`, `.jsx`, or `.js` edits
- `civicchain-design-layering` for style-system work and new visual values
- `vercel-composition-patterns` when section or route APIs start drifting into weak composition
- `civicchain-ds-check` after `.tsx` edits in `app/**` or `components/**` outside `components/ui/**`
- `playwright` or `playwright-interactive` when browser truth matters or when the visual-contract suite in `tests/visual/` needs live verification
- `civicchain-audit` before declaring non-trivial frontend work done

Do not keep this skill loaded as a vague general-purpose layer. Use it to orient the session, then switch to the real execution skill or owner surface.

## Hard Don'ts

- Do not rewrite landing copy, CTA text, FAQ text, quotes, or numbers without an explicit user instruction in the current chat.
- Do not assume the direction files mean there is still a central live manifest model in code.
- Do not create landing variants by copy-pasting section files.
- Do not resurrect a shared section-slot catalog or generic `/sandbox/[slot]` flow to solve a page-local problem.
- Do not hide content truth in TSX.
- Do not solve a shared visual gap with page-local raw values or one-off hacks.
- Do not create a new markdown explainer when the truth already lives in `_ops/`, `_docs/`, `_state/`, or the nearest owner layer.

## Exit condition

After this startup pass, the agent should be able to answer three things quickly:

1. Which owner layer holds the requested change.
2. Which narrow skill should take over next.
3. Which files are authoritative for the current live frontend reality.
