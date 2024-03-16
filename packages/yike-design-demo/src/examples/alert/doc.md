## YkAlert 警告提示

:::snippet
基本使用
最简单的用法，适用于简短的警告提示。
<AlertDefault/>
:::

:::snippet
提示类型
共有四种样式 `success`、`info`、`warning`、`error`。
<AlertType/>
:::

:::snippet
提示标题
通过设置 `title` 可以给警告提示添加标题。
<AlertTitle/>
:::

:::snippet
可关闭
通过设置 `closable`，可开启关闭按钮。
<AlertClosable/>
:::

:::snippet
自定义图标
通过设置 `icon` 插槽自定义默认图标，也可以通过设置 **show-icon=false** 来隐藏图标。
<AlertCustomIcon/>
:::

:::snippet
自定义关闭图标
通过设置 `closeElement` 插槽来改变关闭图标。
<AlertCustomCloseIcon/>
:::

:::snippet
内容居中
通过设置 `center`，可将文本内容居中显示。
<AlertCenter/>
:::

:::snippet
顶部公告
通过设置 `banner`，可将警告提示作为顶部公告使用（去除边框和圆角）。
<AlertBanner/>
:::

### API

| 参数     | 描述               | 类型                                    | 默认值 |
| -------- | ------------------ | --------------------------------------- | ------ |
| type     | 警告提示的类型     | 'info' ｜ 'success'｜'warning'｜'error' | 'info' |
| message  | 警告提示的内容     | string                                  | -      |
| title    | 警告提示的标题     | string                                  | -      |
| closable | 是否展示关闭按钮   | boolean                                 | false  |
| showIcon | 是否展示 Icon 图标 | boolean                                 | true   |
| center   | 内容是否居中显示   | boolean                                 | false  |
| banner   | 是否为顶部公告     | boolean                                 | false  |

### Event

| 事件名 | 描述               | 参数           |
| ------ | ------------------ | -------------- |
| close  | 点击关闭按钮时触发 | ev: MouseEvent |

### Slot

| 插槽名       | 描述           | 参数 |
| ------------ | -------------- | ---- |
| icon         | 自定义图标     | -    |
| closeElement | 自定义关闭内容 | -    |
