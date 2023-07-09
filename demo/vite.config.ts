import { resolve } from 'node:url'
import { defineConfig } from 'vite'
import createVuePlugin from '@vitejs/plugin-vue';
import vitePluginMarkdown from './plugins/vite-plugin-md'
const vuePlugin = createVuePlugin({ include: [/\.vue$/, /\.md$/] }); // 配置可编译 .vue 与 .md 文件

export default defineConfig({
  plugins: [vitePluginMarkdown(), vuePlugin],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'demo/src')
    }
  },
  css: {
    // css预处理器
    preprocessorOptions: {
      less: {
        charset: false,
        additionalData: '@import "./src/style/yk-index.less";',
      }
    }
  },
})
