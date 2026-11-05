import js from "@eslint/js";
import globals from "globals";

export default [
    {
        ignores: ["node_modules/**"],
    },

    js.configs.recommended,

    // Browser JavaScript files
    {
        files: ["js/**/*.js", "cart/**/*.js"],

        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.browser,
            },
        },
    },

    // Node.js test files
    {
        files: ["tests/**/*.js"],

        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.node,
                structuredClone: "readonly",
            },
        },
    },
];
