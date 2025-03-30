module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "next/core-web-vitals",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "react", "jsx-a11y", "import"],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    // React rules
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "react/display-name": "off",
    "react/jsx-curly-brace-presence": ["error", { props: "never", children: "never" }],

    // TypeScript rules
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/ban-ts-comment": "warn",

    // Import rules
    // "import/order": [
    //   "error",
    //   {
    //     groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
    //     "newlines-between": "always",
    //     alphabetize: { order: "asc", caseInsensitive: true },
    //   },
    // ],

    // General rules
    // "no-console": ["warn", { allow: ["warn", "error"] }],
    eqeqeq: ["error", "always"],
  },
  overrides: [
    {
      files: ["*.js"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
      },
    },
  ],
}

