## YkAnchor 锚点

:::snippet
基本用法
展示基本用法
<AnchorPrimary/>
:::

:::snippet
无轴线
不显示左侧导航轴
<AnchorNobar/>
:::

:::snippet
滚动容器
默认监听 `window` 为滚动容器，也可以指定为 `null`，不进行容器滚动监听。
<AnchorScrollEl/>
:::

:::snippet
自定义滚动容器
允许指定 `offset`，默认为 `0`，表示被锚定元素提前多少像素出现。
<AnchorScrollCustomEl/>
:::

### API

| 参数         | 描述                                        | 类型                        | 默认值   |
| ------------ | ------------------------------------------- | --------------------------- | -------- |
| `anchors`    | 锚点集合数组                                | `AnchorOption[]`            | `-`      |
| `show-marker` | 是否展示轴线                                | `boolean`                   | `true`   |
| `scroll-el`   | 要监听的滚动容器                            | `HTMLElement｜Window｜null` | `window` |
| `offset`     | 表示被锚定元素的出现位置的偏移量            | `number`                    | `0`      |
| `ms`         | 滚动防抖延时，`scrollEl` 不为 `null` 时生效 | `number`                    | `100`    |
| `scrollbar`  | 内置滚动条                                  | `ScrollbarProps\|boolean`   | `false`  |
