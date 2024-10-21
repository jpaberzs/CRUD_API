import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  {
    env: {
      browser: true,
      es2021: true,
      jest: true,
    },
  },
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.browser } },
  {
    extends: [
      'next/core-web-vitals',
      'next/typescript',
      'airbnb-typescript/base',
      'plugin:import/typescript',
    ],
  },
  { ignores: ['webpack.config.js'] },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
