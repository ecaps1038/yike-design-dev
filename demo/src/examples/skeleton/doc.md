## YkSkeleton 骨架屏

:::snippet
基本用法
一个基础用法
<SkeletonPrimary/>
:::

:::snippet
传入多行与标题
自定义行数
<SkeletonRow/>
:::

:::snippet
显示头像
显示头像与设置头像
<SkeletonAvatar/>
:::

:::snippet
标题段落直角风格
关闭圆角
<SkeletonRound/>
:::

:::snippet
显示内容
显示与加载中
<SkeletonShow/>
:::

### API

| 参数        | 描述             | 类型                                                                                                                                                            | 默认值                                                                                           |
| ----------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| loading     | 是否显示骨架屏   | boolean                                                                                                                                                         | true                                                                                             |
| width       | 标题段落宽度     | string                                                                                                                                                          | "100%"                                                                                           |
| height      | 标题段落高度     | string                                                                                                                                                          | "15px"                                                                                           |
| animated    | 是否有动画       | boolean                                                                                                                                                         | true                                                                                             |
| avatar      | 是否有头像       | boolean                                                                                                                                                         | false                                                                                            |
| avatarStyle | 头像样式         | { <br/>&emsp;&emsp;shape: 'circle' \|\| 'square' \|\|number,<br/>&emsp;&emsp;size: number\|\|'s'\|\| 'm'\|\| 'l'\|\|'xl',<br/>&emsp;&emsp;imgUrl: string <br/>} | { <br/>&emsp;&emsp;shape: 'circle',<br/>&emsp;&emsp;size: 'l',<br/>&emsp;&emsp;imgUrl: "" <br/>} |
| round       | 标题段落是否圆角 | boolean                                                                                                                                                         | true，圆角值为 15px                                                                              |
| row         | 有多少行段落     | boolean                                                                                                                                                         | 1                                                                                                |
| title       | 是否有标题       | boolean                                                                                                                                                         | false                                                                                            |

### slot

| 插槽名  | 描述     |
| ------- | -------- |
| default | 展示内容 |
