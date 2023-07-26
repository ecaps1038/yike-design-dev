## YkScrollbar 滚动条

:::snippet
基本用法
这里展示基本用法
<ScrollbarPrimary/>
:::

:::snippet
横向滚动
当内容宽度大于容器宽度时
<ScrollbarHorizontal/>
:::

:::snippet
总是显示
总是显示滚动条
<ScrollbarAlways/>
:::

:::snippet
原生滚动条
原生滚动条可以获得更好的性能
<ScrollbarNative/>
:::

### API

#### Scrollbar Attributes

| 参数   | 描述               | 类型             | 默认值 |
| ------ | ------------------ | ---------------- | ------ |
| height | 容器高度           | number ｜ string | --     |
| native | 是否显示原生滚动条 | boolean          | false  |
| always | 滚动条总是显示     | boolean          | false  |
| size   | 滚动条宽度         | number           | 5      |
| space  | 与边间距           | number           | 2      |
| show   | 是否显示滚动条     | boolean          | true   |

#### Scrollbar Slots

| 参数    | 描述       |
| ------- | ---------- |
| default | 自定义内容 |

#### Scrollbar Events

| 事件名 | 说明     | 类型     |
| ------ | -------- | -------- |
| scroll | 触发滚动 | Function |
