## YkInputTag 标签输入框

:::snippet
基本用法
这里展示基本用法
<InputTagPrimary/>
:::

:::snippet
输入框的状态
通过设置 `status` 参数即可，可选的状态有`success`、 `warning`、 `danger`、`primary`。
<InputTagStatus/>
:::

:::snippet
禁用状态
设置 `disabled` 参数之后，输入框将禁用，将不可删除和输入。
<InputTagDisabled/>
:::

:::snippet
仅可读状态
设置 `readonly` 参数之后，输入框将仅可读，可删除，但不可以输入。
<InputTagReadonly/>
:::

:::snippet
限制最大标签数
<InputTagMax/>
:::

:::snippet
最小标签折叠数
<InputTagMincollapsed/>
:::

:::snippet
限制输入的字符数
<InputTagLimit/>
:::

:::snippet
输入框尺寸
分别有 `s`、`m`、`l`、`xl` 四种尺寸供选择。
<InputTagSize/>
:::

:::snippet
修改 Tag 类型
可以通过 `tagProps` 来修改它的类型
<InputTagType/>
:::

### API

#### Input Props

| 参数        | 描述           | 类型                                      | 默认值  |
| ---------- | -------------  | ----------------------------------------- | ------- |
| modelValue | 绑定值     |   (string \| number)[]         |   []    |
| value    | 绑定值     | (string \| number)[]           |   []       |
| defaultValue   | 绑定值(非受控)     | (string \| number)[] | []      |
| status | 状态 | "" \| "success" \| "warning" \| "danger" \| "primary"     | ""   |
| size  | 尺寸 | "s" \| "m" \| "l" \| "xl"                              | "m"   |
| clearable     | 是否可清除   | boolean                             | true   |
| placeholder     | 输入框占位内容   | string                             | ""   |
| readonly     | 是否仅可读   | boolean                             | false   |
| disabled     | 是否禁用   | boolean                             | false   |
| limit     | 输入字数限制   | number                             | -   |
| max     | 最大允许输入的标签数量   | number                             | -   |
| mincollapsedNum     | 最小折叠数量，用于标签数量过多的情况下折叠选中项，超出该数值的选中项折叠   | number                             | -   |
| inputProps     | 透传参数给输入框   | YKInputProps                             | -   |
| tagProps     | 透传参数给Tag标签   | YKTagProps                             | -   |
| onChange     | 绑定值修改回调方法   | (tagList: (string \| number)[]) => void                             | -   |

#### Input Events

| 事件   | 描述                             |
| ------ | -------------------------------- |
| focus  | 标签输入框聚焦时触发                 |
| blur   | 标签输入框失焦时触发                 |
| click  | 标签输入框点击时触发                 |
| hoverin | 标签输入框鼠标移入时触发  |
| hoverout | 标签输入框鼠标移出时触发        |
| keydown | 标签输入框键盘相关事件，可参考下面说明        |

#### Keydown Events
keydown事件的第一个回参是name，表示触发键盘事件的名称， `string` 类型， 主要的键盘事件name值参考下面。

| 事件   | 描述                             | 回参 |
| ------ | -------------------------------- | ---- |
| enter  | 标签输入框按下回车时触发，回参inputValue表示回车的内容， curLength表示当前回车后tag的数量                | { inputValue: string , curLength: number } |
| backspace  | 标签输入框按下回退时触发                 | - |

#### Input Slots

| 插槽    | 描述           |
| ------- | -------------- |
| collapsedItems  | 标签超过最小收起大小的时候，收起的元素， 含collapsedTags值， 表示折叠的标签 |
| suffix  | 标签输入框后置标签 |