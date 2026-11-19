<template>
  <yk-space dir="vertical" align="start">
    <yk-select
      v-for="item in sizeList"
      :key="item"
      v-model="value"
      :options="options"
      :size="item"
      :placeholder="`尺寸 ${item}`"
      style="width: 220px"
    />
    <yk-select
      v-model="value"
      :options="options"
      disabled
      placeholder="禁用状态"
      style="width: 220px"
    />
    <yk-select
      v-model="value"
      :options="options"
      loading
      placeholder="加载状态"
      style="width: 220px"
    />
  </yk-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Size } from '@yike-design/ui/components/utils'

const sizeList: Size[] = ['s', 'm', 'l', 'xl']
const options = [
  { value: 'option1', label: '选项1' },
  { value: 'option2', label: '选项2' },
]
const value = ref('option1')
</script>
