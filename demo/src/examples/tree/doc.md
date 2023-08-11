## YkTree 树

:::snippet
基本用法
通过 `defaultExpandedKeys` 初始化默认展开的节点，可监听 `expand` 节点展开收起事件。
<TreePrimary/>
:::

:::snippet
内部滚动
通过 `scrollbar` 属性配置树内部滚动。
<TreeScroll/>
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
通过 `checkable` 开启选择模式，`checkedKeys` 获取已选中的 keys。
<TreeCheckable/>
:::

:::snippet
取消父子选中关联关系
通过 `checkStrictly` 控制是否进行父子关联，默认关闭。开启该选项后，`checkStrategy` 属性失效。
<TreeCheckLogic/>
:::

### Props

| 参数                  | 描述                           | 类型                      | 默认值          |
| --------------------- | ------------------------------ | ------------------------- | --------------- |
| `options`             | 渲染数据                       | `TreeOption[]`            | -               |
| `blockNode`           | 节点占据一行                   | `boolean`                 | `false`         |
| `defaultExpandedKeys` | 默认展开的节点                 | `Key[]`                   | -               |
| `defaultSelectedKeys` | 默认选中的节点                 | `Key[]`                   | -               |
| `expandedKeys`(受控)  | 展开的节点                     | `Key[]`                   | -               |
| `selectedKeys`(受控)  | 选中的节点                     | `Key[]`                   | -               |
| `multiple`            | 多选模式，开启可以高亮多个节点 | `boolean`                 | false           |
| `expandIcon`          | 展开收起图标                   | `RenderFunction`          | `IconRightFill` |
| `fileTree`            | 目录树模式                     | `boolean`                 | `false`         |
| `fileIcons`           | 定制目录树的图标               | `Icons`                   | -               |
| `checkable`           | 复选框模式                     | `boolean`                 | `false`         |
| `checkedKeys`(受控)   | 复选框勾选的节点               | `Key[]`                   | -               |
| `checkStrategy`       | 节点勾选模式                   | `TreeCheckStrategy`       | `'all'`         |
| `checkStrictly`       | 取消父子节点关联               | `boolean`                 | `false`         |
| `scrollbar`           | 内置滚动条                     | `ScrollbarProps\|boolean` | `false`         |

### Event

| 事件名 | 描述         | 参数                    |
| ------ | ------------ | ----------------------- |
| expand | 展开收起触发 | `Function(keys: Key[])` |
| select | 点击节点触发 | `Function(keys: Key[])` |
