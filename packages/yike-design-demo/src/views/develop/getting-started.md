## 快速上手

### 安装方式

```ts
npm install --save-dev @yike-design/ui
npm install --save-dev @yike-design/resovler
npm install --save-dev unplugin-auto-import
npm install --save-dev unplugin-vue-components

```

### 按需引入

> vite.config.ts

```ts
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { YikeResolver } from '@yike-design/resolver' // https://vitejs.dev/config/ export default

defineConfig({
  plugins: [
    vue(),
    AutoImport({ resolvers: [YikeResolver()] }),
    Components({ resolvers: [YikeResolver({ sideEffect: true })] }),
  ],
  css: {
    // css预处理器，方便直接使用组件样式变量（按需配置）
    preprocessorOptions: {
      less: {
        charset: false,
        additionalData:
          '@import "@yike-design/ui/es/components/styles/basis.less";',
      },
    },
  },
})
```

main.ts

```ts
import '@yike-design/ui/es/index.less'
// 引入全局方法
import { YkMessage, YkNotification } from '@yike-design/ui'

const app = createApp(App)

app.config.globalProperties.$notification = YkNotification
app.config.globalProperties.$message = YkMessage
```

package.json

```json
{
  "@yike-design-ui": "^0.0.8",
  "@yike-design/resolver": "^0.0.1",
  "unplugin-vue-components": "^0.26.0",
  "unplugin-auto-import": "^0.17.5"
}
```
