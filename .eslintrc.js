module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "linebreak-style": 0
  },
  overrides: [
    {
      files: [
        '*/_tests_/.{j,t}s?(x)',
        '*/tests/unit//.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};