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
可以在输入框的高亮边框外放置元素
<InputAmbient/>
:::

:::snippet
加载指示器
可以添加对应的参数来显示输入框的加载指示器，这在异步获取数据时很有用。
<InputLoading/>
:::

:::snippet
密码输入类型
我们贴心地为密码类型的输入框提供了临时查看密码明文的实用功能（它可以像其他功能一样被禁用）。
<InputTypes/>
:::

:::snippet
字数统计与限制
可以添加对应的参数来显示输入框的字数显示器，它可以直观显示当前字数，它也可以配合字数限制工作。
<InputCounterLimit/>
:::

:::snippet
文字提示
可以添加当输入框聚焦时显示的文字提示，它可以用于指导用户填写严格的数据。
<InputMessage/>
:::

:::snippet
搜索框
搜索框 = 输入框 + 按钮
<InputSearch/>
:::

:::snippet
事件
可以为输入框聚焦、失焦和变更等事件添加回调函数。
<InputEvent/>
:::

### API

#### Input 属性

| 参数                 | 描述                               | 类型                                      | 默认值    |
| -------------------- | ---------------------------------- | ----------------------------------------- | --------- |
| v-model(model-value) | 绑定模型                           | Ref                                       | ''        |
| id                   | 输入框的 id 属性                   | string                                    | ''        |
| name                 | 输入框的 name 属性                 | string                                    | ''        |
| required             | 输入框的 required 属性             | boolean                                   | false     |
| size                 | 输入框的大小                       | 's'｜'m'｜'l'｜'xl'                       | 'l'       |
| type                 | 输入框的输入类型                   | 'text' ｜ 'password'                      | 'text'    |
| placeholder          | 输入框的占位文字                   | string                                    | ''        |
| value                | 输入框的初始值                     | string                                    | ''        |
| disabled             | 输入框是否禁用                     | boolean                                   | false     |
| readonly             | 输入框是否只读                     | boolean                                   | false     |
| clearable            | 输入框是否显示清空按钮             | boolean                                   | false     |
| visible              | 密码类型输入框是否显示查看密码按钮 | boolean                                   | true      |
| statue               | 输入框的状态                       | 'danger'｜'success'｜'warning'｜'primary' | 'primary' |
| loading              | 输入框是否为加载中状态             | boolean                                   | false     |
| show-counter         | 输入框是否显示字数统计             | boolean                                   | false     |
| limit                | 输入框最大输入字符数               | number                                    | -1        |
| message              | 输入框聚焦时显示的文字提示         | string                                    | ''        |
| style                | 组件的样式                         | CSSProperties                             | undefined |

#### InputSearch 属性

| 参数        | 描述                   | 类型                | 默认值 |
| ----------- | ---------------------- | ------------------- | ------ |
| id          | 搜索框的 id 属性       | string              | ''     |
| name        | 搜索框的 name 属性     | string              | ''     |
| size        | 搜索框的大小           | 's'｜'m'｜'l'｜'xl' | 'l'    |
| placeholder | 搜索框的占位文字       | string              | ''     |
| clearable   | 搜索框是否显示清空按钮 | false ｜ true       | true   |
| loading     | 搜索框是否为加载中状态 | false ｜ true       | false  |

#### Input 事件

| 事件   | 描述                             |
| ------ | -------------------------------- |
| focus  | 输入框聚焦时触发                 |
| blur   | 输入框失焦时触发                 |
| clear  | 输入框失焦时触发                 |
| change | 输入框输入字符、退格、粘贴时触发 |
| submit | 输入框聚焦时按 Enter 触发        |

#### InputSearch 事件

| 事件   | 描述                                      |
| ------ | ----------------------------------------- |
| search | 搜索框聚焦时按 Enter 或按默认搜索按钮触发 |

#### Input 插槽

| 插槽    | 描述           |
| ------- | -------------- |
| prefix  | 输入框前置标签 |
| suffix  | 输入框后置标签 |
| prepend | 输入框前置元素 |
| append  | 输入框后置元素 |

#### InputSearch 插槽

| 插槽   | 描述           |
| ------ | -------------- |
| prefix | 搜索框前置标签 |
| append | 搜索框后置元素 |
