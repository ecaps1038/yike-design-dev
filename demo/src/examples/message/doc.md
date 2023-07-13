## YkMessage 消息提示

:::snippet
基本使用
通过传入 `type` 指定不同的提示类型
<MessagePrimary/>
:::

:::snippet
提示文案
通过传入 `message` 指定不同的提示文案
<MessageAlter/>
:::

:::snippet
提示时长
通过传入 `duration` 指定不同的提示时长
<MessageDuration/>
:::

:::snippet
关闭时的回掉函数
通过传入 `onClose` 调用全局提示关闭时的回掉函数
<MessageOnclose/>
:::

### API


组件提供了一些静态方法，使用方式和参数如下：


```JavaScript
 message.success(content, duration, onClose)
 message.info(content, duration, onClose)
 message.error(content, duration, onClose)
 message.warning(content, duration, onClose)

```

| 参数     | 描述       | 类型                       | 默认值  |
|----------|----------|----------------------------|---------|
| type     | 消息的类型 | 'success'｜'warning'｜'error' | success |
| message  | 消息的内容 | string                     | ''      |
| duration | 持续时长   | number                     | 600     |
| onClose | 关闭时的回掉函数   | Function              |   ()=>{}   |