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

:::snippet
手风琴模式
通过 `accordion` 开启手风琴模式，配合 `v-model` 绑定当前展开面板的 `name`。
<CollapseAccordion/>
:::

### API

#### CollapseGroup Props

| 参数         | 描述                                   | 类型                          | 默认值 |
| ------------ | -------------------------------------- | ----------------------------- | ------ |
| border       | 是否显示边框                           | boolean                       | true   |
| accordion    | 是否开启手风琴模式                     | boolean                       | false  |
| modelValue   | 展开的面板 name，支持 `v-model`        | `CollapseItemKey` \| `CollapseItemKey[]` | - |
| defaultValue | 非受控模式下的默认展开项               | `CollapseItemKey` \| `CollapseItemKey[]` | - |

#### CollapseGroup Events

| 事件名            | 描述             | 回调参数                                    |
| ----------------- | ---------------- | ------------------------------------------- |
| update:modelValue | 展开项变化       | `CollapseItemKey \| CollapseItemKey[] \| undefined` |
| change            | 展开项变化       | `CollapseItemKey \| CollapseItemKey[] \| undefined` |

#### Collapse Props

| 参数     | 描述                                   | 类型                | 默认值 |
| -------- | -------------------------------------- | ------------------- | ------ |
| title    | 标题                                   | string              | ''     |
| name     | 面板标识，用于 Group 的 v-model        | `CollapseItemKey`   | -      |
| active   | 是否展开（独立使用时可 `v-model:active`） | boolean           | false  |
| disabled | 是否禁用                               | boolean             | false  |

#### Collapse Events

| 事件名        | 描述         | 回调参数            |
| ------------- | ------------ | ------------------- |
| update:active | 展开状态变化 | `(active: boolean)` |
| change        | 展开状态变化 | `(active: boolean)` |

#### Collapse Slots

| 插槽名 | 描述             |
| ------ | ---------------- |
| default | 面板内容        |
| title  | 自定义标题       |
| right  | 标题栏右侧的内容 |
