const { FlatCompat } = require("@eslint/eslintrc")
const prettier = require("eslint-config-prettier")

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
    files: ["src/**/*.js", "src/**/*.ts", "src/**/*.tsx"],
  },
]
