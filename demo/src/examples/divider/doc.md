## YkDivider 分割线

:::snippet
基本用法
这里展示水平分割线基本用法
<DividerPrimary/>
:::

:::snippet
设置标题
可以在分割线上自定义文本内容
<DividerHorizontal/>
:::

:::snippet
设置分割线样式
可以在分割线上自定义分割线样式 含分割线类型，分割线宽度
<DividerStyle/>
:::
:::snippet
设置竖直方向分割线
可以设置分割线竖直方向
<DividerVertical/>
:::

### API

| 参数            | 描述           | 类型   | 可选值                       | 默认值       |
| --------------- | -------------- | ------ | ---------------------------- | ------------ |
| contentPosition | 自定义文本位置 | string | `left`、`middle`、`right`    | `left`       |
| width           | 分割线宽度     | number |                              | `1`          |
| height          | 分割线高度     | number |                              | `1em`        |
| borderStyle     | 分割线类型     | number | `soild`、`dotted` 、`double` | `soild`      |
| direction       | 分割线方向     | string | `horizontal` 、`vertical`    | `horizontal` |
