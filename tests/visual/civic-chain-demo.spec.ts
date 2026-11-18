import { expect, test, type Page } from "@playwright/test";

import { standaloneDemoRoutes } from "./route-contracts";

// Nav label and the page title it opens. They are the same words on purpose:
// a visitor who clicks "Payments" should land on a page called that. The
// one exception is Public Budget, whose title is a headline and whose eyebrow
// carries the nav label.
const demoPages = [
  { nav: "Overview", heading: "Overview", bodyText: "Anomaly Feed" },
  { nav: "Board View", heading: "Board View", bodyText: "What to watch" },
  { nav: "Budget Analytics", heading: "Budget Analytics", bodyText: "Year-End Projection" },
  { nav: "Department Analysis", heading: "Department Analysis", bodyText: "Spend Risk Heatmap" },
  { nav: "Vendor Intelligence", heading: "Vendor Intelligence", bodyText: "Top Vendors by Spend" },
  { nav: "Anomaly Center", heading: "Anomaly Center", bodyText: "Triage Queue" },
  { nav: "Payments", heading: "Payments", bodyText: "Payment records" },
  { nav: "Query Terminal", heading: "Query Terminal", bodyText: "Natural Language Query" },
  { nav: "Record Integrity", heading: "Record Integrity", bodyText: "How a record is checked" },
  { nav: "Auditor Workspace", heading: "Auditor Workspace", bodyText: "Pull an audit sample" },
  { nav: "Contracts", heading: "Contracts", bodyText: "Needs Attention" },
  { nav: "Administration", heading: "Administration", bodyText: "Authorized Signers" },
  { nav: "Public Budget", heading: "Where our money goes", bodyText: "Search every payment" },
  { nav: "Select Board Packet", heading: "Select Board Packet", bodyText: "Executive summary" },
] as const;

function collectConsoleErrors(page: Page) {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  return errors;
}

async function expectNoDocumentOverflow(page: Page) {
  const hasDocumentOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth + 1,
  );
  expect(hasDocumentOverflow).toBe(false);
}

