// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/FIT5032-Eflio/',   // 仓库名要完全匹配（区分大小写）
})
