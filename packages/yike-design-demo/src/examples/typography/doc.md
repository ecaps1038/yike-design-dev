## Typography 排版

用户展示段落、标题、文本内容

:::snippet
标题
通过 `level` 展示不同级别的标题,一共五个级别
<TitleLevel />
:::

:::snippet
类型
所有文本内容都有该属性，这里以标题为例。不同类型分别有：`primary`,`secondary`,`success`,`warning`,`danger` 六种类型。
<TitleType />
:::

:::snippet
文本
展示不同样式的文本
<TextType />
:::

:::snippet
段落
文本段落
<ParagraphPrimary />
:::

:::snippet
段落省略
使用 `rows` 限制段落显示的行数。
<ParagraphEllipsis />
:::

### API

#### Title

| 参数名 | 描述     | 类型                                                           | 默认值 |
| ------ | -------- | -------------------------------------------------------------- | ------ |
| level  | 标题级别 | 1 \| 2 \| 3 \| 4 \| 5                                          | 1      |
| type   | 类型     | 'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger' | -      |

#### Text

| 参数名    | 描述     | 类型                                                                      | 默认值  |
| --------- | -------- | ------------------------------------------------------------------------- | ------- |
| type      | 类型     | 'primary' \| 'third' \| 'secondary' \| 'success' \| 'warning' \| 'danger' | -       |
| strong    | 文字加粗 | boolean                                                                   | `false` |
| mark      | 标记样式 | boolean                                                                   | `false` |
| underline | 下划线   | boolean                                                                   | `false` |
| del       | 删除线   | boolean                                                                   | `false` |

#### Paragraph

注意：`moreable` 属性与 `copyable` 互斥。

| 参数名            | 描述                               | 类型                           | 默认值  |
| ----------------- | ---------------------------------- | ------------------------------ | ------- |
| rows              | 显示的行数（大于 0 ）              | number                         | -       |
| moreable          | 是否具有展开收起功能               | boolean                        | `false` |
| open/v-modal:open | 是否处于展开状态                   | boolean                        | `false` |
| openText          | 自定义‘展开’文字                   | string                         | '展开'  |
| closeText         | 自定义‘收起’文字                   | string                         | '收起'  |
| copyable          | 拷贝文案按钮                       | boolean                        | `false` |
| openChange        | 展开更多时触发                     | (open: boolean) => void        | -       |
| copyBefore        | 复制前触发，用于处理需要复制的文字 | (value: Ref\<string\>) => void | -       |
