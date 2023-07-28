import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import createVuePlugin from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vitePluginMarkdown from './plugins/vite-plugin-md.mjs';
import Components from 'unplugin-vue-components/vite';
import path from 'path';
const vuePlugin = createVuePlugin({ include: [/\.vue$/, /\.md$/] }); // 配置可编译 .vue 与 .md 文件

const compDir = path
  .resolve(__dirname, '..\\packages\\yike-design-ui\\src\\components')
  .replace(/\\/g, '/');

const indexDir = path
  .resolve(__dirname, '..\\packages\\yike-design-ui\\src')
  .replace(/\\/g, '/');

const aliasDir = fileURLToPath(new URL('./src', import.meta.url));

function sideEffects(from: string) {
  console.log('`${from}/style/index`: ', `${from}/style/index`);
  return `${from}/style/index`;
}

const kebabize = (str: string) =>
  str.replace(
    /[A-Z]+(?![a-z])|[A-Z]/g,
    ($, ofs) => (ofs ? '-' : '') + $.toLowerCase(),
  );

export default defineConfig({
  resolve: {
    alias: [
      {
        find: /^..\/packages\/yike-design-ui\/src\/components\/(.*)$/,
        replacement: `${compDir}/$1.ts`,
        customResolver(resolve) {
          return resolve;
        },
      },
      {
        find: /^..\/packages\/yike-design-ui\/src\/index\.ts$/,
        replacement: `${indexDir}/index.ts`,
        customResolver(resolve) {
          return resolve;
        },
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
      resolvers: [
        (componentName) => {
          if (componentName.startsWith('Yk')) {
            let realName = kebabize(componentName.slice(2));
            if (['text', 'title', 'paragraph'].includes(realName)) {
              realName = 'typography';
            }
            const from = `../packages/yike-design-ui/src/index.ts`;
            return {
              name: componentName,
              from,
              sideEffects: sideEffects(
                `../packages/yike-design-ui/src/components/${realName}`,
              ),
            };
          }
        },
      ],
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
