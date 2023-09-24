import { defineConfig } from 'vite';
import createVuePlugin from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vitePluginMarkdown from './plugins/vite-plugin-md';
import Components from 'unplugin-vue-components/vite';
import YikeDevResolver from './plugins/resolver';
import { join } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': join(process.cwd(), './src'),
      '@yike-design/ui': join(process.cwd(), '../packages/yike-design-ui'),
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
      dirs: [
        './src/components',
        './src/views',
        '@yike-design/ui/src/components',
      ],
      resolvers: [YikeDevResolver],
    }),
  ],
  css: {
    // css预处理器
    preprocessorOptions: {
      less: {
        charset: false,
        additionalData:
          '@import (reference) "@yike-design/ui/src/components/styles/index.less";',
      },
    },
  },
  build: {
    rollupOptions: {
      external: ['env.d.ts'],
    },
  },
  base: './',
});
