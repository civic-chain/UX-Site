# Структура кода и проверки (код-слой)

Где живёт правда дизайн-системы в коде и что её стережёт. Если этот файл и код
расходятся — код плюс policy-проверки и есть текущая правда механизма.

## Источник правды

- `app/styles/tokens.css` — source-значения.
- `app/styles/primitives.css` — single-purpose utility-классы.
- `app/styles/patterns.css` — повторяемые CSS-композиции.
- `components/ui/` — переиспользуемые примитивы и их variant'ы.
- `components/motion/` — анимационные адаптеры и GSAP-runtime.
- `components/site/` — общий site-shell.
- `lib/design-policy.ts` и `scripts/checks/design-system/*.mjs` — guardrails.
- `/brand` — техдокументация для людей и handoff-агентов; consumer галереи и
  usage-поверхность, не вторая база документации.

## Рабочая модель

Один общий дизайн-слой:

```text
values -> primitives -> patterns -> components -> pages
```

Не создавать route-local дизайн-системы, theme switchers, token namespaces или
параллельные каталоги компонентов. Страница выбирает из общего слоя или остаётся
page-local, пока реальный reuse не докажет shared-владельца.

## Motion

Только `components/motion/` может импортировать GSAP-пакеты или скрывать/являть
контент анимационным runtime. Секции маршрутов потребляют адаптеры и рендерят
полный контент под reduced motion. Текущие публичные адаптеры (их сверяет
sync-чек): `Reveal`, `RevealList`, `CountUp`, `SwapContent`. Табы — это UI, не
motion; не пересобирай таб или disclosure в motion-слое.

## Ассеты

- `public/brand/` — защищённый клиентский бренд-материал.
- `public/design-assets/` и `public/landing/` — владельцы runtime-ассетов.
- `_workspace/**` — scratch/reference; runtime-код не импортирует его и `_docs/**`.

## Проверки

Для работы с дизайн-системой — `npm run lint`. Focused Playwright — когда правка
меняет видимую route wiring, layout, motion, touch safety или контраст. Policy-
слой ловит дрейф; держи описание коротким, чтобы холодный читатель находил
владельца раньше, чем имплементацию.
