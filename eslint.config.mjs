import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

import {
  designPolicy,
  isInteractivePrimitiveFile,
  isInlineStyleAllowedFile,
} from "./lib/design-policy.ts";

const rawControlSet = new Set(designPolicy.rawControlTags);

const designPolicyPlugin = {
  rules: {
    "no-inline-style-outside-system-files": {
      meta: {
        type: "problem",
        docs: {
          description: "Disallow inline style props outside approved design-system files.",
        },
        schema: [],
      },
      create(context) {
        if (isInlineStyleAllowedFile(context.filename)) {
          return {};
        }

        return {
          JSXAttribute(node) {
            if (
              node.name.type === "JSXIdentifier" &&
              node.name.name === "style"
            ) {
              context.report({
                node,
                message:
                  "Inline styles are only allowed in approved design-system primitives. Extend the system instead of styling locally.",
              });
            }
          },
        };
      },
    },
    "no-lucide-imports": {
      meta: {
        type: "problem",
        docs: {
          description: "Disallow lucide-react imports across the repository.",
        },
        schema: [],
      },
      create(context) {
        return {
          ImportDeclaration(node) {
            if (node.source.value === "lucide-react") {
              context.report({
                node,
                message:
                  "lucide-react is blocked by repo policy. Use the Material Symbols Icon registry in components/ui/icon.tsx.",
              });
            }
          },
        };
      },
    },
    "no-radix-outside-ui": {
      meta: {
        type: "problem",
        docs: {
          description: "Allow direct Radix imports only inside primitive files.",
        },
        schema: [],
      },
      create(context) {
        if (isInteractivePrimitiveFile(context.filename)) {
          return {};
        }

        return {
          ImportDeclaration(node) {
            if (
              typeof node.source.value === "string" &&
              node.source.value.startsWith("@radix-ui/")
            ) {
              context.report({
                node,
                message:
                  "Direct Radix imports are only allowed in shared or route-local primitive files.",
              });
            }
          },
        };
      },
    },
    "no-raw-controls-outside-ui": {
      meta: {
        type: "problem",
        docs: {
          description: "Disallow raw interactive elements outside primitive files.",
        },
        schema: [],
      },
      create(context) {
        if (isInteractivePrimitiveFile(context.filename)) {
          return {};
        }

        return {
          JSXOpeningElement(node) {
            if (
              node.name.type === "JSXIdentifier" &&
              rawControlSet.has(node.name.name)
            ) {
              context.report({
                node,
                message:
                  "Raw interactive elements are blocked outside shared or route-local primitive files.",
              });
            }
          },
        };
      },
    },
  },
};

const eslintConfig = [
  {
    ignores: [
      ".ignore/**",
      ".obsidian/**",
      "_workspace/**",
      ".claude/**",
      ".codex/**",
    ],
  },
  ...nextVitals,
  ...nextTypescript,
  {
    files: [...designPolicy.sourceFileGlobs],
    plugins: {
      "design-policy": designPolicyPlugin,
    },
    rules: {
      // During active visual iteration these project-specific design-policy
      // rules are advisory. TypeScript, Next, accessibility, and CSS syntax
      // checks still fail normally through the base configs.
      "design-policy/no-inline-style-outside-system-files": "warn",
      "design-policy/no-lucide-imports": "warn",
      "design-policy/no-radix-outside-ui": "warn",
      "design-policy/no-raw-controls-outside-ui": "warn",
    },
  },
];

export default eslintConfig;
