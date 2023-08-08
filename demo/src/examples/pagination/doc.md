## YkPagination 分页

:::snippet
基本用法
这里展示基本用法
<PaginationPrimary/>
:::

:::snippet
简单翻页
简单显示
<PaginationSimple/>
:::

:::snippet
禁用组件
设置 `disabled` 属性以禁用组件
<PaginationDisabled/>
:::

:::snippet
固定组件宽度
设置 `fix-width` 属性以固定组件宽度
<PaginationFixWidth/>
:::

:::snippet
设置最大页码按钮数
默认情况下，当总页数超过 7 页时，Pagination 会折叠多余的页码按钮。 通过 pager-count 属性可以设置最大页码按钮数。
<PaginationPagerCount/>
:::

:::snippet
页码跳转
快速跳转到某一页。
<PaginationShowJumper/>
:::

:::snippet
不同尺寸
通过设置 `size` 属性获得不同尺寸的分页组件。该属性默认值为 `l`
<PaginationDifferentSize/>
:::

### API

#### Pagination Attributes

| 参数                      | 描述             | 类型                | 默认值 |
| ------------------------- | ---------------- | ------------------- | ------ |
| total（必填）             | 总分页数         | number              | -      |
| current / v-model:current | 当前页数         | number              | 1      |
| disabled                  | 禁用组件         | boolean             | false  |
| fixWidth                  | 固定宽度         | boolean             | false  |
| pagerCount                | 最大显示页码数量 | number              | 7      |
| simple                    | 是否为简单分页   | boolean             | false  |
| showJumper                | 是否显示页码跳转 | boolean             | false  |
| showTotal                 | 是否显示总分页数 | boolean             | false  |
| size                      | 组件尺寸         | 's'｜'m'｜'l'｜'xl' | 'l'    |
