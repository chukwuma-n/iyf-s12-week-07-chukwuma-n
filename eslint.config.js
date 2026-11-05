import js from "@eslint/js";
import globals from "globals";

export default [
    {
        ignores: ["node_modules/**"],
    },

    js.configs.recommended,

    {
        files: ["js/**/*.js"],

        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.browser,
            },
        },
    },

    {
        files: ["tests/**/*.js"],

        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.node,
            },
        },
    },
];
