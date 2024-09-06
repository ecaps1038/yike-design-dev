## YkTimePicker 时间选择器

:::snippet
基本用法
时间输入器的基础用法，在弹出面板上选择时间，以便捷完成时间输入。
<BasicTimePicker/>
:::

:::snippet
范围选择器
时间输入器的范围选择器。
<RangePicker/>
:::

:::snippet
双向绑定
支持 `v-model` 进行数据的双向绑定。
<DoubleBind/>
:::

:::snippet
默认值
只有默认值的情况，可通过 `defaultValue` 传递。
<DefaultValue/>
:::

:::snippet
尺寸
有四种尺寸可供选择.
<SizeChoice/>
:::

:::snippet
禁用
禁用状态.
<DisabledPicker/>
:::

:::snippet
禁用部分时间选项
通过设置 `disabledHours` `disabledMinutes` `disabledSeconds`，可以禁用 时 / 分 / 秒的部分选项。
<DisabledOptions/>
:::

:::snippet
跳过确认
跳过确认步骤，直接点击确认时间
<IgnoreConfirm/>
:::

:::snippet
定制格式
通过设置 `format`，可以定制需要显示的时、分、秒。
<FormatTime/>
:::

:::snippet
定制步长
通过设置 `step`，可以定制需要显示的时、分、秒的步长。
<CustomStep/>
:::

:::snippet
附加内容
选择框底部显示自定义的内容。
<ExtraContent/>
:::

:::snippet
十二小时制
通过设置 `use12Hours`，可以定制需要显示的时、分、秒。
<TwelveTime/>
:::

### API

`<time-picker>` Props

| 参数                  | 描述                                               | 类型                                                         | 默认值     |
| --------------------- | -------------------------------------------------- | ------------------------------------------------------------ | ---------- |
| type                  | 选择器类型                                         | 'time' 或 'time-range'                                       | 'time'     |
| model-value (v-model) | 绑定值                                             | string                                                       | -          |
| default-value         | 默认值                                             | string                                                       | -          |
| disabled              | 是否禁用                                           | boolean                                                      | false      |
| format                | 展示日期的格式                                     | string                                                       | 'HH:mm:ss' |
| size                  | 输入框尺寸                                         | 's' 或 'm' 或 'l' 或 'xl'                                    | 'm'        |
| use12-hours           | 12 小时制                                          | boolean                                                      | false      |
| step                  | 设置 时 / 分 / 秒 的选择间隔                       | { hour?: number; minute?: number; second?: number;}          |
| disabled-hours        | 禁用的部分小时选项                                 | () => number[]                                               | -          |
| disabled-minutes      | 禁用的部分分钟选项                                 | (selectedHour?: number) => number[]                          | -          |
| disabled-seconds      | 禁用的部分秒数选项                                 | (selectedHour?: number, selectedMinute?: number) => number[] | -          |
| disable-confirm       | 禁用确认步骤，开启后直接点选时间不需要点击确认按钮 | boolean                                                      | false      |
