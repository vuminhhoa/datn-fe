// eslint-disable-next-line no-undef
module.exports = {
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  extends: 'eslint:recommended',
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
};
