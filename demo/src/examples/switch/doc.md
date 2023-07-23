## YkSwitch 开关

:::snippet
基本用法
通过 v-model(modelValue) 可以进行双向绑定。
<SwitchBasic/>
:::

:::snippet
按钮尺寸 size
按钮分为：`s` 和 `m` 两种尺寸。默认尺寸为 `m`。
<SwitchSize/>
:::

:::snippet
自定义开关的背景色
通过 `checkedColor` 和 `uncheckedColor` 属性可以指定开关的背景色。
<SwitchColor/>
:::

:::snippet
自定义开关的值
通过 `checkedValue` 和 `uncheckedValue` 属性可以指定开关在不同状态的值。
<SwitchValue/>
:::

:::snippet
禁用状态 disabled
设置 `disabled` 后无法触发事件
<SwitchDisabled/>
:::

:::snippet
加载状态 loading
`loading` 时无法触发事件
<SwitchLoading/>
:::

### API

| 参数                  | 描述                 | 类型                        | 默认值 |
| --------------------- | -------------------- | --------------------------- | ------ |
| model-value (v-model) | 绑定值               | string ｜ number ｜ boolean | -      |
| disabled              | 是否禁用             | boolean                     | false  |
| loading               | 是否为加载中状态     | boolean                     | false  |
| size                  | 开关的大小           | 's' ｜'m'                   | m      |
| checked-value         | 选中时的值           | string ｜ number ｜ boolean | true   |
| unchecked-value       | 未选中时的值         | string ｜ number ｜ boolean | false  |
| checked-color         | 选中时的开关背景色   | string                      | -      |
| unchecked-color       | 未选中时的开关背景色 | string                      | -      |

### Event

| 事件名 | 描述         | 参数                                                   |
| ------ | ------------ | ------------------------------------------------------ |
| change | 值改变时触发 | Function(value: string ｜ number ｜ boolean, e: Event) |
