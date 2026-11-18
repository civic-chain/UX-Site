# Task 08 — Restructure And Resources Skeleton

## Цель

Привести репо к минимальной форме перед client preview и Stage 7 handoff: один публичный route group, плоские demo-маршруты, единая `lib/`, `/brand` вместо `/brand-kit`, новые `/resources` + первая статья от Justin canonical в нашей дизайн-системе.

## Why

Cold-reader (американец-разработчик и LLM-агент клиента) должен зайти в репо и за 30 минут понять, где что лежит. Старая форма имела дубль `(landing-home)` + `(marketing)` с одинаковым `layout.tsx`, no-op `(interfaces)/layout.tsx`, и `lib/` с 1-2-файловыми подпапками — три источника лишней навигации. Также `/resources` в roadmap'е был отмечен как Wave 2 anti-goal, но клиентский canonical уже содержит готовую страницу + статью с продуктовым PR-материалом — оставлять их за бортом было ошибкой scoping'а.

## Cited Criteria

- `_ops/criteria/process.md` — file discipline, минимум вложенности, no-archives, code discipline.
- `_ops/criteria/landing-copy.md` — canonical расщепление: brand=наш, blog text=Justin, blog design=наш.
- `_ops/criteria/landing-design-and-brand.md` — re-skin принцип, наш дизайн-слой для новых страниц.
- `_ops/criteria/visual-testing.md` — Stage 5 in-scope routes.

## Что Сделано

1. Удалены закрытые планы: `_ops/plans/phase-02-justin-sync/`, `_ops/plans/phase-03-structural-foundation/`. История — `git log`.
2. Удалён неиспользуемый `components.json` (shadcn CLI не используется).
3. Сняты неиспользуемые экспорты (knip): `getStyle` в `tests/visual/helpers.ts`; типы `AccentUnderlineWidth`, `FeaturePillVariant`, `IconChipTone/Size`, `StepBadgeShape/Tone/Size` в `components/ui/*`.
4. Restructure роутов:
   - `app/(landing-home)/` + `app/(marketing)/` → один group `app/(site)/` с общим `layout.tsx` (SiteHeader + SiteFooter).
   - `app/(interfaces)/` no-op group удалён; `admin/`, `vendor/`, `citizen/` лежат плоско в `app/`.
   - `app/(marketing)/brand-kit/` → `app/(site)/brand/` (rename URL и папки).
   - `brand-kit-content.ts` → `app/(site)/brand/content.ts` (поднят из `_sections/` на уровень страницы).
5. `lib/` плоско: `lib/design-system/types.ts` → `lib/design-system-types.ts`; `lib/interface/{types,fixtures}.ts` → `lib/interface-{types,fixtures}.ts`. Подпапки удалены.
6. Создан `app/(site)/resources/` skeleton: `page.tsx` (blog index из `_articles-meta.ts`), `municipal-payment-delays/page.tsx` + `content.ts` (статья от Justin canonical в наших токенах). Текст — verbatim из Justin canonical (его PR-материал, продуктовая правда).
7. Импорты переписаны bulk-sed по всему `.ts/.tsx`: `@/lib/design-system/types`, `@/lib/interface/{types,fixtures}`, `@/app/(landing-home)/`. Исправлен path-string в `lib/design-policy.ts`.
8. Visual tests обновлены: `tests/visual/marketing-pages.spec.ts` теперь тестирует `/brand` (не `/brand-kit`); footer-assertion освобождена от `/resources` и `/brand-kit` (они в scope теперь), `/pitch` остался запрещённым.
9. AGENTS.md синхронизированы: `app/(site)/AGENTS.md` (новый, объединил landing-home + marketing); `components/site/AGENTS.md` обновлён под `(site)`; `lib/AGENTS.md` под плоский lib; стары AGENTS из `(marketing)`/`(interfaces)` удалены.
10. `_docs/design-system.md` обновлён: пути на `(site)/`, `lib/design-system-types.ts`, упоминание related-pages и resources вместо «marketing pages».
11. `_ops/PROJECT-ROADMAP.md` Stage 3 строка переписана: `/brand` и `/resources` в scope, `/pitch` остаётся out-of-scope. Stage 5 success picture покрывает 6 публичных маршрутов вместо 4.
12. `_ops/criteria/process.md` дополнено правилом «Минимум вложенности» (route groups iff layouts differ; subfolders iff 4-word question; closed phases в `git log`).
13. `_ops/criteria/landing-copy.md` зафиксировало canonical расщепление (brand=наш, остальное Justin).
14. `_ops/criteria/landing-design-and-brand.md` Дизайн-Слой расширен правилом про re-skin страниц (`/brand`, `/resources`, статьи).
15. `_ops/criteria/visual-testing.md` Stage 5 in-scope routes обновлены (`/brand` + `/resources` вместо `/brand-kit`).
16. README получил блок «Editing Page Text» в начале для американского разработчика; routes section и file structure синхронизированы.
17. Phase-04 archive bulk-rewrite: file paths и `/brand-kit` URL во всех closed task-plans приведены к новой форме.

## Out Of Scope (сознательно)

- Контентный rebuild `/brand` под клиентскую структуру разделов с нашими токенами — пока сохранены наши секции (palette, typography, voice, logos, components, phrases, contact). Refactor под Justin's section shape — отдельная code-задача в Stage 6.
- PasswordGate на `/resources/<slug>` — у Justin'а статья за паролем `6942069` и `noindex/nofollow`. Решение по приватности — отдельный вопрос.
- Группа `(product-demo)/` для demo-маршрутов — оставлено плоско per architect's recommendation.
- Артефакты `_docs/landing-page/` и `_docs/other-pages/` оставлены как есть (явное решение пользователя).

## Closeout Evidence

- `npm run lint` — все 7 проверок green после restructure (eslint, types, css, design-system, design-usage, design-system:tsx, instructions).
- `find app -maxdepth 2 -type d` показывает только `(site)/`, плоские demos, `dev/`, `styles/` — никаких `(landing-home)`/`(marketing)`/`(interfaces)`.
- `rg "@/lib/design-system/|@/lib/interface/|@/app/\(landing-home\)|brand-kit"` пусто в `*.ts/*.tsx`.
- Visual snapshot baselines для `/brand-kit` уже были удалены в working tree до этой задачи; новые baselines под `/brand` и `/resources/*` будут собраны при следующем `npm run test:visual --update-snapshots`.
