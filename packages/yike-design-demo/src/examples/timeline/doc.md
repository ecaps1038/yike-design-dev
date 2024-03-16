## YkTimeline 时间线

:::snippet
基本使用

<TimelineDefault/>
:::

:::snippet
倒转

<TimelineReverse/>
:::

:::snippet
当某个标题下有二级内容

<TimelineContent/>
:::

:::snippet
内容可以放置在左边

<TimelineLeft/>
:::

:::snippet
水平时间线

<TimelineHorizontal/>
:::

:::snippet
内容交错放置在两边

<TimelineAlternate/>
:::

:::snippet
自定义节点颜色

<TimelineDotColor/>
:::

:::snippet
自定义节点

<TimelineDot/>
:::

:::snippet
自定义轴线样式

<TimelineLineType/>
:::

:::snippet
pending

<TimelinePending/>
:::

### API

#### Timeline Props

| 参数       | 描述                                                                   | 类型                                               | 默认值 |
| ---------- | ---------------------------------------------------------------------- | -------------------------------------------------- | ------ |
| horizontal | 水平的                                                                 | boolean                                            | false  |
| placement  | 文字位置，竖直时仅 `left \| right` 生效，水平时仅 `top \| bottom` 生效 | `'left' \| 'right'\| 'top'\|'bottom'\|'alternate'` |        |
| reverse    | 倒转                                                                   | boolean                                            | false  |

#### TimelineItem Props

| 参数     | 描述                 | 类型                           | 默认值  |
| -------- | -------------------- | ------------------------------ | ------- |
| title    | 标题                 | string                         | -       |
| content  | 内容                 | string                         | -       |
| time     | 时间                 | string                         | -       |
| lineType | 连接线样式           | `'solid'\| 'dashed'\|'dotted'` | 'solid' |
| dotColor | 节点颜色             | string                         | -       |
| pending  | 将节点转换成 pending | boolean                        | false   |

### Slot

#### Timeline Slots

| 参数    | 描述       |
| ------- | ---------- |
| title   | 自定义标题 |
| content | 自定义内容 |
| title   | 自定义时间 |
| dot     | 自定义节点 |
