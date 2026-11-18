import { expect, test } from "@playwright/test";

import { interfaceRouteMeta } from "@/lib/interface-fixtures";

import { expectHash, gotoAndWaitFor } from "./helpers";

test.describe("interface contracts", () => {
  test("citizen route stays publicly readable and keeps the ledger jump link working", async ({
    page,
  }) => {
    await gotoAndWaitFor(
      page,
      "/citizen",
      page.getByRole("heading", { name: interfaceRouteMeta.citizen.title, exact: true }),
    );

    await expect(page.getByRole("heading", { name: /Active Municipal Contracts/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Open Solicitations & Voting/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Cast Your Advisory Vote/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Blockchain Transaction Ledger/i })).toBeVisible();

    const ledgerLink = page.getByRole("link", { name: /View Ledger Anchors/i });
    await expect(ledgerLink).toHaveAttribute("href", "#ledger");
    await ledgerLink.click();
    await expectHash(page, "#ledger");
    await expect(page.locator("#ledger")).toBeInViewport();
  });
});
