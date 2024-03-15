## 黑暗模式

既然这个主题这么优雅，那么我也在整套组件库加入了暗黑模式。

### 使用

内部已将暗黑模式封装为 `<yk-theme>` 组件，可以按组件形式引入该组件使用，组件默认跟随系统主题切换。默认设有开关，本文档顶部的“太阳”和“月亮”就是该组件的一个展示模式。您可以点击看效果。

### 模式行为

暗黑模式也是主题的一种，我们应该根据用户喜好做到最自由的搭配，我们遵从用户自由搭配和使用该两套主题。

### 颜色

我们因遵从视觉直觉，暗黑模式下的信息内容需要和浅色模式保持一致性，不应该打破原有的层级关系。

:::pure
<ColorList />
:::

### API

yk-theme 主题组件设有两个变量，分别 skin、control。两个相互联系配合完成对主题的控制。其中 skin 控制模式主题，control 控制是否显示“太阳”和“月亮”组件。

**控制**：

skin 有三种模式，分别为：auto、light、dark，默认为 auto；control 为 boolean 属性值，默认为 true。

```html
<!-- 默认跟随系统颜色，并显示控制主题的“太阳”和“月亮”控件 -->
<yk-theme />

<!-- 默认跟随系统颜色，不显示控制主题的“太阳”和“月亮”控件 -->
<yk-theme :control="false" />

<!-- 默认浅色颜色模式，并显示控制主题的“太阳”和“月亮”控件 -->
<yk-theme skin="light" />

<!-- 保持默认浅色模式，不显示控制主题的“太阳”和“月亮”控件 -->
<yk-theme skin="light" :control="false" />
```

### 源码管理

源码中可以看到针对各模式下设置一套颜色变量。在此您可以根据设计需求进行自己调整或增减颜色变量。

代码在 `@yike-design/ui/styles/theme.less`。

```less
//默认
:root {
  // -------- Functional color light -----------
  --pcolor: palette(@pcolor-light); // 全局主色
  --lcolo : palette(@lcolor-light); // 链接色
  --scolor: palette(@scolor-light); // 成功色
  --wcolor: palette(@wcolor-light); // 警告色
  --ecolor: palette(@ecolor-light); // 错误色
  --gray  : palette(@gray);         // 中性色
}

// 亮色主题
[data-theme='light'] {
  // -------- Functional color light -----------
  --pcolor: palette(@pcolor-light); // 全局主色
  --lcolo : palette(@lcolor-light); // 链接色
  --scolor: palette(@scolor-light); // 成功色
  --wcolor: palette(@wcolor-light); // 警告色
  --ecolor: palette(@ecolor-light); // 错误色
  --gray  : palette(@gray);         // 中性色
}

// 暗色主题
[data-theme='dark'] {
  // -------- Functional color light -----------
  --pcolor: palette(@pcolor-dark); // 全局主色
  --lcolo : palette(@lcolor-dark); // 链接色
  --scolor: palette(@scolor-dark); // 成功色
  --wcolor: palette(@wcolor-dark); // 警告色
  --ecolor: palette(@ecolor-dark); // 错误色
  --gray  : palette(@white);       // 中性色
```
