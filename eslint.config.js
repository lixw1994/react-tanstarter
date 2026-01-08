import react from "@eslint-react/eslint-plugin";
import js from "@eslint/js";
import pluginQuery from "@tanstack/eslint-plugin-query";
import pluginRouter from "@tanstack/eslint-plugin-router";
import eslintConfigPrettier from "eslint-config-prettier";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

export default [
  // Global ignores - only lint src/
  {
    ignores: [
      "**/*",
      "!src/**",
      "src/routeTree.gen.ts",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  ...pluginQuery.configs["flat/recommended"],
  ...pluginRouter.configs["flat/recommended"],
  {
    files: ["src/**/*.{ts,tsx}"],
    ...react.configs["recommended-type-checked"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      ...react.configs["recommended-type-checked"].plugins,
      "react-hooks": reactHooks,
    },
    rules: {
      ...react.configs["recommended-type-checked"].rules,
      ...reactHooks.configs.recommended.rules,
    },
  },
  {
    // Type declaration files use interface merging, which looks like "unused" to ESLint
    files: ["src/**/*.d.ts"],
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
];
