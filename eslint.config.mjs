import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
   {
      files: ["**/*.{js,jsx,ts,tsx}"],
      languageOptions: {
         parser: tseslint.parser,
         parserOptions: {
            project: "./tsconfig.json",
         },
         globals: globals.browser,
      },
      plugins: {
         react: pluginReact,
         "@typescript-eslint": tseslint.plugin,
      },
      extends: [
         js.configs.recommended,
         ...tseslint.configs.recommended,
         pluginReact.configs.flat.recommended,
      ],
      settings: {
         react: {
            version: "detect",
         },
      },
      rules: {
         "react/react-in-jsx-scope": "off",
         "@typescript-eslint/no-unused-vars": ["warn"],
         "@typescript-eslint/explicit-function-return-type": ["error"],
         "@typescript-eslint/typedef": [
            "error",
            {
               arrayDestructuring: false,
               arrowParameter: true,
               memberVariableDeclaration: false,
               objectDestructuring: false,
               parameter: true,
               propertyDeclaration: true,
               variableDeclaration: false,
               variableDeclarationIgnoreFunction: false,
            },
         ],
      },
   },
   {
      files: ["webpack.config.*"],
      languageOptions: { globals: globals.node },
   },
]);
