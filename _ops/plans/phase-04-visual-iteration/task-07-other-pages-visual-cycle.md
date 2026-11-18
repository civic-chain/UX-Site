# Task 07 · Other Pages Visual Cycle

Применимые критерии: `_ops/criteria/landing-visual-cycle.md`, `_ops/criteria/landing-design-and-brand.md`, `_ops/criteria/landing-copy.md`, `_ops/criteria/client-feedback-cycle.md`, `_ops/criteria/process.md`.

## Цель

Пройти page-level visual cycle для `/about` и `/contact`, затем довести живые страницы до максимальной похожести на `_docs/other-pages/**/generated.png` без правки live copy и без отдельного CSS-слоя.

## Подшаги

1. **Снять страницы.**
   EN: Capture focused desktop/mobile references for `/about` and `/contact`.
2. **Получить дизайн-разбор.**
   EN: Run one design subagent per page and save the full notes.
3. **Вытащить prompts.**
   EN: Convert the findings into one imagegen prompt per page.
4. **Сгенерировать direction.**
   EN: Generate `generated.png` for each page and use it as visual direction, not pixel law.
5. **Составить карты.**
   EN: Write compact `build-map.md` files that split code-native layout, icons, illustrations, decorations, and do-not-copy.
6. **Подготовить ассеты.**
   EN: Extract only non-code-native illustrations into each page `extract/`.
7. **Внедрить страницы.**
   EN: Update `app/(site)/about/page.tsx` and `app/(site)/contact/page.tsx` through shared primitives/components.
8. **Проверить сходство.**
   EN: Run read-only subagent gates against live desktop/mobile pages, fix any major drift, and repeat the affected gate.

## Готово

- [x] `_docs/other-pages/about/` и `_docs/other-pages/contact/` имеют `reference.png`, `reference-mobile.png`, `subagent-notes.md`, `imagegen-prompt.md`, `generated.png`, `build-map.md`, `extract/`.
- [x] Каждая страница выглядит как цельная marketing-история, не набор служебных плашек.
- [x] CTA ближе к смыслу страницы и визуально сильнее, но без тяжёлой формы.
- [x] `/about` сохраняет равный статус команды; `/contact` ясно ведёт к pilot conversation.
- [x] Copy/order не изменены молча.
- [x] Код не ссылается на `_docs/other-pages/**`.
- [x] Runtime-ассеты скопированы в `public/landing/other-pages/**`, прозрачность задаётся layout-классами.
- [x] Subagent gate после финальной правки не оставил `major drift`.

## Красные Линии

- Не править live copy без отдельного задания.
- Не создавать отдельную дизайн-систему, route-local CSS или новые primitive без доказанного повтора.
- Не вытягивать простые иконки bitmap'ами.
- Не трогать `public/brand/`.

## Проверка

- `npm run lint`
- `PLAYWRIGHT_REUSE_SERVER=true PLAYWRIGHT_PORT=3001 npm run test:visual -- tests/visual/marketing-pages.spec.ts`
- `PLAYWRIGHT_REUSE_SERVER=true PLAYWRIGHT_PORT=3001 npm run test:visual -- tests/visual/landing-contracts.spec.ts`
- Manual desktop/mobile review `/about` and `/contact`.

## Status

- Status: closed.
- Depends on: `task-06-design-system-handoff.md`.

## Closeout Evidence

- References: `reference.png`, `reference-mobile.png`, `subagent-notes.md`, `imagegen-prompt.md`, `generated.png`, `build-map.md`, and `extract/` saved for `/about` and `/contact`.
- Assets: selected dense extracted variants copied into `public/landing/other-pages/**`; `/about` uses Justin dome/civic building v2, Michael bridge v2, Daniel rotunda v2.
- Implementation: `/about` rebuilt as hero + divider + three equal founder cards + compact contact strip; `/contact` rebuilt as one desktop two-column scene with route-line and high email card.
- Subagent gate: about repeat found no `major drift`; contact first found one desktop email-card spacing `major drift`, then the card was fixed and repeat found no `major drift`.
- Verification: `npm run lint` passed; marketing-pages visual test passed `9 passed`; landing-contracts passed `5 passed, 1 skipped`; surface-safety passed during the implementation flow `11 passed, 1 skipped`.
- Manual sanity: desktop/mobile `/about` and `/contact` had no horizontal overflow; email CTA was visible and clickable.
- Intentional deviations: global header/footer remain live site chrome; live copy is unchanged; generated remains direction, not pixel law.

## Cited Criteria

- `_ops/criteria/landing-visual-cycle.md`
- `_ops/criteria/landing-design-and-brand.md`
- `_ops/criteria/landing-copy.md`
- `_ops/criteria/client-feedback-cycle.md`
- `_ops/criteria/process.md`
