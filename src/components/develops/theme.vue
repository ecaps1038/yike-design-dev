<template>
  <div class="module">
    <div class="top-title">
      <Title>定制主题</Title>
      <Paragraph type="secondary">Yike Design 从本人一个笔记项目中提炼，采用蓝色主题，可符合一般开发使用，但这套组件库就思想就是为了适应设计任何想法而设计，改它就得了。</Paragraph>
    </div>
    <Title :level="3">变量修改</Title>
    <Paragraph type="secondary">Yike Design 使用 <Text type="pcolor">Less</Text> 作为预编译语言。为寻求最合理最少的变量，我已将涉及组题变量全部放在同一个 <Text
        type="pcolor">Less</Text> 文件中，使用时直接修改该文档即可。作为全局变量，建议您全局引入该 <Text type="pcolor">Less</Text> 文件。</Paragraph>
    <Paragraph type="secondary"><Text b>全局引入：</Text>文件在 <Text type="pcolor">yike-design</Text> -> <Text
        type="pcolor">assets</Text> -> <Text type="pcolor">style</Text> -> <Text type="pcolor">yk-index.less</Text>
    </Paragraph>
    <Text b>Vite引入方法：</Text><Text type="secondary">在</Text><Text type="pcolor">vite.config.ts</Text><Text
      type="secondary">文件内加入：</Text>
    <codesVue :code="datas[0]" />
    <Text b>vue-cli引入方法：</Text><Text type="secondary">在</Text><Text type="pcolor">vue.config.ts</Text><Text
      type="secondary">文件内加入：</Text>
    <codesVue :code="datas[1]" />

    <Title :level="3">源码</Title>
    <Paragraph type="secondary">其中<Text type="pcolor">yike-design</Text> -> <Text type="pcolor">assets</Text> -> <Text
        type="pcolor">style</Text> -> <Text type="pcolor">base.less</Text> 文件存放所有全局变量，在项目使用上，全局变量完全可以直接修改该文档内容。
    </Paragraph>
    <codesVue :code="datas[2]" />
  </div>
</template>
<script setup lang="ts">
import codesVue from "@/components/codes.vue";
const datas = [
  `export default defineConfig({
  ...
  css: {
    // css预处理器
    preprocessorOptions: {
      less: {
        charset: false,
        additionalData: '@import "./src/yike-design/assets/style/yk-index.less";',
      },
    },
  },
})`,
  `const path = require("path")
 
 module.exports = {
   pluginOptions: {
     "style-resources-loader": {
       preProcessor: "less",
       patterns: [
         path.resolve(__dirname, "./src/yike-design/assets/style/yk-index.less"),
       ], // 引入全局样式变量
     },
   },
 }`
  , `// -------- Colors -----------
@pcolor: #2B5AED; // 全局主色
@lcolor: #1890ff; // 链接色
@scolor: #1FB4A2; // 成功色
@wcolor: #F5AC08; // 警告色
@ecolor: #FA5247; // 错误色

// Animation
@animats: 0.3s; // Modal
@animatb: 0.2s;
@animatf: 0.1s; // Tooltip

//font-size
@size-ss: 12px; // 小号
...`
]
</script>
<style scoped lang="less"></style>