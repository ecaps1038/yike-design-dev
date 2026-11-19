<template>
  <yk-select
    v-model="value"
    :options="options"
    filterable
    clearable
    placeholder="搜索并选择城市"
    style="width: 260px"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const options = [
  { value: 'beijing', label: '北京' },
  { value: 'shanghai', label: '上海' },
  { value: 'guangzhou', label: '广州' },
  { value: 'shenzhen', label: '深圳' },
  { value: 'hangzhou', label: '杭州' },
  { value: 'chengdu', label: '成都' },
]

const value = ref()
</script>
