import { expect, test } from "@playwright/test";

import {
  findClippedText,
  findHorizontalViewportOverflow,
  gotoAndWaitFor,
} from "./helpers";
import { liveRoutes } from "./route-contracts";

async function gotoLiveRoute(page: Parameters<typeof gotoAndWaitFor>[0], route: string) {
  await gotoAndWaitFor(page, route, page.locator("main").first());
}

test.describe("live route design-system invariants", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  for (const route of liveRoutes) {
    test(`${route} keeps the mobile viewport readable`, async ({ page }) => {
      await gotoLiveRoute(page, route);

      expect(await findHorizontalViewportOverflow(page), `${route} horizontal overflow`).toEqual([]);
      expect(await findClippedText(page), `${route} clipped text`).toEqual([]);
    });
  }
});
