import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import Sitemap from 'vite-plugin-sitemap'
import fs from 'fs'
import path from 'path'

// ブログ記事のパスを動的に取得
const postsPath = path.resolve(__dirname, 'src/blog/posts')
const postFiles = fs.readdirSync(postsPath).filter(file => file.endsWith('.md'))
const dynamicRoutes = postFiles.map(file => `/blog/${file.replace('.md', '')}`)

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Sitemap({
      hostname: 'https://d-studylab.jp',
      dynamicRoutes: dynamicRoutes,
      robots: [
        {
          userAgent: '*',
          allow: '/',
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
