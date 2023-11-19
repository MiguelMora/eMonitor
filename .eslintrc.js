module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:prettier/recommended',
    'plugin:vue/base',
    'plugin:vuetify/base',
  ],
  // required to lint *.vue files
  plugins: [],
  rules: {
    'vue/multi-word-component-names': 'off',
  },
}
