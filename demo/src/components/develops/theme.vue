<template>
  <div class="module">
    <div class="top-title">
      <yk-title>定制主题</yk-title>
      <yk-paragraph type="secondary">
        Yike Design
        从本人一个笔记项目中提炼，采用蓝色主题，可符合一般开发使用，但这套组件库就思想就是为了适应设计任何想法而设计，改它就得了。
      </yk-paragraph>
    </div>
    <yk-title :level="3">变量修改</yk-title>
    <yk-paragraph type="secondary">
      Yike Design 使用
      <yk-text type="primary">Less</yk-text>
      作为预编译语言。为寻求最合理最少的变量，我已将涉及组题变量全部放在同一个
      <yk-text type="primary">Less</yk-text>
      文件中，使用时直接修改该文档即可。作为全局变量，建议您全局引入该
      <yk-text type="primary">Less</yk-text>
      文件。
    </yk-paragraph>
    <yk-paragraph type="secondary">
      <yk-text strong>全局引入：</yk-text>
      文件在
      <yk-text type="primary">yike-design</yk-text>
      ->
      <yk-text type="primary">assets</yk-text>
      ->
      <yk-text type="primary">style</yk-text>
      ->
      <yk-text type="primary">index.less</yk-text>
    </yk-paragraph>
    <yk-text strong>Vite引入方法：</yk-text>
    <yk-text type="secondary">在</yk-text>
    <yk-text type="primary">vite.config.ts</yk-text>
    <yk-text type="secondary">文件内加入：</yk-text>
    <codesVue :code="datas[0]" />
    <yk-text strong>vue-cli引入方法：</yk-text>
    <yk-text type="secondary">在</yk-text>
    <yk-text type="primary">vue.config.ts</yk-text>
    <yk-text type="secondary">文件内加入：</yk-text>
    <codesVue :code="datas[1]" />

    <yk-title :level="3">源码</yk-title>
    <yk-paragraph type="secondary">
      其中
      <yk-text type="primary">yike-design</yk-text>
      ->
      <yk-text type="primary">assets</yk-text>
      ->
      <yk-text type="primary">style</yk-text>
      ->
      <yk-text type="primary">base.less</yk-text>
      文件存放所有全局变量，在项目使用上，全局变量完全可以直接修改该文档内容。
    </yk-paragraph>
    <codesVue :code="datas[2]" />
  </div>
</template>
<script setup lang="ts">
import codesVue from '../Codes.vue'
const datas = [
  `export default defineConfig({
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
})`,
  `const path = require("path")
 
 module.exports = {
   pluginOptions: {
     "style-resources-loader": {
       preProcessor: "less",
       patterns: [
         path.resolve(__dirname, "./src/yike-design/assets/style/index.less"),
       ], // 引入全局样式变量
     },
   },
 }`,
  `// -------- Colors -----------
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
...`,
]
</script>
<style scoped lang="less"></style>
