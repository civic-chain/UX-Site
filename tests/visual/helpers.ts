import { expect, type Locator, type Page } from "@playwright/test";

type Box = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type LandingLinkContract = {
  sectionId: string;
  href: string;
};

export const landingPublicSectionIds = [
  "hero",
  "problem",
  "numbers",
  "record-flow",
  "portal-hub",
  "how-it-works",
  "cta",
  "faq",
] as const;

export const landingSectionLinkContracts = [
  { sectionId: "hero", href: "mailto:info@civic-chain.com" },
  { sectionId: "cta", href: "mailto:info@civic-chain.com" },
] as const satisfies readonly LandingLinkContract[];

/** Get a computed CSS property value for a locator */
async function getStyle(locator: Locator, property: string): Promise<string> {
  return locator.evaluate(
    (el, prop) => window.getComputedStyle(el).getPropertyValue(prop),
    property,
  );
}

/** Get computed style as a number (parses px values) */
export async function getStylePx(locator: Locator, property: string): Promise<number> {
  const raw = await getStyle(locator, property);
  return parseFloat(raw);
}

/** Get bounding box dimensions */
export async function getBox(locator: Locator) {
  const box = await locator.boundingBox();
  if (!box) throw new Error("Element not visible");
  return box;
}

/** Whether two boxes overlap with optional tolerance */
export function boxesOverlap(a: Box, b: Box, tolerance = 0): boolean {
  return !(
    a.x + a.width <= b.x + tolerance ||
    b.x + b.width <= a.x + tolerance ||
    a.y + a.height <= b.y + tolerance ||
    b.y + b.height <= a.y + tolerance
  );
}

/** Assert minimum touch target size (height) */
export async function assertMinTouchTarget(locator: Locator, minPx: number) {
  const box = await getBox(locator);
  if (box.height < minPx) {
    throw new Error(
      `Touch target too small: ${box.height.toFixed(1)}px < ${minPx}px minimum`,
    );
  }
}

/** Shorthand for section locator */
export function section(page: Page, id: string) {
  return page.locator(`section#${id}`);
}

/** Navigate and wait for a user-visible ready signal instead of networkidle */
export async function gotoAndWaitFor(page: Page, path: string, ready: Locator) {
  await page.goto(path, { waitUntil: "domcontentloaded" });
  await expect(ready).toBeVisible();
}

/** Open the landing route and wait for the hero section to paint */
export async function gotoLanding(page: Page) {
  await gotoAndWaitFor(page, "/", section(page, "hero"));
}

/** Poll until the current pathname matches the expected route */
export async function expectPathname(page: Page, expectedPath: string) {
  await expect
    .poll(() => new URL(page.url()).pathname, {
      message: `Expected pathname to become ${expectedPath}`,
    })
    .toBe(expectedPath);
}

/** Poll until the current hash matches the expected route fragment */
export async function expectHash(page: Page, expectedHash: string) {
  await expect
    .poll(() => new URL(page.url()).hash, {
      message: `Expected hash to become ${expectedHash}`,
    })
    .toBe(expectedHash);
}

/** Click a routed link and wait for the expected pathname to resolve */
export async function clickAndExpectPath(page: Page, locator: Locator, expectedPath: string) {
  await locator.scrollIntoViewIfNeeded();
  await expect(locator).toBeVisible();
  await expect(locator).toHaveAttribute("href", expectedPath);

  await Promise.all([
    page.waitForURL((url) => url.pathname === expectedPath),
    locator.click(),
  ]);
}

/** Return visible text nodes clipped by overflow or explicit truncation */
export async function findClippedText(page: Page): Promise<string[]> {
  return page.evaluate(() => {
    const nodes = Array.from(
      document.querySelectorAll("main h1, main h2, main h3, main p, main a, main button, main blockquote"),
    );

    return nodes
      .filter((el) => {
        const rect = el.getBoundingClientRect();
        if (!rect.width || !rect.height) return false;

        const style = window.getComputedStyle(el);
        const hidesOverflow = [style.overflow, style.overflowX, style.overflowY].some((value) =>
          ["hidden", "clip", "scroll", "auto"].includes(value),
        );
        const clippedX = el.scrollWidth > el.clientWidth + 1;
        const clippedY = el.scrollHeight > el.clientHeight + 1;
        const isTruncated = style.textOverflow === "ellipsis" || style.whiteSpace.includes("nowrap");

        return (clippedX || clippedY) && (hidesOverflow || isTruncated);
      })
      .slice(0, 20)
      .map((el) => (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 120));
  });
}

