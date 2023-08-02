## YkTree 树

:::snippet
基本用法
通过 `defaultExpandedKeys` 初始化默认展开的节点，可监听 `expand` 节点展开收起事件。
<TreePrimary/>
:::

:::snippet
节点点击
通过 `defaultSelectedKeys` 初始化默认选中的节点，点击节点，切换不同节点的选中状态。设置 `multiple` 来允许节点多选。也可以通过 `expand-icon` 来定制展开收起的图标，展开状态会旋转 90°。
<TreeSelect/>
:::

:::snippet
目录树
通过 `fileTree` 开启目录树模式，支持自定义目录展开、目录收起、文件图标，也支持定制单个节点图标。
<TreeFile/>
:::

:::snippet
自定义目录树图标
通过 `fileIcons` 自定义目录展开、目录收起、文件图标，也支持定制单个节点图标。
<TreeCustomFileIcon/>
:::

:::snippet
可选择树
通过 `checkable` 开启选择模式，`checkedKeys` 获取已选中的 keys 。
<TreeCheckable/>
:::
