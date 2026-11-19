## YkSelect 选择器

:::snippet
基本用法
通过 `v-model` 绑定选中值，`options` 传入选项数据，选项支持 `disabled`。
<SelectPrimary/>
:::

:::snippet
多选
设置 `multiple` 开启多选，选中项以标签形式展示，可点击标签的关闭按钮移除。
<SelectMultiple/>
:::

:::snippet
可搜索
设置 `filterable` 后，下拉框内会出现搜索框，按选项文本过滤。
<SelectFilterable/>
:::

:::snippet
可清空
设置 `clearable` 后，有选中值时显示清空按钮。
<SelectClearable/>
:::

:::snippet
尺寸与禁用
通过 `size` 设置尺寸（`s` / `m` / `l` / `xl`），通过 `disabled` 禁用。
<SelectSize/>
:::

### API

| 参数              | 描述                       | 类型                                                  | 默认值       |
| ----------------- | -------------------------- | ----------------------------------------------------- | ------------ |
| modelValue        | 绑定值，支持 `v-model`     | string \| number \| boolean \| (string \| number \| boolean)[] | - |
| options           | 选项数据                   | `{ value, label, disabled? }[]`                       | `[]`         |
| multiple          | 是否多选                   | boolean                                               | `false`      |
| disabled          | 是否禁用                   | boolean                                               | `false`      |
| filterable        | 是否可搜索                 | boolean                                               | `false`      |
| clearable         | 是否显示清空按钮           | boolean                                               | `false`      |
| loading           | 下拉是否处于加载状态       | boolean                                               | `false`      |
| loadingText       | 加载中文案                 | string                                                | `加载中`     |
| placeholder       | 未选择时的占位文案         | string                                                | `请选择`     |
| filterPlaceholder | 搜索框占位文案             | string                                                | `请输入关键字` |
| emptyText         | 无匹配选项时的文案         | string                                                | `无匹配数据` |
| size              | 尺寸                       | `s` \| `m` \| `l` \| `xl`                             | `m`          |
| status            | 校验状态                   | `success` \| `warning` \| `danger` \| `primary`       | -            |

### Events

| 事件名          | 描述                       | 回调参数                          |
| --------------- | -------------------------- | --------------------------------- |
| update:modelValue | 选中值变化（v-model）    | `(value: SelectValue \| SelectValue[])` |
| change          | 选中值变化                 | `(value: SelectValue \| SelectValue[])` |
| visible-change  | 下拉框展开/收起            | `(visible: boolean)`              |
| clear           | 点击清空按钮               | -                                 |
| remove-tag      | 多选时移除某个标签         | `(value: SelectValue)`            |
| focus           | 获得焦点                   | -                                 |
| blur            | 失去焦点                   | -                                 |

### Exposes

| 方法  | 描述           |
| ----- | -------------- |
| focus | 聚焦选择器     |
| blur  | 让选择器失焦   |
| open  | 展开下拉框     |
| close | 收起下拉框     |
