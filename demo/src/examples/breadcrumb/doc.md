## YkBreadcrumb 面包屑

:::snippet
基本用法
面包屑的基本用法。
<BreadcrumbPrimary/>
:::

:::snippet
自定义分隔符
通过 `separator` 属性或插槽自定义分隔符。也可以通过`separatorIcon`指定`yk-icon`组件里的图标
<BreadcrumbSeparator/>
:::

:::snippet
路由跳转
通过 `to` 属性控制路由跳转。同`vue-router` 的 `to` 属性
<BreadcrumbRoute/>
:::

### API

#### Breadcrumb Attributes

| 参数          | 描述       | 类型   | 默认值 |
| ------------- | ---------- | ------ | ------ |
| separator     | 分隔符     | string | /      |
| separatorIcon | 图标分隔符 | string | -      |

#### Breadcrumb Slots

| 参数      | 描述           | 子标签         |
| --------- | -------------- | -------------- |
| default   | 自定义默认内容 | BreadcrumbItem |
| separator | 自定义分割符   | -              |

### BreadcrumbItem API

#### BreadcrumbItem Attributes

| 参数 | 描述                                   | 类型            | 默认值 |
| ---- | -------------------------------------- | --------------- | ------ |
| to   | 路由跳转目标，同 vue-router 的 to 属性 | string / object | -      |

#### BreadcrumbItem Slots

| 参数    | 描述           |
| ------- | -------------- |
| default | 自定义默认内容 |
