## YkTag 标签
:::snippet
基本用法
通过设置 `type` 属性来控制tag标签的类型，也可以使用 `bgColor` 和 `color` 属性控制背景色和文字颜色。 
<TagPrimary/>
:::

:::snippet
可移除标签
通过设置 `closeable` 属性来控制tag标签是否可以移除，类型为布尔值，默认不可移除，当传入的参数为true时，将显示移除入口。当tag被移除时，将触发 `close` 事件。 
<TagRemove/>
:::

:::snippet
动态编辑标签
动态编辑标签可以通过点击标签关闭按钮后触发的 close 事件来实现。
<TagDynamic/>
:::

:::snippet
不同尺寸
通过设置 `size` 属性来控制tag标签的大小，类型为字符串，可选值为 `l` 、 `m` 、 `s`。默认显示大小为`m`。
<TagSize/>
:::

:::snippet
不同形状
通过设置 `shape` 属性来控制tag标签的形状，类型为字符串，可选值为 `square` 、 `round` 、 `mark`。默认显示形状为`square`。
<TagShape/>
:::

:::snippet
带图标的tag
<TagIcon/>
:::

:::snippet
超出最大宽度自动省略
当标签内容超出最大宽度时，将会自动省略多余的内容。
<TagOmit/>
:::

:::snippet
可选中的标签
当我们需要可选中和取消勾选的时候，我们可以通过传递 `checked` 来将tag标签变成可选和反选。当改变状态的时候，将会触发 `change` 事件。
<TagChecked/>
:::

:::snippet
标签禁用
通过设置 `disabled` 属性来控制tag标签是否禁用，类型为布尔值，默认不可禁用。
<TagDisabled/>
:::

### API

| 参数                  | 描述                 | 类型                        | 默认值 |
| --------------------- | -------------------- | --------------------------- | ------ |
| type | Tag 的类型      | 'success' ｜ 'warning' ｜ 'danger' \| 'primary' \| 'defualt' | 'defualt'      |
| size         | tag的大小           | 's' ｜ 'm' ｜ 'l' | 'm'   |
| shape      | Tag形状 | 'square' \| 'round' \| 'mark'                     | 'square'      |
| closeable              | 是否可关闭             | boolean                     | false  |
| bgColor               | 自定义背景颜色     | string                     | -  |
| color                  | 自定义颜色           | string                   | -      |
| checked       | 是否选中         | boolean  | false  |
| disabled        | 是否禁用   | boolean                      | false      |

### Event

| 事件名 | 描述         | 参数                                                   |
| ------ | ------------ | ------------------------------------------------------ |
| close | 关闭 Tag 时触发的事件 | Function(e: Event):void |
| change | checked值改变时触发 | Function(value: boolean, e: Event):void |
