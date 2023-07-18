## YkPagination 分页

:::snippet
基本用法
这里展示基本用法
<PaginationPrimary/>
:::

:::snippet
设置最大页码按钮数
默认情况下，当总页数超过 7 页时，Pagination 会折叠多余的页码按钮。 通过 `pager-count` 属性可以设置最大页码按钮数。
<PaginationPagerCount/>
:::

:::snippet
页码跳转
通过设置 `show-jumper`，显示页码跳转输入框。
<PaginationShowJumper/>
:::

### API

| 参数                    | 描述                   | 类型    | 默认值 |
| ----------------------- | ---------------------- | ------- | ------ |
| current/v-model:current | 当前页数               | number  | 1      |
| pagerCount              | 最大页码按钮数         | number  | 7      |
| showJumper              | 是否显示页码跳转输入框 | boolean | false  |
