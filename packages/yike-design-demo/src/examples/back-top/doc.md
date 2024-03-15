## YkBackTop 返回顶部

:::snippet
基本使用
当容器滚动到一定高度的时候，在右下角会出现一个返回顶部的按钮。
<BackTopBase/>
:::

:::snippet
自定义按钮
可以自定义返回按钮。
<BackTopSlot/>
:::

:::snippet
不同的类型
可以通过修改 `theme` 选择不同的类型主题。
<BackTopPrimary/>
:::

### API

| 参数          | 描述                         | 类型                            | 默认值  |
| ------------- | ---------------------------- | ------------------------------- | ------- |
| theme         | 类型                         | 'primary'｜'secondary'          | primary |
| right         | 距离页面右侧的宽度           | string ｜ number                | 50px    |
| bottom        | 距离页面底部的高度           | string ｜ number                | 50px    |
| target        | 监听滚动的元素               | string ｜ `Ref<HTMLElement>`    | -       |
| visibleHeight | 滚动时触发显示回到顶部的高度 | string ｜ number                | 200px   |
| animation     | 动画效果                     | 'upward' ｜ 'fade'              | upward  |
| icon          | 图标 name                    | 详情见 Icon 组件                | yk-top  |
| behavior      | 滚动时的过渡效果             | 'smooth' ｜ 'instant' ｜ 'auto' | smooth  |

<!-- | to               | 渲染的容器节点               | string ｜ `Ref<HTMLElement>` | body   | -->
