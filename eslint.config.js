import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: ['dist/**/*', 'dist/*'],
    rules: {
      'no-console': 'warn',
      '@typescript-eslint/no-unnecessary-condition': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      complexity: ['error', 6],
    },
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
