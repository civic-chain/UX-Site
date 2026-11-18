import { expect, test, type Locator } from "@playwright/test";

import {
  assertMinTouchTarget,
  contrastRatio,
  getEffectiveBackgroundRgba,
  getColorRgba,
  gotoAndWaitFor,
} from "./helpers";

type Rgba = Awaited<ReturnType<typeof getColorRgba>>;

const representativeTonalVariants = ["outline", "ghost", "underline"] as const;

async function readControlColors(locator: Locator) {
  const [color, backgroundColor, borderTopColor, borderBottomColor] = await Promise.all([
    getColorRgba(locator, "color"),
    getColorRgba(locator, "background-color"),
    getColorRgba(locator, "border-top-color"),
    getColorRgba(locator, "border-bottom-color"),
  ]);

  return { color, backgroundColor, borderTopColor, borderBottomColor };
}

function rgbDistance(a: Rgba, b: Rgba) {
  return Math.hypot(a.r - b.r, a.g - b.g, a.b - b.b);
}

function expectRgbNear(actual: Rgba, expected: Rgba, label: string, tolerance = 6) {
  expect(rgbDistance(actual, expected), label).toBeLessThanOrEqual(tolerance);
}

function expectColorNear(actual: Rgba, expected: Rgba, label: string) {
  expectRgbNear(actual, expected, label);
  expect(Math.abs(actual.a - expected.a), `${label} alpha`).toBeLessThanOrEqual(0.02);
}

function expectColorDifferent(actual: Rgba, expected: Rgba, label: string) {
  expect(rgbDistance(actual, expected), label).toBeGreaterThan(8);
}

async function expectReadableSolidControl(locator: Locator, label: string) {
  await expect
    .poll(
      async () => {
        const colors = await readControlColors(locator);
        if (colors.backgroundColor.a < 0.98) return 0;
        return contrastRatio(colors.color, colors.backgroundColor);
      },
      { message: `${label} contrast` },
    )
    .toBeGreaterThanOrEqual(4.5);
}

async function expectReadableControlLabel(locator: Locator, label: string) {
  await expect
    .poll(
      async () => {
        const [color, background] = await Promise.all([
          getColorRgba(locator, "color"),
          getEffectiveBackgroundRgba(locator),
        ]);
        if (color.a < 0.35) return 0;
        return contrastRatio(color, background);
      },
      { message: `${label} label contrast` },
    )
    .toBeGreaterThanOrEqual(4.5);
}

async function expectBackgroundContrast(
  foreground: Locator,
  background: Locator,
  label: string,
) {
  await expect
    .poll(
      async () => {
        const [foregroundColor, backgroundColor] = await Promise.all([
          getColorRgba(foreground, "background-color"),
          getColorRgba(background, "background-color"),
        ]);
        if (foregroundColor.a < 0.98 || backgroundColor.a < 0.98) return 0;
        return contrastRatio(foregroundColor, backgroundColor);
      },
      { message: `${label} background contrast` },
    )
    .toBeGreaterThanOrEqual(3);
}

