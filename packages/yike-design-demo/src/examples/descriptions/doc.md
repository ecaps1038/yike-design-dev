## YkDescriptions 描述列表

:::snippet
基本用法
通过 `items` 配置描述项，`column` 控制每行列数，支持 `title` 与 `extra` 插槽。
<DescriptionsBasic/>
:::

:::snippet
带边框与纵向布局
`border` 显示边框，`direction="vertical"` 让 label 与 value 纵向排列；`span` 控制跨列数。
<DescriptionsBorder/>
:::

### API

| 参数      | 描述                     | 类型                          | 默认值       |
| --------- | ------------------------ | ----------------------------- | ------------ |
| items     | 描述项数据               | `DescriptionItem[]`           | `[]`         |
| column    | 每行列数                 | number                        | `3`          |
| border    | 是否显示边框             | boolean                       | `false`      |
| direction | label 与 value 排列方向  | `horizontal` \| `vertical`    | `horizontal` |
| size      | 尺寸                     | `s` \| `m` \| `l` \| `xl`     | `m`          |
| title     | 标题                     | string                        | -            |

#### DescriptionItem

| 字段  | 描述         | 类型                |
| ----- | ------------ | ------------------- |
| key   | 唯一标识     | `string \| number`  |
| label | 标签         | string              |
| value | 内容         | `string \| number`  |
| span  | 占用的列数   | number              |

### Slots

| 插槽名 | 描述                       |
| ------ | -------------------------- |
| title  | 自定义标题                 |
| extra  | 标题右侧操作区             |
| label  | 自定义 label，参数 `{ item }` |
| value  | 自定义 value，参数 `{ item }` |
