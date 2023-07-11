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


### API

| 参数     | 描述       | 类型                       | 默认值  |
|----------|----------|----------------------------|---------|
| type     | 消息的类型 | 'success'｜'waring'｜'error' | success |
| message  | 消息的内容 | string                     | ''      |
| duration | 持续时长   | number                     | 600     |