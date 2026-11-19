<template>
  <yk-select
    v-model="multipleValue"
    :options="options"
    multiple
    clearable
    placeholder="请选择颜色"
    style="width: 320px"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const options = [
  { value: 'yellow', label: '黄色' },
  { value: 'blue', label: '蓝色' },
  { value: 'red', label: '红色', disabled: true },
  { value: 'green', label: '绿色' },
]

const multipleValue = ref<string[]>(['yellow', 'blue'])
</script>
