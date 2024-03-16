## 快速上手

### 安装方式

```
npm install --save-dev @yike-design/ui
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
})
```

main.ts

```ts
import '@yike-design/ui/es/components/styles/index.less'
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
