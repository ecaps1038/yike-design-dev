import { defineConfig } from 'vite';
import createVuePlugin from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Components from 'unplugin-vue-components/vite';
import vitePluginMarkdown from './plugins/vite-plugin-md';
import { YikeDevResolver } from './plugins/resolver';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.join(process.cwd(), './src'),
    },
  },
  plugins: [
    vueJsx(),
    vitePluginMarkdown(),
    createVuePlugin({
      include: [/\.(vue|md)$/],
      script: {
        defineModel: true,
      },
    }),
    Components({
      resolvers: [YikeDevResolver],
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        charset: false,
        additionalData: '@import (reference) "@yike/styles/index.less";',
      },
    },
  },
});
