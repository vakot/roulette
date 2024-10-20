import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const compat = new FlatCompat({
  baseDirectory: path.dirname(fileURLToPath(import.meta.url)),
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

const config = [
  ...compat.extends(
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier'
  ),
  {
    ignores: ['node_modules/*', '.next/*', '.dist/*', '.github/*', '.husky/*'],
  },
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
    },

    rules: {
      /**
       * @description disabled to fix the error with next.js pages
       */
      '@next/next/no-duplicate-head': 'off',

      /**
       * @description avoid using any type but still allow it
       */
      '@typescript-eslint/no-explicit-any': 'warn',

      /**
       * @description disabled args and spread errors because it's common to use _ or props as a placeholder
       */
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'none',
          ignoreRestSiblings: true,
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
        },
      ],

      /**
       * @description disabled because each component has props type declaration and it can be empty
       */
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },
]

export default config
