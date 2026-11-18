# Phase 04 · Reference-Led Visual Inventory

Read-only анкер для задач фазы.

## Landing Sections

| Секция | Code file | Reference folder |
|---|---|---|
| hero | `app/(site)/_sections/hero-section.tsx` | `_docs/landing-page/01-hero/` |
| portal-hub | `app/(site)/_sections/portal-hub-section.tsx` | `_docs/landing-page/02-portal-hub/` |
| problem | `app/(site)/_sections/problem-section.tsx` | `_docs/landing-page/03-problem/` |
| how-it-works | `app/(site)/_sections/how-it-works-section.tsx` | `_docs/landing-page/04-how-it-works/` |
| numbers | `app/(site)/_sections/numbers-section.tsx` | `_docs/landing-page/05-numbers/` |
| cta | `app/(site)/_sections/cta-section.tsx` | `_docs/landing-page/07-cta/` |
| faq | `app/(site)/_sections/faq-section.tsx` | `_docs/landing-page/08-faq/` |

Каждая reference-папка хранит `reference.png`, `generated.png`, `subagent-notes.md`, `build-map.md`, `extract/`.

## Other Pages

| Page | Code file | Reference folder |
|---|---|---|
| about | `app/(site)/about/page.tsx` | `_docs/other-pages/about/` |
| contact | `app/(site)/contact/page.tsx` | `_docs/other-pages/contact/` |

Каждая page-reference папка хранит `reference.png`, `reference-mobile.png`, `subagent-notes.md`, `imagegen-prompt.md`, `generated.png`, `build-map.md`, `extract/`.

## Asset Boundary

- `_docs/landing-page/**` — рабочая кухня: исходные screenshots, generated-картинки, карты и черновые extracted assets.
- `public/landing/<section>/...` — только финальные runtime-ассеты, которые использует код.
- `public/landing/other-pages/<page>/...` — финальные runtime-ассеты для `/about` и `/contact`.
- `public/brand/` — клиентские бренд-ассеты; не трогать без явного задания.

## Design-System Surface

| Слой | Файл | Назначение |
|---|---|---|
| Tokens | `app/styles/tokens.css` | палитра, типографика, spacing, radius, surface tones |
| Primitives | `app/styles/primitives.css` | одноцелевые классы (`type-*`, `stack-*`, `pad-*`, `radius-*`, etc.) |
| Patterns | `app/styles/patterns.css` | повторяемые композиции section/card/FAQ/workflow/bento |
| UI components | `components/ui/` | generic primitives, `BrandIcon`, `BrandRasterImage` |
| Contract | `_docs/design-system.md` | человеческое описание системы; sync when shape changes |

## Build-Map Format

`build-map.md` должен быть коротким и выполнять одну функцию: до кода отделить code-native элементы от bitmap-ассетов.

Sections:
- `Code`
- `Icons`
- `Illustrations`
- `Decorations`
- `Do Not Copy`
- `Build Notes`

## Visual Tests

Существующие spec-файлы в `tests/visual/`:

| Файл | Покрытие |
|---|---|
| `landing-contracts.spec.ts` | landing-01 секции, public link routing, removed routes |
| `marketing-pages.spec.ts` | `/about`, `/contact`, `/brand` route contracts (shell, sections, footer) |
| `interface-contracts.spec.ts` | citizen route public readability + ledger jump link |
| `surface-safety.spec.ts` | overflow, clipping, overlap, touch targets, contrast, reduced motion, mobile readability |
| `helpers.ts` | shared route, geometry, color helpers |

В активной фазе snapshot-baseline'ов нет; визуальную целостность подтверждает браузер-ревью, не pixel diff.

## Verification Protocol

1. До code-visible итерации убедиться, что карты/ассеты готовы.
2. После code-visible итерации — `npm run lint`.
3. После визуальных изменений — `PLAYWRIGHT_PORT=3311 npm run test:visual`.
4. Перед push в `main` — `Smith` или `brooks` critic-pass.

## Out of Scope

- Wave 2 (`/resources`, `/pitch`).
- Альтернативные landing-маршруты.
- Theme-switcher.
- Runtime-ссылки на `_docs/landing-page/**`.
