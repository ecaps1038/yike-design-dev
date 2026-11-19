## YkTable 表格

:::snippet
基本用法
通过 `data` 传入表格数据，`column` 定义列；支持 `index` 序号列、`ellipsis` 省略、`row-key` 与斑马纹。
<TablePrimary/>
:::

:::snippet
多选
`type="checkbox"` 开启勾选列，配合 `row-key` 保持跨排序/更新后的选中状态。
<TableCheckbox/>
:::

:::snippet
自定义列
自定义列的显示内容，可组合其他组件使用。
<TableCustom/>
:::

:::snippet
自定义表头
通过设置 `header` 插槽来自定义表头。
<TableCustomHeader/>
:::

:::snippet
自定义内容
通过设置 `tbody` 插槽来自定义整行内容。
<TableTbody/>
:::

:::snippet
排序
给列设置 `sortable` 开启排序，可通过 `sort-method` 自定义排序逻辑；排序变化会触发 `sort-change`。
<TableSort/>
:::

:::snippet
状态与样式
通过 `loading`、`empty-text`、`stripe`、`border` 控制表格的加载态、空状态与样式。
<TableState/>
:::

### API

#### Table 属性

| 参数         | 描述                         | 类型             | 默认值     |
| ------------ | ---------------------------- | ---------------- | ---------- |
| data         | 显示的数据                   | array            | `[]`       |
| row-key      | 行数据的唯一键字段           | string           | -          |
| height       | 表格高度，超出后纵向滚动     | string \| number | -          |
| max-height   | 表格最大高度，超出后纵向滚动 | string \| number | -          |
| loading      | 是否加载中                   | boolean          | `false`    |
| loading-text | 加载中文案                   | string           | `加载中`   |
| empty-text   | 空数据文案                   | string           | `暂无数据` |
| stripe       | 是否显示斑马纹               | boolean          | `false`    |
| border       | 是否显示纵向边框             | boolean          | `false`    |

#### Table 事件

| 事件名           | 描述                                   | 回调参数                                                    |
| ---------------- | -------------------------------------- | ----------------------------------------------------------- |
| select           | 当用户手动勾选数据行的 Checkbox 时触发 | `(selection, row)`                                          |
| select-all       | 当用户手动勾选全选 Checkbox 时触发     | `(selection)`                                               |
| selection-change | 当选择项发生变化时触发                 | `(selection)`                                               |
| sort-change      | 排序变化时触发                         | `({ column, prop, order })`，order 为 `asc` \| `desc` \| `null` |

#### Table 插槽

| 名称  | 描述                                  |
| ----- | ------------------------------------- |
| empty | 自定义空状态内容                      |
| tbody | 自定义表格内容，替代默认的 tbody 渲染 |

#### Table Exposes

| 方法               | 描述                 |
| ------------------ | -------------------- |
| clearSelection     | 清空所有选中行       |
| getSelectionRows   | 获取当前选中的行     |
| toggleRowSelection | 切换某一行的选中状态 |
| toggleAllSelection | 切换全选状态         |
| sort               | 触发某一列的排序     |

#### Table-column 属性

| 参数       | 描述               | 类型                                 | 默认值    |
| ---------- | ------------------ | ------------------------------------ | --------- |
| type       | 列类型             | `default` \| `checkbox` \| `index`   | `default` |
| label      | 显示的标题         | string                               | -         |
| property   | 对应列内容的字段名 | string                               | -         |
| width      | 列宽（px）         | number                               | -         |
| align      | 对齐方式           | `left` \| `center` \| `right`        | `left`    |
| ellipsis   | 内容超出是否省略   | boolean                              | `false`   |
| sortable   | 是否可排序         | boolean                              | `false`   |
| sortMethod | 自定义排序方法     | `(a, b) => number`                   | -         |
| formatter  | 用来格式化内容     | `function(row, column, cellValue, index)` | -     |

#### Table-column 插槽

| 名称    | 描述                                                  |
| ------- | ----------------------------------------------------- |
| default | 自定义列的内容，作用域参数为 `{ row, column, index }` |
| header  | 自定义表头的内容，作用域参数为 `{ column, index }`    |
