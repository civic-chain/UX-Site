# Landing Copy

Правила работы с текстом landing-страниц. Подгружай этот файл когда правишь, добавляешь или предлагаешь копию (hero, CTA, FAQ, microcopy, подписи) на landing или связанных страницах.

## Цели

- Public-page copy is free to iterate when the task is page/design-system scoped.
- Стандарт качества копии — ship-it-fast: лучше быстрая итерация, чем идеальная формулировка.

## Неприкосновенное (Без Явного Разрешения)

- `_docs/facts/*` — источник правды от клиента, только чтение.
- `public/brand/*` — клиентские brand assets.

Тронуть эти owner-ы → сначала спросить пользователя.

## Язык

- Только английский. i18n не закладываем.

## Голос

- Baseline — warm civic / human (USDS-friendly).
- `/brand` — исключение: техническая documentation surface. Пиши коротко и
  полезно: что это, когда использовать, какой owner/prop/constraint держать.
  Убирай sales framing, mood prose и claims ради впечатления. CivicChain-примеры
  допустимы только как specimens или usage notes.

## Источник Правды

- Текущая live copy для landing-home `/`, `/about`, `/resources` и статей живёт там, где рендерится: `app/(site)/**` code/content files. В рамках публичной page/design-system итерации её можно менять, пока сохраняется claim discipline. Скрытый contact-draft сохранён в `app/(site)/_contact/page.tsx`, но не является live route.
- `_workspace/Civic-Chain-Justin/` — исторический client-export для ручного resync, если пользователь просит свериться с клиентским вариантом. Это reference, не active canon.
- При расхождении между текущей live copy, explicit resync source и `_docs/facts/*` — стоп и вопрос пользователю, не молча.
- Исключение — `/brand`: **наш canonical**, не клиентский. От клиента берём
  только URL и общий разделочный каркас; visual language и формулировки — наши.
  Его brand-страница устарела, наша дизайн-система ведущая. Текущий owner job —
  техническая документация текущей системы, не маркетинговое убеждение.
- Для re-skin страниц (`/brand`, `/resources` и статьи): визуальная система —
  наша; не копировать клиентский styling из `_workspace/Civic-Chain-Justin/`
  вслепую.

## Зоны Ответственности За Копию

- Ключевые фразы (hero, CTA, заголовки секций) — page owner в `app/(site)/**`; можно итеративно править в рамках активной публичной страницы.
- Обвязка (FAQ, microcopy, подписи) — дизайнер или AI.

## Правила Правки

- Структуру landing'а не менять молча. Явное решение пользователя убрать слабую секцию допустимо; после этого синхронизировать roadmap, task-файлы, тесты и docs.
- Не сочинять фактические claims и не ослаблять claim boundary. Если страница / секция расширяется — брать claim boundary из `_docs/facts/*` / `_docs/business/` или остановиться и спросить пользователя; если нужна именно клиентская формулировка, делать явный resync с `_workspace/Civic-Chain-Justin/`.
- Можно предложить правку рядом или попросить явное задание.

## Текущий CTA

- Hero и нижний CTA: одна кнопка-ссылка `Contact us · info@civic-chain.com`.
- CTA ведёт на `mailto:info@civic-chain.com`; отдельная соседняя email-плашка не нужна.
