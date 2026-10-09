import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import prettier from 'eslint-config-prettier/flat'
import boundaries from 'eslint-plugin-boundaries'

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: { boundaries },
    settings: {
      'import/resolver': { typescript: { alwaysTryTypes: true } },
      'boundaries/include': ['src/**/*'],
      'boundaries/elements': [
        { type: 'app', pattern: 'src/app/**/*' },
        { type: 'feature-model', pattern: 'src/features/*/model/**/*' },
        { type: 'feature-ui', pattern: 'src/features/*/components/**/*' },
        { type: 'shared', pattern: 'src/shared/**/*' },
      ],
    },
    rules: {
      'boundaries/element-types': [
        2,
        {
          default: 'allow',
          rules: [
            {
              from: ['feature-model'],
              disallow: ['feature-ui', 'app'],
              message: 'Domain model cannot import UI components or App routes!',
            },
            {
              from: ['shared'],
              disallow: ['feature-model', 'feature-ui', 'app'],
              message: 'Shared modules cannot import from features or app!',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/features/*/model/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['react', 'react-dom', 'next', 'next/*'],
              message: 'Domain logic (model/) must not depend on React or Next.',
            },
          ],
        },
      ],
    },
  },
  prettier,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
])