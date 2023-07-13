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
关闭时的回调函数
通过传入 `onClose` 调用全局提示关闭时的回调函数
<MessageOnclose/>
:::

:::snippet
静态方法
提供 `success`,`error`,`warning` 静态方法直接调用全局消息
<MessageMethods/>
:::

### API

| 参数     | 描述             | 类型                          | 默认值  |
| -------- | ---------------- | ----------------------------- | ------- |
| type     | 消息的类型       | 'success'｜'warning'｜'error' | success |
| message  | 消息的内容       | string                        | ''      |
| duration | 持续时长         | number                        | 600     |
| onClose  | 关闭时的回调函数 | Function                      | ()=>{}  |

### Methods

| 方法    | 描述     | 入参类型 | 默认值 |
| ------- | -------- | -------- | ------ |
| success | 成功消息 | string   | ''     |
| error   | 失败消息 | string   | ''     |
| info    | 提示消息 | string   | ''     |
