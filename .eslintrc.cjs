/** @type {import("eslint").Linter.Config} */
const config = {
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        // "project": true,
        "project": "./tsconfig.json",
    },
    // "ignorePatterns": ["*.css", "*.scss"],
    "plugins": [
        "@typescript-eslint",
        "react",
        "react-hooks",
        "creatr"
    ],
    "globals": {
        "React": "readonly"
    },
    "settings": {
        "react": {
            "version": "detect",
        },
        "import/resolver": {
            "typescript": {
                "alwaysTryTypes": true,
                "project": "./tsconfig.json",
                "moduleDirectory": ["node_modules", "src"]
            },
            "node": {
                "extensions": [".js", ".jsx", ".ts", ".tsx"]
            }
        }
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
        "plugin:creatr/recommended"
    ],
    "rules": {
        "react/react-in-jsx-scope": "off",
        "no-duplicate-imports": "off",
        "import/no-duplicates": "off",
        "no-undef": "error",
        "no-unused-vars": "off",
        "import/no-unresolved": [
            "error",
            { "ignore": ["^geist/"] } // Add specific packages to ignore
        ],
        "import/no-named-as-default": "off",
        "react/prop-types": "off",
        "@next/next/no-img-element": "off",
        "import/named": "error",
        "react/no-unescaped-entities": "off",
        "@typescript-eslint/no-unused-vars": "error",
        "prefer-const": "error",
        "@typescript-eslint/no-explicit-any": "error",
        "import/no-named-as-default-member": "error",
        "react/no-unknown-property": "off",
        "@typescript-eslint/ban-ts-comment": "error",
        "@typescript-eslint/no-empty-object-type": "error",
        'import/default': 'error',
        'import/namespace': 'error',
        // Additional strict rules
        "@typescript-eslint/no-unsafe-assignment": "error",
        "@typescript-eslint/no-unsafe-call": "error",
        "@typescript-eslint/no-unsafe-member-access": "error",
        "@typescript-eslint/no-unsafe-return": "error",
        "@typescript-eslint/no-unsafe-argument": "error",
        "@typescript-eslint/no-floating-promises": "error",
        "@typescript-eslint/await-thenable": "error",
        "@typescript-eslint/require-await": "error"
    },
    "env": {
        "browser": true,
        "node": true
    }
}
module.exports = config;