## YkDropdown 下拉菜单

:::snippet
基本使用
您可以通过 `title` 属性设置下拉菜单显示值。
<DropdownPrimary/>
:::

:::snippet
Trigger
触发下拉菜单出现，有这些方式：`hover`、`click`、`contextMenu`。您可以使用 `trigger` 属性设置。默认值为 `hover`。
<DropdownTrigger/>
:::

:::snippet
Type
这里的 `type` 属性与 `yk-button` 组件的 `type` 属性一致。可选值有：`primary`（默认）、`secondary`、`outline`。
<DropdownType/>
:::

:::snippet
Size
这里的 `size` 属性与 `yk-button` 组件的 `size` 属性一致。可选值有：`s`、`m`、`l`（默认）、`xl`。
<DropdownSize/>
:::

:::snippet
Disabled
您可以通过添加 `disabled` 属性禁用下拉菜单。
<DropdownDisabled/>
:::

:::snippet
Placement
您可以通过添加 `placement` 属性设置下拉列表的位置。
<DropdownPlacement/>
:::

:::snippet
自定义
您可以使用 `title` 插槽，自定义 `yk-dropdown` 组件的显示。
<DropdownTitle/>
:::

:::snippet
Event
触发下拉菜单出现，有这些方式：`hover`、`click`、`contextMenu`。您可以使用 `trigger` 属性设置。默认值为 `hover`。
<DropdownEvent/>
:::

### Attributes

| 属性名           | 说明                       | 类型            | 可选值                                                                                                                                   | 默认值      |
| ---------------- | -------------------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| title            | dropdown 按钮显示文字。    | string          | -                                                                                                                                        | -           |
| type             | 类型。                     | string          | `primary`、`secondary`、`outline`                                                                                                        | `secondary` |
| size             | 尺寸。                     | string          | `s`、`m`、`l`、`xl`                                                                                                                      | `l`         |
| trigger          | 下拉列表显示方式。         | string/string[] | `hover`、`click`、`contextMenu`                                                                                                          | `hover`     |
| placement        | 下拉列表显示位置。         | string          | `bottom`、`bottomLeft`、`bottomRight`、`top`、`topLeft`、`topRight`、`right`、`rightTop`、`rightBottom`、`left`、`leftTop`、`leftBottom` | `bottom`    |
| disabled         | 禁用。                     | boolean         | -                                                                                                                                        | false       |
| overlayStyle     | 下拉列表卡片样式。         | object          | -                                                                                                                                        | -           |
| overlayClassName | 下拉列表卡片类名。         | string          | -                                                                                                                                        | -           |
| closeDelay       | 延时打开时常。单位：毫秒。 | number          | -80                                                                                                                                      | 80          |
| openDelay        | 延时打开时常。单位：毫秒。 | number          | -                                                                                                                                        | 80          |
| zIndex           | 设置下拉列表的 z-index     | number          | -                                                                                                                                        | 1           |

### Slots

| 属性名 | 说明                               |
| ------ | ---------------------------------- |
| -      | 下拉列表项（`yk-dropdown-item`）。 |
| title  | 下拉菜单的内容。                   |

### Events

| 属性名         | 说明                     | 参数                               |
| -------------- | ------------------------ | ---------------------------------- |
| visible-change | 下拉框出现/隐藏时触发    | 出现则为 true，隐藏则为 false      |
| selected       | 点击菜单项触发的事件回调 | dropdown-item 的值（`value` 属性） |

### DropdownItem Attributes

| 属性名   | 说明                         | 类型                 | 可选值 | 默认值 |
| -------- | ---------------------------- | -------------------- | ------ | ------ |
| value    | 传递给 selected 事件的参数。 | string/number/object | -      | -      |
| disabled | 禁用。                       | boolean              | -      | false  |

### DropdownItem Slots

| 插槽名 | 说明                      |
| ------ | ------------------------- |
| -      | 自定义 Dropdown-Item 内容 |
