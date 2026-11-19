## YkForm 表单

:::snippet
基本用法
表单的基本用法。通过 `model` 绑定数据对象，`rules` 配置校验规则。
<FormPrimary/>
:::

:::snippet
禁用
通过 `disabled` 禁用当前表单，表单中的所有数据录入组件都会继承禁用态。
<FormDisabled/>
:::

:::snippet
尺寸
通过 `size` 控制表单元素大小，表单中的所有数据录入组件都会继承。
<FormSize/>
:::

:::snippet
布局
通过 `layout` 控制 label 和表单组件的相对位置，取值有 `horizontal`、`vertical`、`inline`，默认为水平。
<FormLayout/>
:::

### Form Props

| 参数名     | 描述            | 类型                                   | 默认值       |
| ---------- | --------------- | -------------------------------------- | ------------ |
| model      | 绑定值 数据对象 | `Record<string, any>`                  | -            |
| rules      | 校验规则对象    | `Record<string, SchemaRuleType[]>`     | -            |
| labelWidth | Label 宽度      | number                                 | 116          |
| disabled   | 是否禁用        | boolean                                | false        |
| size       | 尺寸            | `s` \| `m` \| `l` \| `xl`              | `l`          |
| layout     | 布局            | `horizontal` \| `vertical` \| `inline` | `horizontal` |

> 已接入表单上下文的组件：`Input`、`InputNumber`、`InputTag`、`TextArea`、`Select`、`TreeSelect`、`RadioGroup`、`CheckboxGroup`、`Switch`。其余组件将在后续版本接入。

### Form-Item Props

| 参数名     | 描述         | 类型             | 默认值 |
| ---------- | ------------ | ---------------- | ------ |
| field      | 数据路径     | string           | -      |
| rules      | 校验规则对象 | SchemaRuleType[] | -      |
| labelWidth | Label 宽度   | number           | 116    |
| disabled   | 是否禁用     | boolean          | false  |
| label      | 说明         | string           | -      |
| required   | 是否必须     | boolean          | -      |

### Form-Item Slots

| 名称    | 描述     |
| ------- | -------- |
| default | 表单项内容 |

### Form Events

| 事件名 | 描述                         | 回调参数     |
| ------ | ---------------------------- | ------------ |
| submit | 表单提交（native submit）时触发 | `(event: Event)` |
| reset  | 调用 resetFields 重置后触发  | -            |

### Form Expose

| 方法          | 说明                                         | 入参                                                                 | 出参                                     |
| ------------- | -------------------------------------------- | -------------------------------------------------------------------- | ---------------------------------------- |
| validate      | 校验整个表单                                 | `callback?, trigger?`                                                | `errors: undefined \| Record<string, any>` |
| validateField | 校验单个字段                                 | `(field: string, trigger?: string)`                                  | `errors: undefined \| Record<string, any>` |
| clearValidate | 清除校验状态（不传字段时清除全部）           | `(fields?: string \| string[])`                                      | -                                        |
| resetFields   | 重置表单值并清除校验状态                     | -                                                                    | -                                        |

### SchemaRuleType

| 参数              | 类型                | 描述                         |
| ----------------- | ------------------- | ---------------------------- |
| required          | boolean             | 是否必填                     |
| message           | any                 | 自定义错误消息               |
| validator         | CustomValidatorType | 自定义验证函数               |
| type              | RuleType            | 数据类型验证规则             |
| true              | boolean             | 值是否为 true                |
| false             | boolean             | 值是否为 false               |
| deepEqual         | object or array     | 深度比较对象或数组           |
| hasKeys           | string[]            | 对象是否具有指定的属性键     |
| empty             | boolean             | 值是否为空对象或空数组       |
| includes          | any                 | 数组是否包含指定的值         |
| maxLength         | number              | 字符串或数组的最大长度       |
| minLength         | number              | 字符串或数组的最小长度       |
| pattern           | RegExp              | 正则表达式匹配规则           |
| length            | number              | 字符串或数组的长度           |
| uppercase         | boolean             | 是否为大写字母               |
| lowercase         | boolean             | 是否为小写字母               |
| min               | number              | 数字的最小值                 |
| max               | number              | 数字的最大值                 |
| equal             | number              | 数字是否等于指定的值         |
| positive          | boolean             | 是否为正数                   |
| negative          | boolean             | 是否为负数                   |
| ignoreEmptyString | boolean             | 忽略空字符串                 |
| strict            | boolean             | 是否启用严格模式             |
| trigger           | string or string[]  | 触发验证的事件名称或事件数组；不填则任意触发时机都校验 |
