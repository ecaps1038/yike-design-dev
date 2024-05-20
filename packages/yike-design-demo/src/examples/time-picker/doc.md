## YkTimePicker 时间选择器

:::snippet
基本用法
时间输入器的基础用法，在弹出面板上选择时间，以便捷完成时间输入。
<BasicTimePicker/>
:::

:::snippet
范围选择器
时间输入器的范围选择器。
<BasicTimePicker/>
:::

:::snippet
双向绑定
支持`v-model`进行数据的双向绑定。
<DoubleBind/>
:::

:::snippet
默认值
只有默认值的情况，可通过`defaultValue`传递。
<DefaultValue/>
:::

:::snippet
尺寸
有四种尺寸可供选择
<BasicTimePicker/>
:::

:::snippet
禁用
禁用状态
<BasicTimePicker/>
:::

:::snippet
禁用部分时间选项
通过设置 `disabledHours` `disabledMinutes` `disabledSeconds`，可以禁用 时 / 分 / 秒的部分选项。
<BasicTimePicker/>
:::

:::snippet
跳过确认
跳过确认步骤，直接点击确认时间
<BasicTimePicker/>
:::

:::snippet
定制格式
通过设置 `format`，可以定制需要显示的时、分、秒。
<BasicTimePicker/>
:::

:::snippet
定制步长
通过设置 `step`，可以定制需要显示的时、分、秒的步长。
<BasicTimePicker/>
:::

:::snippet
附加内容
选择框底部显示自定义的内容。
<BasicTimePicker/>
:::

:::snippet
十二小时制
通过设置 `use12Hours`，可以定制需要显示的时、分、秒。
<BasicTimePicker/>
:::

### API

`<time-picker>` Props

| 参数       | 描述       | 类型                              | 默认值     | (md 表格结构) |
| ---------- | ---------- | --------------------------------- | ---------- | ------------- |
| type       | 按钮的类型 | 'primary'或'secondary'或'outline' | primary    |
| 单元格信息 | 单元格信息 | 单元格信息                        | 单元格信息 |
| 单元格信息 | 单元格信息 | 单元格信息                        | 单元格信息 |
