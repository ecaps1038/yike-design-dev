<template>
  <yk-space dir="vertical">
    <yk-select
      v-model="singleValue"
      :options="options"
      @change="handleSingleChange"
    />
    <yk-select
      v-model="singleValue2"
      :options="options2"
      @change="handleSingleChange"
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

const singleValue = ref()
const singleValue2 = ref()

const handleSingleChange = (value: string) => {
  console.log('单选值变化:', value)
}

const handleMultipleChange = (value: string[]) => {
  console.log('多选值变化:', value)
}
</script>
