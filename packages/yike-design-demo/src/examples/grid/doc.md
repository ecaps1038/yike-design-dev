## YkGrid 栅格

:::snippet
基础栅格
使用 24 栅格系统，通过 `Row` 与 `Col` 组合布局。
<GridBasic/>
:::

:::snippet
间隔、偏移与对齐
通过 `gutter` 设置间隔（支持 `[水平, 垂直]`），`offset` 向右偏移，Row 的 `justify` 控制水平对齐。
<GridGutter/>
:::

:::snippet
响应式
通过 `xs`、`sm`、`md`、`lg`、`xl` 设置不同断点下的栅格数。
<GridResponsive/>
:::

### API

#### Row Props

| 参数    | 描述                                    | 类型                                                                | 默认值  |
| ------- | --------------------------------------- | ------------------------------------------------------------------- | ------- |
| gutter  | 栅格间隔，`number` 或 `[水平, 垂直]`    | `number \| [number, number]`                                        | `0`     |
| justify | 水平对齐                                | `start` \| `end` \| `center` \| `space-between` \| `space-around` \| `space-evenly` | `start` |
| align   | 垂直对齐                                | `start` \| `center` \| `end` \| `stretch` \| `baseline`             | `start` |
| wrap    | 是否自动换行                            | boolean                                                             | `true`  |

#### Col Props

| 参数   | 描述                       | 类型                                      | 默认值 |
| ------ | -------------------------- | ----------------------------------------- | ------ |
| span   | 占据的栅格数（1-24）       | number                                    | -      |
| offset | 向右偏移的栅格数           | number                                    | -      |
| xs     | ≥0 时的栅格数或配置        | `number \| { span?: number; offset?: number }` | - |
| sm     | ≥576px 时的栅格数或配置    | `number \| { span?: number; offset?: number }` | - |
| md     | ≥768px 时的栅格数或配置    | `number \| { span?: number; offset?: number }` | - |
| lg     | ≥992px 时的栅格数或配置    | `number \| { span?: number; offset?: number }` | - |
| xl     | ≥1200px 时的栅格数或配置   | `number \| { span?: number; offset?: number }` | - |
