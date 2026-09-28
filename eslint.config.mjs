import { defineConfig, globalIgnores } from "eslint/config";
import docusaurus from "@docusaurus/eslint-plugin";
import typescript from "@typescript-eslint/eslint-plugin";
import * as mdx from "eslint-plugin-mdx";

export default defineConfig([
  globalIgnores([
    "**/.*",
    "docs/reference/**",
    "build/**",
    "node_modules/**",
    "data/agent-skill/SKILL.md",
    "static/skill.md",
    "static/.well-known/**",
  ]),
  {
    plugins: { "@docusaurus": docusaurus },
    rules: docusaurus.configs.recommended.rules,
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    extends: [typescript.configs["flat/recommended"]],
  },
  mdx.flat,
  mdx.flatCodeBlocks,
  {
    files: ["**/*.md"],
    rules: mdx.flatCodeBlocks.rules,
  },
]);
