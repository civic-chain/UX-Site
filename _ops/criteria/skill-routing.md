# Skill Routing

Какой скил вызывать когда. Подгружай этот файл при выборе следующего шага в нетривиальной работе, при обсуждении планирования, или когда непонятно куда направить запрос пользователя.

## Цели

- Каждый durable сигнал, write, и решение проходят через owner-скил, а не делаются «на глаз».
- Новый агент по этому файлу понимает default chain без чтения SKILL.md каждого скила.
- Ссылки на скиллы сверяются с текущей средой. Старые имена не переносить из памяти, task-файлов или закрытых фаз.

## Главное Правило

При конфликте между внутренней инструкцией скила и `_ops/criteria/*.md` — побеждает критерий.

## Three-Level Planning

Канонический shape:
- L1 — `_ops/PROJECT-ROADMAP.md` (Цель + Стадии).
- L2 — `_ops/plans/phase-NN-*/task-MM-*.md` (task-файлы).
- L3 — подшаги внутри task-файлов.
- Слой правил — `_ops/criteria/*.md`. Каждый task contract цитирует применимые criteria-файлы.

Task-файл нужен для крупной многошаговой работы, не для каждой мелочи.

## Owner-скилы (вызываются в Default Chain)

- `1start-here` — старт проекта / репо и выбор одного активного owner-скила.
- `1user-truth` — ведёт `_ops/criteria/*.md`. Куда писать сигнал по типу:
  - поведение / тон / default chain → `agent-discipline.md`;
  - дизайн-система / бренд / визуал / варианты дизайн-системы → `landing-design-and-brand.md`;
  - focused screenshots / design-subagents / imagegen / `_docs/landing-page` или `_docs/other-pages` артефакты → `landing-visual-cycle.md`;
  - копия / структура landing-страниц / Justin canonical как источник правды → `landing-copy.md`;
  - цикл с клиентом / фидбэк / темп / приоритеты / две сдачи (vercel preview / handoff кода) → `client-feedback-cycle.md`;
  - инструкция / route hygiene / Claude Code инфра → `instruction-hygiene.md`;
  - файл-дисциплина → `process.md`;
  - скил-роутинг → `skill-routing.md` (этот файл).
- `1strategy` — сырое желание, развилка, подход, рамка README. Использовать до плана, если способ ещё не выбран.
- `1roadmap` — ведёт `_ops/PROJECT-ROADMAP.md`: цель, стадии, текущий путь.
- `1tasks` — ведёт `_ops/plans/phase-NN-*/task-MM-*.md`. Папки фаз создавать по требованию. Каждый task contract цитирует применимые criteria.
- `1instruction-layer` — AGENTS / CLAUDE / папочные инструкции, ссылки на criteria, маршрут владельца, устаревшие имена.
- `1repo-shape` — выбранные валидаторы, скрипты, hooks, config, папки и ограничения среды.
- `1skill-architect` — `SKILL.md`, trigger, frontmatter, проверка скилла.
- `1before-work` — обязательный для нетривиальной работы. Читает roadmap + criteria + task-файл, если есть.
- `1before-write` — перед содержательной правкой файла. Берёт опору из task contract или criteria.
- `1work-review` — до «готово». Сверка с критериями задачи и стадией roadmap.

## Остальные Скилы

`1step-back`, `1cli-tools`, `1criteria-council`, `impeccable`, `screenshot-design`, `playwright`, project-local `illustration-extraction` и доступный браузерный инструмент работают по своим SKILL.md. `illustration-extraction` ведёт extraction landing-иллюстраций из screenshots в прозрачные PNG/WebP; при параллельной extraction передавай его обычным worker-субагентам, не дизайн-субагентам. Остальные вызываются по триггерам в их описаниях; `1criteria-council` — только когда пользователь явно просит несколько агентов / совет критериев.
