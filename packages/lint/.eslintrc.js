module.exports = {
  extends: ['plugin:react/recommended', 'google', 'prettier', 'next'],
  env: {
    browser: true,
    es2021: true,
    jest: true,
    node: true,
  },
  settings: {
    react: {
      version: '16',
    },
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    '@next/next/no-img-element': 'off',
    'react-hooks/rules-of-hooks': 'off',
    'require-jsdoc': 'off',
  },
};
