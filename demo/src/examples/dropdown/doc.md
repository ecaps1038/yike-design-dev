## YkDropdown 下拉菜单

:::snippet
基本使用
您可以通过 `label` 属性设置下拉菜单显示值。
<DropdownPrimary/>
:::

:::snippet
Trigger
触发下拉菜单出现，有这些方式：`hover`、`click`、`contextmenu`。您可以使用 `trigger` 属性设置。默认值为 `hover`。
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
Position
您可以通过添加 `position` 属性设置下拉列表的位置。
<DropdownPosition/>
:::

:::snippet
自定义
您可以使用 `title` 插槽，自定义 `yk-dropdown` 组件的显示。
<DropdownTitle/>
:::

:::snippet
Event
触发下拉菜单出现，有这些方式：`hover`、`click`、`contextmenu`。您可以使用 `trigger` 属性设置。默认值为 `hover`。
<DropdownEvent/>
:::

### Dropdown 属性

| 属性名   | 类型    | 说明                    | 可选值                    | 默认值    |
| -------- | ------- | ----------------------- | ------------------------- | --------- |
| label    | string  | dropdown 按钮显示文字。 | -                         | -         |
| type     | string  | 类型。                  | primary/secondary/outline | secondary |
| size     | string  | 尺寸。                  | s/m/l/xl                  | l         |
| trigger  | string  | 下拉列表显示方式。      | hover/click/contextmenu   | hover     |
| position | string  | 下拉列表显示位置。      | bottom/bl/br/top/tl/tr    | bottom    |
| disabled | boolean | 禁用。                  | -                         | false     |

### Dropdown 插槽

| 属性名 | 说明                               |
| ------ | ---------------------------------- |
| -      | 下拉列表项（`yk-dropdown-item`）。 |
| title  | 下拉菜单的内容。                   |

### Dropdown 事件

| 属性名   | 说明                     | 参数                               |
| -------- | ------------------------ | ---------------------------------- |
| activate | 下拉框出现/隐藏时触发    | 出现则为 true，隐藏则为 false      |
| select   | 点击菜单项触发的事件回调 | dropdown-item 的值（`value` 属性） |

### Dropdown-item 属性

| 属性名   | 类型                 | 说明                       | 可选值 | 默认值 |
| -------- | -------------------- | -------------------------- | ------ | ------ |
| value    | string/number/object | 传递给 select 事件的参数。 | -      | -      |
| disabled | boolean              | 禁用。                     | -      | false  |

### Dropdown-Item 插槽

| 插槽名 | 说明                      |
| ------ | ------------------------- |
| -      | 自定义 Dropdown-Item 内容 |
