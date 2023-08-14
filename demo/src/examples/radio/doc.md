## YkRadio 单选框

:::snippet
基本用法
这里展示基本用法
<RadioPrimary/>
:::

:::snippet
禁用状态的单选框
设置 `disabled` 属性开启组件禁用模式
<RadioDisabled/>
:::

:::snippet
单选框组
基本单选框组使用方式，使用原则，当选项大于 5 个时 推荐使用选项框。使用`yk-radio-group`组件将`yk-radio`组件包裹使用
<RadioGroupPrimary/>
:::

:::snippet
禁用状态单选框组
设置单选框组的`disabled`属性开启禁用状态
<RadioGroupDisabled/>
:::

:::snippet
垂直方向单选框组
设置单选框组的`direction`属性设置为`vertical`子元素为垂直方向展示,默认值`horizontal`
<RadioGroupDirection/>
:::

:::snippet
按钮单选框组
设置单选框组的`type`属性设置为`button`
<RadioGroupButton/>
:::

:::snippet
按钮单选框组主题
设置单选框组的`theme`属性支持`primary`、`secondary`
<RadioGroupButtonTheme/>
:::

:::snippet
按钮单选框组尺寸
设置单选框组的`size`属性设置为`xl`40px、`l`30px、`m`26px、`s`20px,默认值`30px`
<RadioGroupButtonSizes/>
:::

### API

#### Radio Attributes

| 参数           | 描述           | 类型                        | 默认值 |
| -------------- | -------------- | --------------------------- | ------ |
| value(v-model) | 选中项绑定值   | number ｜ string ｜ boolean | --     |
| label          | 单选框的值     | number ｜ string ｜ boolean | --     |
| disabled       | 按钮是否被禁用 | boolean                     | false  |

#### Radio Slots

| 参数    | 描述       |
| ------- | ---------- |
| default | 自定义内容 |

#### Radio Events

| 事件名 | 说明                   | 类型     |
| ------ | ---------------------- | -------- |
| change | 绑定值变化时触发的事件 | Function |

#### RadioGroup Attributes

| 参数           | 描述                                          | 类型                        | 默认值       |
| -------------- | --------------------------------------------- | --------------------------- | ------------ |
| value(v-model) | 选中项绑定值                                  | number ｜ string ｜ boolean | --           |
| theme          | 单选框组的主题 （仅当 type 为 button 时生效） | 'primary'｜'secondary'      | 'primary'    |
| type           | 单选框组的类型                                | 'radio'｜'button'           | 'radio'      |
| size           | 单选框组的尺寸（仅当 type 为 button 时生效）  | 's'｜ 'm'｜ 'l'｜'xl'       | 'l'          |
| disabled       | 单选框组是否被禁用                            | boolean                     | false        |
| direction      | 单选框的方向                                  | 'horizontal'｜'vertical'    | 'horizontal' |

#### RadioGroup Slots

| 参数    | 描述                |
| ------- | ------------------- |
| default | Radio / RadioButton |

#### RadioGroup Events

| 事件名 | 说明                   | 类型     |
| ------ | ---------------------- | -------- |
| change | 绑定值变化时触发的事件 | Function |
