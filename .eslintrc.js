module.exports = {
    env: {
      browser: true,
      es2021: true,
    },
    extends: [
      // "prettier",
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:react/recommended",
    ],
    overrides: [
      {
        env: {
          node: true,
        },
        files: [".eslintrc.{js,cjs}"],
        parserOptions: {
          sourceType: "script",
        },
      },
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: ["prettier", "react", "react-hooks", "@typescript-eslint", "react"],
    rules: {
      indent: ["error", 2],
      "no-unused-vars": 2,
      "no-console": "off",
      "react/display-name": "off",
      "max-len": [
        1,
        120,
        2,
        {
          ignoreComments: true,
        },
      ],
      "react/jsx-filename-extension": [
        1,
        {
          extensions: [".js", ".jsx", ".tsx"],
        },
      ],
      "prettier/prettier": [
        "error",
        {
          singleQuote: false,
          printWidth: 120,
        },
      ],
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react/function-component-definition": [
        2,
        {
          namedComponents: "arrow-function",
          unnamedComponents: "arrow-function",
        },
      ],
      "no-param-reassign": [
        "error",
        {
          props: true,
          ignorePropertyModificationsFor: ["state"],
        },
      ],
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  };
  