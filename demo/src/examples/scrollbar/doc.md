## YkScrollbar 滚动条

:::snippet
基本用法
滚动条基本用法。
<ScrollbarPrimary/>
:::

:::snippet
横向滚动
当内容宽度大于容器宽度时。
<ScrollbarHorizontal/>
:::

:::snippet
总是显示
总是显示滚动条。
<ScrollbarAlways/>
:::

:::snippet
原生滚动条
原生滚动条可以获得更好的性能。
<ScrollbarNative/>
:::

### API

| 参数                 | 描述                                     | 类型                 | 默认值 |
| -------------------- | ---------------------------------------- | -------------------- | ------ |
| `height`             | 容器高度                                 | `number｜string`     | 100%   |
| `native`             | 是否显示原生滚动条                       | `boolean`            | false  |
| `always`             | 是否总是显示滚动条                       | `boolean`            | false  |
| `noresize`           | 容器高度不会变化可以开启此选项，优化性能 | `boolean`            | false  |
| `on-scroll(@scroll)` | 滚动事件                                 | `(e: Event) => void` | -      |

### Methods

| 事件名     | 说明                                                                          | 类型                                  |
| ---------- | ----------------------------------------------------------------------------- | ------------------------------------- |
| `scrollTo` | [参考 MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollTo) | `(options?: ScrollToOptions) => void` |
| `scrollBy` | [参考 MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollBy) | `(options?: ScrollToOptions) => void` |
