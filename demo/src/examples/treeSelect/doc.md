## YkTreeSelect 树形选择

:::snippet
基本使用
通过传入基本参数来创建一个 tree-select，他会带有一些默认的属性
<TreeSelectDefault/>
:::

:::snippet
切换属性
通过传入符合要求属性值来改变 tree-select 的默认属性
<TreeSelectTrends/>
:::

:::snippet
使用 checkBox
通过传入`checkable`来开启 checkbox 选择
<TreeSelectCheckable/>
:::

:::snippet
自定义图标
通过传入`file-icons`来自定义节点图标,通过传入`scrollbar`来自定义 tree 容器高度并内置滚动，默认为`false`
<TreeSelectUseIcons/>
:::

### API

| 参数          | 描述                        | 类型                    | 默认值 |
| ------------- | --------------------------- | ----------------------- | ------ |
| options       | 传入的 treeData             | TreeOption []           | 无     |
| allow-clear   | 单选是否显示清除按钮        | boolean                 | true   |
| bordered      | 是否显示输入框选中边框      | boolean                 | true   |
| disabled      | 是否禁用 tree-select        | boolean                 | false  |
| default-value | 默认值                      | string                  | 无     |
| placeholder   | 输入框为空时默认的提示词    | string                  | 无     |
| multiple      | 是否开启                    | boolean                 | false  |
| checkable     | 是否开启 checkbox 选择模式  | boolean                 | false  |
| empty-text    | tree 为空时显示的空状态文字 | string                  | 无     |
| fileTree      | 目录树模式                  | boolean                 | false  |
| fileIcons     | 定制目录树的图标            | Icons                   | -      |
| size          | 组件大小 size               | number                  | 2      |
| scrollbar     | 内置滚动条                  | ScrollbarProps ,boolean | false  |
