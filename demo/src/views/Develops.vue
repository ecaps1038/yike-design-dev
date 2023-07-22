<script setup lang="ts">
import { RouterView } from 'vue-router'
import Bar from '@/components/Bar.vue'

//菜单
//制作目录数组
let bar = [
  {
    title: '开发指南',
    list: [
      {
        name: 'Yike Design',
        src: 'yikedev',
      },
      {
        name: '快速上手',
        src: 'grasp',
      },
      {
        name: '暗黑模式',
        src: 'dark',
      },
      {
        name: '定制主题',
        src: 'theme',
      },
    ],
  },
]
</script>
<template>
  <div class="module-b">
    <Bar :bar="bar" />
    <div class="main">
      <RouterView />
    </div>
  </div>
</template>
<style scoped lang="less">
.main {
  padding: 24px 56px 56px 324px;

  .module {
    max-width: 1200px;
  }
}

.mmain {
  padding: 24px;
}
</style>
