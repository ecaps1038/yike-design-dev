## YkInput 输入框

:::snippet
基本用法
输入框用于自由高效地录入数据。
<InputPrimary/>
:::

:::snippet
尺寸
输入框定义了四种默认尺寸 s, m, l, xl ，默认为 l 。
<InputSize/>
:::

:::snippet
状态
不同于原生 Input 组件，我们的输入框提供了除可编辑、禁用外的如错误、警告等更多状态。
<InputStatus/>
:::

:::snippet
前置后置标签
可以在输入框的前后附加文字、图标等元素作为输入提示。
<InputDeco/>
:::

:::snippet
前置后置元素
可以在输入框的前后附加文字、图标等元素作为输入提示。
<InputAmbient/>
:::

:::snippet
加载指示器
可以添加对应的参数来显示输入框的加载指示器，这在异步获取数据时很有用。
<InputLoading/>
:::

:::snippet
密码输入类型
我们贴心地为密码类型的输入框提供了了临时查看密码明文的实用功能（它可以像其他功能一样被禁用）。
<InputTypes/>
:::

:::snippet
字数统计与限制
可以添加对应的参数来显示输入框的字数显示器，它可以直观显示当前字数，它也可以配合字数限制工作。
<InputCounterLimit/>
:::

### API

#### Input API

| 参数          | 描述                               | 类型                                      | 默认值    |
| ------------- | ---------------------------------- | ----------------------------------------- | --------- |
| v-model:value | 绑定模型                           | Ref                                       | ''        |
| id            | 输入框的 id 属性                   | string                                    | ''        |
| name          | 输入框的 name 属性                 | string                                    | ''        |
| size          | 输入框的大小                       | 's'｜'m'｜'l'｜'xl'                       | 'l'       |
| type          | 输入框的输入类型                   | 'text' ｜ 'password'                      | 'text'    |
| placeholder   | 输入框的占位文字                   | string                                    | ''        |
| value         | 输入框的初始值                     | string                                    | ''        |
| disabled      | 输入框是否禁用                     | false ｜ true                             | false     |
| clearable     | 输入框是否显示清空按钮             | false ｜ true                             | true      |
| visible       | 密码类型输入框是否显示查看密码按钮 | false ｜ true                             | true      |
| statue        | 输入框的状态                       | 'danger'｜'success'｜'warning'｜'primary' | 'primary' |
| loading       | 输入框是否为加载中状态             | false ｜ true                             | false     |
| show-counter  | 输入框是否显示字数统计             | false ｜ true                             | false     |
| limit         | 输入框最大输入字符数               | number                                    | -1        |
