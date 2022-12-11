const { FlatCompat } = require("@eslint/eslintrc")
const prettier = require("eslint-config-prettier")
const ts = require("@typescript-eslint/eslint-plugin")
const tsParser = require("@typescript-eslint/parser")

const compat = new FlatCompat()

module.exports = [
  ...compat.extends("next/core-web-vitals"),
  {
    rules: {
      ...prettier.rules,
      "react/display-name": "off",
    },
  },
  {
    files: ["src/**/*.ts", "src/**/*.tsx"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      parser: tsParser,
    },
    plugins: {
      "@typescript-eslint": ts,
    },
    rules: {
      ...ts.configs["recommended"].rules,
      ...ts.configs["eslint-recommended"].rules,
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  },
]
