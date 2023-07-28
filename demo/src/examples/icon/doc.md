## YkIcon 图标

### 基本用法

Yike 图标是一个独立的库，需要额外引入并注册使用。

```js
import { createApp } from 'vue'
// 全局注入 icon
import Icon from 'yike-design-ui/es/components/svg-icon'
import App from './App.vue'

const app = createApp(App)
app.use(Icon)
app.mount('#app')
```

注册后可以通过 `<icon-xx />` 的形式即可使用 Icon。
图标使用 `<svg/>` 方式渲染，可以直接设置 style, class 以及 `<svg/>` 属性。

:::snippet
基础使用

<IconPrimary/>
:::

### icon-xx props

| 参数           | 描述     | 类型                                                    | 默认值  |
| -------------- | -------- | ------------------------------------------------------- | ------- |
| strokeWidth    | 线宽     | number                                                  | 4       |
| strokeLinecap  | 端点类型 | 'butt' \| 'round' \| 'square'                           | 'butt'  |
| strokeLinejoin | 拐角类型 | 'arcs' \| 'bevel' \| 'miter' \| 'miter-clip' \| 'round' | 'miter' |
| rotate         | 旋转角度 | number                                                  | -       |
| spin           | 是否旋转 | number                                                  | 4       |
| size           | 尺寸     | number \| string                                        | -       |
