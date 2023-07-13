<template>
  <div class="module">
    <div class="top-title">
      <yk-title>快速上手</yk-title>
    </div>
    <yk-title :level="3">使用技术</yk-title>
    <yk-paragraph type="secondary">
      使用
      <yk-text type="pcolor">vue3</yk-text>
      +
      <yk-text type="pcolor">ts</yk-text>
      +
      <yk-text type="pcolor">less</yk-text>
      搭建。由建设性质，最终不会对代码编译压缩，所以您的开发环境若符合该三项技术，体验会更加友好。
    </yk-paragraph>
    <yk-paragraph type="secondary">
      <yk-text b>另：</yk-text>
      本人使用
      <a href="https://vitejs.cn/" target="_blank">vite</a>
      开发，vite 中完全可以在
      <yk-text type="pcolor">Js</yk-text>
      项目中直接使用该组件库。
    </yk-paragraph>
    <yk-title :level="3">安装</yk-title>
    <yk-paragraph type="secondary">
      本人不会上传到类似
      <yk-text type="pcolor">npm</yk-text>
      或
      <yk-text type="pcolor">yarn</yk-text>
      上面，当您下载了
      <yk-text b>Yike Design</yk-text>
      组件库文件后，完全可以跟自己写的组件一样存放到您项目的任何位置。
    </yk-paragraph>
    <yk-title :level="3">完全引入</yk-title>
    <yk-paragraph type="secondary">
      这里假设将组件“yike-design”放在src文件夹下。
    </yk-paragraph>
    <codesVue :code="datas[0]" />
    <yk-title :level="3">按需引入</yk-title>
    <yk-paragraph type="secondary">
      该组件库所有组件都可单独引入，既然是单独引入，建议在当前页面引入当前所需组件即可。例如以下单独引入
      <yk-text type="pcolor">Button</yk-text>
      组件
    </yk-paragraph>
    <codesVue :code="datas[1]" />
    <yk-paragraph type="secondary">
      您可以在
      <yk-text type="pcolor">yike-design</yk-text>
      ->
      <yk-text type="pcolor">index.ts</yk-text>
      文件内查看所有组件名称。
    </yk-paragraph>
    <codesVue :code="datas[2]" />
  </div>
</template>
<script setup lang="ts">
import codesVue from '@/components/Codes.vue'
const datas = [
  `import { createApp } from 'vue'
import App from './App.vue'

import {install} from '@/yike-design/index'

const app = createApp(App)
app.use(install)
app.mount('#app')`,
  `import { Button } from '@/yike-design';`,
  `//按需引入使用
export {
    Theme,//组题
    Button,//按钮
    Message,//全局提醒
    Icon,//图标
    Title,//标题
    yk-text,//文字
    yk-paragraph,//文章
    Space,//间距
    ...
}`,
]
</script>
<style scoped lang="less"></style>
