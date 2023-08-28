<script setup lang="ts"></script>

<template>
  <main class="module">
    <div class="top-title">
      <yk-title :level="2">Yike Design</yk-title>
      <yk-text>
        出于对前端组件的好奇，利用业余时间将设计的一个应用提炼出部分设计规范，从而创建出此套对应的前端组件。期望人人都能直面源码，更佳灵活的使用在型项目中。
      </yk-text>
    </div>
    <yk-title :level="3">开发交流</yk-title>
    <yk-title :level="5">QQ</yk-title>
    <yk-text>
      QQ群：740076696 欢迎加入交流；本人QQ：1334785356 加我请注明 “yike
      Design”，谢谢。
    </yk-text>
    <yk-title :level="5">微信</yk-title>
    <yk-paragraph>
      微信群不好分享，可加本人微信：
      <yk-text type="primary">yikeyikech</yk-text>
      加我请注明 “yike Design” 之后将邀请进入相关群内，谢谢。
    </yk-paragraph>
    <yk-title :level="3">您的打赏赞助是我最大的动力</yk-title>
    <yk-text>
      本组件库倾尽我多半的业余生活，也经历了一个个深夜的探索。若能得到您的肯定，这一切都是值得的！
    </yk-text>
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
    margin-top: 30px;
    margin-right: 40px;
    width: 240px;
  }
}
</style>
