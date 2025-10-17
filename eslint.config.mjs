import {dirname} from "path";
import {fileURLToPath} from "url";
import {FlatCompat} from "@eslint/eslintrc";
import unusedImports from "eslint-plugin-unused-imports";
import simpleImportSort from "eslint-plugin-simple-import-sort";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: {},
});

const eslintConfig = [
    /* 1. On ignore d’abord le dossier généré */
    {ignores: ['src/services/graphql/generated/**']},

    /* 2. Config Next + TypeScript */
    ...compat.extends(
        "next/core-web-vitals",
        "next/typescript",
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
    ),

    /* 3. Règles communes */
    {
        files: ["**/*.{js,ts,jsx,tsx}"],
        plugins: {
            "unused-imports": unusedImports,
            "simple-import-sort": simpleImportSort,
        },
        rules: {
            "quotes": ["error", "single", {allowTemplateLiterals: true}],
            "no-trailing-spaces": "error",
            "no-tabs": 0,
            "comma-dangle": ["error", "never"],
            "object-curly-spacing": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "no-debugger": "error",
            "no-unused-vars": "off",
            "@typescript-eslint/no-empty-object-type": "off",
            "@typescript-eslint/no-unused-vars": "off",
            "unused-imports/no-unused-imports": "error",
            "@typescript-eslint/ban-ts-comment": "off",
            "react-hooks/exhaustive-deps": "off",
            "react/no-unescaped-entities": "off",
            "simple-import-sort/imports": "error",
            "simple-import-sort/exports": "error",
            "semi": 'off',
            "@next/next/no-img-element": "off"
        },
        settings: {
            "import/resolver": {
                node: {
                    extensions: [".js", ".jsx", ".ts", ".tsx"],
                },
            },
        },
    },
];

export default eslintConfig;
