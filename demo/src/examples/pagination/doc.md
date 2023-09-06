## YkPagination 分页

:::snippet
基本用法
分页的基本用法
<PaginationPrimary/>
:::

:::snippet
简洁模式
通过设置 `simple` 属性开启简洁模式。
<PaginationSimple/>
:::

:::snippet
禁用组件
通过设置 `disabled` 属性禁用组件
<PaginationDisabled/>
:::

:::snippet
固定组件宽度
通过设置 `fix-width` 属性固定组件宽度
<PaginationFixWidth/>
:::

:::snippet
最大页码按钮数
默认情况下，当总页数超过 7 页时，Pagination 会折叠多余的页码按钮。 通过 `pager-count` 属性可以设置最大页码按钮数。
<PaginationPagerCount/>
:::

:::snippet
页码跳转
快速跳转到某一页。
<PaginationShowJumper/>
:::

:::snippet
每页条数
通过设置 `show-page-size`，展示每页条数选择器。
<PaginationShowPageSize/>
:::

:::snippet
每页条数选择器的选项列表
通过设置 `page-size-options`，可以重新指定选择器的选项列表。设置为 `-1` 时表示显示全部。
<PaginationPageSizeOptions/>
:::

:::snippet
分页尺寸
通过设置 `size` 属性获得不同尺寸的分页组件。该属性默认值为 `l`
<PaginationDifferentSize/>
:::

:::snippet
事件
可以为组件的页面切换和分页大小改变添加事件监听。
<PaginationEvents/>
:::

### API

#### Pagination Props

| 参数                          | 描述                                            | 类型                | 默认值               |
| ----------------------------- | ----------------------------------------------- | ------------------- | -------------------- |
| total（必填）                 | 总数据量                                        | number              | -                    |
| current / v-model:current     | 当前页数                                        | number              | -                    |
| default-current               | 默认的页数                                      | number              | 1                    |
| page-size / v-model:page-size | 每页展示的数据条数                              | number              | -                    |
| default-page-size             | 默认每页展示的数据条数（-1 时表示显示全部数据） | number              | 10                   |
| disabled                      | 禁用组件                                        | boolean             | false                |
| fix-width                     | 固定宽度                                        | boolean             | false                |
| pager-count                   | 最大显示页码数量                                | number              | 7                    |
| page-size-options             | 数据条数选择器的选项列表                        | number[]            | [10, 20, 30, 40, 50] |
| simple                        | 是否为简单分页                                  | boolean             | false                |
| show-jumper                   | 是否显示页码跳转                                | boolean             | false                |
| show-total                    | 是否显示总分页数                                | boolean             | false                |
| show-page-size                | 是否显示数据条数选择器                          | boolean             | false                |
| size                          | 组件尺寸                                        | 's'｜'m'｜'l'｜'xl' | 'l'                  |

#### Pagination Events

| 事件名称         | 描述               | 类型                       |
| ---------------- | ------------------ | -------------------------- |
| change           | 页码改变时触发     | (current: number) => void  |
| page-size-change | 数据条数改变时触发 | (pageSize: number) => void |
