# Task 01 · Section Build Maps

Применимые критерии: `_ops/criteria/landing-visual-cycle.md`, `_ops/criteria/landing-design-and-brand.md`, `_ops/criteria/landing-copy.md`, `_ops/criteria/process.md`.

## Цель

По всем live generated-секциям создать короткие `build-map.md` и `extract/`, чтобы перед asset extraction было ясно: что строится кодом, что иконкой, что иллюстрацией, что декором, а что не копируется.

## Подшаги

1. **Посмотреть generated-секции.**
   EN: Review each `_docs/landing-page/<section>/generated.png` and the matching `subagent-notes.md`.
2. **Записать карты сборки.**
   EN: Create one compact `build-map.md` per section using the inventory format.
3. **Создать asset-папки.**
   EN: Add `extract/` in every section folder with a tracked placeholder.
4. **Проверить краткость.**
   EN: Ensure each map is a planning handoff, not an implementation spec.

## Готово

- [x] В live section folders есть `build-map.md`.
- [x] В live section folders есть tracked `extract/`.
- [x] Каждая карта явно делит `Code`, `Icons`, `Illustrations`, `Decorations`, `Do Not Copy`, `Build Notes`.
- [x] Карты не меняют copy/order и не обещают pixel-perfect.

## Красные Линии

- Не писать implementation spec уровня CSS/TSX.
- Не класть runtime-ассеты в `_docs` как финальный путь.
- Не трогать live copy.

## Проверка

- `npm run lint:instructions`

## Status

- Status: closed.
- Depends on: generated sections exist.

## Closeout Evidence

- Build maps: created for live section folders.
- Extract folders: tracked via `extract/.gitkeep` in live section folders.
- Verification: `find _docs/landing-page -maxdepth 3 \( -name build-map.md -o -path '*/extract/.gitkeep' \) -print` confirmed expected live files.

## Cited Criteria

- `_ops/criteria/landing-visual-cycle.md`
- `_ops/criteria/landing-design-and-brand.md`
- `_ops/criteria/landing-copy.md`
- `_ops/criteria/process.md`
