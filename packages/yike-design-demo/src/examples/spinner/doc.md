## YkSpinner 加载

:::snippet
基本用法
一个优美的矢量动画。
<SpinnerPrimary/>
:::

:::snippet
大小 Size
默认为`16px`。使用尺寸枚举值来调整大小：`s - 24px`、`m - 32px`、`l - 36px`以及`xl - 48px`；或者传入一个数字作为大小：`:size="50"`。
<SpinnerSize/>
:::

:::snippet
颜色 Color
使用颜色枚举值来调整颜色：`primary`、`success`、`error`以及`warning`；或者传入一个 CSS 颜色 / 变量字符串作为颜色：`color="red"`、`color="#007bff"` 或 `color="var(--keyword)"`。
<SpinnerColor/>
:::

:::snippet
附加到任何容器
使用 `v-loading` 指令将加载动画附加在任何容器，并显示背景遮罩。加载过程中用户不可操作。为容器设置 `data-loading-text` 属性可以自定义加载动画下方的文字。
<SpinnerContainer/>
:::

### API

| 参数         | 描述     | 类型                                               | 默认值    |
| ------------ | -------- | -------------------------------------------------- | --------- |
| size         | 大小     | 's'｜'m'｜'l' ｜'xl'｜ number                      | 16        |
| color        | 颜色     | 'primary'｜'success'｜'error' ｜'warning'｜ string | 'primary' |
| stroke-width | 线条宽度 | number                                             | 3         |
