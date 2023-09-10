## YkIcon 图标

在这汇总 Yike Design 内置的图标，将不定期更新。点击图标进行复制，**请注意，图标名称和组件名称不同噢~**

:::pure
<IconList/>
:::

### 基本用法

Yike 图标是一个独立的库，需要额外引入并注册使用。

```js
import { createApp } from 'vue'
// 全局注入 icon
import Icon from '@yike-design/ui/es/components/svg-icon'
import App from './App.vue'

const app = createApp(App)
app.use(Icon)
app.mount('#app')
```

注册后通过 `<icon-xx />` 的形式即可使用 Icon。
图标使用 `<svg/>` 方式渲染，可以直接设置 style, class 以及 `<svg/>` 属性。

:::snippet
基础使用

<IconPrimary/>
:::

### API

| 参数        | 描述     | 类型             | 默认值 |
| ----------- | -------- | ---------------- | ------ |
| strokeWidth | 线宽     | number           | 0      |
| rotate      | 旋转角度 | number           | -      |
| size        | 尺寸     | number \| string | -      |
