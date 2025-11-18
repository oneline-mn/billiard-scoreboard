import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import perfectionist from "eslint-plugin-perfectionist";
import { defineConfig, globalIgnores } from "eslint/config";
import { importX } from "eslint-plugin-import-x";

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
    files: ["app/**/*.{js,ts,jsx,tsx,vue,svelte}"],
    plugins: {
      perfectionist,
      "import-x": importX,
    },
    extends: ["import-x/flat/recommended"],
    settings: {
      "import-x": {
        alias: {
          "@": "./",
        },
      },
      "import-x/resolver": {
        typescript: true,
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "error",
      "perfectionist/sort-objects": [
        "error",
        {
          partitionByNewLine: true,
          type: "alphabetical",
        },
      ],
    },
  },
]);

export default eslintConfig;
