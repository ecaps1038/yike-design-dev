<script setup lang="ts">
import { RouterView } from 'vue-router'
import Bar from '@/components/Bar.vue'
//菜单
//制作目录数组
let bar = [
  {
    title: '通用',
    list: [
      {
        name: 'Button 按钮',
        src: 'button',
      },
      {
        name: 'Icon 图标',
        src: 'icon',
      },
      {
        name: 'Space 间距',
        src: 'space',
      },
    ],
  },
  {
    title: '布局',
    list: [],
  },
  {
    title: '导航',
    list: [],
  },
  {
    title: '数据输入',
    list: [],
  },
  {
    title: '反馈',
    list: [
      {
        name: 'Alert 警告提示',
        src: 'alert',
      },
      {
        name: 'Message 消息提示',
        src: 'message',
      },
      {
        name: 'Empty 空状态',
        src: 'empty',
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
