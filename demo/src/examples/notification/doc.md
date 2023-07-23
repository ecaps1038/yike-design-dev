## YkNotification 通知提醒

:::snippet
基本使用
通过传入 `type` 指定不同的提示类型
<NotificationPrimary/>
:::

:::snippet
提示时长
通过传入 `duration` 指定不同的提示时长
<NotificationDuration/>
:::

:::snippet
关闭时的回调函数
通过传入 `onClose` 调用全局提示关闭时的回调函数
<NotificationOnclose/>
:::

:::snippet
关闭实例
通过 proxy.$notify 创建的通知将返回一个实例，其中提供了 close 方法，能够提前关闭通知
<NotificationClose/>
:::

### API

| 参数      | 描述                  | 类型                                     | 默认值 |
| --------- | --------------------- | ---------------------------------------- | ------ |
| type      | 通知的类型            | 'primary'\|'success'\|'warning'\|'error' | info   |
| message   | 通知的内容            | string                                   | ''     |
| title     | 通知的标题            | string                                   | ''     |
| duration  | 持续时长，为 0 时驻留 | number                                   | 3500   |
| onClose   | 关闭时的回调函数      | Function                                 | ()=>{} |
| showClose | 是否显示关闭图标      | Boolean                                  | true   |

### Instance

可以通过返回的实例调用 close 方法提前关闭
