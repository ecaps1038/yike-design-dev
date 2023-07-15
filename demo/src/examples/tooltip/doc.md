## YkToolTip 文字提示

:::snippet
基础用法
文字提示位置摆放有很多种。
<TooltipDefault/>
:::

### API

| 参数      | 描述                                                                                                                               | 类型               | 默认值 |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ------ |
| title     | 气泡消息内容                                                                                                                       | string             | -      |
| placement | 气泡框位置，可选 top，left，right，bottom，topLeft，topRight，bottomLeft，bottomRight，leftTop，leftBottom ，rightTop，rightBottom | string             | top    |
| trigger   | 触发行为，可选 hover，focus，click，contextMenu，可使用数组设置多个触发行为                                                        | string ｜ string[] | hover  |
| open      | 气泡打开状态                                                                                                                       | false ｜ true      | false  |
