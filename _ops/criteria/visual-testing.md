## Цель

Тесты в `tests/visual/` защищают user-visible поведение landing'а и связанных страниц. Они не ловят дизайн-пиксели и не фиксируют implementation detail.

## Критерии

- Тестируем user-visible: маршруты отвечают, секции видимы, ссылки ведут на правильные адреса, тач-цели не меньше минимума, нет горизонтального overflow на узких viewport'ах.
- Селекторы — семантические: `getByRole`, `getByText`, `getByLabel`, `getByTestId`. Не цепляться к классам/CSS, кроме явных `data-testid` контрактов.
- Auto-waiting через `expect(locator).toBe*` и locator-actions. `waitForTimeout` запрещён.
- Один тест = одна область утверждения. Длинные тесты режутся на маленькие через `test.step`.
- Тест устаревшего дизайна или out-of-scope маршрута помечается `test.skip` с одной строкой причины (например `// stage-7: workspace redesign pending`). Восстанавливается, когда роадмап-стадия активна.
- В Stage 5 in-scope: landing-home `/`, related страницы (`/about`, `/contact`, `/brand`), и `/resources` + статьи. Workspace shells (`/admin`, `/vendor`) тестируем только на доступность маршрута и публичной части (`/citizen` ledger), глубже — Stage 7.
- Перед `assertion`'ами на mobile — set viewport через `test.use({ viewport })`, не resize в runtime.
- Touch-target минимум — 44px на десктопе, 48px на интерактивных карточках, 56px на главном CTA на mobile.
- Verification команда — `PLAYWRIGHT_REUSE_SERVER=true PLAYWRIGHT_PORT=3311 npm run test:visual`.
- Visual exploration / iterative design checks — через playwright MCP (re-runnable, scriptable), не одноразовые ad-hoc shell-скрипты.
- Multi-section visual critique — делать параллельными subagent-ами (один subagent на секцию), не последовательно.
- Intentional viewport overflow допустим только для явно помеченного элемента после прямого решения пользователя; текущий разрешённый случай — `data-allow-viewport-overflow="hero-art"` внутри `#hero` на tablet/desktop, при этом mobile должен показывать hero-art целиком без горизонтальной прокрутки.

## Анти-Goals

- Не делать пиксельных snapshot-тестов на дизайн-итерационных секциях landing-home.
- Не coupling-ить тесты к Tailwind classNames.
- Не накапливать broken tests «на всякий случай» — либо пишем, либо помечаем skip.
