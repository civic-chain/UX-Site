# Phase 04 · Visual Approval Cleanup

Визуальное направление Stage 5 утверждено пользователем. Фаза больше не открывает новый редизайн: текущий режим — **уборка перед клиентской ссылкой**. Нужно закрыть audit findings по компонентам/дизайн-системе, проверить live-маршруты, сохранить Justin canonical copy и подготовить Vercel preview.

## Цель Фазы

К концу фазы:
1. Визуальное направление зафиксировано как user-approved.
2. P1/P2 audit findings по компонентам/дизайн-системе закрыты или явно отложены.
3. Одна дизайн-система покрывает landing, marketing-страницы и демо-интерфейсы без отдельного route-local CSS.
4. Все 7 live-маршрутов проверены на desktop/mobile перед preview.
5. `_docs/design-system.md` и task/docs синхронизированы, если cleanup поменял shape.

## Strategy Anchor

- ROADMAP Stage 5 «Сделать Лендинги Красивыми» — visual approved; cleanup active. После закрытия фазы — Stage 6 (отдать ссылку клиенту).
- `_ops/criteria/landing-visual-cycle.md` — generated-секции, `build-map.md`, `extract/`, imagegen и runtime-asset boundary.
- `_ops/criteria/landing-design-and-brand.md` — одна дизайн-система; generated-секции задают направление, не пиксельный макет.
- `_ops/criteria/landing-copy.md` — копия от Justin canonical, структуру менять только по явному решению пользователя.
- `_ops/criteria/client-feedback-cycle.md` — приоритет №1 = красивые лендинги клиенту через vercel preview.

## Scope

В прямом scope — landing-home `/` и 7 секций: hero, portal-hub, problem, how-it-works, numbers, cta, faq.

`/about` и `/contact` прошли отдельный page-level visual cycle в `_docs/other-pages/**` и уже внедрены в код. `/brand` (наш canonical), `/resources` (blog index + первая статья skeleton от Justin canonical), `/admin`, `/vendor`, `/citizen` наследуют дизайн-систему и входят в финальный handoff-review, но не получают отдельные visual tasks сейчас. Restructure (`(site)/` group, flat demos, flat lib/, brand/resources skeleton) — task-08.

## Sequence

| Task | Файл | Что делает | Status |
|---|---|---|---|
| 01 | [task-01-section-build-maps.md](task-01-section-build-maps.md) | Короткие карты сборки по всем live generated-секциям + `extract/`. | closed |
| 02 | [task-02-asset-extraction-pass.md](task-02-asset-extraction-pass.md) | Вытянуть иллюстрации через imagegen/chroma-key и подготовить прозрачные ассеты. | closed |
| 03 | [task-03-reference-led-design-system.md](task-03-reference-led-design-system.md) | Вывести общие tokens/primitives/patterns из повторяющихся мотивов. | closed |
| 04 | [task-04-landing-implementation.md](task-04-landing-implementation.md) | Собрать `/` по картам секций, сохранив copy и явный порядок. | closed |
| 06 | [task-06-design-system-handoff.md](task-06-design-system-handoff.md) | Component tokens layer + scope-classes + AGENTS / criteria / docs sync для handoff readiness. | closed |
| 07 | [task-07-other-pages-visual-cycle.md](task-07-other-pages-visual-cycle.md) | Пройти page-level visual cycle для `/about` и `/contact`, затем внедрить правки. | closed |
| 05 | [task-05-vercel-preview-handoff.md](task-05-vercel-preview-handoff.md) | Cleanup-аудит компонентов/дизайн-системы, проверка маршрутов и Vercel-ссылка. | active |
| 08 | [task-08-restructure-and-resources.md](task-08-restructure-and-resources.md) | Restructure routes/lib + создание `/resources` skeleton с первой статьёй от Justin canonical. Запись о завершённой работе. | closed |

Старый `editorial polish` больше не ведёт работу. История остаётся в `git log`, не в `_ops`.

## Out of Scope

- `/pitch` — out-of-scope project-wide. (`/resources` теперь in-scope, см. task-08.)
- Альтернативные landing-маршруты (`/landing-02`, `/landing-03`) — Anti-goal.
- Theme-switcher в tokens — Anti-goal.
- Изменение копии или порядка секций без явного решения пользователя.
- Pixel-perfect копирование AI-картинок.
- Кодовые ссылки на `_docs/landing-page/**`.
- Cold-LLM walkthrough / handoff legibility audit — Stage 7.

## Acceptance Criteria Самой Фазы

Phase закрыта, когда:
- [x] task-01..04, 06, 07 закрыты по своим criteria.
- [ ] task-05 закрыт: cleanup findings + route sweep + preview handoff.
- [x] Визуальное направление утверждено пользователем.
- [x] `/` собран по generated-секциям через одну систему, а не через локальные стили по секциям.
- [x] `/about` и `/contact` доведены по `_docs/other-pages/**/generated.png` без изменения live copy.
- [ ] Все 7 live-маршрутов проверены на desktop/mobile после cleanup.
- [x] `_docs/design-system.md` отражает текущий код, если поменялась shape.
- [ ] Vercel preview готов к отправке клиенту.

## Verification

- После documentation/task правок: `npm run lint:instructions`.
- После design-system/code правок: `npm run lint`.
- После видимых изменений: `PLAYWRIGHT_PORT=3311 npm run test:visual`.
- Перед push в `main`: `Smith` или `brooks` critic-pass по `_ops/criteria/client-feedback-cycle.md`.

## Cited Criteria

- `_ops/criteria/agent-discipline.md`
- `_ops/criteria/landing-visual-cycle.md`
- `_ops/criteria/landing-design-and-brand.md`
- `_ops/criteria/landing-copy.md`
- `_ops/criteria/client-feedback-cycle.md`
- `_ops/criteria/process.md`
