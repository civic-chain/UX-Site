# Task 06 · Design-System Handoff Refactor

Применимые критерии: `_ops/criteria/landing-design-and-brand.md`, `_ops/criteria/visual-testing.md`, `_ops/criteria/process.md`.

## Цель

Закрыть архитектурный долг дизайн-системы перед Stage 6 (preview к клиенту) и Stage 7 (хэндофф кодовой базы внешнему программисту). Любой редизайн палитры/тона должен делаться правкой ~12 переменных в одном файле; cold-reader должен понимать shape системы за 30 минут.

## Подшаги

1. **Component tokens layer.**
   EN: Add `--card-{tone}-{role}` group (12 tokens) + `--card-stripe-width` to `app/styles/tokens.css`. Remove all per-tone `color-mix()` formulas from JSX.
2. **Card chrome scope-classes.**
   EN: Add `.card-tone-{cream,dusty,sage}` aliases + `.card-portal`, `.card-divider`, `.card-arrow`, `.card-step-label` helpers to `app/styles/patterns.css`. Extend `cssTokenSelectorAllowlist` in `lib/design-policy.ts`.
3. **SurfaceCard scope auto-apply.**
   EN: Surface-card tone classes attach `.card-tone-*` automatically so any child consumes neutral aliases.
4. **Section refactor.**
   EN: Drop inline `color-mix()` mappings from `portal-hub-section.tsx` and `how-it-works-section.tsx`. Use `card-portal / card-divider / card-arrow / card-step-label` instead.
5. **Documentation sync.**
   EN: Update `README.md` with cold-reader onboarding block, `_docs/design-system.md` with Card Chrome Layer + cookbook, four `AGENTS.md` files (root + styles + ui + landing-home) with handoff context and new pattern rules.
6. **Criteria crystallization.**
   EN: Capture durable visual + architecture rules from session dialogue into `_ops/criteria/landing-design-and-brand.md` (`Visual Cues`, `Architecture / Handoff` sections). Extend `_ops/criteria/visual-testing.md` with playwright-MCP / subagent rules.
7. **Roadmap.**
   EN: `_ops/PROJECT-ROADMAP.md` Stage 5 acceptance updated to include "design-system handoff-ready".
8. **Verification.**
   EN: Lint passes, visual tests show 0 regressions, screenshot spot-check confirms refactor is visually identical.

## Готово

- [x] 0 inline `color-mix()` формул в `portal-hub-section.tsx` и `how-it-works-section.tsx`.
- [x] 12 component tokens + 1 stripe-width token в `tokens.css`.
- [x] 4 chrome scope-classes + 4 helper-classes в `patterns.css`.
- [x] `SurfaceCard` авто-подключает `card-tone-*` scope.
- [x] `README.md` имеет onboarding-блок для нового программиста.
- [x] `_docs/design-system.md` содержит Card Chrome Layer + cookbook.
- [x] 4 AGENTS.md обновлены под handoff context и новые правила.
- [x] `landing-design-and-brand.md` содержит `Visual Cues` + `Architecture / Handoff`.
- [x] `visual-testing.md` содержит playwright-MCP / subagent правила.
- [x] `PROJECT-ROADMAP.md` Stage 5 включает «design-system handoff-ready».
- [x] `npm run lint` все 7 проверок зелёные.
- [x] Visual screenshots после refactor совпадают с pre-refactor.

## Красные Линии

- Никакого преждевременного enterprise-overengineering: Storybook, content separation, theme-switcher, React `variant` prop API, pattern extraction в `_patterns/` — отложены до реального use-case.
- Не менять live copy секций.
- Не ломать существующий контракт `tokens → primitives → patterns → components/ui`.

## Проверка

- `npm run lint`
- `PLAYWRIGHT_REUSE_SERVER=true PLAYWRIGHT_PORT=3311 npm run test:visual`
- Visual spot-check (playwright MCP): 02 portal-hub + 04 how-it-works after refactor совпадают с pre-refactor screenshots.

## Status

- Status: closed (Stage 4 shape — superseded).
- Depends on: `task-04-landing-implementation.md`.

> **Note (Stage 5 cleanup, 2026-05-05):** the `--card-{tone}-{role}` + `.card-tone-*` scope mechanic introduced by this task was replaced by a flat palette (`--paper-*`, `--stripe-*`, `--edge-*`, `--deep-*`) per user direction "no card-chrome rules, palette only". Card chrome is now composed inline at the use site. Current shape and rules: `_docs/design-system.md` Palette section + `_ops/criteria/landing-design-and-brand.md` line 50.

## Closeout Evidence

- Code refactor: tokens.css (+12 component tokens + stripe-width), patterns.css (+8 классов), surface-card.tsx (+ scope auto-apply), portal-hub + how-it-works sections (–60 LOC inline формул).
- Documentation: README.md onboarding, _docs/design-system.md Card Chrome Layer + cookbook, 4 AGENTS.md обновлены.
- Criteria: landing-design-and-brand.md (Visual Cues + Architecture/Handoff), visual-testing.md (MCP + subagent правила).
- Roadmap: Stage 5 acceptance включает handoff-ready.
- Verification: `npm run lint` зелёный (7 checks); visual spot-check 02/04 идентичны pre-refactor.

## Cited Criteria

- `_ops/criteria/landing-design-and-brand.md`
- `_ops/criteria/visual-testing.md`
- `_ops/criteria/process.md`
