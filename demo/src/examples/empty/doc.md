## YKEmpty 空状态

:::snippet
基本用法

<EmptyPrimary/>
:::

:::snippet
自定义图片
通过设置 `image` 属性传入图片 URL。
<EmptyPicture/>
:::

:::snippet
图片尺寸
通过使用 `image-size` 属性来控制图片大小。
<EmptySize/>
:::

:::snippet
内容自定义
通过插槽来自定义组件内容
<EmptySlot/>
:::

### API

| 参数          | 描述       | 类型     | 默认值 |
|-------------|----------|--------|-----|
| description | 描述信息     | string | ''  |
| image       | 图像地址     | string | ''  |
| image-size  | 图像尺寸（宽度） | number | 160 |

### 插槽

| 插槽名         | 描述      |
|-------------|---------|
| default     | 自定义底部部分 |
| image       | 自定义图片部分 |
| description | 自定义描述部分 |
