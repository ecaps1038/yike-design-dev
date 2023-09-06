## YkToolTip 文字提示

:::snippet
基础用法
`placement` 指定文本摆放位置。
<TooltipDefault/>
:::

:::snippet
气泡打开状态控制
`open` 属性指定气泡打开状态。
<TooltipOpen/>
:::

:::snippet
打开气泡方式
`trigger` 属性指定气泡打开方式。
<TooltipTrigger/>
:::

:::snippet
气泡样式调整
`overlayStyle` 属性指定气泡打开方式。
<TooltipStyle/>
:::

:::snippet
气泡内容自定义
`content` 插槽自定义气泡内容。
<TooltipSlot/>
:::

:::snippet
气泡位置自动调整
`autoAdjustOverflow` 当气泡被遮挡时，自动调整气泡位置。
<TooltipPosition/>
:::

### API

| 参数                 | 描述                                                                                                                                                                                                                      | 类型                    | 默认值          |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- | --------------- |
| title                | 气泡消息内容                                                                                                                                                                                                              | string                  | "hello tooltip" |
| arrow                | 是否展示气泡箭头                                                                                                                                                                                                          | boolean                 | true            |
| placement            | 气泡框位置，可选 `top`，`left`，`right`，`bottom`，`topLeft`，`topRight`，`bottomLeft`，`bottomRight`，`leftTop`，`leftBottom` ，`rightTop`，`rightBottom`                                                                | string                  | top             |
| trigger              | 触发行为，可选 `hover`，`focus`，`click`，`contextMenu`，`none`, 可使用数组设置多个触发行为。 当 trigger 设置为 none 时，所有组件内触发气泡打开或关闭的事件都将失效，此时想要打开或者关闭气泡则需要通过 open 属性进行控制 | string ｜ string[]      | hover           |
| open                 | 气泡打开状态                                                                                                                                                                                                              | false ｜ true           | false           |
| zIndex               | 设置 Tooltip 的 z-index                                                                                                                                                                                                   | number                  | -               |
| overlayStyle         | 卡片样式                                                                                                                                                                                                                  | object                  | -               |
| overlayClassName     | 卡片类名                                                                                                                                                                                                                  | string                  | -               |
| autoAdjustOverflow   | 气泡被遮挡时自动调整位置                                                                                                                                                                                                  | boolean                 | false           |
| closeDelay           | 延迟关闭时长。单位：毫秒                                                                                                                                                                                                  | number                  | 300             |
| openDelay            | 延时打开时长。单位：毫秒                                                                                                                                                                                                  | number                  | 0               |
| destroyTooltipOnHide | 关闭后是否移除标签元素                                                                                                                                                                                                    | boolean                 | false           |
| openChange           | 显示隐藏的回调                                                                                                                                                                                                            | (open: boolean) => void | -               |

### Slot

| 名称    | 说明                                                                                                                                      | 参数 |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| default | 默认插槽，触发气泡的标签元素。请确保插槽内容只有一个根元素 并确保元素能正常绑定 `onMouseEnter`、`onMouseLeave`、`onFocus`、`onClick` 事件 | -    |
| content | 气泡内容插槽                                                                                                                              | -    |
