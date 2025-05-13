## 快速上手

### 安装方式

```ts
npm install --save-dev @yike-design/ui
npm install --save-dev @yike-design/resovler
npm install --save-dev unplugin-auto-import
npm install --save-dev unplugin-vue-components
npm install -D less
```

### 按需引入

> vite.config.ts

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { YikeResolver } from '@yike-design/resolver' // https://vitejs.dev/config/ export default

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({ resolvers: [YikeResolver] }),
    Components({ resolvers: [YikeResolver] }),
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
  "dependencies": {
    "@yike-design/resolver": "^0.0.3",
    "@yike-design/ui": "^0.0.21",
    "dayjs": "^1.11.13",
    "unplugin-auto-import": "^19.2.0",
    "unplugin-vue-components": "^28.5.0",
    "vue": "^3.5.13"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.2.3",
    "@vue/tsconfig": "^0.7.0",
    "less": "^4.3.0",
    "typescript": "~5.8.3",
    "vite": "^6.3.5",
    "vue-tsc": "^2.2.8"
  }
}
```
