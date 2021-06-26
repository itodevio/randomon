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
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'import/no-unresolved': 'off',
    'import/no-mutable-exports': 'off',
    'import/extensions': 'off',
    'no-use-before-define': 'off',
    'no-await-in-loop': 'off',
    'no-plusplus': 'off',
    'no-console': 'off',
    'no-spaced-func': 'off',
    'arrow-parens': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    '@typescript-eslint/indent': ['error', 2],
    'max-len': 'off',
    'func-call-spacing': 'off',
  },
};
