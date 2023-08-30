## YkButton 按钮

点击开启一个即时操作。

:::snippet
按钮类型 type
按钮有三种类型：`主按钮` 、`次按钮` 、`线框按钮` 。主按钮在同一个操作区域建议最多出现一次。
<ButtonPrimary/>
:::

:::snippet
按钮尺寸 size
按钮分为：`s`、`m`、`l`、`xl` 四种尺寸。高度分别为：`24px`、`32px`、`36px`、`48px`。默认尺寸为`l`。
<ButtonSize/>
:::

:::snippet
按钮形状 shape
按钮分为默认形状、`circle` 圆形、`round` 全圆角、`square` 正方形四种形状。
<ButtonShape/>
:::

:::snippet
图标按钮 icon
自己插入图标，无论前后。
<ButtonIcon/>
:::

:::snippet
按钮状态 status
按钮的状态分为 `默认`、`primary` 主要、`success` 成功、`warning` 警告、`danger` 危险五种，可以与按钮类型同时使用。
<ButtonStatus/>
:::

:::snippet
禁用状态 disabled
按钮不可点击
<ButtonDisabled/>
:::

:::snippet
加载中按钮 loading
通过设置 `loading` 可以让按钮处于加载中状态。处于加载中状态的按钮不会触发点击事件。
<ButtonLoading/>
:::

:::snippet
长按钮 long
通过设置 `long` 属性，使按钮的宽度跟随容器的宽度。
<ButtonLong/>
:::

### API

通过设置 Button 的属性来产生不同的按钮样式，推荐顺序为：type -> size -> shape -> status -> disabled。

| 参数     | 描述           | 类型                                      | 默认值  |
| -------- | -------------- | ----------------------------------------- | ------- |
| type     | 按钮的类型     | 'primary'｜'secondary'｜'outline'         | primary |
| shape    | 按钮的形状     | 'round' ｜ 'circle' ｜ 'square'           | -       |
| status   | 按钮的状态     | 'primary'｜'success'｜'warning'｜'danger' | -       |
| disabled | 按钮是否被禁用 | false ｜ true                             | false   |
| loading  | 按钮是否加载中 | false ｜ true                             | false   |
| long     | 按钮是否通栏   | false ｜ true                             | false   |

#### Button Slots

| 参数 | 描述 | 默认值 |
| ---- | ---- | ------ |
| icon | 图标 | -      |
