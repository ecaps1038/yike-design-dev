<script setup lang="ts">
import { reactive } from 'vue';
import CaseCard from "@/components/CaseCard.vue";

</script>

<template>
  <main class="module">
    <div class="top-title">
      <Title :level="2">Yike Design</Title>
      <Text>出于对前端组件的好奇，利用业余时间将设计的一个应用提炼出部分设计规范，从而创建出此套对应的前端组件。期望人人都能直面源码，更佳灵活的使用在型项目中。</Text>
    </div>
    <Title :level="3">开发交流</Title>
    <Title :level="5">QQ</Title>
    <Text>QQ群：740076696 欢迎加入交流；本人QQ：1334785356 加我请注明 “yike Design”，谢谢。</Text>
    <Title :level="5">微信</Title>
    <Paragraph>微信群不好分享，可加本人微信：<Text type="pcolor">yikeyikech</Text> 加我请注明 “yike Design” 之后将邀请进入相关群内，谢谢。</Paragraph>
    <Title :level="3">您的打赏赞助是我最大的动力</Title>
    <Text>本组件库倾尽我多半的业余生活，也经历了一个个深夜的探索。若能得到您的肯定，这一切都是值得的！</Text>
    <div class="support">
      <img src="@/assets/images/wx.png" />
      <img src="@/assets/images/zfb.png" />
    </div>
  </main>
</template>

<style lang="less" scoped>
a {
  &:hover {
    text-decoration: underline;
  }
}

.support {
  img {
    width: 240px;
    margin-top: 30px;
    margin-right: 40px;
  }
}
</style>
