## YkTable 表格

:::snippet
基本用法
这里展示基本用法
<TablePrimary/>
:::

:::snippet
多选
可以选择多行数据
<TableCheckbox/>
:::

:::snippet
自定义列
自定义列的显示内容，可组合其他组件使用
<TableCustom/>
:::

:::snippet
自定义表头
通过设置 slot 来自定义表头。
<TableCustomHeader/>
:::

### API

#### Table 属性

| 参数 | 描述       | 类型  | 默认值 |
| ---- | ---------- | ----- | ------ |
| data | 显示的数据 | array | —      |

#### Table 事件

| 参数             | 描述                                         | 回调参数       |
| ---------------- | -------------------------------------------- | -------------- |
| select           | 当用户手动勾选数据行的 Checkbox 时触发的事件 | selection, row |
| select-all       | 当用户手动勾选全选 Checkbox 时触发的事件     | selection      |
| selection-change | 当选择项发生变化时会触发该事件               | selection      |

#### Table-column 属性

| 参数      | 描述               | 类型                                    | 默认值  |
| --------- | ------------------ | --------------------------------------- | ------- |
| type      | type               | selection /default                      | default |
| label     | 显示的标题         | `string `                               | —       |
| property  | 对应列内容的字段名 | `string`                                | —       |
| formatter | 用来格式化内容     | function(row, column, cellValue, index) | —       |
| align     | 对齐方式           | left / center / right                   | left    |

#### Table-column 插槽

| 参数    | 描述                                               |
| ------- | -------------------------------------------------- |
| default | 自定义列的内容 作用域参数为 { row, column, index } |
| header  | 自定义表头的内容， 作用域参数为 { column, index }  |
