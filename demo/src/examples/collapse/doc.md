## YkCollapse 折叠面板

:::snippet
基本用法
在一个屏幕展示太多的信息可能会让人厌烦，但用上这个组件，即可轻松解决问题。
<CollapsePrimary/>
:::

:::snippet
嵌套
折叠面板可以像俄罗斯套娃一般地嵌套。
<CollapseMulti/>
:::

:::snippet
无边框
通过 `border` 控制折叠面板组是否显示边框线。默认为 `true`。
<CollapseNoborder/>
:::

:::snippet
使用插槽
使用插槽来自定义内容。
<CollapseSlots/>
:::

### API

#### CollapseGroup Props

| 参数   | 描述         | 类型    | 默认值 |
| ------ | ------------ | ------- | ------ |
| border | 是否显示边框 | boolean | true   |

#### Collapse Props

| 参数     | 描述     | 类型    | 默认值 |
| -------- | -------- | ------- | ------ |
| title    | 标题     | string  | ''     |
| active   | 是否激活 | boolean | false  |
| disabled | 是否禁用 | boolean | false  |

#### Collapse Slots

| 插槽名 | 描述             |
| ------ | ---------------- |
| right  | 标题栏右侧的内容 |
