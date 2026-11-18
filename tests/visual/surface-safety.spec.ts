import { expect, test, type Locator, type Page } from "@playwright/test";

import {
  assertMinTouchTarget,
  boxesOverlap,
  findClippedText,
  findHorizontalViewportOverflow,
  findLowContrastText,
  getBox,
  getStylePx,
  gotoLanding,
  section,
} from "./helpers";

const landingPrimaryContactHref = "mailto:info@civic-chain.com";

async function expectNoOverlap(locator: Locator, label: string) {
  const count = await locator.count();
  const boxes = await Promise.all(
    Array.from({ length: count }, (_, index) => getBox(locator.nth(index))),
  );

  for (let index = 0; index < boxes.length; index += 1) {
    for (let nextIndex = index + 1; nextIndex < boxes.length; nextIndex += 1) {
      expect(
        boxesOverlap(boxes[index], boxes[nextIndex], 1),
        `${label}: item ${index} overlaps item ${nextIndex}`,
      ).toBe(false);
    }
  }
}

async function expectNoViewportOverflow(page: Page) {
  const overflow = await page.evaluate(() => {
    const doc = document.documentElement;
    return doc.scrollWidth - doc.clientWidth;
  });

  expect(overflow).toBeLessThanOrEqual(1);
}

test.describe("landing desktop safety", () => {
  test.beforeEach(async ({ page }) => {
    await gotoLanding(page);
  });

  test("landing stays inside the desktop viewport", async ({ page }) => {
    const offenders = await findHorizontalViewportOverflow(page);
    expect(offenders).toEqual([]);
    await expectNoViewportOverflow(page);
  });

  test("visible text is not clipped by overflow rules", async ({ page }) => {
    const offenders = await findClippedText(page);
    expect(offenders).toEqual([]);
  });

  test("major landing card clusters do not overlap", async ({ page }) => {
    await expectNoOverlap(section(page, "problem").locator('[data-testid^="problem-card-"]'), "problem");
    await expectNoOverlap(section(page, "how-it-works").locator('[data-testid^="step-card-"]'), "how-it-works");
    await expectNoOverlap(section(page, "numbers").locator('[data-testid^="metric-card-"]'), "numbers");
    await expectNoOverlap(section(page, "portal-hub").locator('[data-testid^="portal-card-"]'), "portal-hub");
  });
});

test.describe("landing mobile safety", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test.beforeEach(async ({ page }) => {
    await gotoLanding(page);
  });

  test("landing fits a small viewport without horizontal overflow", async ({ page }) => {
    await expectNoViewportOverflow(page);
  });

  test("main mobile actions stay touch-safe", async ({ page }) => {
    const portalCards = section(page, "portal-hub").locator('[data-testid^="portal-card-"]');
    const portalCardCount = await portalCards.count();

    for (let index = 0; index < portalCardCount; index += 1) {
      await assertMinTouchTarget(portalCards.nth(index), 48);
    }

    await assertMinTouchTarget(
      section(page, "cta").locator(`a[href="${landingPrimaryContactHref}"]`).first(),
      56,
    );
  });

});

test.describe("landing accessibility", () => {
  test.beforeEach(async ({ page }) => {
    await gotoLanding(page);
  });

  test("visible landing text maintains AA contrast", async ({ page }) => {
    const offenders = await findLowContrastText(page);
    expect(offenders).toEqual([]);
  });

  test("disabled-motion sections stay static when reduced motion is requested", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await gotoLanding(page);

    const disabledMotionSections = await page
      .locator('main > section[data-disable-motion="true"]')
      .evaluateAll((elements) =>
        elements.map((element) => {
          const style = window.getComputedStyle(element);
          return {
            id: element.id,
            animationName: style.animationName,
          };
        }),
      );

    for (const item of disabledMotionSections) {
      expect(item.animationName, `${item.id} animation name`).toBe("none");
    }
  });
});

test.describe("mobile readability", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test.beforeEach(async ({ page }) => {
    await gotoLanding(page);
  });

  test("body copy stays at or above 16px on mobile", async ({ page }) => {
    const paragraphs = page.locator("main p.body, main p.body-bold, main p.body-lg");
    const paragraphCount = await paragraphs.count();

    for (let index = 0; index < Math.min(paragraphCount, 20); index += 1) {
      const size = await getStylePx(paragraphs.nth(index), "font-size");
      expect(size, `paragraph ${index} font-size`).toBeGreaterThanOrEqual(16);
    }
  });
});
