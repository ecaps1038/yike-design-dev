<script setup lang="ts">

</script>

<template>
  <main class="module">
    <div class="top-title">
      <Title :level="2">设计原则</Title>
      <Text type="secondary">原则是设计体系集体认知的抽象，对界面好坏的认知是共通的，美与不美都是有迹可循的，如何去使用设计原则，这是每一个设计师必备的技能。在设计体系中，而不让界面变得离谱。</Text>
    </div>
    <Title :level="3">亲密性</Title>
    <Text type="secondary">将类似的项归为一组，如果某些元素在理解上存在关联，或者互相之间存在某种关系，那么这些元素在视觉上也应当有关联。</Text>
    <Title :level="3">对齐</Title>
    <Text type="secondary">任何元素都不能在页面上随意安放，每一项都应该与页面上某个内容存在某种视觉联系。</Text>
    <Title :level="3">重复</Title>
    <Text type="secondary">设计的某些方面需要在整个作品中多次出现</Text>
    <Title :level="3">对比</Title>
    <Text type="secondary">页面增加设觉效果的最有效途径之一</Text>
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
