import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import createVuePlugin from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vitePluginMarkdown from './plugins/vite-plugin-md.mjs';
import Components from 'unplugin-vue-components/vite';
import { YikeDevResolver } from './plugins/resolver';
import path from 'path';
const vuePlugin = createVuePlugin({ include: [/\.vue$/, /\.md$/] }); // 配置可编译 .vue 与 .md 文件

const compDir = path
  .resolve(__dirname, '..\\packages\\yike-design-ui\\src\\components')
  .replace(/\\/g, '/');

const indexDir = path
  .resolve(__dirname, '..\\packages\\yike-design-ui\\src')
  .replace(/\\/g, '/');

const aliasDir = fileURLToPath(new URL('./src', import.meta.url));

export default defineConfig({
  resolve: {
    alias: [
      {
        find: /^..\/packages\/yike-design-ui\/src\/components\/svg-icon\/index\.ts$/,
        replacement: `${compDir}/svg-icon/index.ts`,
      },
      {
        find: /^..\/packages\/yike-design-ui\/src\/components\/(.*)$/,
        replacement: `${compDir}/$1.ts`,
      },
      {
        find: /^..\/packages\/yike-design-ui\/src\/index\.ts$/,
        replacement: `${indexDir}/index.ts`,
      },
      {
        find: '@',
        replacement: aliasDir,
      },
    ],
  },
  plugins: [
    vitePluginMarkdown(),
    vuePlugin,
    vueJsx() as any,
    Components({
      resolvers: [YikeDevResolver],
    }),
  ],
  css: {
    // css预处理器
    preprocessorOptions: {
      less: {
        charset: false,
        additionalData: '@import (reference) "./src/style/color/colors.less";',
      },
    },
  },
});
