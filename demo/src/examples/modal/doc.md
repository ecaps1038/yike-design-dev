## YkModal 对话框

:::snippet
基本使用

<ModalBase/>
:::

:::snippet
尺寸 size
通过传入 `size` 指定不同的尺寸类型
<ModalSmall/>
:::

:::snippet
自定义头部标题
通过传入具名插槽插槽来自定义头部标题
<ModalHeader/>
:::

:::snippet
自定义底部操作
通过传入具名插槽插槽来自定义底部操作
<ModalFooter/>
:::

:::snippet
不展示 footer

<ModalFooterShow/>
:::

:::snippet
关闭回调函数
关闭 modal 对话框时的回调函数
<ModalClose/>
:::

### API

| 参数          | 描述                          | 类型             | 默认值  |
| ------------- | ----------------------------- | ---------------- | ------- |
| `size`        | 尺寸                          | `small \| large` | `large` |
| `show-footer` | 底部区域展示                  | `boolean`        | `true`  |
| `title`       | modal 标题                    | `string`         | `''`    |
| `to`          | modal 默认展开的 dom 选择器   | `string`         | `body`  |
| `scrollable`  | 页面可否滚动                  | `boolean`        | `false` |
| `closeable`   | 点击遮罩层是否关闭 modal      | `boolean`        | `false` |
| `showMask`    | 是否展示遮罩层                | `boolean`        | `true`  |
| `escapable`   | 是否可以点击 esc 键关闭 modal | `boolean`        | `true`  |

### Methods

| 方法           | 描述                   | 入参类型   | 默认值   |
| -------------- | ---------------------- | ---------- | -------- |
| `onCloseModal` | 对话框关闭时的回调函数 | `Function` | `()=>{}` |

### 插槽

| 名称     | 描述           |
| -------- | -------------- |
| `header` | 对话框头部标题 |
| `footer` | 对话框底部操作 |
