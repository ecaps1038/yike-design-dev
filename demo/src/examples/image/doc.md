## YkImage 图片

:::snippet
基本用法
简单的设置 `src` 属性，就能获得一个有预览图片功能的组件。
<ImagePrimary/>
:::

:::snippet
标题和简介
通过设置 `title` 和 `alt` 可以将图片的标题和描述显示在图片内部或者底部，显示的位置通过 `footerPosition` 控制。
<ImageCaption/>
:::

:::snippet
额外操作
组件提供了具名插槽 `extra` 供用户在页脚定制额外的内容。
<ImageExtra/>
:::

:::snippet
加载状态
如果网络较快的情况下，可以打开 开发者工具将网络设置为 慢速 3G 或 龟速 来预览效果。
<ImageLoading/>
:::

:::snippet
错误状态
当图像加载失败时显示的错误内容，可以使用 `error-icon` 插槽来修改错误图标，或者使用 `error` 插槽来替换错误内容。
<ImageError/>
:::

:::snippet
多图预览
用 `<yk-image-preview-group>` 设置 `srcList` 可以实现多图预览
<ImagePreviewGroup/>
:::

:::snippet
单独使用预览组件
`<yk-image-preview>` 可单独使用，需要手动控制 `visible`。
<ImagePreviewSeparately/>
:::

:::snippet
单独使用多图预览组件
`<yk-image-preview-group>` 可单独使用，需要将 `isRender="false"` ，同时手动控制 `visible`。
<ImagePreviewGroupSeparately/>
:::

:::snippet
挂载节点
可以通过 `popupContainer` 指定预览挂载的父级节点。
<ImagePreviewRenderDom/>
:::

### API

`<image>` Props

| 参数           | 描述                                                    | 类型                                                     | 默认值        |
| -------------- | ------------------------------------------------------- | -------------------------------------------------------- | ------------- |
| src            | 图片获取地址                                            | string                                                   | -             |
| width          | 图片显示宽度                                            | string ｜ number                                         | -             |
| height         | 图片显示高度                                            | string ｜ number                                         | -             |
| fit            | 内容应该如何适应到其使用高度和宽度确定的框              | 'contain' ｜ 'cover' ｜ 'fill' ｜ 'none' ｜ 'scale-down' | -             |
| title          | 标题                                                    | string                                                   | -             |
| description    | 描述，将显示在底部，如果 alt 没有值，则会将其设置给 alt | string                                                   | -             |
| alt            | 图像的文本描述                                          | string                                                   | -             |
| footerPosition | 标题和介绍的位置                                        | 'inner' ｜ 'outer'                                       | 'inner'       |
| preview        | 是否开启预览                                            | boolean                                                  | true          |
| popupContainer | 设置弹出框的挂载点，同 teleport 的 to                   | string ｜ HTMLElement                                    | document.body |

`<image-preview>` Props

| 参数              | 描述                                  | 类型                  | 默认值        |
| ----------------- | ------------------------------------- | --------------------- | ------------- |
| visible (v-model) | 是否可见                              | boolean               | false         |
| src               | 图片获取地址                          | string                | -             |
| closable          | 是否显示右上角关闭按钮                | boolean               | true          |
| maskClosable      | 点击 mask 是否触发关闭                | boolean               | true          |
| unmountOnClose    | 关闭时是否卸载节点                    | boolean               | false         |
| popupContainer    | 设置弹出框的挂载点，同 teleport 的 to | string ｜ HTMLElement | document.body |

`<image-preview-group>` Props

| 参数              | 描述                                       | 类型                                                     | 默认值 |
| ----------------- | ------------------------------------------ | -------------------------------------------------------- | ------ |
| visible (v-model) | 是否可见                                   | boolean                                                  | false  |
| current (v-model) | 当前展示图像的下标                         | number                                                   | 0      |
| srcList           | 图像列表                                   | string[]                                                 | -      |
| width             | 图片显示宽度                               | string ｜ number                                         | -      |
| height            | 图片显示高度                               | string ｜ number                                         | -      |
| defaultCurrent    | 默认显示图像的下标                         | number                                                   | 0      |
| fit               | 内容应该如何适应到其使用高度和宽度确定的框 | 'contain' ｜ 'cover' ｜ 'fill' ｜ 'none' ｜ 'scale-down' | -      |
| isRender          | 是否渲染图像列表元素                       | boolean                                                  | true   |
| closable          | 是否显示右上角关闭按钮                     | boolean                                                  | true   |
| maskClosable      | 点击 mask 是否触发关闭                     | boolean                                                  | true   |

### Slot

`<image>` Slot

| 插槽名     | 描述       | 参数 |
| ---------- | ---------- | ---- |
| error      | 错误内容   | -    |
| error-icon | 错误的图标 | -    |
| loading    | 加载内容   | -    |
| extra      | 额外操作   | -    |

### Event

| 事件名 | 描述               | 参数 |
| ------ | ------------------ | ---- |
| close  | 点击关闭按钮时触发 |      |
