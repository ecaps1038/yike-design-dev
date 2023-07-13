import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    // css预处理器
    preprocessorOptions: {
      less: {
        charset: false,
        // additionalData: '@import "./src/assets/base.less";',
        additionalData: '@import "./src/yike-design/assets/style/yk-index.less";',
      },
    },
  },
  build: {
    minify:'terser',
    // 清除console等多余代码
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
  }
})
