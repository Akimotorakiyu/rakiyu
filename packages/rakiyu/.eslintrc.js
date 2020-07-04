module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/base",
    "plugin:vue/vue3-recommended",
    "prettier",
    "prettier/vue",
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2020,
  },
  rules: {
    // "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    // "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off"
  },
};
