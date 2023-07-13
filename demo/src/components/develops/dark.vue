<template>
  <div class="module">
    <div class="top-title">
      <yk-title>暗黑模式</yk-title>
      <yk-text>
        既然这个主题这么优雅，那么我也在整套组件库加入了暗黑模式。
      </yk-text>
    </div>
    <yk-title :level="3">加载暗黑模式</yk-title>
    <yk-paragraph type="secondary">
      本人将暗黑模式封装为一个
      <yk-text type="pcolor">Theme</yk-text>
      组件，如需要可以在全局引入该组件，或者在您项目最外层引入组件，组件设有开关，本文档顶部的“太阳”和“月亮”就是该组件的一个展示模式。您可以点击看下效果。
    </yk-paragraph>
    <yk-text b>引入：</yk-text>
    <yk-text>按需引入时在 script 模块引入</yk-text>
    <codes-vue :code="datas[0]" />
    <yk-text b>使用：</yk-text>
    <codes-vue :code="datas[1]" />

    <yk-title :level="3">源码原理</yk-title>
    <yk-paragraph type="secondary">
      源码中可以看到我写了各模式下需要变换颜色的一套颜色变量。在此您可以根据设计需求进行自己调整或增减颜色变量。代码在
      <yk-text type="pcolor">yike-design</yk-text>
      ->
      <yk-text type="pcolor">components</yk-text>
      ->
      <yk-text type="pcolor">theme</yk-text>
    </yk-paragraph>
    <codes-vue :code="datas[2]" />
  </div>
</template>
<script setup lang="ts">
import codesVue from '@/components/Codes.vue'
const datas = [
  `import {Theme} from '@/yike-design'`,
  `<template>
  <div class="yike">
    ...
    <Theme/>
     ...
  </div>
</template>`,
  ` themeA: {
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
  }, `,
]
</script>
<style scoped lang="less"></style>
