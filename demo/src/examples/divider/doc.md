## YkDivider 分割线

:::snippet
基本用法
展示水平分割线基本用法。
<DividerPrimary/>
:::

:::snippet
标题设置
可以在分割线上自定义文本内容。
<DividerHorizontal/>
:::

:::snippet
分割线样式
在分割线上自定义分割线样式，含分割线类型和分割线宽度。
<DividerStyle/>
:::
:::snippet
竖分割线
设置竖方向分割线。
<DividerVertical/>
:::

### API

| 参数            | 描述           | 类型   | 可选值                       | 默认值       |
| --------------- | -------------- | ------ | ---------------------------- | ------------ |
| content-position | 自定义文本位置 | string | `left`、`middle`、`right`    | `left`       |
| width           | 分割线宽度     | number |                              | `1`          |
| height          | 分割线高度     | number |                              | `1em`        |
| border-style     | 分割线类型     | number | `soild`、`dotted` 、`double` | `soild`      |
| direction       | 分割线方向     | string | `horizontal` 、`vertical`    | `horizontal` |
