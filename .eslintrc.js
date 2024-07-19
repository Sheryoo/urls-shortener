module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:@typescript-eslint/recommended", "prettier"
    ],
    plugins: [
        "@typescript-eslint",
        "prettier",
        "import",
      ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  rules: {},
};
 