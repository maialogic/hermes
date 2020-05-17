module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:eslint-comments/recommended',
    'plugin:promise/recommended',
    'plugin:unicorn/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react',
    'plugin:json/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['markdown'],
  rules: {
    '@typescript-eslint/no-non-null-assertion': 0,
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['scripts/**'],
      },
    ],
    'import/prefer-default-export': 0,
    'json/*': ['error', 'allowComments'],
    'unicorn/no-fn-reference-in-iterator': 0,
    'unicorn/no-null': 0,
    'unicorn/no-reduce': 0,
    'unicorn/prevent-abbreviations': [
      'error',
      {
        replacements: {
          dev: {
            development: false,
          },
          err: {
            error: false,
          },
          prod: {
            production: false,
          },
          str: {
            string: false,
          },
        },
      },
    ],
  },
  overrides: [
    {
      files: ['*.js', '*.jsx'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 0,
      },
    },
  ],
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
