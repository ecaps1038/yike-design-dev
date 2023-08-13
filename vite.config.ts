import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Jsx from '@vitejs/plugin-vue-jsx';

export default defineConfig({
  plugins: [
    vue({
      script: {
        defineModel: true,
      },
    }),
    Jsx(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
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
});
