## YkNotification 消息提示

:::snippet
基本使用
通过传入 `message` 指定不同的提示文案，支持 `jsx` 和 `VNode` 写法
<NotificationAlter/>
:::

:::snippet
不同状态
通过传入 `type` 指定不同的提示类型
<NotificationPrimary/>
:::

:::snippet
消息弹出的不同位置
通过传入 `position` 指定Notification弹出的位置。支持四个选项：`topRight`、`topLeft`、`bottomRight` 和 `bottomLeft`， 默认为 `topRight`
<NotificationPosition/>
:::

:::snippet
隐藏关闭按钮
通过传入 `closable` 设置是否隐藏关闭按钮
<NotificationClose/>
:::

:::snippet
展示底部操作按钮
通过传入 `showFooterBtn` 设置是否展示底部操作按钮
<NotificationFooterBtn/>
:::

:::snippet
回调函数
通过传入 `onClose` 设置 Notificaiton关闭时的回调函数<br>通过传入 `handleCancel` 设置 点击底部"取消"按钮时的回调函数<br>通过传入 `handleSubmit` 设置 点击底部"确定"按钮时的回调函数
<NotificationCb/>
:::

### API

| 参数          | 描述                                         | 类型                                                 | 默认值      |
| ------------- | -------------------------------------------- | ---------------------------------------------------- | ----------- |
| type          | 消息的类型                                   | 'primary' \| 'success' \| 'warning' \| 'error'\| 'loading' | success     |
| message       | 消息的内容                                   | string \| VNode \| JSX                                        | ''          |
| dangerouslyUseHTMLString | 是否将 message 属性作为 HTML 片段处理 | boolean                                               | false       |
| title         | 标题                                         | string                                               | 'Title'     |
| closable      | 控制关闭按钮显隐                             | boolean                                              | true(显示)  |
| showFooterBtn | 控制底部操作按钮显隐                         | boolean                                              | false(隐藏) |
| showIcon      | 控制图标显隐                                 | boolean                                              | true(显示)  |
| duration      | 显示时间, 单位为毫秒。 值为 0 则不会自动关闭 | number                                               | 4500        |
| space         | 提醒框间距, 单位是 px                        | number                                               | 24          |
| position          | 自定义弹出位置                                   | 'topRight' \| 'topLeft' \| 'bottomRight' \| 'bottomLeft' | 'topRight'     |
| onClose       | 关闭时的回调函数                             | Function                                             | ()=>{}      |
| handleCancel  | 底部操作按钮展示时, 点击取消按钮的回调函数   | Function                                             | ()=>{}      |
| handleSubmit  | 底部操作按钮展示时, 点击确定按钮的回调函数   | Function                                             | ()=>{}      |

### Methods

| 方法    | 描述     | 入参类型 | 默认值 |
| ------- | -------- | -------- | ------ |
| success | 成功消息 | string   | ''     |
| error   | 失败消息 | string   | ''     |
| primary | 提示消息 | string   | ''     |
| warning | 警告消息 | string   | ''     |

### Instance

可以通过返回的实例调用 close 方法提前关闭
