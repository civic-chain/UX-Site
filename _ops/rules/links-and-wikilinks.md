# Links And Wikilinks

## Когда Читать

Читай при правке Markdown-ссылок, wikilinks, local doc references, folder
moves/renames и Obsidian-навигации.

## Правила

- Для локальных Markdown-документов используй wikilinks: `[[README]]`,
  `[[_ops/PROJECT-ROADMAP|roadmap]]`.
- Для ссылок на правила в instruction files держи один owner-link, например
  `[[_ops/rules/links-and-wikilinks|правила ссылок]]`; dense link maps живут в
  `_ops/rules/` или конкретном owner-документе.
- Внешние URL, команды, code paths, globs и placeholders (`npm run lint`,
  `app/**/*.tsx`, `_ops/rules/*.md`, `<section>`) не превращай в wikilinks.
- Skill handles пиши коротким именем (`1folder-contract`, `1findings`) без
  путей к skill folders.
- После moves/renames проверяй затронутый scope через `rg`, targeted file reads
  и `npm run lint:instructions`. Не используй `1md-*` skills или `md` CLI как
  default route.
- Missing frontmatter в instruction/on-ramp файлах не чинить механически;
  сначала проверь, должен ли файл вообще быть graph node.
- Broken link без реального target-а не является rewrite-задачей: найди owner,
  восстанови moved target или убери/отложи ссылку; не создавай placeholder doc
  без явного scope.
- Якорь `[[file#heading]]` должен дословно совпадать с полным текстом заголовка
  (markdown-эмфаза снимается); усечённый/приблизительный якорь молча ломается.
  Если в файле нет такого `#`-заголовка (напр. нумерованные секции
  `whitepaper.md` — это не заголовки) — ссылайся на файл целиком.
- `_workspace/**` — scratch/reference зона; wikilinks там проверяй отдельно,
  без опоры на `md`.
