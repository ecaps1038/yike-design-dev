<template>
  <yk-space dir="vertical" align="start" style="width: 100%">
    <yk-menu
      v-model="active"
      :items="items"
      :default-open-keys="['components']"
      style="width: 240px"
    />
    <span>当前选中：{{ active }}</span>
  </yk-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { MenuItem } from '@yike-design/ui/components/menu'

const active = ref('button')
const items: MenuItem[] = [
  { key: 'overview', label: '概览' },
  {
    key: 'components',
    label: '组件',
    children: [
      { key: 'button', label: '按钮 Button' },
      { key: 'input', label: '输入框 Input' },
      { key: 'form', label: '表单 Form', disabled: true },
    ],
  },
  {
    key: 'resources',
    label: '资源',
    children: [
      { key: 'icon', label: '图标 Icon' },
      { key: 'color', label: '色彩 Color' },
    ],
  },
  { key: 'about', label: '关于' },
]
</script>
