import { FlatCompat } from '@eslint/eslintrc';
const compat = new FlatCompat();

export default [
    ...compat.extends(
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ),
    {
        files: ['**/*.ts'],
        languageOptions: {
            parserOptions: {
                project: './tsconfig.json',
                sourceType: 'module',
            },
        },
        rules: {
            '@typescript-eslint/interface-name-prefix': 'off',
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            'prettier/prettier': 'error',
        },
    },
];
