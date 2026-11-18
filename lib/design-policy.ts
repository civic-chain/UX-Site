import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function toPosixPath(value: string) {
  return value.replaceAll(path.sep, "/");
}

function normalizePolicyPath(filePath: string) {
  const absolutePath = path.isAbsolute(filePath)
    ? filePath
    : path.resolve(repoRoot, filePath);

  return toPosixPath(path.relative(repoRoot, absolutePath));
}

export const designPolicy = {
  repoRoot,
  scanRoots: ["app", "components", "lib", "tests"] as const,
  sourceFileGlobs: [
    "app/**/*.{ts,tsx,js,jsx}",
    "components/**/*.{ts,tsx,js,jsx}",
    "lib/**/*.{ts,tsx,js,jsx}",
    "tests/**/*.{ts,tsx,js,jsx}",
  ] as const,
  rawControlTags: ["button", "input", "select", "textarea", "dialog"] as const,
  uiPrimitiveDir: "components/ui/" as const,
  interactivePrimitiveDirs: [
    "components/ui/",
    "components/motion/",
  ] as const,
  tokenSourceFiles: [
    "app/styles/tokens.css",
  ] as const,
  cssDeclarationIgnoreFiles: [
    "app/globals.css",
    "app/styles/tokens.css",
  ] as const,
  cssTokenSelectorAllowlist: {
    "app/styles/tokens.css": [":root"],
    "app/styles/patterns.css": [
      // Control color contract: each tone selector sets only the --ctl-*
      // contextual defaults that controls (Button + Tabs) read. Not a semantic
      // alias of a ramp — the surface publishes which ramp step is active.
      ".ctl-tone-cream",
      ".ctl-tone-sky",
      ".ctl-tone-gold",
      ".ctl-tone-sage",
      ".ctl-tone-slate",
      ".ctl-tone-ink",
      ".surface-card.ctl-tone-slate",
      ".surface-card.ctl-tone-ink",
    ],
    "app/styles/primitives.css": [
      ".material-symbols-rounded",
      ".icon-sz-xs",
      ".icon-sz-sm",
      ".icon-sz-md",
      ".icon-sz-lg",
      ".icon-sz-xl",
      ".icon-weight-light",
      ".icon-weight-bold",
    ],
    "app/(site)/_sections/record-flow-section.module.css": [
      ".scene",
      ".scene[data-mode=\"old\"]",
      ".bit:nth-child(4n + 1)",
      ".bit:nth-child(4n + 2)",
      ".bit:nth-child(4n + 3)",
      ".bit:nth-child(4n + 4)",
    ],
  } as const,
  inlineStyleAllowlist: [
    "components/ui/progress.tsx",
  ] as const,
  visualValueIgnoreFiles: [
    "app/globals.css",
    "app/styles/tokens.css",
    "lib/design-policy.ts",
  ] as const,
  visualValueIgnorePathPrefixes: [
    "app/(site)/",
    "app/civic-chain-demo/",
    "components/site/",
  ] as const,
  disallowedIconImports: [
    "lucide-react",
    "@hugeicons/react",
    "@hugeicons/core-free-icons",
  ] as const,
  motionRuntimeImportPrefixes: [
    "gsap",
    "gsap/",
    "@gsap/react",
  ] as const,
  blockedRuntimeImportRoots: [
    "_docs",
    "_workspace",
  ] as const,
  dynamicTailwindClassPrefixes: [
    "bg",
    "text",
    "border",
    "fill",
    "stroke",
    "gap",
    "rounded",
    "type",
    "p",
    "px",
    "py",
    "pt",
    "pr",
    "pb",
    "pl",
    "m",
    "mx",
    "my",
    "mt",
    "mr",
    "mb",
    "ml",
  ] as const,
  allowedArbitraryTokens: {
    radius: [],
    shadow: [
      "shadow-[0_20px_40px_-10px_var(--border)]",
    ],
    tracking: [],
    leading: [],
    spacing: [
      "max-h-[--radix-select-content-available-height]",
      "h-[var(--radix-select-trigger-height)]",
      "h-[400px]",
      "h-[450px]",
      "h-[500px]",
      "max-w-[45rem]",
      "max-w-[var(--page-max)]",
      "max-w-[56ch]",
      "max-w-[72ch]",
      "min-h-[80vh]",
      "min-w-[var(--radix-select-trigger-width)]",
    ],
    textSize: [],
  },
  legacyColorTokenNames: [
    "--card",
    "--card-foreground",
    "--surface",
    "--surface-foreground",
    "--popover",
    "--popover-foreground",
    "--accent",
    "--accent-foreground",
    "--secondary",
    "--secondary-foreground",
    "--muted",
    "--muted-foreground",
    "--tone-cream",
    "--tone-cream-foreground",
    "--tone-dusty",
    "--tone-dusty-foreground",
    "--tone-gold",
    "--tone-gold-foreground",
    "--tone-sage",
    "--tone-sage-foreground",
    "--tone-slate",
    "--tone-slate-foreground",
    "--paper-cream",
    "--paper-gold",
    "--paper-dusty",
    "--paper-sage",
    "--paper-slate",
    "--paper-neutral",
    "--paper-bg-bright",
    "--paper-cream-warmed",
    "--paper-gold-soft",
    "--paper-sage-bleached",
    "--stripe-accent",
    "--stripe-sage",
    "--edge-gold-strong",
    "--edge-gold-medium",
    "--edge-gold-soft",
    "--edge-gold-faint",
    "--edge-gold-whisper",
    "--edge-gold-tile",
    "--edge-accent-strong",
    "--edge-accent-medium",
    "--edge-accent-soft",
    "--edge-accent-bright",
    "--edge-sage-strong",
    "--edge-sage-medium",
    "--edge-sage-soft",
    "--edge-sage-whisper",
    "--edge-dusty-whisper",
    "--edge-slate",
    "--deep-gold-strong",
    "--deep-gold-medium",
    "--deep-gold-soft",
    "--deep-sage-strong",
    "--deep-sage-soft",
    "--accent-surface",
    "--accent-chip",
    "--scrim",
    "--current-soft",
    "--secondary-pressed",
    "--control-surface",
    "--control-surface-strong",
    "--control-panel",
    "--control-panel-strong",
    "--control-border",
    "--control-border-strong",
    "--control-table-row",
    "--danger",
    "--danger-bg",
    "--danger-border",
  ] as const,
  retiredTypeUtilityNames: [
    "type-1",
    "type-2",
    "type-3",
    "type-4",
    "type-5",
    "type-6",
    "type-7",
    "type-8",
    "type-9",
    "type-10",
    "type-display",
    "type-heading",
    "type-metric",
    "type-heading-sm",
    "type-title",
    "type-title-sm",
    "type-body-lg",
    "type-body",
    "type-body-sm",
    "type-label",
    "type-label-compact",
    "type-caption",
    "type-code",
  ] as const,
  retiredFontFamilyUtilityNames: [
    "font-display",
    "font-sans",
    "font-serif",
    "font-mono",
  ] as const,
  retiredStyleUtilityNames: [
    "radius-button",
    "radius-control",
    "radius-panel",
    "radius-lg",
    "radius-md",
    "radius-sm",
    "radius-xs",
    "stack-section-heading",
    "stack-heading-copy",
    "stack-card-roomy",
    "stack-card-tight",
    "stack-card",
    "gap-inline-loose",
    "gap-inline-tight",
    "gap-inline",
    "gap-support",
    "bento-gap",
    "pad-card-vignette",
    "pad-card-roomy",
    "pad-card",
    "pad-pill-sm",
    "pad-pill",
    "hover-shadow-button",
    "hover-shadow-lift",
    "shadow-ambient",
    "shadow-lift",
    "shadow-button",
    "shadow-button-hover",
    "shadow-inner-highlight",
    "shadow-panel",
    "shadow-subtle",
  ] as const,
  retiredCssTokenNames: [
    "--space-2xs",
    "--space-xs",
    "--space-sm",
    "--space-md",
    "--space-lg",
    "--space-xl",
    "--space-3xl",
    "--space-4xl",
    "--card-pad",
    "--card-pad-roomy",
    "--card-pad-vignette",
    "--stack-section-heading",
    "--stack-heading-copy",
    "--stack-card-roomy",
    "--stack-card-tight",
    "--stack-card",
    "--gap-inline-loose",
    "--gap-inline-tight",
    "--gap-inline",
    "--gap-support",
    "--bento-gap",
    "--shadow-ambient",
    "--shadow-lift",
    "--shadow-button",
    "--shadow-button-hover",
    "--shadow-inner-highlight",
    "--shadow-panel",
    "--shadow-subtle",
  ] as const,
  utilityPatternSources: {
    horizontalOneSidedPadding:
      "(?<![\\w-])!?(?:(?:[^\\s\"'`]+):)*p[lr]-(?:px|\\d+(?:\\.\\d+)?|\\[[^\\]\\n]+\\]|\\([^\\)\\n]+\\)|[a-z][\\w-]*)(?![\\w-])",
    arbitraryBorderWidth:
      "(?<![\\w-])!?(?:(?:[^\\s\"'`]+):)*border(?:-[trblxy])?-(?:\\[[^\\]\\n]+\\]|\\([^\\)\\n]+\\))(?![\\w-])",
  } as const,
} as const;

