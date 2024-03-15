## 快速上手

~### 安装方式

```
npm install --save-dev @yike-design/ui
```

### 按需引入

vite.config.ts

```

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { YikeResolver } from 'yike-design-resolver';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [YikeResolver()],
    }),
    Components({
      resolvers: [
        YikeResolver({
          sideEffect: true,
        }),
      ],
    }),
  ],
});



```

main.ts

```
import '@yike-design/ui/es/components/styles/index.less';

```
