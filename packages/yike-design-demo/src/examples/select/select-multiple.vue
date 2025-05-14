<template>
  <yk-space dir="vertical">
    <yk-select
      v-model="singleValue"
      :options="options"
      :multiple="true"
      @change="handleMultipleChange"
    />
  </yk-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const options = [
  { value: 'option1', label: '黄' },
  { value: 'option2', label: '蓝' },
  { value: 'option3', label: '红', disabled: true },
  // { value: 'option4', label: '选项4' },
  // { value: 'option5', label: '选项5' },
]

const singleValue = ref([])

const handleSingleChange = (value: string) => {
  console.log('单选值变化:', value)
}

const handleMultipleChange = (value: string[]) => {
  console.log('多选值变化:', value)
}
</script>
