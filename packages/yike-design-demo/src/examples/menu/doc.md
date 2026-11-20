## YkMenu 菜单

:::snippet
纵向菜单
通过 `items` 配置菜单，支持子菜单展开/收起、选中态与禁用项；`v-model` 绑定选中 key。
<MenuVertical/>
:::

:::snippet
横向菜单与深色主题
`mode="horizontal"` 时子菜单以 hover 弹出层展示；`theme="dark"` 开启深色主题。
<MenuHorizontal/>
:::

### API

#### Menu Props

| 参数             | 描述                       | 类型                          | 默认值       |
| ---------------- | -------------------------- | ----------------------------- | ------------ |
| items            | 菜单数据                   | `MenuItem[]`                  | `[]`         |
| modelValue       | 当前选中项，支持 `v-model` | `string \| number`            | -            |
| openKeys         | 展开的子菜单 key（受控）   | `(string \| number)[]`        | -            |
| defaultOpenKeys  | 默认展开的子菜单 key       | `(string \| number)[]`        | `[]`         |
| mode             | 菜单模式                   | `horizontal` \| `vertical`    | `vertical`   |
| theme            | 主题                       | `light` \| `dark`             | `light`      |
| selectable       | 是否可选中                 | boolean                       | `true`       |

#### MenuItem

| 字段     | 描述         | 类型                |
| -------- | ------------ | ------------------- |
| key      | 唯一标识     | `string \| number`  |
| label    | 菜单文案     | string              |
| icon     | 图标组件     | `Component`         |
| disabled | 是否禁用     | boolean             |
| children | 子菜单       | `MenuItem[]`        |

#### Menu Events

| 事件名            | 描述             | 回调参数                 |
| ----------------- | ---------------- | ------------------------ |
| update:modelValue | 选中项变化       | `(key: MenuKey)`         |
| change            | 选中项变化       | `(key: MenuKey, item: MenuItem)` |
| select            | 点击菜单项       | `(key: MenuKey, item: MenuItem)` |
| update:openKeys   | 展开项变化       | `(keys: MenuKey[])`      |
| open-change       | 展开项变化       | `(keys: MenuKey[])`      |
