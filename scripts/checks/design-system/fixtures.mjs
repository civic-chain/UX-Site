#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const FIXTURE_DIR = join(ROOT, ".ignore", "design-system-fixtures");

const badFixture = [
  'import gsap from "gsap";',
  'import * as DialogPrimitive from "@radix-ui/react-dialog";',
  'import { HugeiconsIcon } from "@hugeicons/react";',
  'import facts from "../_docs/facts/product.md";',
  "",
  'const tone = "blue";',
  "",
  "export function BadDesignFixture() {",
  "  const dynamic = `bg-${tone}-500`;",
  "",
  "  return (",
  "    <DialogPrimitive.Root>",
  "      <div",
  "        className={`${dynamic} [color:var(--x)] bg-[color:color-mix(in_oklch,var(--x),white)] bg-[#123456] p-[18px] p-2.5 pl-12 text-[13px] text-xl font-serif type-1 text-gray-500 rounded-[13px] radius-md shadow-ambient border-b-[6px]`}",
  '        style={{ color: "#123456", background: "var(--tone-gold)" }}',
  "      >",
  '        <button type="button">Bad control</button>',
  "        <HugeiconsIcon icon={undefined as never} />",
  "      </div>",
  "    </DialogPrimitive.Root>",
  "  );",
  "}",
  "",
  "void gsap;",
  "void facts;",
  "",
].join("\n");

const goodFixture = String.raw`
export function GoodDesignFixture() {
  return (
    <div className="grid gap-4 rounded-2xl border border-blue-900/20 bg-cream-50/70 p-8 body text-foreground/70">
      <span className="captions text-slate-500">
        Native flat utilities
      </span>
      <span className="rounded-xl border border-gold-800/30 bg-gold-100 px-8 py-4 body-sm">
        Symmetric Tailwind spacing
      </span>
    </div>
  );
}
`;

const badCssFixture = String.raw`
.bad-css-fixture {
  --fixture-local-token: var(--blue-900);
  color: #123456;
  padding: 13px;
  gap: var(--space-md);
  box-shadow: var(--shadow-button);
  line-height: 1.35;
}
`;

const goodCssFixture = String.raw`
.good-css-fixture {
  display: grid;
  gap: calc(var(--spacing) * 4);
  padding: calc(var(--spacing) * 6);
  border-radius: var(--radius-xl);
  background: color-mix(in oklab, var(--cream-50), transparent 18%);
  color: var(--foreground);
}
`;

function runNode(args) {
  const result = spawnSync(process.execPath, args, {
    cwd: ROOT,
    encoding: "utf8",
  });

  return {
    status: result.status ?? 1,
    output: `${result.stdout ?? ""}${result.stderr ?? ""}`,
  };
}

function requireSubstrings(label, output, substrings) {
  const missing = substrings.filter((substring) => !output.includes(substring));
  if (missing.length === 0) {
    return [];
  }

  return [
    `${label} did not report expected evidence: ${missing.join(", ")}`,
    output.trim(),
  ].filter(Boolean);
}

async function main() {
  await rm(FIXTURE_DIR, { recursive: true, force: true });
  await mkdir(FIXTURE_DIR, { recursive: true });

  const badPath = join(FIXTURE_DIR, "bad-design-fixture.tsx");
  const goodPath = join(FIXTURE_DIR, "good-design-fixture.tsx");
  const badCssPath = join(FIXTURE_DIR, "bad-design-css-fixture.css");
  const goodCssPath = join(FIXTURE_DIR, "good-design-css-fixture.css");
  const badRepoPath = relative(ROOT, badPath);
  const goodRepoPath = relative(ROOT, goodPath);
  const badCssRepoPath = relative(ROOT, badCssPath);
  const goodCssRepoPath = relative(ROOT, goodCssPath);
  await writeFile(badPath, badFixture, "utf8");
  await writeFile(goodPath, goodFixture, "utf8");
  await writeFile(badCssPath, badCssFixture, "utf8");
  await writeFile(goodCssPath, goodCssFixture, "utf8");

  const checks = [
    {
      label: "policy reports planted warnings",
      args: ["scripts/checks/design-system/policy.mjs", "--changed", badRepoPath],
      shouldPass: true,
      evidence: [
        "Motion runtime import",
        "Runtime code must not import _docs/",
        "Direct Radix imports",
        "Direct icon-library import",
        "Dynamic Tailwind class construction",
        "Inline style props",
        "Raw <button> DOM",
        "Legacy color token",
        "Retired typography utility",
        "Retired font-family utility",
        "Retired style utility",
        "Raw Tailwind text-size utility",
        "Text color utility",
        "Half-step spacing utility",
        "One-sided horizontal padding",
        "Arbitrary spacing token",
        "Arbitrary text-size token",
        "Arbitrary radius token",
        "Arbitrary border-width utility",
        "Arbitrary color property",
        "Raw color value",
      ],
    },
    {
      label: "policy reports default-on CSS warnings",
      args: ["scripts/checks/design-system/policy.mjs", "--changed", badCssRepoPath, "--fixture"],
      shouldPass: true,
      evidence: [
        "Custom property",
        "Raw color literal",
        "Raw CSS value",
        "Retired CSS design token",
        "Raw unitless value",
      ],
    },
    {
      label: "policy accepts native flat fixture",
      args: ["scripts/checks/design-system/policy.mjs", "--changed", goodRepoPath],
      shouldPass: true,
      evidence: [],
    },
    {
      label: "policy accepts token-backed CSS fixture",
      args: ["scripts/checks/design-system/policy.mjs", "--changed", goodCssRepoPath, "--fixture"],
      shouldPass: true,
      evidence: [],
    },
  ];

  const failures = [];

  for (const check of checks) {
    const result = runNode(check.args);
    const passed = result.status === 0;

    if (check.shouldPass && !passed) {
      failures.push(`${check.label} failed unexpectedly:\n${result.output.trim()}`);
      continue;
    }

    if (!check.shouldPass && passed) {
      failures.push(`${check.label} passed unexpectedly.`);
      continue;
    }

    if (check.evidence.length > 0) {
      failures.push(...requireSubstrings(check.label, result.output, check.evidence));
    }
  }

  await rm(FIXTURE_DIR, { recursive: true, force: true });

  if (failures.length > 0) {
    console.error("Design-system fixture check failed:\n");
    for (const failure of failures) {
      console.error(`- ${failure}`);
    }
    process.exit(1);
  }

  console.log(
    `Design-system fixture check passed (${relative(ROOT, badPath)} and ${badCssRepoPath} planted warnings, ${relative(ROOT, goodPath)} and ${goodCssRepoPath} green).`,
  );
}

main().catch(async (error) => {
  await rm(FIXTURE_DIR, { recursive: true, force: true });
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
