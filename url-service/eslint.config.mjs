import { defineConfig, globalIgnores } from "eslint/config";
import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import _import from "eslint-plugin-import";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([globalIgnores([
    "**/node_modules/",
    "**/dist/",
    "**/build/",
    "**/coverage/",
    "**/out/",
    "**/.tmp/",
    "**/.temp/",
    "**/.cache/",
    "**/.next/",
    "**/public/",
    "**/.env",
    "**/.env.*",
    "**/*.log",
    "**/.DS_Store",
    "**/Thumbs.db",
    "**/.idea/",
    "**/.vscode/",
    "**/*.swp",
    "**/*.snap",
    "**/*.tsbuildinfo",
    "**/reports/",
    "**/jest-coverage/",
    "**/test-results/",
    "**/npm-debug.log*",
    "**/yarn-debug.log*",
    "**/yarn-error.log*",
    "**/pnpm-debug.log*",
]), {
    extends: fixupConfigRules(
        compat.extends("eslint:recommended", "plugin:import/errors", "plugin:import/warnings"),
    ),

    plugins: {
        import: fixupPluginRules(_import),
    },

    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.node,
        },

        ecmaVersion: 12,
        sourceType: "module",
    },

    rules: {
        "no-unused-vars": "warn",
        "no-console": "off",
        semi: ["error", "always"],
    },
}]);