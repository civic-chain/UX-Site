# Skill Routing

> **Локальные skills — handoff surface.** Project-local skills в `.codex/skills/`
> и `.claude/skills/` полезны для следующего человека/агента и едут в GitHub
> как часть передачи. Если runtime не auto-load'ит named skill, читай его
> локальный `SKILL.md`; если файла нет, работай напрямую по `AGENTS.md`,
> `_ops/rules/`, `_docs/` и коду. Канон оговорки — `AGENTS.md`, секция
> `Local Skill Surface`.

Какой скил вызывать когда. Подгружай этот файл при выборе следующего шага в нетривиальной работе, при обсуждении планирования, или когда непонятно куда направить запрос пользователя.

## Цели

- Каждый durable сигнал, write, и решение проходят через owner-скил, а не делаются «на глаз».
- Новый агент по этому файлу понимает default chain без чтения SKILL.md каждого скила.
- Ссылки на скиллы сверяются с текущей средой. Старые имена не переносить из памяти, task-файлов или закрытых фаз.

## Главное Правило

Ссылки на скиллы проверяются по текущей среде. Живой `SKILL.md` владеет workflow-механикой; `_ops/rules/*.md` владеют проектными правилами и routing intent. Если они расходятся, не спорь текстом — обнови owner-слой или остановись.

## Three-Level Planning

Канонический shape:
- L1 — `_ops/PROJECT-ROADMAP.md` (Цель + Стадии).
- L2 — `_ops/plans/phase-NN-*/task-MM-*.md` (task-файлы).
- L3 — подшаги внутри task-файлов.
- Слой правил — `_ops/rules/*.md`. Каждый task contract цитирует применимые rule-файлы.

Task-файл нужен для крупной многошаговой работы, не для каждой мелочи.

## Owner-скилы

- `1strategy` — сырое желание, развилка, approach choice. `1strategy-docs` — форма GOAL / README / ROADMAP; `1planning` — `_ops/plans/**`.
- `1instruction-layer` — AGENTS / CLAUDE / папочные инструкции, wording, route hygiene, устаревшие имена.
- `1folder-contract` — owner boundaries, папочные контракты, runtime / hooks / validators / mechanism choice.
- `1skill-architect` — `SKILL.md`, description/trigger/frontmatter, split/merge скилов.
- Markdown-доки — читать через owner-файлы, `rg`, targeted file reads и
  `npm run lint:instructions`. Не использовать `1md-navigator`, `1md-reader`,
  `1md-graph` или `md` CLI как default route; только по явной просьбе
  пользователя.
- `1findings` — побочная находка или self-learning факт; записать сразу в `_ops/findings/` и вернуться к задаче.
- `1cli-tools` — установленная CLI-поверхность и code evidence. Для незнакомого кода используй `1repo-map`; для symbol-level truth — Serena/LSP; для exact text — `rg`; для fuzzy code search — Probe; для structural search/rewrite preview — `ast-grep` / `comby`; для dead/import/dependency candidates — `knip` / `depcruise`.

## Остальные Скилы

`1step-back`, `1fresh-eyes`, `design-subagents`, project-local `illustration-extraction` и другие доступные skills вызываются по их живым `SKILL.md`. Не переносить сюда их тела; этот файл только маршрутизирует.

- **Бренд / визуальное решение** (как покрасить карточку, цвет иконки/текста/кнопки, «это в бренде?», цветная-на-цветном vs светлая-с-акцентами, белые карточки на цветном блоке, density→lightness) — live CivicChain brand-design skill (`2civic-design` in Codex; verify handle in other agents): код-агностичный закон бренда и источник правды «как должно выглядеть»; токены / доки / код правятся к нему, не наоборот. Художественная критика готового скриншота — доступный screenshot/design-review surface после live-handle check; пиксель-сверка кода с эталоном — workflow `_workspace/ai-workflows/visual-fidelity-loop.md`.

Для landing-анимаций используй project-local GSAP skills (`gsap-react`,
`gsap-scrolltrigger`, `gsap-timeline`, `gsap-core`, `gsap-performance`) и
реализуй runtime только за адаптерами `components/motion/`.

## Инструменты И MCP

Маршрут к поверхности инструментов, не каталог бинарей. Код-лестница — в
`1cli-tools` выше; live-инвентарь всегда проверяй в текущей среде.

- **Визуальная петля** — превью и скриншоты маршрутов: доступный Playwright
  skill/MCP/browser surface для re-runnable прогона, `screenshot-design` для
  художественной критики, Vercel preview для client review.
- **Read-only fan-out / critic briefs** — перед передачей путей критикам или
  subagent-ам подтверждай их через `rg` / live file list. Для read-only работы
  используй read-only-capable surface; если помощник мог писать, после него
  проверяй `git status`.
- **Next.js debug** — MCP `next-devtools` (единственный committed MCP, `.mcp.json`): маршруты, rendering, docs живого Next 16.
- **Markdown-доки** — owner-файлы + `rg` / targeted reads; `md` CLI и
  `1md-*` skills не являются проектным default.
- **Figma** — Figma MCP для design↔code, когда задача трогает макеты или дизайн-систему в Figma.
- **Subagents / external critics** — используй текущие доступные subagent,
  critic или external-review surfaces после live-handle check. Не закрепляй
  историческое имя как проектную правду.

Live-handles сверяй со средой; тела — в живых `SKILL.md`.
