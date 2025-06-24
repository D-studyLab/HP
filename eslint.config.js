// eslint.config.js  (ESLint v9 / Flat Config 推奨構成)
import eslintPluginVue from 'eslint-plugin-vue'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import vuePrettierConfig from '@vue/eslint-config-prettier'

export default [
  // JavaScript/TypeScript 共通ルール（@eslint/js 推奨セット）
  {
    ignores: ['dist', 'node_modules'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    rules: {
      'no-unused-vars': 'warn'
    }
  },

  // Vue ファイル用
  {
    files: ['**/*.vue'],
    plugins: { vue: eslintPluginVue },
    processor: eslintPluginVue.processors['.vue'],
    rules: eslintPluginVue.configs['vue3-essential'].rules
  },

  // ここから Prettier 連携（必ず最後）
  vuePrettierConfig,
  {
    plugins: { prettier: eslintPluginPrettier },
    rules: { 'prettier/prettier': 'error' }
  }
]
