import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    files: ["src/**/*.ts"],

    ignores: [
      "node_modules/",
      "dist/",
      "app/",
      "wdio.conf.ts",
    ],

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
