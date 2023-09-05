<script setup lang="ts">
import { RouterView } from 'vue-router'
import Bar from '@/components/Bar.vue'

//菜单
//制作目录数组
let bar = [
  {
    title: '设计指南',
    list: [
      {
        name: 'Yike Design',
        src: 'yikedesign',
      },
      {
        name: '设计原则',
        src: 'principle',
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
}

.mmain {
  padding: 24px;
}
</style>
