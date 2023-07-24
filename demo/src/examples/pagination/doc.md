## YkPagination 分页

:::snippet
基本用法
这里展示基本用法
<PaginationPrimary/>
:::

:::snippet
最大页码按钮数
默认情况下，当总页数超过 `7` 页时，分页组件会自动折叠多余的页码按钮。可通过 `pager-count` 属性来设置显示的最大页码按钮数
<PaginationPagerCount/>
:::

:::snippet
固定长度
开启固定长度时，分页组件在计算需要折叠多余的页码时总会减去 `1`，已确保分页切换时组件的长度不变，防止误切换到最后一页
<PaginationFixWidth/>
:::

:::snippet
页码跳转
快速跳转到某一页。
<PaginationShowJumper/>
:::

:::snippet
简单翻页
简单显示
<PaginationSimple/>
:::

:::snippet
不同尺寸
通过设置 `size` 属性获得不同尺寸的分页组件。该属性默认值为 `l`
<PaginationDifferentSize/>
:::

### API

#### Pagination Props

| 参数               | 描述               | 类型                | 默认值 |
| ------------------ | ------------------ | ------------------- | ------ |
| current（v-model） | 当前分页           | number              | 1      |
| total（必填）      | 页码数量           | number              | 0      |
| disabled           | 是否禁用组件       | boolean             | false  |
| fixWidth           | 是否固定组件的长度 | boolean             | false  |
| pagerCount         | 最大看见分页按钮数 | number              | 7      |
| simple             | 是否简单分页       | boolean             | false  |
| showJumper         | 是否显示页码跳转   | boolean             | false  |
| size               | 分页组件尺寸       | 's'｜'m'｜'l'｜'xl' | 'l'    |
