# Landing Design and Brand

Правила работы с дизайн-системой, токенами, брендом и визуальным языком landing'а, связанных страниц и демо-интерфейсов. Подгружай этот файл когда правишь CSS, токены, primitives, patterns, бренд-ассеты, или решаешь как структурировать визуальный слой.

## Цели

- Бренд закреплён клиентом; дизайн-система общая для landing'а, связанных страниц и демо.
- Стандарт качества — ship-it-fast: скорость итерации важнее идеальных пикселей.

## Неприкосновенное (Без Явного Разрешения)

- `public/brand/` — брендовые ассеты от клиента.

Тронуть → сначала спросить пользователя.

`app/styles/tokens.css` в Stage 5 открыт для редактирования (палитра, типографика, spacing, radius, surface tones — материал итерации по generated-секциям). До и после фазы — обсудить.

## Визуальный Язык

- Референсы — фьюжн: Stripe/Linear/Vercel + GovTech/USDS + editorial NYT/Atlantic.
- GovTech/USDS используем; government bureaucracy — off-brand (см. ниже).
- Линза для landing-работы — creative-page-designer.
- В audit/polish проверять композиционные пропорции: размер текста, внутренний padding, расстояние между карточками и смысловыми блоками должны играть вместе; текст в кнопках и pill-элементах визуально по центру, без микроскопических боковых отступов при тяжёлом верх/низ.
- Цикл `focused screenshot -> design-subagent -> imagegen -> _docs/landing-page` ведётся по `_ops/criteria/landing-visual-cycle.md`.
- Generated-секции — визуальный источник направления, не пиксельный макет: стиль можно усреднять между секциями, если иначе единая система распадается.

## Visual Cues (Reusable Across Sections)

- HeadlineDot — это перекрашенная gold точка-символ `.` после headline, не отдельный круглый шарик.
- Eyebrow tag везде через `<Badge variant="gold">` (gold-outline на cream-фоне), не `muted`.
- Tone-карточки имеют border со всех сторон + утолщённый bottom-band (`var(--stripe-width)`) tone-saturated цвета.
- Rule: Cream/card surfaces должны быть тёплым off-white, не ярким белым; если один cream-цвет повторяется на карточках, греть его через общие `--card` и `--tone-cream`.
  Why: Пользователь хочет глобально потеплить этот общий белый цвет на всех объектах, а не чинить отдельные карточки.
- Icon-chip контрастирует с tone-карточкой (cream-card → gold-tone chip), не сливается с фоном. Тихие контексты (hero residents/vendors, content без громкого числа) — `gold-soft` tone (cream-with-mild-gold, faint border); громкие (numbers cards с serif-числом) — насыщенный `gold` / `dusty` / `sage`.
- Icon preset по контексту, не глобальный. Тихие контексты (hero residents/vendors, faq, soft sections) — chip `md` + `gold-soft` tone + `BrandIcon strokeWidth=1.0` (тонкая линия). Громкие impact-контексты (numbers cards с serif-числом `$208B`/`82% faster`) — chip `lg` + насыщенный tone + `strokeWidth=1.8` (толстая линия). Один preset на секцию, не миксовать внутри карточки.
- Hero секция держит видимые отступы сверху/снизу — headline не прижимается к viewport top; first-section не означает «no padding».
- Hero illustration может намеренно вылезать из своего image-box и чуть уходить за правый край viewport на tablet/desktop, если пользователь явно выбирает такой креативный ход; на mobile она должна нормально помещаться в экран, а live copy, CTA и support-текст не должны обрезаться.
- CTA-стрелки в tone-карточке окрашены tone-saturated цветом из палитры (cream → `var(--deep-gold-soft)`, dusty → `var(--accent)`, sage → `var(--deep-sage-soft)`), не серые.
- Иллюстрации крупные, занимают существенную часть top-зоны карточки, не сжаты в маленькую рамку.
- Vertical dividers между feature-pills окрашены tone-saturated edge-цветом из палитры (`--edge-gold-soft` / `--edge-accent-soft` / `--edge-sage-soft`), не серые.
- AccentUnderline (короткая золотая линия) под heading и под card title — signature pattern, переиспользуемый primitive.
- Hero и нижний CTA используют одну тёмно-синюю кнопку `mailto:` с email внутри; золотую email-плашку рядом не возвращать без явного задания.
- Generated показывает направление, не пиксельный макет: допустима ~5% жертва похожести ради DRY и handoff readiness.

