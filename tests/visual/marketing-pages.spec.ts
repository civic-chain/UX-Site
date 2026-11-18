import { expect, test } from "@playwright/test";
import { readFile } from "node:fs/promises";

import { gotoAndWaitFor } from "./helpers";
import { marketingRoutes } from "./route-contracts";

const brandLogoDownloadKeys = [
  "civic-chain-wordmark",
  "civic-chain-icon",
  "civic-chain-hero",
] as const;

const brandRasterDownloadVariants = [
  { id: "png-transparent", extension: "png", magic: "89504e47", mimeType: "image/png" },
  { id: "png-cream", extension: "png", magic: "89504e47", mimeType: "image/png" },
  { id: "png-blue", extension: "png", magic: "89504e47", mimeType: "image/png" },
  { id: "jpg-cream", extension: "jpg", magic: "ffd8", mimeType: "image/jpeg" },
  { id: "jpg-blue", extension: "jpg", magic: "ffd8", mimeType: "image/jpeg" },
] as const;

const representativeRasterDownloads = [
  { logo: "civic-chain-wordmark", variant: brandRasterDownloadVariants[0] },
  { logo: "civic-chain-hero", variant: brandRasterDownloadVariants[4] },
] as const;

test.describe("marketing page route contracts", () => {
  for (const route of marketingRoutes) {
    test(`${route.path} renders shared shell and stable sections`, async ({ page }) => {
      await gotoAndWaitFor(page, route.path, page.locator("main").first());

      const header = page.locator("#site-header");
      await expect(header).toBeVisible();
      await expect(page.locator("#site-footer")).toBeVisible();

      for (const sectionId of route.sectionIds) {
        await expect(page.locator(`section#${sectionId}`)).toBeVisible();
      }

      if ("brandNavLabel" in route) {
        const activeBrandNav = page
          .locator('nav[aria-label="Brand section"] a[aria-current="page"]')
          .first();
        await expect(activeBrandNav).toHaveText(route.brandNavLabel);
      }

      const mainNav = header.locator('nav[aria-label="Main"]').filter({ visible: true });
      await expect(mainNav).toHaveCount(1);
      await expect(mainNav.locator('a[href="/about"]')).toBeVisible();
      await expect(mainNav.locator('a[href="/how-it-works"]')).toBeVisible();
      await expect(mainNav.locator('a[href="/civic-chain-demo"]')).toBeVisible();
      await expect(header.locator('a[href="/contact"]')).toHaveCount(0);
      await expect(header.locator('a[href="mailto:info@civic-chain.com"]')).toHaveCount(0);

      const footer = page.locator("#site-footer");
      await expect(footer.locator('a[href="/about"]')).toBeVisible();
      await expect(footer.locator('a[href="/contact"]')).toHaveCount(0);
      await expect(footer.locator('a[href="mailto:info@civic-chain.com"]')).toBeVisible();
      await expect(footer.locator('a[href="/pitch"]')).toHaveCount(0);
    });
  }

  test("/brand raster download controls expose buttons and generate representative files", async ({
    page,
  }) => {
    await gotoAndWaitFor(page, "/brand", page.locator("main").first());
    await expect(page.locator('[data-asset-download-ready="true"]')).toHaveCount(3);

    for (const logo of brandLogoDownloadKeys) {
      for (const variant of brandRasterDownloadVariants) {
        await expect(
          page.locator(`[data-asset-download="${logo}-${variant.id}"]`),
        ).toBeVisible();
      }
    }

    for (const { logo, variant } of representativeRasterDownloads) {
      const downloadPromise = page.waitForEvent("download");
      const metadataPromise = page.evaluate(
        () =>
          new Promise<{ filename: string; mimeType: string; size: number }>(
            (resolve) => {
              window.addEventListener(
                "brand-asset-download-created",
                (event) => {
                  resolve((event as CustomEvent).detail);
                },
                { once: true },
              );
            },
          ),
      );
      await page.locator(`[data-asset-download="${logo}-${variant.id}"]`).click();
      const download = await downloadPromise;
      const metadata = await metadataPromise;
      const path = await download.path();

      expect(download.suggestedFilename()).toMatch(
        new RegExp(`^${logo}-.+\\.${variant.extension}$`),
      );
      expect(metadata.filename).toBe(download.suggestedFilename());
      expect(metadata.mimeType).toBe(variant.mimeType);
      expect(metadata.size).toBeGreaterThan(1000);
      expect(path).toBeTruthy();

      const buffer = await readFile(path!);
      expect(buffer.length).toBeGreaterThan(1000);
      expect(buffer.subarray(0, variant.magic.length / 2).toString("hex")).toBe(
        variant.magic,
      );
    }
  });
});
