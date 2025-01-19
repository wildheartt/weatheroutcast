import js from '@eslint/js';
import airbnb from 'eslint-config-airbnb-base';

export default [
  js.configs.recommended,
  airbnb,
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    env: {
      browser: true,
      es2021: true,
    },
    rules: {},
  },
];
