#!/usr/bin/env node

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";

const ROOT = process.cwd();
const SOURCE_ROOTS = ["app", "components", "lib", "tests"];
const SOURCE_EXTENSIONS = new Set([".css", ".js", ".jsx", ".mjs", ".ts", ".tsx"]);
const TRACKED_RUNTIME_ASSET_ROOTS = ["design-assets", "landing"];
// public/design-assets is a runtime asset bank, not only currently wired files.
// Final optimized families may be committed before first use; source/draft PNGs
// stay in _workspace/design-assets and never enter this check.
const ALLOWED_UNUSED_RUNTIME_ASSET_ROOTS = [
  "public/design-assets/bg-scenes-square",
  "public/design-assets/bg-scenes-wide",
  "public/design-assets/bg-textures",
  "public/design-assets/scenes-colored",
  "public/design-assets/stamps",
];
const IMAGE_EXTENSIONS = new Set([".webp", ".png", ".jpg", ".jpeg", ".svg"]);
const ASSET_REFERENCE_PATTERN = /\/(?:brand|landing|design-assets)\/[^"'`\n)]+?\.(?:webp|png|jpe?g|svg)/gi;

function toRepoPath(path) {
  return relative(ROOT, path).replaceAll("\\", "/");
}

function walk(dir) {
  const absoluteDir = join(ROOT, dir);
  if (!existsSync(absoluteDir)) {
    return [];
  }

  const files = [];
  for (const entry of readdirSync(absoluteDir, { withFileTypes: true })) {
    const absolutePath = join(absoluteDir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(toRepoPath(absolutePath)));
      continue;
    }
    files.push(absolutePath);
  }
  return files;
}

function isAllowedUnusedRuntimeAsset(repoPath) {
  return ALLOWED_UNUSED_RUNTIME_ASSET_ROOTS.some(
    (root) => repoPath === root || repoPath.startsWith(`${root}/`),
  );
}

const sourceFiles = SOURCE_ROOTS
  .flatMap((root) => walk(root))
  .filter((file) => SOURCE_EXTENSIONS.has(extname(file)));

const referencedPublicPaths = new Set();
const missing = [];

for (const file of sourceFiles) {
  const text = readFileSync(file, "utf8");
  for (const match of text.matchAll(ASSET_REFERENCE_PATTERN)) {
    const publicPath = `public${match[0]}`;
    referencedPublicPaths.add(publicPath);
    if (!existsSync(join(ROOT, publicPath))) {
      missing.push(`${toRepoPath(file)} references missing ${match[0]}`);
    }
  }
}

const unused = [];
for (const publicRoot of TRACKED_RUNTIME_ASSET_ROOTS) {
  for (const file of walk(`public/${publicRoot}`)) {
    if (!statSync(file).isFile() || !IMAGE_EXTENSIONS.has(extname(file).toLowerCase())) {
      continue;
    }

    const repoPath = toRepoPath(file);
    if (!referencedPublicPaths.has(repoPath) && !isAllowedUnusedRuntimeAsset(repoPath)) {
      unused.push(repoPath);
    }
  }
}

if (missing.length > 0 || unused.length > 0) {
  console.error("Runtime asset check failed:");
  for (const issue of missing) {
    console.error(`- ${issue}`);
  }
  for (const issue of unused) {
    console.error(`- Unused runtime asset: ${issue}`);
  }
  process.exit(1);
}

const trackedRefs = [...referencedPublicPaths].filter((assetPath) =>
  TRACKED_RUNTIME_ASSET_ROOTS.some((root) => assetPath.startsWith(`public/${root}/`)),
);

console.log(
  `Runtime asset check passed (${trackedRefs.length} tracked runtime asset refs, 0 missing, 0 unused).`,
);
