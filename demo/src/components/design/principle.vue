<script setup lang="ts"></script>

<template>
  <main class="module">
    <div class="top-yk-title">
      <yk-title :level="2">设计原则</yk-title>
      <yk-text type="secondary">
        原则是设计体系集体认知的抽象，对界面好坏的认知是共通的，美与不美都是有迹可循的，如何去使用设计原则，这是每一个设计师必备的技能。在设计体系中，而不让界面变得离谱。
      </yk-text>
    </div>
    <yk-title :level="3">亲密性</yk-title>
    <yk-text type="secondary">
      将类似的项归为一组，如果某些元素在理解上存在关联，或者互相之间存在某种关系，那么这些元素在视觉上也应当有关联。
    </yk-text>
    <yk-title :level="3">对齐</yk-title>
    <yk-text type="secondary">
      任何元素都不能在页面上随意安放，每一项都应该与页面上某个内容存在某种视觉联系。
    </yk-text>
    <yk-title :level="3">重复</yk-title>
    <yk-text type="secondary">设计的某些方面需要在整个作品中多次出现</yk-text>
    <yk-title :level="3">对比</yk-title>
    <yk-text type="secondary">页面增加设觉效果的最有效途径之一</yk-text>
  </main>
</template>

<style lang="less" scoped>
.module {
  max-width: 1200px;
}

a {
  &:hover {
    text-decoration: underline;
  }
}
</style>
