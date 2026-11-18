# Task 05 · Cleanup And Vercel Preview Handoff

Применимые критерии: `_ops/criteria/client-feedback-cycle.md`, `_ops/criteria/landing-design-and-brand.md`, `_ops/criteria/landing-copy.md`, `_ops/criteria/visual-testing.md`, `_ops/criteria/process.md`.

## Цель

Убрать технический долг после user-approved визуала и подготовить Vercel preview-ссылку клиенту. Это cleanup перед сдачей визуального продукта, не новый редизайн и не Stage 7 handoff.

## Подшаги

1. **Закрыть аудит дизайн-системы.**
   EN: Resolve or explicitly defer component/design-system findings: JSX `color-mix()` policy, `SurfaceCard` tone scope, `card-stripe`, `CtaContactPair` ownership, repeated workspace row patterns.
2. **Усилить visual safety.**
   EN: Ensure `/about`, `/contact`, `/brand`, and `/` have enough desktop/mobile safety evidence for overflow, clipped text, touch targets, contrast, and hero-art containment.
3. **Проверить маршруты.**
   EN: Review `/`, `/about`, `/contact`, `/brand`, `/admin`, `/citizen`, `/vendor` on desktop and mobile.
4. **Сверить Justin canonical.**
   EN: Confirm landing copy/order did not drift from `_docs/Civic-Chain-Justin/` or ask if resync is needed.
5. **Прогнать проверки.**
   EN: Run lint and visual tests before publish.
6. **Сделать critic-pass.**
   EN: Use Smith or brooks before pushing a significant visual artifact to `main`.
7. **Подготовить ссылку.**
   EN: Push/verify production preview and give the user the current Vercel URL.

## Готово

- [x] Визуальное направление утверждено пользователем.
- [ ] P1/P2 audit findings закрыты или явно отложены в closeout evidence.
- [ ] Marketing routes имеют browser/safety evidence на desktop/mobile.
- [ ] Все 7 live-маршрутов проверены на desktop/mobile.
- [ ] Copy/order сверены с Justin canonical.
- [ ] `npm run lint` зелёный.
- [ ] `PLAYWRIGHT_PORT=3311 npm run test:visual` зелёный или rerun через текущий live port документирован.
- [ ] Critic-pass пройден перед push в `main`.
- [ ] Production URL готов для пользователя.

## Красные Линии

- Не открывать новый визуальный цикл/imagegen без нового решения пользователя.
- Не считать зелёный lint доказательством чистой дизайн-системы: audit findings закрываются отдельно.
- Не делать Stage 7 handoff sweep.
- Не отдавать код как клиентский deliverable на этой стадии.
- Не отправлять ссылку клиенту вместо пользователя.

## Проверка

- `npm run lint`
- `PLAYWRIGHT_PORT=3311 npm run test:visual`
- Если dev server уже жив на другом порту: `PLAYWRIGHT_PORT=<port> PLAYWRIGHT_REUSE_SERVER=true npm run test:visual`
- Manual desktop/mobile review all 7 routes.

## Status

- Status: active.
- Depends on: `task-04-landing-implementation.md`, `task-06-design-system-handoff.md`, `task-07-other-pages-visual-cycle.md`.

## Closeout Evidence

- Visual sweep:
- Design-system/component audit:
- Justin canonical:
- Verification:
- Critic-pass:
- Deploy / URL:

## Cited Criteria

- `_ops/criteria/client-feedback-cycle.md`
- `_ops/criteria/landing-design-and-brand.md`
- `_ops/criteria/landing-copy.md`
- `_ops/criteria/visual-testing.md`
- `_ops/criteria/process.md`