export function toRepoPath(filePath: string) {
  return normalizePolicyPath(filePath);
}

export function isInteractivePrimitiveFile(filePath: string) {
  const normalizedPath = toRepoPath(filePath);
  return designPolicy.interactivePrimitiveDirs.some((dir) =>
    normalizedPath.startsWith(dir),
  );
}

export function isTokenSourceFile(filePath: string) {
  const normalizedPath = toRepoPath(filePath);

  return designPolicy.tokenSourceFiles.includes(
    normalizedPath as (typeof designPolicy.tokenSourceFiles)[number],
  );
}

export function isCssDeclarationCheckFile(filePath: string) {
  const normalizedPath = toRepoPath(filePath);

  if (path.extname(normalizedPath) !== ".css") {
    return false;
  }

  if (
    designPolicy.cssDeclarationIgnoreFiles.includes(
      normalizedPath as (typeof designPolicy.cssDeclarationIgnoreFiles)[number],
    )
  ) {
    return false;
  }

  if (
    designPolicy.visualValueIgnorePathPrefixes.some((prefix) =>
      normalizedPath.startsWith(prefix),
    )
  ) {
    return false;
  }

  return designPolicy.scanRoots.some(
    (root) => normalizedPath === root || normalizedPath.startsWith(`${root}/`),
  );
}

