## YkTreeSelect 树形选择

:::snippet
基本使用
通过传入基本参数来创建一个tree-select，他会带有一些默认的属性
<TreeSelectDefault/>
:::

:::snippet
切换属性
通过传入符合要求属性值来改变tree-select的默认属性
<TreeSelectTrends/>
:::

:::snippet
使用checkBox
通过传入`checkable`来开启checkbox选择
<TreeSelectCheckable/>
:::

### API

| 参数                  | 描述           | 类型                | 默认值            |
| --------------------- | -------------- | ------------------- | ----------------- |
| options                 | 传入的treeData   | TreeOption [] |  无
| allow-clear | 单选是否显示清除按钮    | boolean                 | true
| bordered                  | 是否显示输入框选中边框           | boolean | true               |
| disabled | 是否禁用tree-select         | boolean    | false                 |
| default-value         | 默认值         | string ｜ number    | 无                 |
| placeholder            | 输入框为空时默认的提示词   | string             | 无             |
| multiple           | 是否开启   | boolean             | false             |
| checkable           | 是否开启checkbox选择模式   | boolean             | false             |
| empty-text | tree为空时显示的空状态文字 | string | 无