## Architecture / Handoff

- Кодовая база уйдёт внешнему программисту в Stage 7 — handoff readiness важнее эстетического совершенства.
- Простота над абстракцией: меньше слоёв = легче войти cold-reader'у. Не плодить React `variant` API, content-separation, Storybook, theme-switcher без реального use-case.
- Reuse + extension прежде нового компонента. Новый primitive — только при доказанном повторе ≥3 раза в реальном коде.
- Цвета живут в named tokens в `tokens.css`. Landing/marketing tier — палитра `--paper-* / --stripe-* / --edge-* / --deep-*` плюс specials (`--scrim`, `--current-soft`, `--secondary-pressed`). Workspace tier (`/admin`, `/vendor`, `/citizen`) — `--workspace-*` namespace (status edges/bg, table-row bg/hover, step-selected, link-hover, separator). Form/overlay tier — `--control-*`. JSX/CSS читает `var()` напрямую. Card chrome (border, bottom-stripe, divider, accent) применяется inline в месте использования — нет `card-tone-*` scope или `--card-{tone}-{role}` префиксов. Для multi-tone data-driven секций — локальный `Record<tone, classes>` рядом с JSX. Inline `color-mix()` в JSX допустим только для one-off декоративных цветов; повторяющиеся формулы получают имя в нужном tier.
- Pattern extraction в отдельную `_patterns/` папку — только при второй странице с тем же layout (доказанный повтор), не превентивно.

## Off-Brand

- Crypto / web3 hype: neon, dark-mode-by-default, «to the moon», web3-template-look.
- Government bureaucracy: form-as-form, plain-blue-link, .gov-эстетика, тяжёлая формальность.
- Generic SaaS template: gradient-blob hero, illustration-of-team, generic features/benefits/pricing.

## Дизайн-Слой

- Один codebase, одна дизайн-система. Демо-экраны `/admin`, `/vendor`, `/citizen` — без отдельного CSS-слоя, наследуют общий бренд.
- `/brand` (наш canonical brand kit), `/resources` (blog index) и статьи под `/resources/<slug>` — re-skin клиентской структуры в нашу дизайн-систему: имена и шейп от клиента где применимо, шрифты / цвета / spacing / radii — наши.
- Новый компонент / токен / файл — только при реальном повторе. Не «на будущее».
- Узкий visual finding сначала проверять на уровне общей дизайн-системы: токены, primitives, patterns. Локальный фикс допустим только когда проблема реально локальная и не должна менять остальные surfaces.
- Код не ссылается на `_docs/landing-page/**`; финальные runtime-ассеты живут в `public/landing/<section>/...`. `public/brand/` остаётся клиентским слоем.

## Structural Before Visual

Перед итерацией визуальных вариантов дизайн-системы — структурный фундамент должен быть в порядке: всё реально использует общую дизайн-систему (нет hardcoded стилей, dead токенов, обходов lint-правил), файлы и компоненты лежат в правильных местах с правильными именами по best practices фронтенда, AGENTS.md покрывает каждую смысловую папку. Editorial polish поверх structural debt = дорогая переписка, не итерация.

## Варианты Дизайн-Системы

- Делаются как iterative refactor в `main` — один codebase, последовательные итерации одного и того же. История вариантов — `git log`.
- Без parallel variant-routes (`/v2`, `/v3`, `app/landing-02/`) — это Anti-goal.
- Без theme-switcher в tokens (`--mode-editorial`, `--mode-warm-civic` etc.) — итерируем сам default, не плодим темы.
- Каждая итерация дизайн-системы заканчивается с обновлённым `_docs/design-system.md` если поменялась shape (новые токены, изменённые primitives, новые / удалённые patterns).

## Anti-Goals

- Не плодить отдельные дизайн-системы для каждого маршрута.
- Не делать CMS, Storybook или компонентную платформу до доказанной необходимости.
- Не создавать `app/landing-02/`, `app/landing-03/` или другие альтернативные landing-маршруты.
- Не реанимировать удалённые брифы альтернативных landing'ов.
- Не копировать клиентские hex'ы / компоненты вслепую — переводим в наши токены.
- Не копировать AI-картинку буквально, если это ломает единую дизайн-систему или адаптивность.
