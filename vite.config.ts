/// <reference types="vitest" />

import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default defineConfig((_mode) => {
  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    css: {
      // css预处理器
      preprocessorOptions: {
        less: {
          charset: false,
          additionalData:
            '@import "./src/yike-design/assets/style/yk-index.less";',
        },
      },
    },
    build: {
      minify: 'terser',
      // 清除console等多余代码
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
    test: {
      // enable jest-like global test APIs
      globals: true,
      // simulate DOM with happy-dom
      // (requires installing happy-dom as a peer dependency)
      environment: 'happy-dom',
    },
  };
});
