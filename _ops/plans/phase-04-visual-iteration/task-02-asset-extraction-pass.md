# Task 02 · Asset Extraction Pass

Применимые критерии: `_ops/criteria/landing-visual-cycle.md`, `_ops/criteria/landing-design-and-brand.md`, `_ops/criteria/process.md`.

## Цель

По `build-map.md` вытянуть только нужные иллюстрации из generated-секций, удалить chroma-key фон и сохранить чистые ассеты для будущего runtime-копирования.

## Подшаги

1. **Выбрать кандидаты.**
   EN: Read all build maps and list only illustration assets that cannot be code-native.
2. **Сгенерировать cutouts.**
   EN: Use the `imagegen` workflow with flat chroma-key backgrounds for each selected illustration; if a subject fails clean extraction, record it as a blocker or choose a simpler split.
3. **Удалить фон.**
   EN: Run the bundled chroma-key removal helper and validate alpha edges.
4. **Разложить ассеты.**
   EN: Save working outputs under the matching `_docs/landing-page/<section>/extract/`.
5. **Подготовить runtime shortlist.**
   EN: Identify which final assets should later be copied to `public/landing/<section>/...`.

## Готово

- [x] Каждый extracted asset соответствует конкретной строке в `build-map.md`.
- [x] Прозрачные PNG/WebP имеют alpha, без заметной зелёной каймы.
- [x] Имена файлов понятны по секции и объекту.
- [x] Простые иконки не вытянуты bitmap'ами без необходимости.
- [x] Невытягиваемые объекты явно помечены как blocker/defer, а не спрятаны как “готово”.

## Красные Линии

- Не оставлять project-bound ассеты только в `$CODEX_HOME`.
- Не использовать `_docs/landing-page/**` как runtime-путь в коде.
- Не заменять иконки картинками, если `BrandIcon` или SVG/код честно подходят.

## Проверка

- Визуальная проверка extracted ассетов.
- При появлении runtime-копий позже: `npm run lint`.

## Status

- Status: closed.
- Depends on: `task-01-section-build-maps.md`.

## Closeout Evidence

- Extracted assets:
  - `01-hero`: `hero-civic-scene-with-board-text.png/.webp` (`hero-civic-scene-clean-board.*` superseded because board/sign text must stay inside the illustration).
  - `02-portal-hub`: `books-lamp-seal.png/.webp`, `hardhat-tablet-plans.png/.webp`, `contract-stack-plant.png/.webp`.
  - `03-problem`: `fragmented-desk.png/.webp`, `worried-contractor-binders.png/.webp`, `late-visibility-table.png/.webp`.
  - `04-how-it-works`: `request-desk.png/.webp`, `controlled-spend-clipboard-coins.png/.webp`, `confirmation-ledger-courthouse.png/.webp`.
  - `05-numbers`: `courthouse-tree-line-art.png/.webp`.
  - `07-cta`: `cta-courthouse-trees-planter.png/.webp`.
  - `08-faq`: `faq-courthouse-trees.png/.webp`.
- Alpha validation:
  - `uv run --no-project --with pillow python ...` checked all 13 final PNG/WebP pairs: PNG alpha `0..255`, transparent corners, PNG/WebP dimensions match, no green/magenta chroma-key pixels left.
  - Visual contact sheet created at `/tmp/civicchain-v2-extract-contact-sheet-v2.png` and reviewed.
  - `python3` now imports `PIL 12.2.0`; normal Python is usable for future finish/validation runs.
- Deferred assets:
  - None. Simple icons, metric cards, CTA/FAQ UI, text outside extracted objects, dividers, dots, and buttons remain code-native by `build-map.md`.
  - `05-numbers` final files were accepted by main-agent validation after the subagent got stuck post-creation; no blocker remains.

## Cited Criteria

- `_ops/criteria/landing-visual-cycle.md`
- `_ops/criteria/landing-design-and-brand.md`
- `_ops/criteria/process.md`
