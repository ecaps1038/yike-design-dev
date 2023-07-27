## YkProgress 进度条

:::snippet
基本用法
进度条基本用法
<ProgressPrimary/>
:::

:::snippet
环形进度条
设置 type="circle" 将会展示环形进度条。
<ProgressCircle/>
:::

:::snippet
进度条尺寸 size
进度条分为：`s`、`m`、`l` 3 种尺寸。高度分别为：`4px`、`6px`、`8px`。默认尺寸为 `m`。
<ProgressSize/>
:::

:::snippet
进度条状态
通过 status 指定进度条状态
<ProgressStatus/>
:::

:::snippet
自定义内容
通过插槽添加自定义内容。
<ProgressSlot/>
:::

### API

通过设置 Progress 的属性来产生不同的进度条样式，推荐顺序为：type -> size -> shape -> status -> disabled。

| 参数        | 描述                       | 类型                         | 默认值 |
| ----------- | -------------------------- | ---------------------------- | ------ |
| type        | 进度条类型                 | 'line'｜'circle'             | line   |
| percent     | 百分比                     | number                       | 20     |
| size        | 尺寸                       | 's'｜'m' ｜'l'               | -      |
| strokeColor | 进度条颜色                 | string                       | -      |
| status      | 进度条状态                 | 'normal'｜'success'｜'error' | normal |
| showInfo    | 是否显示进度数值或状态图标 | boolean                      | true   |

### Slot

| 插槽名 | 描述                 | 参数    |
| ------ | -------------------- | ------- |
| format | 自定义进度条尾部内容 | percent |
