## YkBadge 徽标
:::snippet
使用场景
一般出现在通知图标或头像的右上角，用于显示需要处理的消息条数，通过醒目视觉形式吸引用户处理。
<BadgeScenes/>
:::
  
:::snippet
基本使用
通过插槽方式，可以在其他组件上展现需要处理的消息条数。
<BadgeBasic/>
:::

:::snippet
小红点
以小红点的形式标注需要关注的内容。默认是内部,可以通过 `out-dot` 外移到右上角
<BadgeDot/>
:::

:::snippet
消息数量
通过 `count` 可以绑定需要展示的消息数量, 通过 `overflowCount` 控制最大显示消息数量,超过将以 `%{overflowCount}+` 的形式展示，默认为`99+`
<BadgeCount/>
:::

:::snippet
是否展示0
通过 `showZero` 可以当消息数量为0时开启展示
<BadgeZero/>
:::

:::snippet
消息位置
通过 `offset` 可以指定消息左侧 `left` 或者右侧 `right`
<BadgeOffset/>
:::

:::snippet
消息状态
通过 `status` 可以控制status，默认是 `danger`
<BadgeStatus/>
:::

:::snippet
消息颜色自定义
通过 `color` 自定义颜色，默认是status为`danger`的颜色, 注意：`color` 的优先级会高于status
<BadgeColor/>
:::

:::snippet
hidden
有时候可能要自主控制是否展示，提供了hidden的开关
<BadgeHidden/>
:::