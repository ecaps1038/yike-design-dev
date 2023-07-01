<template>
  <div class="module">
    <div class="top-title">
      <Title>快速上手</Title>
    </div>
    <Title :level="3">使用技术</Title>
    <Paragraph type="secondary">使用 <Text type="pcolor">vue3</Text> + <Text type="pcolor">ts</Text> + <Text
        type="pcolor">less</Text> 搭建。由建设性质，最终不会对代码编译压缩，所以您的开发环境若符合该三项技术，体验会更加友好。</Paragraph>
    <Paragraph type="secondary"><Text b>另：</Text>本人使用 <a href="https://vitejs.cn/" target="_blank">vite</a> 开发，vite 中完全可以在
      <Text type="pcolor">Js</Text> 项目中直接使用该组件库。
    </Paragraph>
    <Title :level="3">安装</Title>
    <Paragraph type="secondary">本人不会上传到类似 <Text type="pcolor">npm</Text> 或 <Text type="pcolor">yarn</Text> 上面，当您下载了
      <Text b>Yike Design</Text> 组件库文件后，完全可以跟自己写的组件一样存放到您项目的任何位置。
    </Paragraph>
    <Title :level="3">完全引入</Title>
    <Paragraph type="secondary">这里假设将组件“yike-design”放在src文件夹下。
    </Paragraph>
    <codesVue :code="datas[0]" />
    <Title :level="3">按需引入</Title>
    <Paragraph type="secondary">该组件库所有组件都可单独引入，既然是单独引入，建议在当前页面引入当前所需组件即可。例如以下单独引入 <Text type="pcolor">Button</Text> 组件
    </Paragraph>
    <codesVue :code="datas[1]" />
    <Paragraph type="secondary">您可以在 <Text type="pcolor">yike-design</Text> -> <Text type="pcolor">index.ts</Text>
      文件内查看所有组件名称。
    </Paragraph>
    <codesVue :code="datas[2]" />
  </div>
</template>
<script setup lang="ts">
import codesVue from "@/components/codes.vue";
const datas = [
  `import { createApp } from 'vue'
import App from './App.vue'

import {install} from '@/yike-design/index'

const app = createApp(App)
app.use(install)
app.mount('#app')`
  , `import { Button } from '@/yike-design';`
  , `//按需引入使用
export {
    Theme,//组题
    Button,//按钮
    Message,//全局提醒
    Icon,//图标
    Title,//标题
    Text,//文字
    Paragraph,//文章
    Space,//间距
    ...
}`
]
</script>
<style scoped lang="less"></style>