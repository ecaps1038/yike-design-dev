## YkTimePicker 时间选择器

:::snippet
基本用法
这里展示基本用法
<TimePickerPrimary/>
:::

:::snippet
禁用
禁用事件选择
<TimePickerDisabled/>
:::

### API

#### TimePicker Attribute

| 名称                      | 说明     | 类型             | 默认值 |
| ------------------------- | -------- | ---------------- | ------ |
| model-value/value/v-model | 绑定值   | number ｜ string | --     |
| disabled                  | 禁用     | boolean          | false  |
| placeholder               | 占位内容 | string           | ""     |

#### TimePicker Slots

| 名称 | 说明       |     |
| ---- | ---------- | --- |
| icon | 自定义图标 |     |

#### TimePicker Events

| 名称           | 说明               | 类型     |
| -------------- | ------------------ | -------- |
| change         | 改变选中的值       | Funcion  |
| focus          | input 获取焦点     | Function |
| blur           | input 组件失去焦点 | Function |
| visible-change | 下拉面板消失/出现  | Function |