/** Return visible elements that escape the viewport horizontally */
export async function findHorizontalViewportOverflow(page: Page): Promise<string[]> {
  return page.evaluate(() => {
    const nodes = Array.from(document.querySelectorAll("main *"));

    return nodes
      .filter((el) => {
        const rect = el.getBoundingClientRect();
        if (!rect.width || !rect.height) return false;
        if (rect.bottom <= 0 || rect.top >= window.innerHeight) return false;
        if (el.closest('[data-allow-viewport-overflow="hero-art"]')) return false;
        return rect.left < -1 || rect.right > window.innerWidth + 1;
      })
      .slice(0, 20)
      .map((el) => {
        const text = (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 80);
        return `${el.tagName.toLowerCase()}: ${text || "(no text)"}`;
      });
  });
}

/** Parse any CSS color to rgba components */
export async function getColorRgba(
  locator: Locator,
  property: string,
): Promise<{ r: number; g: number; b: number; a: number }> {
  const rgba = await locator.evaluate((el, prop) => {
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = window.getComputedStyle(el).getPropertyValue(prop);
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
    return { r, g, b, a: a / 255 };
  }, property);
  return rgba;
}

/** Resolve the blended visible background color up the DOM tree */
export async function getEffectiveBackgroundRgba(
  locator: Locator,
): Promise<{ r: number; g: number; b: number; a: number }> {
  return locator.evaluate((el) => {
    type Rgba = { r: number; g: number; b: number; a: number };

    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext("2d")!;

    const readColor = (value: string): Rgba => {
      ctx.clearRect(0, 0, 1, 1);
      ctx.fillStyle = value;
      ctx.fillRect(0, 0, 1, 1);
      const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
      return { r, g, b, a: a / 255 };
    };

    const blend = (top: Rgba, bottom: Rgba): Rgba => {
      const alpha = top.a + bottom.a * (1 - top.a);
      if (alpha === 0) return { r: 0, g: 0, b: 0, a: 0 };

      return {
        r: (top.r * top.a + bottom.r * bottom.a * (1 - top.a)) / alpha,
        g: (top.g * top.a + bottom.g * bottom.a * (1 - top.a)) / alpha,
        b: (top.b * top.a + bottom.b * bottom.a * (1 - top.a)) / alpha,
        a: alpha,
      };
    };

    const chain: HTMLElement[] = [];
    let current: HTMLElement | null = el instanceof HTMLElement ? el : el.parentElement;
    while (current) {
      chain.push(current);
      current = current.parentElement;
    }

    return chain
      .reverse()
      .map((item) => readColor(window.getComputedStyle(item).backgroundColor))
      .reduce((background, color) => color.a > 0 ? blend(color, background) : background, {
        r: 255,
        g: 255,
        b: 255,
        a: 1,
      });
  });
}

