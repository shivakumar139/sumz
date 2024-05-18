module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "prettier"],
  rules: {
    "prettier/prettier": [
      "error",
      { singleQuote: false, useTabs: true, tabWidth: 4 },
    ],
    quotes: ["error", "double", { avoidEscape: true }],
    indent: ["error", "tab"], // Use tabs for indentation
    "@typescript-eslint/indent": ["error", "tab"], // Ensure TypeScript files follow the same indentation
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
};
