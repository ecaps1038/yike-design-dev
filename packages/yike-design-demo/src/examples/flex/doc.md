## YkFlex 弹性布局

:::snippet
基本用法
通过 `gap` 设置间距，`justify` / `wrap` 控制排列与换行。
<FlexBasic/>
:::

:::snippet
对齐方式
`justify` 控制主轴对齐，`align` 控制交叉轴对齐，`vertical` 切换纵向排列。
<FlexAlign/>
:::

### API

| 参数     | 描述                                | 类型                                                                | 默认值    |
| -------- | ----------------------------------- | ------------------------------------------------------------------- | --------- |
| vertical | 是否纵向排列                        | boolean                                                             | `false`   |
| justify  | 主轴对齐                            | `start` \| `end` \| `center` \| `space-between` \| `space-around` \| `space-evenly` | `start` |
| align    | 交叉轴对齐                          | `start` \| `end` \| `center` \| `baseline` \| `stretch`             | `stretch` |
| gap      | 间距，支持尺寸关键字、数字（px）或 CSS 长度 | `ss` \| `s` \| `m` \| `l` \| `xl` \| number \| string          | -         |
| wrap     | 是否换行                            | boolean                                                             | `false`   |
| inline   | 是否使用 inline-flex                | boolean                                                             | `false`   |
