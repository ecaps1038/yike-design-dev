## YkSpace 间距

:::snippet
基本用法

<SpacePrimary/>
:::

:::snippet
间距尺寸 size
内置 4 个尺寸，分别是 `s - 4px`，`m - 8px`，`l - 16px`，`xl -24px`，默认为 `l`，为数字或枚举值时，是水平和垂直间距；为数组时，是 `[水平间距, 垂直间距]`。
<SpaceSize/>
:::

:::snippet
对齐 align
内置 4 种对齐方式，分别为 `'start'｜'center'｜'end'｜'baseline' `，在水平模式下默认为 start。
<SpaceAlign/>
:::

:::snippet
方向
可以设置横排或竖排，默认横排：`'vertical'｜'horizontal'`
<SpaceVertical/>
:::

:::snippet
换行 wrap
当一行放不下时自动换行
<SpaceWrap/>
:::

### API

| 参数        | 描述     | 类型                                             | 默认值         |
| ----------- | -------- | ------------------------------------------------ | -------------- |
| `size`      | 间距尺寸 | ` 's'｜'m'｜'l'｜'xl'｜number｜[number, number]` | `'l'`          |
| `align`     | 对齐     | `'start'｜'center'｜'end'｜'baseline'`           | `'start'`      |
| `wrap`      | 换行     | `boolean`                                        | `true`         |
| `direction` | 方向     | `'vertical'｜'horizontal'`                       | `'horizontal'` |
| `rate`      | 宽度占比 | `number`                                         | `100`          |
