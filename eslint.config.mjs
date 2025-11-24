import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import perfectionist from "eslint-plugin-perfectionist";
import { defineConfig, globalIgnores } from "eslint/config";
import { importX } from "eslint-plugin-import-x";
import js from "@eslint/js";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    ".open-next/**",
  ]),

  {
    ...js.configs.recommended,
    ...importX.flatConfigs.recommended,
    ...importX.flatConfigs.typescript,
  },

  {
    files: ["app/**/*.{js,jsx,ts,tsx}"],
    ...perfectionist.configs["recommended-natural"],
  },
  {
    rules: {
      "func-style": [
        "error",
        "declaration",
        {
          allowArrowFunctions: false,
        },
      ],
    },
    files: ["app/**/*.{js,jsx,ts,tsx}"],
  },
]);

export default eslintConfig;
