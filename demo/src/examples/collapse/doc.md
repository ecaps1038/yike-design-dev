## YkCollapse 折叠面板

:::snippet
基本用法
在一个屏幕展示太多的信息可能会让人厌烦，但用上这个组件，即可轻松解决问题。
<CollapsePrimary/>
:::

:::snippet
嵌套
一棵折叠的树。
<CollapseMulti/>
:::

:::snippet
无边框
组件与人一样，没有条条框框会更完美。
<CollapseNoborder/>
:::

:::snippet
使用插槽
使用插槽来自定义内容。
<CollapseSlots/>
:::
### API

| 参数       | 描述                       | 类型                             | 默认值  |
| ---------- | -------------------------- | -------------------------------- | ------- |
| title      | 标题              | string                           | ' '      |
| active    | 是否激活            | boolean                          | false    |
| disabled   | 是否禁用           | boolean                          | false    |
| boder      | 是否有边框         | boolean                          | true    |


### 插槽

| 插槽名  | 描述           |
| ------- | -------------- |
| default | 自定义内容 |