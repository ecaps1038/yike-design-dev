import { defineConfig } from 'vite';
import createVuePlugin from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vitePluginMarkdown from './plugins/vite-plugin-md';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
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
    AutoImport({
      // 当前 demo 没有使用自动导入的 API，关闭 d.ts 生成避免构建时反复改写
      // 已提交的 auto-imports.d.ts（`pnpm build:demo` 会把它写脏）。
      dts: false,
      resolvers: [YikeDevResolver],
    }),
    Components({
      resolvers: [YikeDevResolver],
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        charset: false,
        // 引入公共样式和变量
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
