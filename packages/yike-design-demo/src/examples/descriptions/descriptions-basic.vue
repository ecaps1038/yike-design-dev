<template>
  <yk-descriptions title="用户信息" :items="items" :column="3">
    <template #extra>
      <yk-button size="s" type="secondary">编辑</yk-button>
    </template>
  </yk-descriptions>
</template>

<script setup lang="ts">
import type { DescriptionItem } from '@yike-design/ui/components/descriptions'

const items: DescriptionItem[] = [
  { label: '用户名', value: 'yike-design' },
  { label: '手机号', value: '138****8888' },
  { label: '邮箱', value: 'hello@yike.design' },
  { label: '部门', value: '设计研发部' },
  { label: '职位', value: '前端工程师' },
  { label: '注册时间', value: '2024-01-01' },
]
</script>
