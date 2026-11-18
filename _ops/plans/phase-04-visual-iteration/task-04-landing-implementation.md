# Task 04 · Landing Implementation

Применимые критерии: `_ops/criteria/landing-design-and-brand.md`, `_ops/criteria/landing-visual-cycle.md`, `_ops/criteria/landing-copy.md`, `_ops/criteria/client-feedback-cycle.md`.

## Цель

Собрать landing-home `/` по `build-map.md`, общей дизайн-системе и подготовленным ассетам, сохранив текст от Justin canonical и явный текущий порядок секций.

## Подшаги

1. **Сверить карты.**
   EN: Read all section build maps and confirm each code/image split is still valid.
2. **Подключить ассеты.**
   EN: Copy final runtime assets into `public/landing/<section>/...` and reference only those paths from code.
3. **Собрать секции.**
   EN: Update the live landing-home section components through shared patterns and primitives.
4. **Сохранить copy/order.**
   EN: Verify text remains aligned with Justin canonical and section order changes only when explicitly scoped.
5. **Проверить responsive.**
   EN: Review desktop/mobile for layout, overlap, text fit, and asset framing.

## Готово

- [x] `/` визуально следует generated-секциям, но остаётся адаптивным и кодовым.
- [x] Copy/order не изменены молча.
- [x] Код не ссылается на `_docs/landing-page/**`.
- [x] Простые иконки остаются кодовыми, сложные иллюстрации подключены из `public/landing/**`.

## Красные Линии

- Не менять live copy без отдельного задания.
- Не ссылаться из кода на `_docs`.
- Не чинить другие маршруты широким refactor'ом вне нужной регрессии.

## Проверка

- `npm run lint`
- `PLAYWRIGHT_PORT=3311 npm run test:visual`
- Manual desktop/mobile review `/`.

## Status

- Status: closed.
- Depends on: `task-03-reference-led-design-system.md`.

## Closeout Evidence

- Implemented sections: 7 секций (hero, portal-hub, problem, how-it-works, numbers, cta, faq) собраны по generated reference.
- Runtime assets: webp иллюстрации скопированы в `public/landing/<section>/...` (hero board-text, portal-hub × 3 top-art, problem × 3 character scenes, how-it-works × 3 step scenes, cta + faq line-art).
- New components: `HeadlineDot`, `IconChip`, `AccentRule`, `StepBadge`, `FeaturePill`, `DotMatrix`, `CtaContactPair`, `AccentUnderline` в `components/ui/`.
- Verification: `npm run lint` (7 проверок зелёные), `PLAYWRIGHT_REUSE_SERVER=true PLAYWRIGHT_PORT=3311 npm run test:visual` (26 passed / 7 skipped — workspace + scroll-position тесты ожидают Stage 7 / стабильного layout).

## Cited Criteria

- `_ops/criteria/landing-design-and-brand.md`
- `_ops/criteria/landing-visual-cycle.md`
- `_ops/criteria/landing-copy.md`
- `_ops/criteria/client-feedback-cycle.md`
