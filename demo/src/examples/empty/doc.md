## YKEmpty 空状态

:::snippet
基本用法

<EmptyPrimary/>
:::

:::snippet
切换风格
通过使用 type 属性来切换不同风格空状态。
<EmptyStyle/>
:::

:::snippet
自定义图片
通过设置 `image` 属性传入图片 URL,通过使用 imageStyle 属性来控制图片样式。
<EmptyPicture/>
:::

:::snippet
内容自定义
通过插槽来自定义组件内容
<EmptySlot/>
:::

### API

| 参数        | 描述     | 类型          | 默认值 |
| ----------- | -------- | ------------- | ------ |
| description | 描述信息 | string        | ''     |
| image       | 图像地址 | string        | ''     |
| image-style | 图像样式 | CSSProperties | 140    |

### 插槽

| 插槽名      | 描述           |
| ----------- | -------------- |
| default     | 自定义底部部分 |
| image       | 自定义图片部分 |
| description | 自定义描述部分 |
