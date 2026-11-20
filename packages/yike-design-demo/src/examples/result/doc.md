## YkResult 结果页

:::snippet
成功结果
通过 `status`、`title`、`subtitle` 展示结果信息，`extra` 插槽放置操作按钮。
<ResultSuccess/>
:::

:::snippet
其他状态
支持 `success`、`error`、`warning`、`info` 四种状态。
<ResultStatus/>
:::

### API

| 参数     | 描述       | 类型                                        | 默认值 |
| -------- | ---------- | ------------------------------------------- | ------ |
| status   | 结果状态   | `success` \| `error` \| `warning` \| `info` | `info` |
| title    | 标题       | string                                      | -      |
| subtitle | 副标题     | string                                      | -      |

### Slots

| 插槽名   | 描述                     |
| -------- | ------------------------ |
| icon     | 自定义状态图标           |
| title    | 自定义标题               |
| subtitle | 自定义副标题             |
| default  | 自定义补充内容           |
| extra    | 底部操作区               |
