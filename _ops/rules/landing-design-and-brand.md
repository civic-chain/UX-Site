# Landing Design and Brand

Проектные границы и red lines для landing'а, связанных страниц и внутренней
`/brand` documentation surface. Подгружай, когда задача меняет публичную
page-итерацию, route scope, защищённые owner-ы, motion или `/brand` docs.

Закон бренда и кодовый контракт дизайн-системы (как должно выглядеть,
компоненты, контракт цвета, токены, структура) держит скилл `2civic-design` —
вызови его перед любым визуальным или дизайн-системным решением. Этот файл
держит только проектные границы; всё про дизайн — в скилле.

## Цели

- Приоритет — красивые CivicChain landing-страницы для клиентского review.
- Скорость итерации важнее идеальных пикселей, пока не ломаются brand,
  claim-discipline и проверяемость.
- Одна кодовая база и одна дизайн-система. Не создавать параллельные темы,
  каталоги, route-local systems или sandbox routes без нового решения владельца.

## Неприкосновенное

- `public/brand/` — клиентские брендовые ассеты.
- `_docs/facts/*` — клиентские факты и claim boundary.

Тронуть эти owner-ы можно только по явному scope пользователя.

## Public Page Iteration

- `/` — текущий главный лендинг. Его route-owned секции живут в
  `app/(site)/_sections`.
- `/landing-v1` — noindex-архив первой главной для reference-сравнения.
- `/landing-v2` — старый preview URL; он редиректит на `/`, а не владеет
  отдельной активной page truth.
- Публичные страницы можно редактировать как активный дизайн-материал, когда
  задача page/design-system scoped. Claim discipline и защищённые owners выше
  остаются законом.
- Смелые page-local элементы, data-viz и новые секции допустимы внутри активной
  page-итерации, если они остаются in-brand и claim-safe.
- Shared primitive поднимается только при реальном reuse или явном решении
  владельца. Иначе новый visual element остаётся page-local.
- Retired route families не восстанавливать без нового решения пользователя.
  Executable route contract — в `tests/visual/route-contracts.ts`. Историю брать
  из `git log` или `_docs/marketing/`, адаптируя заново под текущую систему.
- Generated visual references показывают направление, не пиксельный макет:
  единая система и адаптивность важнее буквального копирования картинки.

## Brand Documentation Surface

- `/brand` — technical docs for the live design system, not a marketing page.
- Good copy answers: what exists, when to use it, which prop/owner owns it, and
  what not to do. Keep prose short and instructional, not persuasion or launch
  language.
- CivicChain examples are allowed only as specimens; they must not introduce new
  public claims.

## Границы кода

- Визуальный finding сначала проверяй на уровне дизайн-системы (component /
  primitive / pattern / asset / page-local use site) — детали в скилле
  `2civic-design`. Не добавляй token/component/file «на будущее».
- Не копируй клиентские hex, Tailwind utilities или generated JSX вслепую из
  `_workspace/**`; перевод идёт в нашу систему.
- Код не импортирует `_docs/**` или `_workspace/**`. Runtime assets живут в
  `public/design-assets/**` или `public/landing/**`.
- Motion runtime — за адаптерами `components/motion/`; route sections не
  импортируют GSAP напрямую. Для React/Next, timelines и performance — project-
  local GSAP skills, затем правь motion owner.
- Каждая существенная shape-правка дизайн-системы обновляет скилл `2civic-design`
  (обе зеркальные копии, см. `instruction-hygiene.md`); обычный use-site tweak
  не требует нового Markdown.

## Structural Before Visual

Перед крупной visual iteration проверь, что структура не мешает: нет активных
мёртвых routes, параллельных catalogs, runtime imports из docs/workspace или
обходов design-policy. Structural cleanup — инструмент красоты, не самоцель.

## Проверка

- `npm run lint` — default gate для code/design-system work.
- Design-policy lint is advisory during active visual iteration: raw values,
  arbitrary layout values, inline styles, raw local controls, and other
  page-local visual shortcuts may warn but should not block shaping the page.
  Treat those warnings as hardening notes before client preview.
- Focused Playwright — когда меняется видимая route wiring, layout, motion,
  touch safety или contrast.
- Визуальные изменения во время итерации — норма, не stop. Деплой превью никто
  не видит (без домена, только владелец), поэтому цвета, отступы и вид можно
  менять свободно ради чистоты кода. Stop — только при задетом protected owner,
  нарушении claim-discipline или сломанном user-visible поведении.
