## YkCalendar 日历

:::snippet
基本用法
这里展示基本用法
<CalendarPrimary/>
:::

:::snippet
自定义显示单元格内容
使用具名插槽`date-cell`定义单元格显示的内容，可以获取到 `date` (当前日期)，`isSelected` 选择状态，`day` 格式化时间(YYYY-MM-DD)，`type` 类型(`prev | current | next`)
<CalendarSlot/>
:::

:::snippet
自定义头部标题
使用具名插槽 `header` 可以自定义日历头部标题，`data` 数据中存放 `title` 和事件 `selectFn` 详细请看 API
<CalendarHeader/>
:::

### Props

| 属性名  | 类型   | 默认值 | 描述           |
| ------- | ------ | ------ | -------------- |
| v-model | `Date` | -      | 双向绑定时间值 |

### Slots

| 插槽名    | 说明                     | 参数                                                                                                                                |
| --------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| date-cell | 用于自定义单元格显示内容 | data= isSelected(选中状态)、day(格式化时间:YYYY-MM-DD)、date(选中时间 Date)、type(类型:prev(上个月)、 current(当月) 、next(下个月)) |
| header    | 用于定义日历头部内容     | data = title(时间标题)、selectFn(按钮事件组) 参数 `prev-year prev-month tody next-month  next-year`                                 |

### Methods

| 属性名       | 类型     | 说明                     | 参数         |
| ------------ | -------- | ------------------------ | ------------ |
| change       | Function | 按钮组触发回调事件       | `(val:Date)` |
| panel-change | Function | 面板切换日期触发回调事件 | `(val:Date)` |
