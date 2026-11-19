## YkDatePicker 日期选择器

:::snippet
基本用法
通过 `v-model` 绑定日期，默认返回 `Date` 对象；支持清空、格式化和键盘操作。
<DatePickerPrimary/>
:::

:::snippet
禁用日期
通过 `disabled-date` 自定义不可选择的日期，例如只允许选择工作日。
<DatePickerDisabled/>
:::

:::snippet
展示格式与绑定值格式
通过 `format` 控制展示格式；通过 `value-format` 让 `v-model` 绑定格式化字符串。
<DatePickerFormat/>
:::

### API

| 参数          | 描述                                             | 类型                            | 默认值       |
| ------------- | ------------------------------------------------ | ------------------------------- | ------------ |
| modelValue    | 绑定值，支持 `v-model`                           | `Date \| string \| number`      | -            |
| format        | 展示格式（dayjs format）                         | string                          | `YYYY-MM-DD` |
| valueFormat   | 绑定值格式；不传时绑定 `Date`，传入时绑定字符串 | string                          | -            |
| placeholder   | 未选择时的占位文案                               | string                          | `请选择日期` |
| disabled      | 是否禁用                                         | boolean                         | `false`      |
| clearable     | 是否显示清空按钮                                 | boolean                         | `true`       |
| size          | 尺寸                                             | `s` \| `m` \| `l` \| `xl`       | `m`          |
| status        | 校验状态                                         | `success` \| `warning` \| `danger` \| `primary` | - |
| disabledDate  | 不可选择的日期                                   | `(date: Date) => boolean`       | -            |

### Events

| 事件名            | 描述               | 回调参数                              |
| ----------------- | ------------------ | ------------------------------------- |
| update:modelValue | 日期变化（v-model） | `(value: Date \| string \| number \| undefined)` |
| change            | 日期变化           | `(value: Date \| string \| number \| undefined)` |
| visible-change    | 面板展开/收起      | `(visible: boolean)`                  |
| clear             | 点击清空按钮       | -                                     |
| focus             | 获得焦点           | -                                     |
| blur              | 失去焦点           | -                                     |

### Exposes

| 方法  | 描述       |
| ----- | ---------- |
| focus | 聚焦选择器 |
| open  | 展开面板   |
| close | 收起面板   |

> 键盘操作：面板聚焦后可使用方向键切换日期、`PageUp/PageDown` 切换月份、`Enter` 选择、`Esc` 关闭。
