## Typography 排版

用户展示段落、标题、文本内容

:::snippet
Title 标题级别
通过 `level` 展示不同级别的标题,一共五个级别
<TitleLevel/>
:::

:::snippet
类型 type
所有文本内容都有该属性，这里以标题为例。不同类型分别有：`default`,`primary`,`secondary`,`success`,`warning`,`danger` 六种类型，默认为`default`
<TitleType/>
:::

:::snippet
Text 文本
展示不同样式的文本
<TextType/>
:::

:::snippet
Paragraph 段落
文本段落
<ParagraphPrimary/>
:::

:::snippet
段落省略 ellipsis
使用 `ellipsis` 可以对或行文本内容可以自定义较少行省略显示，且可以对省略内容进行展开。
<ParagraphEllipsis/>
:::

### API

#### Title

| 参数名 | 描述     | 类型                                                                        | 默认值  |
| ------ | -------- | --------------------------------------------------------------------------- | ------- |
| level  | 标题级别 | 1 \| 2 \| 3 \| 4 \| 5                                                       | 1       |
| type   | 标题类型 | 'default' \| 'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger' | default |

#### Text

| 参数名    | 描述     | 类型                                                                                   | 默认值 |
| --------- | -------- | -------------------------------------------------------------------------------------- | ------ |
| type      | 标题类型 | 'default' ｜ 'primary' ｜ 'third' ｜ 'secondary' ｜ 'success' ｜ 'warning' ｜ 'danger' | -      |
| strong    | 文字加粗 | false \| true                                                                          | false  |
| mark      | 标记样式 | false \| true                                                                          | false  |
| underline | 下划线   | false \| true                                                                          | false  |
| del       | 删除线   | false \| true                                                                          | false  |

#### Paragraph

| 参数名   | 描述                                           | 类型                                                                                   | 默认值                  |
| -------- | ---------------------------------------------- | -------------------------------------------------------------------------------------- | ----------------------- |
| type     | 标题类型                                       | 'default' ｜ 'primary' ｜ 'third' ｜ 'secondary' ｜ 'success' ｜ 'warning' ｜ 'danger' | -                       |
| strong   | 文字加粗                                       | false \| true                                                                          | false                   |
| ellipsis | 自动溢出省略，rows 显示行数，showMore 展开按钮 | object                                                                                 | {rows:0,showMore:false} |
| copyable | 拷贝文案按钮                                   | false \| true                                                                          | false                   |
| ---      | ---                                            | ---                                                                                    | ---                     |
