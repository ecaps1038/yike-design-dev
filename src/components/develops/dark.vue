<template>
  <div class="module">
    <div class="top-title">
      <Title>暗黑模式</Title>
      <Text>既然这个主题这么优雅，那么我也在整套组件库加入了暗黑模式。</Text>
    </div>
    <Title :level="3">加载暗黑模式</Title>
    <Paragraph type="secondary">本人将暗黑模式封装为一个 <Text type="pcolor">Theme</Text>
      组件，如需要可以在全局引入该组件，或者在您项目最外层引入组件，组件设有开关，本文档顶部的“太阳”和“月亮”就是该组件的一个展示模式。您可以点击看下效果。</Paragraph>
    <Text b>引入：</Text><Text>按需引入时在 script 模块引入</Text>
    <codesVue :code="datas[0]" />
    <Text b>使用：</Text>
    <codesVue :code="datas[1]" />

    <Title :level="3">源码原理</Title>
    <Paragraph type="secondary">源码中可以看到我写了各模式下需要变换颜色的一套颜色变量。在此您可以根据设计需求进行自己调整或增减颜色变量。代码在 <Text
        type="pcolor">yike-design</Text> -> <Text type="pcolor">components</Text> -> <Text type="pcolor">theme</Text>
    </Paragraph>
    <codesVue :code="datas[2]" />
  </div>
</template>
<script setup lang="ts">
import codesVue from "@/components/codes.vue";
const datas = [
  `import {Theme} from '@/yike-design'`,
  `<template>
  <div class="yike">
    ...
    <Theme/>
     ...
  </div>
</template>`
  , ` themeA: {
    bgcolorl:'#fff',
    bgcolorm:'#F6F6F8',
    bgcolors:'#F3F3F4',
    bgcolorss:'#E8E8E8',
    ...
  },

  themeB: {
    bgcolorl:'#1E2025',
    bgcolorm:'#24262B',
    bgcolors:'#282A2F',
    bgcolorss:'#33353B',
    ...
  }, `
]
</script>
<style scoped lang="less"></style>