module.exports = {
  env: {
    browser: false,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', "only-warn"],
  rules: {
    'no-undef': 0,
    semi: [2, 'always'],
    indent: ['error', 2],
  },
};
