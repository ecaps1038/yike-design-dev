## YkIcon 图标

:::snippet
基本用法 name
通过 `<Icon name="XX-XXX"/>` 的形式即可使用 icon。直接使用字体样式设置图标，例如使用 font-size 控制大小,color 设置颜色
<IconTest/>
:::

:::snippet
基本用法 name
通过 `<Icon name="XX-XXX"/>` 的形式即可使用 icon。直接使用字体样式设置图标，例如使用 font-size 控制大小,color 设置颜色
<IconPrimary/>
:::

### 线性图标展示

复制对应图标下的名称获取该图标。
:::pure
<IconLiner/>
:::

### 面性图标展示

复制对应图标下的名称获取该图标。
:::pure
<IconPlanarity/>
:::

### 自定义图标

本组件使用了 iconfront 打包的字体图标库，在项目中建议项目图标也同样经由 iconfront 打包为字体图标。其中在 yike-design-ui -> components -> icon 中可以查阅到图标引入方法，可自己自由增减图标库。

### API

只有一个简单的 name
| 参数 | 描述 | 类型 | 默认值 |
|----------|----------|----------------------------|---------|
| name | 图标名称 | string | - |
