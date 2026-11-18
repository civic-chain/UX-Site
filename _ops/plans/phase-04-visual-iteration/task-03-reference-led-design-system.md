# Task 03 · Reference-Led Design System

Применимые критерии: `_ops/criteria/landing-design-and-brand.md`, `_ops/criteria/landing-visual-cycle.md`, `_ops/criteria/client-feedback-cycle.md`, `_ops/criteria/process.md`.

## Цель

Вывести одну общую дизайн-систему из повторяющихся мотивов generated-секций: palette, typography, radius, card rhythm, rules, icon chips, dots, editorial lines, paper texture.

## Подшаги

1. **Собрать мотивы.**
   EN: Compare the 8 build maps and generated images to identify repeated visual primitives.
2. **Перевести в систему.**
   EN: Update shared tokens/primitives/patterns only where repetition or global consistency requires it.
3. **Защитить остальные страницы.**
   EN: Check marketing and demo routes inherit the same system without a separate CSS layer.
4. **Обновить контракт.**
   EN: Sync `_docs/design-system.md` when tokens, primitives, or patterns change shape.

## Готово

- [x] Новая система одна, без route-local CSS.
- [x] Generated-секции использованы как направление, не как pixel spec.
- [x] `_docs/design-system.md` синхронизирован при shape changes.
- [x] `/about`, `/contact`, `/brand`, `/admin`, `/vendor`, `/citizen` не ломаются визуально.

## Красные Линии

- Не создавать theme-switcher.
- Не плодить компоненты/токены на будущее.
- Не копировать AI-артефакты, если они ломают адаптивность.

## Проверка

- `npm run lint`
- `PLAYWRIGHT_PORT=3311 npm run test:visual`

## Status

- Status: closed.
- Depends on: `task-02-asset-extraction-pass.md`.

## Closeout Evidence

- Design-system changes: shared tokens/primitives/patterns and `components/ui/` became the runtime surface for `/`, `/about`, and `/contact`; no route-local CSS layer was added.
- Shape sync: detailed Card Chrome Layer / cookbook sync happened in `task-06-design-system-handoff.md` after the component-token shape stabilized.
- Verification: task-04 implementation and task-06 handoff refactor both passed lint/visual checks; task-07 later passed focused marketing-page checks for `/about` and `/contact`.
- Deferred: final all-route client preview review remains `task-05-vercel-preview-handoff.md`.

## Cited Criteria

- `_ops/criteria/landing-design-and-brand.md`
- `_ops/criteria/landing-visual-cycle.md`
- `_ops/criteria/client-feedback-cycle.md`
- `_ops/criteria/process.md`
