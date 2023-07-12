import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite'
import createVuePlugin from '@vitejs/plugin-vue';
import vitePluginMarkdown from './plugins/vite-plugin-md'
import Components from 'unplugin-vue-components/vite'
const vuePlugin = createVuePlugin({ include: [/\.vue$/, /\.md$/] }); // 配置可编译 .vue 与 .md 文件

const compDir = fileURLToPath(new URL('../packages/yike-design-ui/src/index.ts', import.meta.url));
const aliasDir = fileURLToPath(new URL('./src', import.meta.url));


export default defineConfig({
  plugins: [vitePluginMarkdown(), vuePlugin, Components({
    resolvers: [
      (componentName) => {
        if (componentName.startsWith('Yk'))
          return { name: componentName, from: compDir }
      },
    ],
  })
  ],
  resolve: {
    alias: {
      '@': aliasDir
    }
  },
  css: {
    // css预处理器
    preprocessorOptions: {
      less: {
        charset: false,
        additionalData: '@import "../packages/yike-design-ui/src/styles/index.less";',
      }
    }
  },
})
