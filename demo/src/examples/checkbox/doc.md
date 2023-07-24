## YkCheckbox 复选框

:::snippet
基本用法
这里展示基本用法
<CheckboxPrimary/>
:::

:::snippet
受控
通过 `v-model` `(model-value)` 属性控制是否选中
<CheckboxDemo2/>
:::

:::snippet
禁用状态
禁用复选框
<CheckboxDisabled/>
:::

:::snippet
复选框组
通过 `<yk-checkbox-group>` 组件展示复选框组。设置 `direction="vertical"` 可以展示竖向的复选框组。
<CheckboxGroupPrimary/>
:::

:::snippet
复选框组选项
`<yk-checkbox-group>` 通过 `options` 属性设置子元素。
<CheckboxGroupOptions/>
:::

### API

`<checkbox>` Props
|参数名 |描述 |类型 |默认值 |
|---------------------|----------|------------|-------|
|model-value (v-model) |绑定值 | boolean ｜ string ｜ number |-|
|default-checked|默认是否选中（非受控状态） | boolean |false|
|value|选项的 value | boolean ｜ number ｜ string |-|
|disabled|是否禁用 | boolean |false|

`<checkbox>` Events
|事件名 |描述 |参数 |
|---------------|----------|----|
|change |值改变时触发 | value: boolean ｜ string ｜ number |-|

`<checkbox>` Slots
|插槽名 |描述 |参数 |版本|
|---------------|----------|----|----|
|default |自定义 label | - |-|

`<checkbox-group>` Props
|参数名 |描述 |类型 |默认值|版本|
|---------------|----------|----|----|---|
|model-value (v-model) |绑定值 | Array<string ｜ number ｜ boolean> |-|-|
|default-value |默认值（非受控状态） | Array<string ｜ number ｜ boolean> |[]|-|
|options |选项 | Array<string ｜ number ｜ CheckboxOption> |[]|-|
|direction |复选框的排列方向 | 'horizontal'｜'vertical' |'horizontal'|-|
|disabled|是否禁用 | boolean |false|-|

`<checkbox-group>` Events
|事件名 |描述 |参数 |
|---------------|----------|----|
|change |值改变时触发 | Array<string ｜ number ｜ boolean> |-|

`<checkbox-group>` Slots
|插槽名 |描述 |参数 |版本|
|---------------|----------|----|----|
|default |自定义内容 | - |-|
|label |checkbox 文案内容 | data: CheckboxOption |-|

CheckboxOption
|插槽名 |描述 |类型 |默认值|
|---------------|----------|----|----|
|label |文案 | string |-|
|value |选项的 `value` | string ｜ boolean ｜ number |-|
|disabled |是否禁用 | boolean |-|