export function getAllowedCssTokenSelectors(filePath: string) {
  const normalizedPath = toRepoPath(filePath);

  return designPolicy.cssTokenSelectorAllowlist[
    normalizedPath as keyof typeof designPolicy.cssTokenSelectorAllowlist
  ] ?? [];
}

export function isInlineStyleAllowedFile(filePath: string) {
  const normalizedPath = toRepoPath(filePath);
  if (normalizedPath.startsWith("components/motion/")) {
    // GSAP adapters may bind runtime transforms through the style prop;
    // visual values still come from design tokens at the call site.
    return true;
  }
  return designPolicy.inlineStyleAllowlist.includes(
    normalizedPath as (typeof designPolicy.inlineStyleAllowlist)[number],
  );
}

export function isMotionRuntimeImport(importSource: string) {
  return designPolicy.motionRuntimeImportPrefixes.some((prefix) =>
    prefix.endsWith("/")
      ? importSource.startsWith(prefix)
      : importSource === prefix,
  );
}

export function isMotionRuntimeOwnerFile(filePath: string) {
  return toRepoPath(filePath).startsWith("components/motion/");
}

export function getBlockedRuntimeImportRoot(importSource: string) {
  const normalizedSource = importSource.replace(/^@\//, "");
  const parts = normalizedSource.split("/");

  return designPolicy.blockedRuntimeImportRoots.find((root) =>
    parts.includes(root),
  ) ?? null;
}

export function shouldCheckVisualValues(filePath: string) {
  const normalizedPath = toRepoPath(filePath);
  if (normalizedPath.startsWith("tests/")) {
    return false;
  }

  if (
    designPolicy.visualValueIgnorePathPrefixes.some((prefix) =>
      normalizedPath.startsWith(prefix),
    )
  ) {
    return false;
  }

  return !designPolicy.visualValueIgnoreFiles.includes(
    normalizedPath as (typeof designPolicy.visualValueIgnoreFiles)[number],
  );
}
