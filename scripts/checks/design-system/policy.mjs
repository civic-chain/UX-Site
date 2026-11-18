#!/usr/bin/env node

import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import postcss from "postcss";
import valueParser from "postcss-value-parser";

import {
  designPolicy,
  getAllowedCssTokenSelectors,
  getBlockedRuntimeImportRoot,
  isInteractivePrimitiveFile,
  isCssDeclarationCheckFile,
  isInlineStyleAllowedFile,
  isMotionRuntimeImport,
  isMotionRuntimeOwnerFile,
  isTokenSourceFile,
  shouldCheckVisualValues,
  toRepoPath,
} from "../../../lib/design-policy.ts";
import { typographyTokenNames } from "../../../lib/design-system-typography.ts";

const sourceExtensions = new Set([".css", ".js", ".jsx", ".ts", ".tsx"]);
const moduleDependencyPatterns = [
  /\bimport[\s\S]*?\bfrom\s+["']([^"']+)["']/g,
  /\bimport\s*["']([^"']+)["']/g,
  /\bexport[\s\S]*?\bfrom\s+["']([^"']+)["']/g,
  /\bimport\s*\(\s*["']([^"']+)["']\s*\)/g,
];
const arbitraryTokenPattern = /[A-Za-z0-9_./:-]+-\[[^\]\n]+\]/g;
const arbitraryColorPropertyPattern = /(?<![\w-])\[(?:color|background|background-color|border-color|fill|stroke):[^\]\n]+\]/g;
const rawColorLiteralPattern = /#(?:[0-9a-fA-F]{3,8})\b|rgba?\([^)]*\)|hsla?\([^)]*\)/g;
const rawUnitPattern = /-?\d*\.?\d+(?:rem|px|em|svh|dvh|vw|vh|vmin|vmax)\b/i;
const inlineStylePattern = /\bstyle=\{/g;
const rawTextSizeUtilityPattern = /\btext-(?:xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)\b/g;
const rawTextSizeCorePattern = /^text-(?:xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)$/;
const textUtilityPattern = /(?<![\w-])!?(?:(?:[^\s"'`<>]+):)*text-[A-Za-z0-9/\[\].%-]+/g;
const nonColorTextUtilityPattern = /^text-(?:left|center|right|justify|start|end|balance|pretty|wrap|nowrap|ellipsis|clip)$/;
const allowedTextColorPattern = /^text-(?:(?:current|background|foreground|border|ring)(?:\/(?:\d+|\[[^\]\n]+\]))?|(?:blue-(?:100|200|300|500|700|900)|gold-(?:100|200|300|500|600|800)|green-(?:100|200|300|500|600|900)|cream-(?:50|100|200|300)|slate-(?:100|200|300|400|500|700)|red-(?:100|400|600))(?:\/(?:\d+|\[[^\]\n]+\]))?)$/;
const halfStepSpacingUtilityPattern = /\b(?:p[trblxy]?|m[trblxy]?|gap|space-[xy])-\d+\.5\b/g;
const horizontalPaddingHackPattern = new RegExp(
  designPolicy.utilityPatternSources.horizontalOneSidedPadding,
  "g",
);
const arbitraryBorderWidthUtilityPattern = new RegExp(
  designPolicy.utilityPatternSources.arbitraryBorderWidth,
  "g",
);
const disallowedRadiusUtilityPattern = /(?<![\w-])!?(?:(?:[^\s"'`<>]+):)*(?:rounded(?:-[trblse]{1,2})?-(?:full|[3-9]xl|icon)|radius-(?:full|[3-9]xl|icon)|--radius-(?:full|[3-9]xl|icon))(?![\w-])/g;
const dynamicTailwindTemplatePattern = new RegExp(
  "`[^`\\n]*\\b(?:" +
    designPolicy.dynamicTailwindClassPrefixes.join("|") +
    ")-\\$\\{[^`\\n]+`",
  "g",
);
const cssColorFunctionNames = new Set(["rgb", "rgba", "hsl", "hsla", "oklch"]);
const ignoredCssFunctions = new Set(["var", "color-mix", "linear-gradient", "radial-gradient"]);
const unitlessCssProperties = new Set(["line-height"]);
const rawInteractiveDomPattern = new RegExp(
  `<(${designPolicy.rawControlTags.join("|")})(?=\\s|>)`,
  "g",
);
const tabRolePattern = /role=["'](?:tab|tablist)["']/g;
const tabsOwnerFile = "components/ui/tabs.tsx";
const legacyColorTokenPattern = new RegExp(
  `(?<![\\w-])(?:${[...designPolicy.legacyColorTokenNames]
    .sort((left, right) => right.length - left.length)
    .map((token) => token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|")})(?![\\w-])`,
  "g",
);
const retiredTypeUtilityPattern = new RegExp(
  `(?<![\\w-])(?:${[...designPolicy.retiredTypeUtilityNames]
    .sort((left, right) => right.length - left.length)
    .map((token) => token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|")})(?![\\w-])`,
  "g",
);
const retiredFontFamilyUtilityPattern = new RegExp(
  `(?<![\\w-])(?:${[...designPolicy.retiredFontFamilyUtilityNames]
    .sort((left, right) => right.length - left.length)
    .map((token) => token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|")})(?![\\w-])`,
  "g",
);
const retiredStyleUtilityPattern = new RegExp(
  `(?<![\\w-])(?:${[...designPolicy.retiredStyleUtilityNames]
    .sort((left, right) => right.length - left.length)
    .map((token) => token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|")})(?![\\w-])`,
  "g",
);
const retiredCssTokenPattern = new RegExp(
  `(?<![\\w-])(?:${[...designPolicy.retiredCssTokenNames]
    .sort((left, right) => right.length - left.length)
    .map((token) => token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|")})(?![\\w-])`,
  "g",
);

function getLineNumber(text, index) {
  return text.slice(0, index).split("\n").length;
}

function stripVariantPrefixes(token) {
  const bracketIndex = token.indexOf("[");
  const prefix = bracketIndex === -1 ? token : token.slice(0, bracketIndex);
  const lastVariantIndex = prefix.lastIndexOf(":");
  return lastVariantIndex === -1 ? token : token.slice(lastVariantIndex + 1);
}

function stripClassVariantPrefixes(token) {
  const value = token.startsWith("!") ? token.slice(1) : token;
  let bracketDepth = 0;
  let lastVariantIndex = -1;

  for (let index = 0; index < value.length; index += 1) {
    const char = value[index];
    if (char === "[") bracketDepth += 1;
    if (char === "]") bracketDepth = Math.max(0, bracketDepth - 1);
    if (char === ":" && bracketDepth === 0) lastVariantIndex = index;
  }

  const core = lastVariantIndex === -1 ? value : value.slice(lastVariantIndex + 1);
  return core.startsWith("!") ? core.slice(1) : core;
}

function isAllowedTextColorUtility(coreToken) {
  return (
    nonColorTextUtilityPattern.test(coreToken) ||
    rawTextSizeCorePattern.test(coreToken) ||
    coreToken.startsWith("text-[") ||
    coreToken.startsWith("text-(") ||
    allowedTextColorPattern.test(coreToken)
  );
}

function isSpacingToken(token) {
  return /^(?:gap|p[trblxy]?|m[trblxy]?|size|min-h|min-w|max-h|max-w|h|w|top|right|bottom|left|inset(?:-x|-y)?|translate-x|translate-y)-\[/.test(
    token,
  );
}

function getBracketValue(token) {
  return token.slice(token.indexOf("[") + 1, -1);
}

function reportHard(violations, filePath, line, message) {
  violations.hard.push(`${filePath}:${line} ${message}`);
}

function isDocumentedTypographyMetadata(filePath, text, index) {
  if (toRepoPath(filePath) !== "lib/design-system-typography.ts") {
    return false;
  }

  const lineStart = text.lastIndexOf("\n", index) + 1;
  const lineEnd = text.indexOf("\n", index);
  const line = text.slice(lineStart, lineEnd === -1 ? text.length : lineEnd);
  return /\b(?:sourceSize|lineHeight):\s*["']text-/.test(line);
}

async function collectSourceFiles(dirPath) {
  const entries = await readdir(dirPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolutePath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      files.push(...await collectSourceFiles(absolutePath));
      continue;
    }
    if (sourceExtensions.has(path.extname(entry.name))) {
      files.push(absolutePath);
    }
  }

  return files;
}

async function getFilesToCheck() {
  const files = [];

  for (const root of designPolicy.scanRoots) {
    const absoluteRoot = path.join(designPolicy.repoRoot, root);
    files.push(...await collectSourceFiles(absoluteRoot));
  }

  return files.sort((left, right) => left.localeCompare(right));
}

function checkImports(filePath, text, violations) {
  for (const pattern of moduleDependencyPatterns) {
    pattern.lastIndex = 0;
    for (const match of text.matchAll(pattern)) {
      const source = match[1];
      const line = getLineNumber(text, match.index ?? 0);

      const blockedRuntimeImportRoot = getBlockedRuntimeImportRoot(source);
      if (blockedRuntimeImportRoot && !toRepoPath(filePath).startsWith("tests/")) {
        reportHard(
          violations,
          filePath,
          line,
          `Runtime code must not import ${blockedRuntimeImportRoot}/. Keep docs and workspace material out of app code.`,
        );
        continue;
      }

      if (
        isMotionRuntimeImport(source) &&
        shouldCheckVisualValues(filePath) &&
        !isMotionRuntimeOwnerFile(filePath)
      ) {
        reportHard(
          violations,
          filePath,
          line,
          `Motion runtime import "${source}" is only allowed inside components/motion/.`,
        );
        continue;
      }

      if (
        designPolicy.disallowedIconImports.includes(source) &&
        shouldCheckVisualValues(filePath)
      ) {
        reportHard(violations, filePath, line, `Direct icon-library import "${source}" is blocked. Use the Material Symbols Icon component (components/ui/icon.tsx).`);
        continue;
      }

      if (
        source.startsWith("@radix-ui/") &&
        shouldCheckVisualValues(filePath) &&
        !isInteractivePrimitiveFile(filePath)
      ) {
        reportHard(violations, filePath, line, "Direct Radix imports are only allowed inside shared primitive files.");
        continue;
      }
    }
  }
}

function checkDynamicTailwindClasses(filePath, text, violations) {
  if (path.extname(filePath) === ".css" || !shouldCheckVisualValues(filePath)) {
    return;
  }

  for (const match of text.matchAll(dynamicTailwindTemplatePattern)) {
    reportHard(
      violations,
      filePath,
      getLineNumber(text, match.index ?? 0),
      `Dynamic Tailwind class construction "${match[0]}" is blocked. Map variants to complete static class strings.`,
    );
  }
}

function checkInlineStyles(filePath, text, violations) {
  if (path.extname(filePath) === ".css") {
    return;
  }

  if (!shouldCheckVisualValues(filePath) || isInlineStyleAllowedFile(filePath)) {
    return;
  }

  for (const match of text.matchAll(inlineStylePattern)) {
    reportHard(
      violations,
      filePath,
      getLineNumber(text, match.index ?? 0),
      "Inline style props are only allowed inside approved files.",
    );
  }
}

function checkRawInteractiveDom(filePath, text, violations) {
  const extension = path.extname(filePath);
  if (extension !== ".jsx" && extension !== ".tsx") {
    return;
  }

  if (!shouldCheckVisualValues(filePath) || isInteractivePrimitiveFile(filePath)) {
    return;
  }

  for (const match of text.matchAll(rawInteractiveDomPattern)) {
    reportHard(
      violations,
      filePath,
      getLineNumber(text, match.index ?? 0),
      `Raw <${match[1]}> DOM is blocked outside shared primitive files.`,
    );
  }
}

function checkTabOwnership(filePath, text, violations) {
  const extension = path.extname(filePath);
  if (extension !== ".jsx" && extension !== ".tsx") {
    return;
  }

  if (!shouldCheckVisualValues(filePath) || toRepoPath(filePath) === tabsOwnerFile) {
    return;
  }

  for (const match of text.matchAll(tabRolePattern)) {
    reportHard(
      violations,
      filePath,
      getLineNumber(text, match.index ?? 0),
      `Tab role "${match[0]}" is blocked outside ${tabsOwnerFile}. Use the Tabs primitive; do not build a second tab set.`,
    );
  }
}

function checkRawColorLiterals(filePath, text, violations) {
  if (path.extname(filePath) === ".css") {
    return;
  }

  if (!shouldCheckVisualValues(filePath) || isTokenSourceFile(filePath)) {
    return;
  }

  for (const match of text.matchAll(rawColorLiteralPattern)) {
    reportHard(
      violations,
      filePath,
      getLineNumber(text, match.index ?? 0),
      `Raw color literal "${match[0]}" is blocked outside an approved token owner.`,
    );
  }
}

function checkLegacyColorTokens(filePath, text, violations) {
  if (toRepoPath(filePath) === "lib/design-policy.ts" || !shouldCheckVisualValues(filePath)) {
    return;
  }

  for (const match of text.matchAll(legacyColorTokenPattern)) {
    reportHard(
      violations,
      filePath,
      getLineNumber(text, match.index ?? 0),
      `Legacy color token "${match[0]}" is retired. Use a ramp utility/var or a component variant.`,
    );
  }
}

function checkRetiredTypeUtilities(filePath, text, violations) {
  if (toRepoPath(filePath) === "lib/design-policy.ts" || !shouldCheckVisualValues(filePath)) {
    return;
  }

  for (const match of text.matchAll(retiredTypeUtilityPattern)) {
    reportHard(
      violations,
      filePath,
      getLineNumber(text, match.index ?? 0),
      `Retired typography utility "${match[0]}" is blocked. Use ${typographyTokenNames.join(", ")}.`,
    );
  }

  for (const match of text.matchAll(retiredFontFamilyUtilityPattern)) {
    reportHard(
      violations,
      filePath,
      getLineNumber(text, match.index ?? 0),
      `Retired font-family utility "${match[0]}" is blocked. Font family is owned by semantic typography utilities.`,
    );
  }
}

function checkRetiredStyleUtilities(filePath, text, violations) {
  if (toRepoPath(filePath) === "lib/design-policy.ts" || !shouldCheckVisualValues(filePath)) {
    return;
  }

  for (const match of text.matchAll(retiredStyleUtilityPattern)) {
    reportHard(
      violations,
      filePath,
      getLineNumber(text, match.index ?? 0),
      `Retired style utility "${match[0]}" is blocked. Use Tailwind spacing/radius/shadow utilities directly.`,
    );
  }

  for (const match of text.matchAll(retiredCssTokenPattern)) {
    reportHard(
      violations,
      filePath,
      getLineNumber(text, match.index ?? 0),
      `Retired CSS design token "${match[0]}" is blocked. Use Tailwind theme variables such as --spacing, --radius-*, or --shadow-* directly.`,
    );
  }
}

function checkDisallowedUtilityTokens(filePath, text, violations) {
  if (path.extname(filePath) === ".css" || !shouldCheckVisualValues(filePath)) {
    return;
  }

  for (const match of text.matchAll(rawTextSizeUtilityPattern)) {
    if (isDocumentedTypographyMetadata(filePath, text, match.index ?? 0)) {
      continue;
    }

    reportHard(
      violations,
      filePath,
      getLineNumber(text, match.index ?? 0),
      `Raw Tailwind text-size utility "${match[0]}" is blocked. Use the approved semantic typography utilities; each owns size, line-height, and family.`,
    );
  }

  for (const match of text.matchAll(textUtilityPattern)) {
    const coreToken = stripClassVariantPrefixes(match[0]);
    if (!coreToken.startsWith("text-") || isAllowedTextColorUtility(coreToken)) {
      continue;
    }

    reportHard(
      violations,
      filePath,
      getLineNumber(text, match.index ?? 0),
      `Text color utility "${coreToken}" is outside the approved CivicChain palette.`,
    );
  }

  for (const match of text.matchAll(halfStepSpacingUtilityPattern)) {
    reportHard(
      violations,
      filePath,
      getLineNumber(text, match.index ?? 0),
      `Half-step spacing utility "${match[0]}" is blocked. Use compact whole Tailwind presets.`,
    );
  }

  for (const match of text.matchAll(horizontalPaddingHackPattern)) {
    reportHard(
      violations,
      filePath,
      getLineNumber(text, match.index ?? 0),
      `One-sided horizontal padding "${match[0]}" is blocked. Use gap/grid or symmetric padding.`,
    );
  }

  for (const match of text.matchAll(arbitraryBorderWidthUtilityPattern)) {
    reportHard(
      violations,
      filePath,
      getLineNumber(text, match.index ?? 0),
      `Arbitrary border-width utility "${match[0]}" is blocked. Use real Tailwind border presets.`,
    );
  }
}

function checkRadiusCeiling(filePath, text, violations) {
  if (!shouldCheckVisualValues(filePath)) {
    return;
  }

  for (const match of text.matchAll(disallowedRadiusUtilityPattern)) {
    reportHard(
      violations,
      filePath,
      getLineNumber(text, match.index ?? 0),
      `Radius utility "${match[0]}" exceeds the approved maximum. Use rounded-2xl, rounded-xl, or smaller.`,
    );
  }
}

function checkArbitraryTokens(filePath, text, violations) {
  if (path.extname(filePath) === ".css") {
    return;
  }

  if (!shouldCheckVisualValues(filePath)) {
    return;
  }

  for (const match of text.matchAll(arbitraryColorPropertyPattern)) {
    reportHard(
      violations,
      filePath,
      getLineNumber(text, match.index ?? 0),
      `Arbitrary color property "${match[0]}" is blocked. Use Tailwind ramp/opacity utilities or CSS owner code.`,
    );
  }

  for (const match of text.matchAll(arbitraryTokenPattern)) {
    const token = match[0];
    const coreToken = stripVariantPrefixes(token);
    const line = getLineNumber(text, match.index ?? 0);
    const value = getBracketValue(coreToken);

    if (/^rounded(?:-[trbl]{1,2})?-\[/.test(coreToken)) {
      if (!designPolicy.allowedArbitraryTokens.radius.includes(coreToken)) {
        reportHard(violations, filePath, line, `Arbitrary radius token "${coreToken}" is not approved by design policy.`);
      }
      continue;
    }

    if (/^shadow-\[/.test(coreToken)) {
      if (!designPolicy.allowedArbitraryTokens.shadow.includes(coreToken)) {
        reportHard(violations, filePath, line, `Arbitrary shadow token "${coreToken}" is not approved by design policy.`);
      }
      continue;
    }

    if (/^tracking-\[/.test(coreToken)) {
      if (!designPolicy.allowedArbitraryTokens.tracking.includes(coreToken)) {
        reportHard(violations, filePath, line, `Arbitrary tracking token "${coreToken}" is not approved by design policy.`);
      }
      continue;
    }

    if (/^leading-\[/.test(coreToken)) {
      if (!designPolicy.allowedArbitraryTokens.leading.includes(coreToken)) {
        reportHard(violations, filePath, line, `Arbitrary leading token "${coreToken}" is not approved by design policy.`);
      }
      continue;
    }

    if (isSpacingToken(coreToken)) {
      if (!designPolicy.allowedArbitraryTokens.spacing.includes(coreToken)) {
        reportHard(violations, filePath, line, `Arbitrary spacing token "${coreToken}" is not approved by design policy.`);
      }
      continue;
    }

    if (/^text-\[\d+px\]$/.test(coreToken)) {
      if (!designPolicy.allowedArbitraryTokens.textSize.includes(coreToken)) {
        reportHard(violations, filePath, line, `Arbitrary text-size token "${coreToken}" is not approved by design policy.`);
      }
      continue;
    }

    if (/^(?:bg|text|border|fill|stroke)-\[/.test(coreToken)) {
      if (coreToken.startsWith("bg-[size:")) {
        continue;
      }

      if (rawColorLiteralPattern.test(value)) {
        reportHard(violations, filePath, line, `Raw color value in "${coreToken}" is blocked outside an approved token owner.`);
        rawColorLiteralPattern.lastIndex = 0;
        continue;
      }
      rawColorLiteralPattern.lastIndex = 0;

      reportHard(violations, filePath, line, `Arbitrary color token "${coreToken}" is blocked. Use Tailwind ramp/opacity utilities or CSS owner code.`);
    }
  }
}

function getNearestRule(node) {
  let current = node.parent;

  while (current) {
    if (current.type === "rule") {
      return current;
    }

    current = current.parent;
  }

  return null;
}

function isAllowedCssTokenDeclaration(filePath, declaration) {
  const allowedSelectors = getAllowedCssTokenSelectors(filePath);

  if (allowedSelectors.length === 0) {
    return false;
  }

  const rule = getNearestRule(declaration);
  if (!rule?.selector) {
    return false;
  }

  const selectors = rule.selector.split(",").map((selector) => selector.trim());
  return selectors.every((selector) => allowedSelectors.includes(selector));
}

function getCssValueIssue(declaration) {
  const property = declaration.prop.toLowerCase();
  const parsedValue = valueParser(declaration.value);
  let issue = null;

  parsedValue.walk((node) => {
    if (issue) {
      return false;
    }

    if (node.type === "function") {
      const functionName = node.value.toLowerCase();

      if (ignoredCssFunctions.has(functionName)) {
        return false;
      }

      if (cssColorFunctionNames.has(functionName)) {
        issue = `Raw color function "${functionName}(...)" is blocked outside an approved token owner.`;
        return false;
      }

      return undefined;
    }

    if (node.type !== "word") {
      return undefined;
    }

    const word = node.value.toLowerCase();

    if (rawColorLiteralPattern.test(word)) {
      issue = `Raw color literal "${node.value}" is blocked outside an approved token owner.`;
      rawColorLiteralPattern.lastIndex = 0;
      return false;
    }
    rawColorLiteralPattern.lastIndex = 0;

    if (rawUnitPattern.test(word)) {
      issue = `Raw CSS value "${node.value}" is blocked in ${property}; promote it into the nearest token owner and consume it via var(--*).`;
      rawUnitPattern.lastIndex = 0;
      return false;
    }
    rawUnitPattern.lastIndex = 0;

    if (
      unitlessCssProperties.has(property) &&
      /^-?\d*\.?\d+$/.test(word) &&
      word !== "0" &&
      word !== "1"
    ) {
      issue = `Raw unitless value "${node.value}" is blocked in ${property}; promote it into the nearest token owner and consume it via var(--*).`;
      return false;
    }

    return undefined;
  });

  return issue;
}

function checkCssDeclarations(filePath, text, violations, options = {}) {
  if (!options.forceCssDeclarations && !isCssDeclarationCheckFile(filePath)) {
    return;
  }

  const root = postcss.parse(text, { from: filePath });

  root.walkDecls((declaration) => {
    if (declaration.prop.startsWith("--")) {
      if (!isAllowedCssTokenDeclaration(filePath, declaration)) {
        reportHard(
          violations,
          filePath,
          declaration.source?.start?.line ?? 1,
          `Custom property "${declaration.prop}" is only allowed inside approved token selectors.`,
        );
      }
      return;
    }

    const valueIssue = getCssValueIssue(declaration);
    if (valueIssue) {
      reportHard(
        violations,
        filePath,
        declaration.source?.start?.line ?? 1,
        valueIssue,
      );
    }
  });
}

function checkOneFile(filePath, text, violations, options = {}) {
  checkImports(filePath, text, violations);
  checkDynamicTailwindClasses(filePath, text, violations);
  checkInlineStyles(filePath, text, violations);
  checkRawInteractiveDom(filePath, text, violations);
  checkTabOwnership(filePath, text, violations);
  checkLegacyColorTokens(filePath, text, violations);
  checkRetiredTypeUtilities(filePath, text, violations);
  checkRetiredStyleUtilities(filePath, text, violations);
  checkDisallowedUtilityTokens(filePath, text, violations);
  checkRadiusCeiling(filePath, text, violations);
  checkRawColorLiterals(filePath, text, violations);
  checkArbitraryTokens(filePath, text, violations);
  checkCssDeclarations(filePath, text, violations, options);
}

function parseArgs(argv) {
  const args = { changed: null, fixture: false };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--changed") {
      args.changed = argv[index + 1] ?? null;
      index += 1;
    } else if (arg.startsWith("--changed=")) {
      args.changed = arg.slice("--changed=".length);
    } else if (arg === "--fixture") {
      args.fixture = true;
    }
  }
  return args;
}

function isSourceExtension(filePath) {
  return sourceExtensions.has(path.extname(filePath));
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const violations = { hard: [], soft: [] };

  if (args.changed) {
    const absolutePath = path.isAbsolute(args.changed)
      ? args.changed
      : path.resolve(designPolicy.repoRoot, args.changed);

    if (!isSourceExtension(absolutePath)) {
      // Non-source file (e.g. .md, .json) — nothing to check.
      return;
    }

    const filePath = toRepoPath(absolutePath);
    let text;
    try {
      text = await readFile(absolutePath, "utf8");
    } catch (error) {
      if (error && error.code === "ENOENT") {
        // File was deleted or moved — nothing to check.
        return;
      }
      throw error;
    }

    checkOneFile(filePath, text, violations, {
      forceCssDeclarations: args.fixture && path.extname(filePath) === ".css",
    });

    if (violations.soft.length > 0) {
      console.warn("Design-system policy warnings (non-blocking):\n");
      for (const warning of violations.soft) {
        console.warn(`- ${warning}`);
      }
      console.warn(
        "\nReview these before hardening a page for client preview. They do not block active visual iteration.",
      );
    }

    if (violations.hard.length > 0) {
      console.warn("Design-system policy warnings (non-blocking):\n");
      for (const error of violations.hard) {
        console.warn(`- ${error}`);
      }
    }

    return;
  }

  const files = await getFilesToCheck();

  for (const absolutePath of files) {
    const filePath = toRepoPath(absolutePath);
    const text = await readFile(absolutePath, "utf8");

    checkOneFile(filePath, text, violations);
  }

  const all = [...violations.hard, ...violations.soft];
  if (all.length > 0) {
    console.warn("Design-system policy warnings found (non-blocking):\n");
    for (const warning of all) {
      console.warn(`- ${warning}`);
    }
    console.warn(
      "\nReview these before hardening a page for client preview. They do not block active visual iteration.",
    );
    return;
  }

  console.log("Design-system policy check passed.");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
