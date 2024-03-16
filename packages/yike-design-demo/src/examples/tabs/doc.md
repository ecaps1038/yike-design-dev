## YkTabs 标签页

:::snippet
基本用法
这里展示基本用法
<TabsBase/>
:::

:::snippet
自定义页签
可以自定义页签，例如插入 icon
<TabsTitle/>
:::

:::snippet
不同风格
默认线性风格，可以设置`card`卡片风格
<TabsType/>
:::

:::snippet
动态增减标签页
通过设置`editable="true"`可以开启增减标签能力。
<TabsPrimary/>
:::

:::snippet
自定义增加标签页触发器
自定义增加标签页触发器
<TabsAddTrigger/>
:::

:::snippet
标签位置的设置
标签一共有四个方向的设置 `tabPosition="left|right|top|bottom"`
<TabsPosition/>
:::

### API

#### `Tabs` Props

| 参数名      | 描述                    | 类型                               | 默认值 | 版本 |
| ----------- | ----------------------- | ---------------------------------- | ------ | ---- |
| v-model     | 当前选中的标签的 `name` | number ｜ string                   | -      | -    |
| type        | 选项卡的类型            | 'line' ｜ 'card'                   | 'line' | -    |
| closable    | 是否启用关闭标签按钮    | boolean                            | false  | -    |
| addable     | 是否启用新增标签按钮    | boolean                            | false  | -    |
| editable    | 是否可编辑              | boolean                            | false  | -    |
| tabPosition | 标签位置                | 'top'｜＇bottom＇｜'left'｜'right' | 'top'  | -    |

#### `Tabs` Events

| 事件名 | 描述           | 参数             |
| ------ | -------------- | ---------------- |
| add    | 新增标签时触发 | -                |
| delete | 删除标签时触发 | PaneProp         |
| change | 切换标签时触发 | PaneProp['name'] |

#### `TabPane` Props

| 参数名   | 描述                 | 类型             | 默认值 | 版本 |
| -------- | -------------------- | ---------------- | ------ | ---- |
| name     | 选中时绑定的值       | number ｜ string | -      | -    |
| label    | 选中时显示的标签文字 | string           | -      | -    |
| disabled | 禁用选项卡           | boolean          | false  | -    |

#### `TabPane` Slots

| 插槽名  | 描述           | 参数 | 版本 |
| ------- | -------------- | ---- | ---- |
| default | 自定义面板内容 | -    | -    |
| title   | 自定义标签内容 | -    | -    |
