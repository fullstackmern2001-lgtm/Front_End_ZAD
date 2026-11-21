module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "react/react-in-jsx-scope": "off", // مهم مع Vite
    "no-unused-vars": "warn",
    "no-console": "warn",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
