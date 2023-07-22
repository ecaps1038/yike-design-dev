## YkRate 评分

:::snippet
基本用法
这里展示基本用法
<RatePrimary/>
:::

:::snippet
禁用状态
设置 `disabled` 属性开启组件禁用模式
<RateDisabled/>
:::

:::snippet
尺寸
组件的尺寸共四种:`s`,`m`,`l`,`xl`
<RateSize/>
:::

### API

#### Attributes

| 参数     | 描述         | 类型    | 默认值 |
| -------- | ------------ | ------- | ------ |
| v-model  | 选中项绑定值 | number  | 0      |
| max      | 最大的值     | number  | 5      |
| size     | 尺寸         | enum    | 'l'    |
| id       | 原生 id 属性 | string  | -      |
| disabled | 是否为只读   | boolean | false  |

#### Events

| 事件名 | 描述说明       | 类型     |
| ------ | -------------- | -------- |
| change | 分值改变时触发 | Function |

#### Methods

| 名称              | 描述说明   | 类型     |
| ----------------- | ---------- | -------- |
| setCurrentValue   | 设置当前值 | Function |
| resetCurrentValue | 重置当前值 | Function |
