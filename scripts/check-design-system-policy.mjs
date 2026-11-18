#!/usr/bin/env node

import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import postcss from "postcss";
import valueParser from "postcss-value-parser";

import {
  designPolicy,
  getAllowedCssTokenSelectors,
  getRouteIsolationViolation,
  isInteractivePrimitiveFile,
  isApprovedIconAdapterFile,
  isCssDeclarationCheckFile,
  isInlineStyleAllowedFile,
  isTokenSourceFile,
  shouldCheckVisualValues,
  toRepoPath,
} from "../lib/design-policy.ts";

const sourceExtensions = new Set([".css", ".js", ".jsx", ".ts", ".tsx"]);
const importPattern = /import[\s\S]*?from\s+["']([^"']+)["']/g;
const arbitraryTokenPattern = /[A-Za-z0-9_./:-]+-\[[^\]\n]+\]/g;
const rawColorLiteralPattern = /#(?:[0-9a-fA-F]{3,8})\b|rgba?\([^)]*\)|hsla?\([^)]*\)/g;
const rawUnitPattern = /-?\d*\.?\d+(?:rem|px|em|svh|dvh|vw|vh|vmin|vmax|ms|deg)\b/i;
const inlineStylePattern = /\bstyle=\{/g;
const cssColorFunctionNames = new Set(["rgb", "rgba", "hsl", "hsla", "oklch"]);
const ignoredCssFunctions = new Set(["var", "color-mix", "linear-gradient", "radial-gradient"]);
const unitlessCssProperties = new Set(["line-height"]);
const rawInteractiveDomPattern = new RegExp(
  `<(${designPolicy.rawControlTags.join("|")})(?=\\s|>)`,
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

function isSpacingToken(token) {
  return /^(?:gap|p[trblxy]?|m[trblxy]?|size|min-h|min-w|max-w|h|w|top|right|bottom|left|inset(?:-x|-y)?|translate-x|translate-y)-\[/.test(
    token,
  );
}

function getBracketValue(token) {
  return token.slice(token.indexOf("[") + 1, -1);
}

function reportHard(violations, filePath, line, message) {
  violations.hard.push(`${filePath}:${line} ${message}`);
}

function reportSoft(violations, filePath, line, message) {
  violations.soft.push(`${filePath}:${line} ${message}`);
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
  for (const match of text.matchAll(importPattern)) {
    const source = match[1];
    const line = getLineNumber(text, match.index ?? 0);
    const routeIsolationViolation = getRouteIsolationViolation(filePath, source);

    if (routeIsolationViolation) {
      reportHard(violations, filePath, line, routeIsolationViolation);
      continue;
    }

    if (designPolicy.disallowedIconImports.includes(source)) {
      reportHard(violations, filePath, line, "lucide-react is blocked. Use the Hugeicons adapters instead.");
      continue;
    }

    if (
      source.startsWith("@radix-ui/") &&
      !isInteractivePrimitiveFile(filePath)
    ) {
      reportHard(violations, filePath, line, "Direct Radix imports are only allowed inside shared primitive files.");
      continue;
    }

    if (
      designPolicy.hugeiconsPackages.includes(source) &&
      !isApprovedIconAdapterFile(filePath)
    ) {
      reportHard(violations, filePath, line, "Direct Hugeicons imports are only allowed inside approved icon adapters.");
    }
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

function checkArbitraryTokens(filePath, text, violations) {
  if (path.extname(filePath) === ".css") {
    return;
  }

  if (!shouldCheckVisualValues(filePath)) {
    return;
  }

  for (const match of text.matchAll(arbitraryTokenPattern)) {
    const token = match[0];
    const coreToken = stripVariantPrefixes(token);
    const line = getLineNumber(text, match.index ?? 0);
    const value = getBracketValue(coreToken);

    if (/^rounded(?:-[trbl]{1,2})?-\[/.test(coreToken)) {
      if (!designPolicy.allowedArbitraryTokens.radius.includes(coreToken)) {
        reportSoft(violations, filePath, line, `Arbitrary radius token "${coreToken}" is not approved by design policy.`);
      }
      continue;
    }

    if (/^shadow-\[/.test(coreToken)) {
      if (!designPolicy.allowedArbitraryTokens.shadow.includes(coreToken)) {
        reportSoft(violations, filePath, line, `Arbitrary shadow token "${coreToken}" is not approved by design policy.`);
      }
      continue;
    }

    if (/^tracking-\[/.test(coreToken)) {
      if (!designPolicy.allowedArbitraryTokens.tracking.includes(coreToken)) {
        reportSoft(violations, filePath, line, `Arbitrary tracking token "${coreToken}" is not approved by design policy.`);
      }
      continue;
    }

    if (/^leading-\[/.test(coreToken)) {
      if (!designPolicy.allowedArbitraryTokens.leading.includes(coreToken)) {
        reportSoft(violations, filePath, line, `Arbitrary leading token "${coreToken}" is not approved by design policy.`);
      }
      continue;
    }

    if (isSpacingToken(coreToken)) {
      if (!designPolicy.allowedArbitraryTokens.spacing.includes(coreToken)) {
        reportSoft(violations, filePath, line, `Arbitrary spacing token "${coreToken}" is not approved by design policy.`);
      }
      continue;
    }

    if (/^text-\[\d+px\]$/.test(coreToken)) {
      if (!designPolicy.allowedArbitraryTokens.textSize.includes(coreToken)) {
        reportSoft(violations, filePath, line, `Arbitrary text-size token "${coreToken}" is not approved by design policy.`);
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

      const usesAllowedColorLogic = designPolicy.colorAllowFragments.some((fragment) =>
        value.includes(fragment),
      );

      if (!usesAllowedColorLogic) {
        reportSoft(violations, filePath, line, `Arbitrary color token "${coreToken}" is not approved by design policy.`);
      }
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

function checkCssDeclarations(filePath, text, violations) {
  if (!isCssDeclarationCheckFile(filePath)) {
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

function parseArgs(argv) {
  const args = { changed: null };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--changed") {
      args.changed = argv[index + 1] ?? null;
      index += 1;
    } else if (arg.startsWith("--changed=")) {
      args.changed = arg.slice("--changed=".length);
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

    checkImports(filePath, text, violations);
    checkInlineStyles(filePath, text, violations);
    checkRawInteractiveDom(filePath, text, violations);
    checkRawColorLiterals(filePath, text, violations);
    checkArbitraryTokens(filePath, text, violations);
    checkCssDeclarations(filePath, text, violations);

    if (violations.soft.length > 0) {
      console.warn("Design-system policy warnings (non-blocking):\n");
      for (const warning of violations.soft) {
        console.warn(`- ${warning}`);
      }
      console.warn(
        "\nPromote these into the nearest honest owner (shared app/styles tokens, primitives or patterns) or add to designPolicy.allowedArbitraryTokens — do not leave unaddressed.",
      );
    }

    if (violations.hard.length > 0) {
      console.error("Design-system policy violations (blocking):\n");
      for (const error of violations.hard) {
        console.error(`- ${error}`);
      }
      process.exit(1);
    }

    return;
  }

  const files = await getFilesToCheck();

  for (const absolutePath of files) {
    const filePath = toRepoPath(absolutePath);
    const text = await readFile(absolutePath, "utf8");

    checkImports(filePath, text, violations);
    checkInlineStyles(filePath, text, violations);
    checkRawInteractiveDom(filePath, text, violations);
    checkRawColorLiterals(filePath, text, violations);
    checkArbitraryTokens(filePath, text, violations);
    checkCssDeclarations(filePath, text, violations);
  }

  const all = [...violations.hard, ...violations.soft];
  if (all.length > 0) {
    console.error("Design-system policy violations found:\n");
    for (const error of all) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log("Design-system policy check passed.");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
