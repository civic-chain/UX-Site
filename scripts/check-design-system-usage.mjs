import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const TARGET_DIRS = ["app", "components", "lib"];
const TARGET_EXTENSIONS = new Set([".ts", ".tsx"]);

const EXCLUDED_PATHS = [
  "components/ui/",
  "lib/design-policy.ts",
];

const RULES = [
  {
    id: "hardcoded-colors",
    message: "Move color decisions into the nearest token owner instead of raw literals.",
    regex: /(?<![\w-])(#[0-9a-fA-F]{3,8}|rgba?\([^)]*\)|hsla?\([^)]*\)|oklch\([^)]*\))/g,
  },
  {
    id: "raw-type-scale",
    message: "Use owner-backed type utilities or UI primitives instead of raw text-size utilities.",
    regex: /\btext-(?:xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)\b/g,
  },
  {
    id: "arbitrary-type-scale",
    message: "Use owner-backed type utilities or semantic CSS classes instead of arbitrary text-size utilities.",
    regex: /\btext-\[(?!color:)[^\]]+\]/g,
  },
  {
    id: "raw-leading",
    message: "Use owner-backed typography tokens instead of arbitrary leading utilities.",
    regex: /\bleading-\[[^\]]+\]/g,
  },
  {
    id: "raw-tracking",
    message: "Use owner-backed typography tokens instead of arbitrary tracking utilities.",
    regex: /\btracking-\[[^\]]+\]/g,
  },
  {
    id: "arbitrary-radius",
    message: "Promote radius decisions into the nearest design-system owner or primitive.",
    regex: /\brounded-\[[^\]]+\]/g,
  },
];

function shouldSkip(path) {
  return EXCLUDED_PATHS.some((excludedPath) => path === excludedPath || path.startsWith(excludedPath));
}

function walk(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolutePath = join(dir, entry.name);
    const relativePath = relative(ROOT, absolutePath);

    if (shouldSkip(relativePath)) {
      continue;
    }

    if (entry.isDirectory()) {
      files.push(...walk(absolutePath));
      continue;
    }

    const extension = relativePath.slice(relativePath.lastIndexOf("."));
    if (TARGET_EXTENSIONS.has(extension)) {
      files.push(relativePath);
    }
  }

  return files;
}

function collectViolations(filePath) {
  const content = readFileSync(join(ROOT, filePath), "utf8");
  const lines = content.split("\n");
  const violations = [];

  for (const [index, line] of lines.entries()) {
    for (const rule of RULES) {
      const matches = [...line.matchAll(rule.regex)];

      for (const match of matches) {
        violations.push({
          filePath,
          lineNumber: index + 1,
          ruleId: rule.id,
          snippet: match[0],
          message: rule.message,
        });
      }
    }
  }

  return violations;
}

const targetFiles = TARGET_DIRS.flatMap((dir) => {
  const absoluteDir = join(ROOT, dir);

  try {
    if (!statSync(absoluteDir).isDirectory()) {
      return [];
    }
  } catch {
    return [];
  }

  return walk(absoluteDir);
});

const violations = targetFiles.flatMap((filePath) => collectViolations(filePath));

if (violations.length === 0) {
  console.log("design-system usage check passed");
  process.exit(0);
}

console.error("Design-system guardrails found drift:");

for (const violation of violations) {
  console.error(
    `${violation.filePath}:${violation.lineNumber} [${violation.ruleId}] ${violation.message} Found: ${violation.snippet}`,
  );
}

process.exit(1);
