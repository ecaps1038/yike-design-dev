## YkTreeSelect 树形选择

:::snippet
基本使用
通过 `v-model` 绑定选中节点的 key，`options` 传入树形数据；单选时选中后自动收起。
<TreeSelectDefault/>
:::

:::snippet
切换属性
通过 `multiple` 开启多选、`disabled` 禁用、`allow-clear` 控制清空按钮、`bordered` 控制边框。
<TreeSelectTrends/>
:::

:::snippet
使用 checkBox
通过传入 `checkable` 开启 checkbox 选择模式，`v-model` 绑定选中 key 数组；`check-strictly` 控制是否取消父子关联。
<TreeSelectCheckable/>
:::

:::snippet
自定义图标
通过传入 `file-tree` 开启目录树模式，`file-icons` 自定义节点图标；`scrollbar` 可为树容器开启内置滚动。
<TreeSelectUseIcons/>
:::

### API

| 参数                 | 描述                                     | 类型                              | 默认值   |
| -------------------- | ---------------------------------------- | --------------------------------- | -------- |
| modelValue           | 选中值，支持 `v-model`                   | `Key \| Key[]`                    | -        |
| options              | 树形数据                                 | `TreeOption[]`                    | `[]`     |
| multiple             | 是否多选（非 checkable 模式）            | boolean                           | `false`  |
| checkable            | 是否开启 checkbox 选择模式               | boolean                           | `false`  |
| checkStrictly        | 是否取消父子节点关联                     | boolean                           | `false`  |
| checkStrategy        | 勾选策略                                 | `all` \| `parent` \| `child`      | `all`    |
| defaultExpandedKeys  | 默认展开的节点 key                       | `Key[]`                           | `[]`     |
| allowClear           | 是否显示清空按钮                         | boolean                           | `true`   |
| bordered             | 是否显示边框                             | boolean                           | `true`   |
| disabled             | 是否禁用                                 | boolean                           | `false`  |
| placeholder          | 未选择时的占位文案                       | string                            | `请选择` |
| emptyText            | 树为空时的空状态文案                     | string                            | `暂无数据` |
| fileTree             | 目录树模式                               | boolean                           | `false`  |
| fileIcons            | 目录树自定义图标                         | `Icons`                           | -        |
| scrollbar            | 树容器内置滚动条                         | `ScrollbarProps \| boolean`       | `false`  |
| size                 | 旧版宽度倍率，宽度 = size * 200px        | number                            | `2`      |
| width                | 组件宽度，优先级高于 size                | string \| number                  | -        |
| status               | 校验状态                                 | `success` \| `warning` \| `danger` \| `primary` | - |

### Events

| 事件名            | 描述                 | 回调参数                          |
| ----------------- | -------------------- | --------------------------------- |
| update:modelValue | 选中值变化（v-model） | `(value: Key \| Key[] \| undefined)` |
| change            | 选中值变化           | `(value: Key \| Key[] \| undefined)` |
| visible-change    | 下拉展开/收起        | `(visible: boolean)`              |
| clear             | 点击清空按钮         | -                                 |
| remove-tag        | 移除多选标签         | `(key: Key)`                      |
| focus             | 获得焦点             | -                                 |

### Exposes

| 方法  | 描述       |
| ----- | ---------- |
| open  | 展开下拉   |
| close | 收起下拉   |
| focus | 聚焦选择器 |
