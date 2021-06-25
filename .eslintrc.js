module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    camelcase: 'off',
    indent: 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'no-use-before-define': 'off',
    'import/no-unresolved': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-await-in-loop': 'off',
    'no-plusplus': 'off',
    'arrow-parens': 'off',
    'no-console': 'off',
    'import/no-mutable-exports': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'import/extensions': 'off',
    '@typescript-eslint/indent': ['error', 2],
    'max-len': 'off',
  },
};
