## YkPopconfirm 气泡确认框

:::snippet
基本用法
这里展示基本用法
<PopconfirmPrimary/>
:::

:::snippet
异步处理
事件回调函数可返回 promise 对象, 用于处理异步逻辑(例如：点击确认或取消发送请求等)。组件会展示异步逻辑处理状态
<PopconfirmAsync/>
:::

### API

| 参数              | 描述               | 类型                                       | 默认值               |
| ----------------- | ------------------ | ------------------------------------------ | -------------------- |
| title             | 气泡标题           | string                                     | "标题"               |
| content           | 气泡内容           | string                                     | "hello YkPopconfirm" |
| cancelText        | 取消按钮文字       | string                                     | "取消"               |
| okText            | 确认按钮文字       | string                                     | "确认"               |
| showCancel        | 是否展示取消按钮   | boolean                                    | true                 |
| okButtonProps     | 确认按钮 props     | ButtonProps                                | -                    |
| cancelButtonProps | 取消按钮 props     | ButtonProps                                | -                    |
| onCancel          | 点击取消按钮的事件 | (() => Promise\<boolean\>) \| (() => void) | -                    |
| onConfirm         | 点击确认按钮的事件 | (() => Promise\<boolean\>) \| (() => void) | -                    |

其他参数同 <a href="tooltip" style="color:red">`tooltip`</a> 组件

| 名称    | 说明                                                                                                                                      | 参数 |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| default | 默认插槽，触发气泡的标签元素。请确保插槽内容只有一个根元素 并确保元素能正常绑定 `onMouseEnter`、`onMouseLeave`、`onFocus`、`onClick` 事件 | -    |
| title   | 气泡标题                                                                                                                                  | -    |
| content | 气泡内容插槽                                                                                                                              | -    |
