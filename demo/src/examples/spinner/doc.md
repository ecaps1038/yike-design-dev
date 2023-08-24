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
使用颜色枚举值来调整颜色：`primary`、`success`、`error`以及`warning`；或者传入一个 CSS 颜色字符串作为颜色：`color="red"` 或 `color="#007bff"`。
<SpinnerColor/>
:::

### API

| 参数         | 描述     | 类型                                               | 默认值    |
| ------------ | -------- | -------------------------------------------------- | --------- |
| size         | 大小     | 's'｜'m'｜'l' ｜'xl'｜ number                      | 16        |
| color        | 颜色     | 'primary'｜'success'｜'error' ｜'warning'｜ string | 'primary' |
| stroke-width | 线条宽度 | number                                             | 3         |
