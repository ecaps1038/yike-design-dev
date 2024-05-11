## YkTimePicker 时间选择器

...

### API (API 标题)

通过设置 Button 的属性来产生不同的按钮样式，推荐顺序为：type -> size -> shape -> status -> disabled。

| 参数 | 描述       | 类型   | 可选值                             | 默认值    |
| ---- | ---------- | ------ | ---------------------------------- | --------- |
| type | 按钮的类型 | string | `primary`、`secondarly`、`outline` | `primary` |

- 每个 demo 对应信息采用 `:::snippet:::` 标志位进行维护
- 单个 demo 在 doc.md 中维护的信息有
  - Title: demo 标题，说明该组组件 demo 共性
  - Desc: demo 说明，支持 md 格式
  - DemoName demo 名称，采用驼峰命名法的单标签，必须为文档目录下存在的文件，否则可能存在解析报错
- 每个 demo 文件 ⚠️ 只可在 doc.md 中引入一次
