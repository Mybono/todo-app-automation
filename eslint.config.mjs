import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  {
    files: ['src/**/*.ts', 'wdio.conf.ts'],

    ignores: ['node_modules/', 'dist/', 'app/'],

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },

    plugins: {
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin,
    },

    rules: {
      'no-console': 'warn',
      'no-debugger': 'error',
      'prefer-const': 'error',
      eqeqeq: ['error', 'always'],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/explicit-function-return-type': ['warn'],
      '@typescript-eslint/no-explicit-any': ['warn'],
      '@typescript-eslint/no-floating-promises': ['error'],
      'space-before-function-paren': 'off',
      'max-len': ['warn', { code: 100 }],

      // ---- Formatting / Style Rules ----
      semi: ['error', 'always'],
      quotes: ['error', 'single', { avoidEscape: true }],
      'object-curly-spacing': ['error', 'always'],
      'space-infix-ops': 'error',
      'keyword-spacing': ['error', { before: true, after: true }],
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: 'block', next: '*' },
        { blankLine: 'always', prev: '*', next: 'return' },
      ],

      //Prettier integration
      'prettier/prettier': [
        'error',
        {
          semi: true,
          singleQuote: true,
          bracketSpacing: true,
          arrowParens: 'avoid',
          printWidth: 100,
        },
      ],
    },
  },
];
