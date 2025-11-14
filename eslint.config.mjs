import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    files: ["**/*.ts"],
    ignores: ["node_modules/", "app/"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    ignores: [
      "dist/",
      "node_modules/",
      "app/",
      "wdio.conf.ts"
    ],
    rules: {
      "no-console": "warn",
      "no-debugger": "error",
      "prefer-const": "error",
      eqeqeq: ["error", "always"],
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
];
