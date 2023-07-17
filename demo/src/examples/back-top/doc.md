## YkBackTop 返回顶部

:::snippet
基本使用
当容器滚动到一定高度的时候，在右下角会出现一个返回顶部的按钮。指定不同的提示类型
<BackTopBase/>
:::

:::snippet
自定义按钮
可以自定义返回按钮。
<BackTopSlot/>
:::

### API

| 参数             | 描述                         | 类型                         | 默认值        |
| ---------------- | ---------------------------- | ---------------------------- | ------------- |
| right            | 距离页面右侧的宽度           | string                       | 50            |
| bottom           | 距离页面底部的高度           | string                       | 50            |
| target           | 监听滚动的元素               | string ｜ `Ref<HTMLElement>` | -             |
| visibilityHeight | 滚动时触发显示回到顶部的高度 | string                       | 200           |
| animation        | 动画效果                     | 'fade' ｜ 'move'             | fade          |
| icon             | 图标 name                    | 详情见 Icon 组件             | yk-xiangshang |

<!-- | to               | 渲染的容器节点               | string ｜ `Ref<HTMLElement>` | body   | -->
