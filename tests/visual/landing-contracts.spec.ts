import { expect, test, type Page } from "@playwright/test";

import {
  gotoAndWaitFor,
  gotoLanding,
  expectPathname,
  landingPublicSectionIds,
  landingSectionLinkContracts,
  section,
} from "./helpers";

/**
 * The record-flow animation is the shared static scene at
 * public/how-diagram.html, embedded in an iframe and used by both `/` and
 * `/how`. It used to be a React component in this route, so these tests reach
 * through the frame rather than into the page DOM.
 */
function recordFlowAnimation(page: Page) {
  return page.frameLocator('#record-flow iframe[src="/how-diagram.html"]');
}

async function selectRecordFlowMode(page: Page, name: string) {
  const button = recordFlowAnimation(page).getByRole("button", { name });

  await expect(async () => {
    await button.click();
    await expect(button).toHaveAttribute("aria-pressed", "true");
  }).toPass({ timeout: 10_000 });

  return button;
}

test.describe("landing contracts", () => {
  test("default landing renders every public landing section", async ({ page }) => {
    await gotoLanding(page);

    for (const id of landingPublicSectionIds) {
      await test.step(id, async () => {
        await expect(section(page, id)).toBeVisible();
      });
    }
  });

  test("landing collections render at least one item per cluster", async ({ page }) => {
    await gotoLanding(page);

    for (const [clusterId, testId] of [
      ["portal-hub", "portal-card-"],
      ["how-it-works", "step-card-"],
      ["numbers", "metric-card-"],
      ["faq", "faq-item-"],
    ] as const) {
      const count = await section(page, clusterId).locator(`[data-testid^="${testId}"]`).count();
      expect(count, `${clusterId} cluster items`).toBeGreaterThan(0);
    }
  });

  test("landing public actions route to the right destinations", async ({ page }) => {
    for (const contract of landingSectionLinkContracts) {
      await test.step(`${contract.sectionId} -> ${contract.href}`, async () => {
        await gotoLanding(page);
        const link = section(page, contract.sectionId).locator(`a[href="${contract.href}"]`).first();

        await expect(link).toBeVisible();
        await expect(link).toHaveAttribute("href", contract.href);
      });
    }
  });

  test("main landing embeds the shared record-flow animation", async ({ page }) => {
    await gotoAndWaitFor(page, "/", section(page, "record-flow"));

    const animation = recordFlowAnimation(page);

    await expect(animation.locator(".press-scene")).toBeVisible();
    await expect(animation.locator(".drawer")).toHaveCount(8);
    await expect(animation.locator(".channels .chan")).toHaveCount(4);
  });

  test("main landing record flow switches mode and opens a ledger drawer", async ({ page }) => {
    await gotoAndWaitFor(page, "/", section(page, "record-flow"));

    const animation = recordFlowAnimation(page);
    // Opens on "Through Civic-Chain" (Nick, 2026-10-12); Legacy is one click away.
    const civicChain = animation.getByRole("button", { name: "Through Civic-Chain" });

    await expect(civicChain).toHaveAttribute("aria-pressed", "true");
    await expect(animation.locator(".press-zlabel .cl-cc")).toBeVisible();

    await selectRecordFlowMode(page, "Legacy System");
    await expect(animation.locator(".press-zlabel .cl-old")).toBeVisible();

    await selectRecordFlowMode(page, "Through Civic-Chain");
    await expect(animation.locator(".press-zlabel .cl-cc")).toBeVisible();

    await animation.locator(".drawer").first().click();
    await expect(animation.locator(".sheet-overlay")).toBeVisible();
    await expect(animation.locator("#sheet-title")).toHaveText("Audit report");
  });

  test("main landing record flow remains usable with reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await gotoAndWaitFor(page, "/", section(page, "record-flow"));

    const animation = recordFlowAnimation(page);

    await selectRecordFlowMode(page, "Through Civic-Chain");
    await expect(animation.locator(".press-zlabel .cl-cc")).toBeVisible();

    await animation.locator(".drawer").nth(1).click();
    await expect(animation.locator("#sheet-title")).toHaveText("Financial report");
  });

  test("/landing-v2 redirects to the promoted main landing", async ({ page }) => {
    await gotoAndWaitFor(page, "/landing-v2", section(page, "record-flow"));
    await expectPathname(page, "/");
  });

});
