## YkPopover 气泡卡片

:::snippet
基本用法
这里展示基本用法
<PopoverPrimary/>
:::

:::snippet
卡片打开方式
`open` 属性指定卡片打开方式
<PopoverOpen/>
:::

:::snippet
卡片内容自定义
通过插槽自定义卡片内容。
<PopoverSlot/>
:::

### API

| 参数    | 描述     | 类型   | 默认值         |
| ------- | -------- | ------ | -------------- |
| title   | 气泡标题 | string | "标题"         |
| content | 气泡内容 | string | "popover 组件" |

其他参数同 <a href="tooltip" style="color:red">`tooltip`</a> 组件

### Slot

| 名称    | 说明                                                                                                                                      | 参数 |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| default | 默认插槽，触发气泡的标签元素。请确保插槽内容只有一个根元素 并确保元素能正常绑定 `onMouseEnter`、`onMouseLeave`、`onFocus`、`onClick` 事件 | -    |
| title   | 卡片标题插槽                                                                                                                              | -    |
| content | 卡片内容插槽                                                                                                                              | -    |
| popover | 卡片整体自定义插槽                                                                                                                        | -    |
