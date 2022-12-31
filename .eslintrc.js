module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'standard-with-typescript',
  parserOptions: {
    ecmaVersion: 2020,
    project: ['tsconfig.json'],
    sourceType: 'module',
  },
  overrides: [
  ],
  rules: {
    'comma-dangle': ['warn', 'always-multiline'],
    // Donald Knuth got this right.
    'operator-linebreak': ['warn', 'before'],
    'object-curly-spacing': ['warn', 'never'],
    '@typescript-eslint/comma-dangle': ['warn', 'always-multiline'],
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/consistent-indexed-object-style': 'off',
    '@typescript-eslint/object-curly-spacing': ['warn', 'never'],
  },
}
