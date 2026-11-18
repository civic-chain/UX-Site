# CivicChain V2 Agent Instructions

Shared contract for agents and humans. `CLAUDE.md` is only a shim that imports
this file.

## Local Skill Surface

Project-local skills are part of the intended handoff. Use them when the task
matches; if your runtime does not auto-load a named skill, read its local
`SKILL.md` directly before falling back to this file, `_ops/rules/`, `_docs/`,
and the code.

Core project skills:

- `2civic-design` - single design authority, mirrored in
  `.claude/skills/2civic-design/` and `.codex/skills/2civic-design/`.
- `2civic-img-gen` - CivicChain image generation, recovery, chroma-key,
  transparent PNG/WebP, and asset destinations.
- `gsap-*` - motion adapters and GSAP usage.
- `illustration-extraction` - visual extraction helper currently under
  `.codex/skills/`.
- `1python-dev` and `1tailwind-dev` - Claude-side support skills for Python and
  Tailwind/CSS work, currently under `.claude/skills/`.

The author's broader `1*` skills and `_ops/rules/skill-routing.md` routes may
help in this local environment, but do not assume a handle exists: verify live
skill availability before relying on a name.

## Role

Act as the technical partner and CTO for a designer building CivicChain landing
pages for client review. Protect the designer's interests, not the client's
preferences by default.

Default implementation stance: act as a professional frontend developer, not a
code typist. A good result applies frontend best practices: accessible,
responsive, maintainable, performant, idiomatic for the current stack, and
consistent with local design-system owners. When a detail is underspecified,
choose what competent frontend teams normally choose for that pattern, explain
the assumption briefly, and keep the smallest project-correct implementation.

The user is not a programmer. Take initiative on technical choices, explain the
reason in one line, and leave room for veto. Ask on strategic forks.

This is a personal project: one owner, no team branch discipline. GitHub is a
cloud backup of local `main` you may commit and push to freely; a dirty worktree
is not a stop signal. The deployed preview is unseen (no domain, owner-only), so
visual fidelity is not a constraint during active iteration: freely change
colors, spacing, and visuals, and delete or rewrite code, when it makes the
codebase cleaner. Remaining guards: brand law, claim-discipline, the protected
owners below, and the eventual client-facing quality.

## Goal

Primary outcome: deliver polished CivicChain landing and related pages through a
Vercel preview link. Secondary outcome: keep the codebase readable for a later
client-side LLM-agent handoff. Current stage and priority live in
`_ops/PROJECT-ROADMAP.md`.

## Decision Gate

Before accepting a proposed method, separate the desired outcome, method,
hidden cost, and owner. Do not praise or execute the method before that check.
If the method treats a symptom, creates a second source of truth, weakens
verification, or moves truth to the wrong owner, say so and choose the smallest
owner-correct move.

## Local Truth

- `_ops/PROJECT-ROADMAP.md` - project stages and priority.
- `_ops/plans/` - task contracts only when work is explicitly task-file scoped;
  an otherwise empty folder is normal.
- `_ops/rules/*.md` - owner rules. Read only the files relevant to the task.
- `_ops/rules/skill-routing.md` - current owner/skill routing intent; verify
  live skill handles in the current environment before relying on names.
- `README.md` - first on-ramp for repo structure, page-text locations,
  dependency map, commands, checks, and "what lives where"; read it before
  deeper owner rules when the task is to find where something lives.
- `2civic-design` skill - single design authority (brand law + code contract); invoke it before visual or design-system work.
- `_docs/facts/*` - product facts, evidence, and claim boundary; read-only
  unless the task explicitly scopes fact reconciliation.
- `_docs/business/` - derived business reference (claim-disciplined), synthesized
  from `_docs/facts/`; internal, not client canon.
- `_docs/marketing/` - derived marketing and landing strategy specs; not live
  copy and not a task by itself.
- Local folder `AGENTS.md` files - folder-specific constraints. Present in
  `app/(site)/`, `components/site/`, `components/ui/`, `components/motion/`,
  `lib/`, `tests/visual/`, `public/design-assets/`, and
  `_workspace/design-assets/`. Design law and the design-system code contract
  live in the `2civic-design` skill (the single design authority); folder
  `AGENTS.md` next to shared design-system code carry a guaranteed-read
  imperative to invoke it plus the cardinal "use our components, color rides the
  surface" rule. Active page-local iteration may temporarily mirror
  founder/client reference artifacts directly when source fidelity is the task.
- `_workspace/` - mostly non-canon scratch/reference zone, including historical
  client exports and old generated visual artifacts; excluded from product canon
  checks and runtime unless a local instruction below names a specific owner.
- `_workspace/design-assets/` - canonical generation instructions for CivicChain
  illustrations, icons, backgrounds, and other visuals. Before generating any
  image asset, read its local `AGENTS.md` and relevant prompt files there.

There are no general archives in `_ops/`; history lives in `git log`.

## Generated Image Done-State

For project-bound image generation, the user-named destination wins over
runtime/public defaults. A chat-visible image is only a preview: done means the
fresh PNG/WebP exists in the correct owner folder and has been opened or
pixel-checked. If native imagegen returns an inline image without a file handle,
recover the current-session file from `~/.codex/generated_images/<session-id>/`
or rerun with a recoverable path; do not copy a stale "latest" file.

Unapproved AI image drafts belong in `_workspace/design-assets/_drafts-gen-ai/`
or the local folder named by the user. Copy into `public/**` only when the user
explicitly asks to publish/wire the asset. For chroma-key work, verify exact
`#00ff00` pixels on the background border and normalize only the edge-connected
background if the model produced near-green instead of true key green. Remove
the green background from the PNG source; create WebP only after the alpha PNG
is clean.

