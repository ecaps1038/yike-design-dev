### YkSpace 间距

:::snippet
基本用法
Space 组件以横向排列间距为基本用法
<SpacePrimary/>
:::

:::snippet
垂直 direction
Space 组件可以设置垂直方向排列的间距。
<SpaceVertical/>
:::

:::snippet
水平间距尺寸 size
内置 4 个尺寸，分别是 `s - 4px` , `m - 8px` , `l - 16px` , `xl -24px` ,默认为 `m` ,也可以输入数字自定义尺寸
<SpaceHorizontalSize/>
:::

:::snippet
垂直间距尺寸 rsize
内置 4 个尺寸，分别是 `s - 4px` , `m - 8px` , `l - 16px` , `xl -24px` ,默认为 `m` ,也可以输入数字自定义尺寸
<SpaceVerticalSize/>
:::

:::snippet
对齐 aline
内置 4 种对齐方式，分别为 start center end baseline，在水平模式下默认为 start。
<SpaceAline/>
:::

:::snippet
换行 wrap
当一行放不下时自动换行
<SpaceWrap/>
:::


### API

| 参数      | 描述     | 类型                                       | 默认值       |
| --------- | -------- | ---------------------------------------- | ------------ |
| size      | 水平尺寸 | 's' ｜ 'm' ｜'l' ｜'xl' ｜ number          | l            |
| rsize     | 垂直尺寸 | 's' ｜ 'm' ｜'l' ｜'xl' ｜ number          | l            |
| aline     | 对齐     | 'start' ｜ 'center' ｜ 'end' ｜ 'baseline' | 'start'      |     | 600 |
| warp      | 换行     | boolean                                    | true         |
| direction | 方向     | 'vertical' ｜ 'horizontal'                 | 'horizontal' |
| rate      | 宽度占比 | number                                     | 100          |
