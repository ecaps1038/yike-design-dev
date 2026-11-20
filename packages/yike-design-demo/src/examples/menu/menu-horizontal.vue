<template>
  <yk-space dir="vertical" align="start" style="width: 100%">
    <yk-menu
      v-model="active"
      :items="items"
      mode="horizontal"
      theme="dark"
      style="width: 100%"
    />
    <span>当前选中：{{ active }}</span>
  </yk-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { MenuItem } from '@yike-design/ui/components/menu'

const active = ref('home')
const items: MenuItem[] = [
  { key: 'home', label: '首页' },
  { key: 'guide', label: '指南' },
  {
    key: 'components',
    label: '组件',
    children: [
      { key: 'general', label: '通用' },
      { key: 'layout', label: '布局' },
      { key: 'feedback', label: '反馈' },
    ],
  },
  { key: 'changelog', label: '更新日志' },
]
</script>
