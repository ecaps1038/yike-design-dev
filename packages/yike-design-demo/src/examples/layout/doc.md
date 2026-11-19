## YkLayout 布局

:::snippet
基本布局
包含 `LayoutHeader`、`LayoutContent`、`LayoutFooter` 的上中下布局。
<LayoutBasic/>
:::

:::snippet
侧边栏布局
包含 `LayoutSider` 时 Layout 自动变为水平布局；Sider 支持折叠与深色主题。
<LayoutSider/>
:::

### API

#### Layout Props

| 参数      | 描述                                       | 类型                          | 默认值 |
| --------- | ------------------------------------------ | ----------------------------- | ------ |
| direction | 布局方向，不传时根据是否包含 Sider 自动判断 | `horizontal` \| `vertical`    | -      |

#### LayoutHeader / LayoutFooter Props

| 参数   | 描述 | 类型             | 默认值 |
| ------ | ---- | ---------------- | ------ |
| height | 高度 | number \| string | `64`   |

#### LayoutSider Props

| 参数           | 描述                         | 类型             | 默认值   |
| -------------- | ---------------------------- | ---------------- | -------- |
| width          | 展开时的宽度                 | number \| string | `200`    |
| collapsedWidth | 折叠时的宽度                 | number \| string | `64`     |
| collapsible    | 是否显示底部折叠触发器       | boolean          | `false`  |
| collapsed      | 是否折叠，支持 `v-model:collapsed` | boolean    | `false`  |
| theme          | 主题                         | `light` \| `dark` | `light` |

#### LayoutSider Events

| 事件名           | 描述         | 回调参数            |
| ---------------- | ------------ | ------------------- |
| update:collapsed | 折叠状态变化 | `(collapsed: boolean)` |
| collapse         | 折叠状态变化 | `(collapsed: boolean)` |

#### LayoutSider Slots

| 插槽名  | 描述             |
| ------- | ---------------- |
| default | 侧边栏内容       |
| trigger | 自定义折叠触发器 |
