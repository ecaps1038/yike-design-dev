import { defineConfig } from 'vite';
import createVuePlugin from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vitePluginMarkdown from './plugins/vite-plugin-md';
import Components from 'unplugin-vue-components/vite';
import { join } from 'path';
import { YikeDevResolver } from '@yike-design/resolver';

export default defineConfig({
  resolve: {
    alias: {
      '@': join(process.cwd(), './src'),
    },
  },
  plugins: [
    vitePluginMarkdown(),
    createVuePlugin({
      include: [/\.(vue|md)$/],
      script: {
        defineModel: true,
      },
    }),
    vueJsx(),
    Components({
      dirs: ['./src/components', './src/views'],
      resolvers: [YikeDevResolver],
    }),
  ],
  css: {
    // css预处理器
    preprocessorOptions: {
      less: {
        charset: false,
        additionalData:
          '@import (reference) "@yike-design/ui/components/styles/index.less";',
      },
    },
  },
  build: {
    rollupOptions: {
      external: ['env.d.ts'],
    },
  },
  base: '/',
});
