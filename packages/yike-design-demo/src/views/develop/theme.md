## 定制主题

Yike Design 从本人一个笔记项目中提炼，采用蓝色主题，可符合一般开发使用，但这套组件库就思想就是为了适应设计任何想法而设计，改它就得了。

### 变量修改

Yike Design 使用 less 作为预编译语言。为寻求最合理最少的变量，我已将涉及组题变量全部放在同一个 less 文件中，使用时直接修改该文档即可。作为全局变量，建议您全局引入该 less 文件。

**全局引入**：

文件在 `@yike-design/ui/components/styles/colors/color.less`

**Vite 引入方法**：

在 vite.config.ts 文件内加入：

```ts
  export default defineConfig({
  ...
  css: {
    // css预处理器
    preprocessorOptions: {
      less: {
        charset: false,
        additionalData: '@import "./src/yike-design/assets/style/index.less";',
      },
    },
  },
})
```

**vue-cli 引入方法**：

在 vite.config.ts 文件内加入：

```ts
const path = require('path')

module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, './src/yike-design/assets/style/index.less'),
      ], // 引入全局样式变量
    },
  },
}
```

### 源码

其中，`yike-design/ui/src/components/styles/colors/color.less` 文件存放所有全局变量，在项目使用上，全局变量完全可以直接修改该文档内容。

```less
// -------- Colors -----------
@pcolor: #2b5aed; // 全局主色
@lcolor: #1890ff; // 链接色
@scolor: #1fb4a2; // 成功色
@wcolor: #f5ac08; // 警告色
@ecolor: #fa5247; // 错误色

// Animation
@animats: 0.3s; // Modal
@animatb: 0.2s;
@animatf: 0.1s; // Tooltip

// font-size
@size-ss: 12px; // 小号
```
