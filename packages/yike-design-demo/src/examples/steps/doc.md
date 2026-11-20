## YkSteps 步骤条

:::snippet
基本用法
通过 `current` 指定当前步骤，`clickable` 开启点击切换，并监听 `change` 事件。
<StepsBasic/>
:::

:::snippet
纵向步骤条
`direction="vertical"` 切换为纵向；每个步骤可通过 `status` 单独指定状态（wait / process / finish / error）。
<StepsVertical/>
:::

### API

| 参数      | 描述                     | 类型                          | 默认值       |
| --------- | ------------------------ | ----------------------------- | ------------ |
| items     | 步骤数据                 | `StepItem[]`                  | `[]`         |
| current   | 当前步骤索引             | number                        | `0`          |
| status    | 当前步骤的状态           | `process` \| `error`          | `process`    |
| direction | 排列方向                 | `horizontal` \| `vertical`    | `horizontal` |
| size      | 尺寸                     | `s` \| `m` \| `l`             | `m`          |
| clickable | 是否可点击切换           | boolean                       | `false`      |

#### StepItem

| 字段        | 描述                 | 类型                                      |
| ----------- | -------------------- | ----------------------------------------- |
| title       | 步骤标题             | string                                    |
| description | 步骤描述             | string                                    |
| icon        | 自定义图标组件       | `Component`                               |
| status      | 单独指定该步骤状态   | `wait` \| `process` \| `finish` \| `error` |

### Events

| 事件名 | 描述                 | 回调参数          |
| ------ | -------------------- | ----------------- |
| change | 点击步骤时触发       | `(index: number)` |

### Slots

| 插槽名 | 描述                                   |
| ------ | -------------------------------------- |
| icon   | 自定义步骤图标，参数 `{ step, index }` |
