## Цель

Тесты в `tests/visual/` защищают user-visible поведение landing'а и связанных страниц. Они не ловят дизайн-пиксели и не фиксируют implementation detail.

## Критерии

- Тестируем user-visible: маршруты отвечают, секции видимы, ссылки ведут на
  правильные адреса, тач-цели не меньше минимума, нет горизонтального overflow
  на узких viewport'ах.
- Селекторы — семантические: `getByRole`, `getByText`, `getByLabel`,
  `getByTestId`. Не цепляться к классам/CSS, кроме явных `data-testid`
  контрактов.
- Auto-waiting через `expect(locator).toBe*` и locator-actions. `waitForTimeout` запрещён.
- Один тест = одна область утверждения. Длинные тесты режутся на маленькие через `test.step`.
- Route contracts живут в `tests/visual/route-contracts.ts`; не держи вторые
  route lists в отдельных specs.
- Глубокое покрытие in-scope: landing-home `/`, related pages, `/brand`, и
  `/resources` + статьи. Retired route 404-smoke не держим в default suite:
  проверяй ad hoc только при route wiring изменениях.
- Перед `assertion`'ами на mobile — set viewport через `test.use({ viewport })`, не resize в runtime.
- Touch-target минимум — 44px на десктопе, 48px на интерактивных карточках, 56px на главном CTA на mobile.
- Exact commands live in `tests/visual/README.md`; root/rules decide when to run
  focused vs full checks.
- Visual exploration / iterative design checks — через доступный Playwright
  skill/MCP/browser surface, после live-handle check.
- Multi-section visual critique — делать параллельными subagent-ами (один subagent на секцию), не последовательно.
- Intentional viewport overflow допустим только для явно помеченного элемента
  после прямого решения пользователя; mobile всё равно не должен давать
  горизонтальную прокрутку.

## Анти-Goals

- Не делать пиксельных snapshot-тестов на дизайн-итерационных секциях landing-home.
- Не coupling-ить тесты к Tailwind classNames.
- Не накапливать broken tests «на всякий случай» — либо пишем, либо помечаем skip.