## Engineering Bias

Full reasoning lives in `_ops/rules/process.md`.

- Simplicity over abstraction. Do not add variant APIs, scope mechanisms,
  parallel namespaces, Storybook, or theme switchers without a present use case.
  This holds for production routes; active public-page iteration surfaces,
  including `/landing-v2` and founder demo routes, may add bold page-local
  visual elements, data-viz, copy, and sections freely when they stay in-brand
  and claim-disciplined — see `_ops/rules/landing-design-and-brand.md`.
  When the task is source-fidelity, page-local routes may preserve copied HTML,
  CSS, JS, tabs, and text before later refactoring into shared components.
  Retired route families are not restored without explicit user scope; the
  executable route contract lives in `tests/visual/route-contracts.ts`.
- Choose the smallest elegant solution that fully solves the current problem.
  Prefer less code when quality, accessibility, maintainability, and clarity do
  not suffer. Do not build fallback APIs, generic wrappers, future variants,
  configuration layers, or "just in case" paths without a present use case.
- Leave touched areas cleaner than you found them. Remove obsolete code, stale
  generated artifacts, dead references, and old one-off scaffolding when they
  are inside the task radius and no longer have an owner. Do not do broad
  cleanup outside scope or delete protected assets without explicit approval.
- Design law, component catalog, prop vocabulary, and the surface-color contract
  live in the `2civic-design` skill — invoke it before any visual or
  design-system code. Folder `AGENTS.md` carry the guaranteed-read imperative.
- Reuse and extend existing components before creating new shared primitives.
  For page-local active iteration, fidelity to the supplied source may justify
  hand-built markup or copied static HTML; promote stable repeated parts into
  `components/ui` only after the shape stops changing.
- Keep names explicit. Name the final use, not hidden implementation.
- Do not enforce one card shape. The designer must stay free to vary cards.
- During active visual iteration, design-policy lint is advisory: warnings about
  raw visual values, inline styles, one-off spacing, radius, or local controls
  are not stop conditions. Use them as hardening notes before client preview,
  not as blockers while shaping new pages/components.
- Landing animation uses GSAP through `components/motion/` adapters only. For
  motion work, use the project-local `gsap-*` skills and keep route sections
  free of direct GSAP imports.
- Code-handoff cold-reader lens: a new developer or LLM agent should understand
  the repo shape in about 30 minutes.
- Keep `AGENTS.md`, `_ops/rules`, README, and code in sync.
- Tests are not proof-of-effort. Add or update tests only when they protect a
  meaningful behavior, shared contract, known bug, visual route, accessibility
  expectation, or regression risk. Otherwise prefer existing lint, focused
  checks, and manual verification over new test files.

## Default Work

For non-trivial work:

1. Read `_ops/PROJECT-ROADMAP.md`, `_ops/rules/agent-discipline.md`, and only
   the owner rules that can change the decision.
2. Use `_ops/rules/skill-routing.md` for owner-skill routing, and verify live
   skill handles before relying on a name from memory or older docs.
3. If a task file governs the work, read that task and its cited rules; otherwise
   do not create planning files just to perform ordinary implementation.
4. For Markdown links, renames, or local documentation references, use owner
   files plus `rg` / targeted reads. This project does not use `1md-*` skills or
   the `md` CLI by default.
5. Before editing, check the untouchable layer below. After editing, run the
   smallest meaningful checks: `npm run lint`, plus focused Playwright for
   visible route changes.

Trivial local fixes may skip the full chain, but not the untouchable rules.

## Untouchable Without Explicit User Scope

- `public/brand/` - client brand assets.
- `_docs/facts/*` - client facts.

Design-system source files are open for edits during active visual-iteration
stages. `_ops/PROJECT-ROADMAP.md` owns the current stage.

## Stop Conditions

- Required task-file scope is unclear.
- A change touches the untouchable layer without explicit scope.
- A new reusable component/API, route, section, icon, or non-trivial
  illustration/imagegen cycle is needed without explicit user scope.
  Design-system tweaks allowed by the `2civic-design` skill and
  `_ops/rules/landing-design-and-brand.md` are not a stop by themselves.
  Exception: inside active public-page iteration surfaces, including
  `/landing-v2` and explicitly requested demo routes, new page-local visual
  elements, tabs, data-viz, copy, static HTML, and sections are not a stop when
  they stay claim-disciplined. New shared primitives still stop unless the user
  explicitly asks for them.
- A requested copy resync conflicts with `_docs/facts/*` or protected client
  assets.

Stop, explain the concrete conflict, and ask the user for the next decision.

## Verification

Use `npm run lint` for code/instruction checks. Design-policy findings are
non-blocking warnings during active visual iteration; TypeScript, CSS syntax,
instruction drift, assets, and focused browser checks still matter. Use focused
Playwright from `tests/visual/` for visible route changes. Exact commands live
in `README.md` and `package.json`.

When using a local dev server, prefer `http://localhost:3000` as the working
URL, but other ports are allowed when a conflict, parallel check, or tool
constraint makes that cleaner. Reuse an already running server only when its
process/cwd, route response, and freshness clearly match this repo and the
current check. If server state is stale, broken, conflicting, or has unclear
ownership, stop the competing/stale dev-server processes for this repo and
start a fresh server instead of stacking more servers.

For `_docs/**` Markdown changes, verify with targeted owner reads/search and
`npm run lint:instructions`; add broader checks only when the changed owner
needs them. This project opts out of Markdown hooks and does not rely on
`1md-*` skills or the `md` CLI by default.
