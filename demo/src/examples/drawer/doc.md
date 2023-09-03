## YkDrawer 抽屉

:::snippet
基本用法
通过 `placement` 属性控制抽屉展开的方向，默认为 `'right'`。
<DrawerPrimary/>
:::

:::snippet
使用插槽
使用插槽来完全自定义抽屉内容。
<DrawerSlot/>
:::

:::snippet
事件
监听 `open` 、 `close` 和 `before-close` 事件以实现回调或访问控制。
<DrawerCallback/>
:::

:::snippet
抽屉嵌套
抽屉可以像俄罗斯套娃一般地嵌套。
<DrawerMulti/>
:::

:::snippet
长行滚动
抽屉内容过长时可滚动。
<DrawerLong/>
:::

:::snippet
无背景遮罩
通过 `show-mask` 属性控制抽屉是否显示背景的暗色半透明遮罩，默认为 `true`。不使用背景遮罩时将显示阴影。
<DrawerNomask/>
:::

:::snippet
附加到任何容器
通过 `to` 属性控制抽屉显示时挂载的元素节点，其值可以是 CSS 选择器字符串，或者是一个 HTMLElement 类型的变量。默认为 `body`。
<DrawerAnywhere/>
:::

### API

#### Drawer 属性

| 参数       | 描述                       | 类型                             | 默认值  |
| ---------- | -------------------------- | -------------------------------- | ------- |
| placement  | 抽屉展开的方向             | 'right'｜'left'｜'top'｜'bottom' | 'right' |
| size       | 抽屉的高度或宽度           | string                           | '360px' |
| title      | 抽屉的顶部标题             | string                           | ''      |
| scrollable | 抽屉展开后 body 是否可滚动 | boolean                          | false   |
| closable   | 抽屉是否显示关闭按钮       | boolean                          | true    |
| escapable  | 抽屉是否能使用 ESC 键关闭  | boolean                          | true    |
| show-mask  | 抽屉是否显示背景遮罩       | boolean                          | true    |
| to         | 抽屉展开是挂载的元素       | string ｜ HTMLElement            | 'body'  |

#### Drawer 事件

| 事件名       | 描述             |
| ------------ | ---------------- |
| open         | 抽屉打开时触发   |
| close        | 抽屉关闭时触发   |
| before-close | 抽屉关闭前时触发 |

#### Drawer 插槽

| 插槽名  | 描述           |
| ------- | -------------- |
| header  | 抽屉的顶部内容 |
| default | 抽屉的正文内容 |
| footer  | 抽屉的底部内容 |