// Past the intro story and the role picker, without the guided walkthrough.
async function enterDemo(page: Page, route: string, role: string) {
  await page.goto(route, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Skip", exact: true }).click();
  await page.getByRole("button", { name: new RegExp(role) }).click();
  await page.getByRole("button", { name: "Skip, let me explore" }).click();
}

function navButton(page: Page, label: string) {
  return page.locator("aside").getByRole("button", { name: new RegExp(label) });
}

async function openPayment(page: Page, txId: string) {
  await navButton(page, "Payments").click();
  await page.getByLabel("Search ledger").fill(txId);
  await page.getByText(txId, { exact: true }).click();
  return page.getByRole("dialog");
}

test.describe("standalone Civic-Chain demo console", () => {
  // The console is a desktop tool; that is the width it is checked at.
  test.use({ viewport: { width: 1440, height: 900 } });

  for (const route of standaloneDemoRoutes) {
    test(`${route} every nav item opens a page with the same name`, async ({ page }) => {
      const consoleErrors = collectConsoleErrors(page);
      await enterDemo(page, route, "Finance Director");

      for (const demoPage of demoPages) {
        await navButton(page, demoPage.nav).click();
        await expect(page.getByRole("heading", { name: new RegExp(`^${demoPage.heading}`) }).first()).toBeVisible();
        await expect(page.locator("main")).toContainText(demoPage.bodyText);
        await expectNoDocumentOverflow(page);
      }

      expect(consoleErrors).toEqual([]);
    });

    test(`${route} three departments are over budget on every screen that counts them`, async ({ page }) => {
      await enterDemo(page, route, "Finance Director");

      await expect(page.locator("main")).toContainText("3 at risk");

      await navButton(page, "Department Analysis").click();
      await expect(page.locator("main")).toContainText(/Projected Over Budget\s*3/i);

      await navButton(page, "Select Board Packet").click();
      await expect(page.locator("main")).toContainText("3 departments are projected over");
      await expect(page.locator("main")).toContainText("3 at risk of overspending");
      const publicWorks = page.locator("tr").filter({ hasText: "Public Works" }).filter({ hasText: "General Fund" });
      await expect(publicWorks.first()).toContainText("At risk");
    });

    test(`${route} the public checkbook adds up to what the town has spent`, async ({ page }) => {
      await enterDemo(page, route, "Finance Director");
      await navButton(page, "Public Budget").click();

      const main = page.locator("main");
      await expect(main).toContainText("we have spent $8,549,000");
      await expect(main).toContainText("Total $8,549,000");
    });

    test(`${route} payment dialog shows which action is open and confirms a resolved flag`, async ({ page }) => {
      const consoleErrors = collectConsoleErrors(page);
      await enterDemo(page, route, "Finance Director");
      const dialog = await openPayment(page, "TX-480102");

      await expect(dialog).toContainText("Why this was flagged");

      const recode = dialog.getByRole("button", { name: "Recode" });
      const attach = dialog.getByRole("button", { name: "Attach invoice" });
      const resolve = dialog.getByRole("button", { name: "Resolve flag" });

      await attach.click();
      await expect(attach).toHaveAttribute("aria-expanded", "true");
      await expect(recode).toHaveAttribute("aria-expanded", "false");
      await expect(dialog.getByLabel("Invoice reference")).toBeVisible();

      await resolve.click();
      await expect(resolve).toHaveAttribute("aria-expanded", "true");
      await expect(attach).toHaveAttribute("aria-expanded", "false");
      await dialog.getByLabel("Resolution reason").fill("Staff working lunch, approved");
      await dialog.getByRole("button", { name: "Confirm resolve" }).click();

      await expect(dialog.getByRole("status")).toContainText("Flag resolved");
      await expect(dialog).toContainText("Flag resolved");
      await expect(dialog).toContainText("Resolved the flag: Staff working lunch, approved");
      await expect(resolve).toHaveCount(0);

      expect(consoleErrors).toEqual([]);
    });

    test(`${route} the Finance walkthrough runs from the flag to the payments behind it`, async ({ page }) => {
      const consoleErrors = collectConsoleErrors(page);
      await page.goto(route, { waitUntil: "networkidle" });
      await page.getByRole("button", { name: "Skip", exact: true }).click();
      await page.getByRole("button", { name: /Finance Director/ }).click();
      await page.getByRole("button", { name: "Start the walkthrough", exact: true }).click();

      // The highlighted control is whatever the current step points at.
      const spot = page.locator(".ring-gold-800");
      await expect(page.getByText("Step 1 of 5").first()).toBeVisible();
      await navButton(page, "Anomaly Center").click();
      await expect(page.getByText("Step 2 of 5").first()).toBeVisible();
      await spot.getByRole("button").first().click();
      await expect(page.getByText("Step 3 of 5").first()).toBeVisible();

      // The chart promised a count; the ledger has to return that many rows.
      const promised = Number((await page.getByText(/exactly as promised/).first().innerText()).match(/\d+/)?.[0]);
      await expect(page.locator("main tbody tr")).toHaveCount(promised);

      // Then back to the queue, where a flag gets its decision.
      await page.getByRole("button", { name: "Next", exact: true }).click();
      await expect(page.getByText("Step 4 of 5").first()).toBeVisible();
      await navButton(page, "Anomaly Center").click();
      await expect(page.getByText("Step 5 of 5").first()).toBeVisible();

      await page.getByRole("button", { name: "Finish", exact: true }).click();
      await expect(page.getByRole("dialog")).toContainText("You followed a flag to the payments underneath it");
      expect(consoleErrors).toEqual([]);
    });

    // On a phone most walkthrough targets sit below the fold. The step has to
    // bring its target on screen, or it points at something nobody can see.
    test(`${route} a walkthrough step scrolls its target into view on a phone`, async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.goto(route, { waitUntil: "networkidle" });
      await page.getByRole("button", { name: "Skip", exact: true }).click();
      await page.getByRole("button", { name: /Select Board member/ }).click();
      await page.getByRole("button", { name: "Start the walkthrough", exact: true }).click();
      await page.getByRole("button", { name: "Next", exact: true }).click();

      await expect(page.getByText("Step 2 of 3").first()).toBeVisible();
      await expect(page.locator("main .ring-gold-800")).toBeInViewport();
      await expectNoDocumentOverflow(page);
    });

    test(`${route} a resident gets the plain payment view with the proof behind a button`, async ({ page }) => {
      await enterDemo(page, route, "Resident");
      const dialog = await openPayment(page, "TX-480102");

      await expect(dialog).toContainText("Payment details");
      await expect(dialog).toContainText("Paid to");
      await expect(dialog).not.toContainText("MCC");
      await expect(dialog.getByRole("button", { name: "Recode" })).toHaveCount(0);
      await expect(dialog).not.toContainText("Record hash");

      await dialog.getByRole("button", { name: "Show the proof values" }).click();
      await expect(dialog).toContainText("Record hash");
    });
  }
});