test.describe("brand route interaction contracts", () => {
  test("/brand/components Tabs sandbox supports click and keyboard selection", async ({ page }) => {
    await gotoAndWaitFor(page, "/brand/components", page.locator("main").first());

    const tablist = page.getByRole("tablist", { name: "Tabs preview" });
    const record = tablist.getByRole("tab", { name: "Record" });
    const proof = tablist.getByRole("tab", { name: "Proof" });
    const spend = tablist.getByRole("tab", { name: "Spend" });

    await expect(record).toHaveAttribute("aria-selected", "true");
    await record.scrollIntoViewIfNeeded();

    // First interaction gates on client hydration: retry the click until it sticks.
    await expect(async () => {
      await proof.click();
      await expect(proof).toHaveAttribute("aria-selected", "true");
    }).toPass({ timeout: 10_000 });
    await record.click();
    await expect(record).toHaveAttribute("aria-selected", "true");

    await record.focus();
    await page.keyboard.press("ArrowRight");
    await expect(proof).toHaveAttribute("aria-selected", "true");
    await page.keyboard.press("End");
    await expect(spend).toHaveAttribute("aria-selected", "true");
    await page.keyboard.press("Home");
    await expect(record).toHaveAttribute("aria-selected", "true");
  });

  test("/brand/surface SurfaceCard semantic text follows the selected tone", async ({ page }) => {
    await gotoAndWaitFor(page, "/brand/surface", page.locator("main").first());

    const surface = page.locator("section#surface-card");
    const heading = surface.getByRole("heading", { name: "Approved, spent, proven." });
    const inheritedBadge = surface.getByTestId("surface-card-playground-badge-inherit");
    const overrideBadge = surface.getByTestId("surface-card-playground-badge-override");
    const inheritedIcon = surface.getByTestId("surface-card-playground-icon");
    const inheritedIconChip = surface.getByTestId("surface-card-playground-iconchip");
    const inheritedTab = surface.getByRole("tab", { name: "Record" });

    await expect(async () => {
      await surface.getByRole("button", { name: "ink", exact: true }).click();
      await expect(surface.locator("pre")).toContainText('tone="ink"');
    }).toPass({ timeout: 10_000 });
    const inkHeadingColor = await getColorRgba(heading, "color");
    expectColorNear(await getColorRgba(inheritedBadge, "color"), inkHeadingColor, "inherited Badge follows ink text");
    expectColorNear(await getColorRgba(inheritedIcon, "color"), inkHeadingColor, "inherited Icon follows ink text");
    expectColorNear(
      await getColorRgba(inheritedIconChip, "color"),
      inkHeadingColor,
      "inherited IconChip follows ink text",
    );
    const inkTabColor = await getColorRgba(inheritedTab, "color");
    expect(inkTabColor.a, "ink Tab keeps a visible label color").toBeGreaterThan(0.35);
    expectColorDifferent(
      await getColorRgba(overrideBadge, "color"),
      inkHeadingColor,
      "override Badge keeps its own tone",
    );

    await surface.getByRole("button", { name: "gold", exact: true }).click();
    await expect(surface.locator("pre")).toContainText('tone="gold"');
    const goldHeadingColor = await getColorRgba(heading, "color");
    expectColorDifferent(goldHeadingColor, inkHeadingColor, "SurfaceCard text changes with tone");
    expectColorNear(await getColorRgba(inheritedBadge, "color"), goldHeadingColor, "inherited Badge follows gold text");
    const goldTabColor = await getColorRgba(inheritedTab, "color");
    expectColorDifferent(goldTabColor, inkTabColor, "Tab text changes with SurfaceCard tone");
    expect(goldTabColor.a, "gold Tab keeps a visible label color").toBeGreaterThan(0.35);
  });

  test("/brand/components Button tonal variants stay selectable and readable", async ({ page }) => {
    await gotoAndWaitFor(page, "/brand/components", page.locator("main").first());

    const actions = page.locator("section#components-actions");
    const variantRow = actions.locator('[aria-label="variant"]');
    const toneRow = actions.locator('[aria-label="tone"]');
    const previewButton = actions.getByRole("button", { name: "Button" }).last();

    await expectReadableSolidControl(previewButton, "root default filled Button");

    await expect(async () => {
      await toneRow.getByRole("button", { name: "gold", exact: true }).click();
      await expect(actions.locator("pre")).toContainText('tone="gold"');
    }).toPass({ timeout: 10_000 });

    for (const variant of representativeTonalVariants) {
      await page.mouse.move(8, 8);
      await expect(async () => {
        await variantRow.getByRole("button", { name: variant, exact: true }).click();
        await expect(actions.locator("pre")).toContainText(`variant="${variant}"`);
      }).toPass({ timeout: 10_000 });
      await expect(previewButton).toBeVisible();
      await expectReadableControlLabel(previewButton, `${variant} rest`);

      await previewButton.hover();
      await expectReadableControlLabel(previewButton, `${variant} hover`);
    }
  });

  test("/brand/rules dark SurfaceCard keeps inherited chips and filled Button visible", async ({ page }) => {
    await gotoAndWaitFor(page, "/brand/rules", page.locator("main").first());

    const surfaceContract = page.locator("section#rules-surface-contract");
    const inkCard = surfaceContract.locator(".surface-card", {
      has: page.getByRole("heading", { name: "Ink" }),
    });
    const action = inkCard.getByRole("button", { name: "Action" });
    const status = inkCard.getByText("Status");

    await expectReadableSolidControl(action, "ink SurfaceCard inherited filled Button");
    await expectBackgroundContrast(action, inkCard, "ink SurfaceCard inherited filled Button");
    await expectBackgroundContrast(status, inkCard, "ink SurfaceCard status Badge");
  });

  test("/brand/components Tabs playground passes 2xl through to Button triggers", async ({ page }) => {
    await gotoAndWaitFor(page, "/brand/components", page.locator("main").first());

    const tabsSection = page.locator("section#components-tabs");
    await expect(async () => {
      await tabsSection.getByRole("button", { name: "2xl" }).click();
      await expect(tabsSection.locator("pre")).toContainText('size="2xl"');
    }).toPass({ timeout: 10_000 });

    const recordTab = tabsSection.getByRole("tab", { name: "Record" });
    const box = await recordTab.boundingBox();
    expect(box).toBeTruthy();
    expect(box!.height).toBeGreaterThanOrEqual(60);
  });
});

test.describe("brand route mobile safety", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("/brand/components keeps brand nav touch-safe", async ({ page }) => {
    await gotoAndWaitFor(page, "/brand/components", page.locator("main").first());

    const navLinks = page.locator('nav[aria-label="Brand section"] a');
    const navCount = await navLinks.count();
    for (let index = 0; index < navCount; index += 1) {
      await assertMinTouchTarget(navLinks.nth(index), 40);
    }
  });
});
