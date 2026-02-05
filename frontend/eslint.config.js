// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook';
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import prettier from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

import eslintConfigPrettier from 'eslint-config-prettier';
import query from '@tanstack/eslint-plugin-query';

export default defineConfig([
  globalIgnores(['dist', 'node_modules']),
  ...query.configs['flat/recommended'],
  ...storybook.configs['flat/recommended'],
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.strict,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      eslintConfigPrettier,
    ],
    plugins: {
      prettier,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'prettier/prettier': 'error',
      'no-var': 'error',
      'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      eqeqeq: ['error', 'always'],
      'prefer-const': 'error',
      curly: ['error', 'all'],
      'object-shorthand': 'error',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^\\u0000'],
            ['^node:'],
            ['^react'],
            ['^@?\\w'],
            ['^@/1-app'],
            ['^@/2-pages'],
            ['^@/3-widgets'],
            ['^@/4-features'],
            ['^@/5-entities'],
            ['^@/6-shared'],
            ['^@/'],
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          ],
        },
      ],
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
]);
