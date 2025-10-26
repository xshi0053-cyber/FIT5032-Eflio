// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  base: '/FIT5032-Eflio/',              // ← 仓库名，区分大小写
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)), // ← 关键
    },
  },
})
