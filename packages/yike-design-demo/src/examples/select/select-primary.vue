<template>
  <yk-space dir="vertical" align="start">
    <yk-select v-model="singleValue" :options="options" style="width: 260px" />
    <yk-select
      v-model="singleValue2"
      :options="options2"
      placeholder="请选择选项"
      style="width: 260px"
    />
  </yk-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const options = [
  { value: 'option1', label: '选项1' },
  { value: 'option2', label: '选项2' },
  { value: 'option3', label: '选项3', disabled: true },
  { value: 'option4', label: '选项4' },
  { value: 'option5', label: '选项5' },
]

const options2 = [
  { value: 'option1', label: '选项1' },
  { value: 'option2', label: '选项2' },
  { value: 'option5', label: '选项5' },
]

const singleValue = ref('option1')
const singleValue2 = ref()
</script>