/** Return visible text elements whose foreground/background contrast is below WCAG AA. */
export async function findLowContrastText(page: Page): Promise<string[]> {
  return page.evaluate(() => {
    type Rgba = { r: number; g: number; b: number; a: number };

    const textSelector = [
      "main h1",
      "main h2",
      "main h3",
      "main h4",
      "main h5",
      "main h6",
      "main p",
      "main a",
      "main button",
      "main label",
      "main li",
      "main blockquote",
      "main figcaption",
      "main small",
      "main summary",
      "main [role='button']",
      "main [data-contrast-check]",
    ].join(",");

    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext("2d")!;

    const readColor = (value: string): Rgba => {
      ctx.clearRect(0, 0, 1, 1);
      ctx.fillStyle = "rgba(0, 0, 0, 0)";
      ctx.fillStyle = value;
      ctx.fillRect(0, 0, 1, 1);
      const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
      return { r, g, b, a: a / 255 };
    };

    const blend = (top: Rgba, bottom: Rgba): Rgba => {
      const alpha = top.a + bottom.a * (1 - top.a);
      if (alpha === 0) return { r: 0, g: 0, b: 0, a: 0 };

      return {
        r: (top.r * top.a + bottom.r * bottom.a * (1 - top.a)) / alpha,
        g: (top.g * top.a + bottom.g * bottom.a * (1 - top.a)) / alpha,
        b: (top.b * top.a + bottom.b * bottom.a * (1 - top.a)) / alpha,
        a: alpha,
      };
    };

    const relativeLuminance = ({ r, g, b }: Rgba): number => {
      const [rs, gs, bs] = [r, g, b].map((channel) => {
        const value = channel / 255;
        return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    };

    const ratio = (foreground: Rgba, background: Rgba): number => {
      const fg = relativeLuminance(foreground);
      const bg = relativeLuminance(background);
      const lighter = Math.max(fg, bg);
      const darker = Math.min(fg, bg);
      return (lighter + 0.05) / (darker + 0.05);
    };

    const effectiveBackground = (element: Element): Rgba => {
      const chain: Element[] = [];
      let current: Element | null = element;
      while (current) {
        chain.push(current);
        current = current.parentElement;
      }

      let background: Rgba = { r: 255, g: 255, b: 255, a: 1 };
      for (const item of chain.reverse()) {
        const color = readColor(window.getComputedStyle(item).backgroundColor);
        if (color.a > 0) {
          background = blend(color, background);
        }
      }

      return background;
    };

    const minimumContrast = (style: CSSStyleDeclaration): number => {
      const fontSize = Number.parseFloat(style.fontSize);
      const fontWeight = style.fontWeight === "bold"
        ? 700
        : Number.parseFloat(style.fontWeight) || 400;
      const isLargeText = fontSize >= 24 || (fontSize >= 18.66 && fontWeight >= 700);
      return isLargeText ? 3 : 4.5;
    };

    const labelFor = (element: Element): string => {
      const tag = element.tagName.toLowerCase();
      const id = element.id ? `#${element.id}` : "";
      const testId = element.getAttribute("data-testid");
      const testLabel = testId ? `[data-testid="${testId}"]` : "";
      return `${tag}${id}${testLabel}`;
    };

    return Array.from(document.querySelectorAll(textSelector))
      .filter((element) => {
        if (element.closest("[hidden], [aria-hidden='true']")) return false;
        const text = (element.textContent || "").trim();
        if (!text) return false;

        const rect = element.getBoundingClientRect();
        if (!rect.width || !rect.height) return false;

        const style = window.getComputedStyle(element);
        return style.display !== "none" && !["hidden", "collapse"].includes(style.visibility);
      })
      .map((element) => {
        const style = window.getComputedStyle(element);
        const background = effectiveBackground(element);
        const foreground = readColor(style.color);
        const renderedForeground = foreground.a < 1 ? blend(foreground, background) : foreground;
        const actual = ratio(renderedForeground, background);
        const minimum = minimumContrast(style);
        const text = (element.textContent || "").trim().replace(/\s+/g, " ").slice(0, 96);

        return {
          actual,
          minimum,
          text,
          label: labelFor(element),
          foreground: style.color,
          background: `rgb(${Math.round(background.r)}, ${Math.round(background.g)}, ${Math.round(background.b)})`,
        };
      })
      .filter((item) => item.actual + 0.001 < item.minimum)
      .slice(0, 30)
      .map(
        (item) =>
          `${item.label}: ${item.actual.toFixed(2)} < ${item.minimum.toFixed(1)} for "${item.text}" (${item.foreground} on ${item.background})`,
      );
  });
}

/** Calculate relative luminance per WCAG 2.1 */
function luminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/** Calculate WCAG contrast ratio between two RGB colors */
export function contrastRatio(
  fg: { r: number; g: number; b: number },
  bg: { r: number; g: number; b: number },
): number {
  const l1 = luminance(fg.r, fg.g, fg.b);
  const l2 = luminance(bg.r, bg.g, bg.b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}
