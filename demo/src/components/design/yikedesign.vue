<script setup lang="ts"></script>

<template>
  <main class="module">
    <div class="top-title">
      <yk-title :level="2">Yike Design</yk-title>
      <yk-text type="secondary">
        出于对前端组件的好奇，利用业余时间将设计的一个应用提炼出部分设计规范，从而创建出此套对应的前端组件。期望人人都能直面源码，更佳灵活的使用在型项目中。
      </yk-text>
    </div>
    <yk-title :level="3">设计资源</yk-title>
    <yk-title :level="5">Sketch源文件</yk-title>
    <yk-text type="secondary">
      本人只制作了相对应的Sketch组件源文件，有需要的可点击
      <a href="http://www.huohuo90.com/resource">Yike Design 设计稿</a>
      下载。
    </yk-text>
    <yk-title :level="5">图标库</yk-title>
    <yk-text type="secondary">
      本人为 Yike Design
      制作了两套基础图标，分别为线性图标和面性图标。之后将不定期更新补充
      <a href="https://www.iconfont.cn/collections/detail?cid=44410">
        Yike Design Icons
      </a>
      。
    </yk-text>
    <yk-title :level="3">设计价值观</yk-title>
    <yk-text type="secondary">
      设计价值观是一套设计语言的思想贯穿，它确定一套设计语言的方向。我没有达到这样的高度，暂就不说了。大厂都有很清楚的说明，值得参考，我就闭嘴了。
    </yk-text>
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
