## YkDrawer 抽屉

:::snippet
基本用法
你知道吗，抽屉有四种开法...
<DrawerPrimary/>
:::

:::snippet
使用插槽
使用插槽来完全自定义抽屉内容。
<DrawerSlot/>
:::

:::snippet
回调
监听 open 和 close 事件以实现回调或访问控制。
<DrawerCallback/>
:::

:::snippet
抽屉嵌套
抽屉可以像俄罗斯套娃一般地嵌套。
<DrawerMulti/>
:::

### API

| 参数       | 描述                       | 类型                             | 默认值  |
| ---------- | -------------------------- | -------------------------------- | ------- |
| placement  | 抽屉展开的方向             | 'right'｜'left'｜'top'｜'bottom' | 'right' |
| size       | 抽屉的高度或宽度           | string                           | '360px' |
| title      | 抽屉的顶部标题             | string                           | ''      |
| scrollable | 抽屉展开后 body 是否可滚动 | boolean                          | false   |
| closable   | 抽屉是否显示关闭按钮       | boolean                          | true    |
| escapable  | 抽屉是否能使用 ESC 键关闭  | boolean                          | true    |

### Slot

| 插槽名 | 描述           | 参数 |
| ------ | -------------- | ---- |
| header | 抽屉的顶部内容 | -    |
| footer | 抽屉的底部内容 | -    |
