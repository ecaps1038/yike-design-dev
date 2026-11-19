<template>
  <yk-select
    v-model="value"
    :options="options"
    clearable
    style="width: 260px"
    @clear="onClear"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const options = [
  { value: 'option1', label: '选项1' },
  { value: 'option2', label: '选项2' },
  { value: 'option3', label: '选项3' },
]

const value = ref('option2')

const onClear = () => {
  value.value = undefined
}
</script>
