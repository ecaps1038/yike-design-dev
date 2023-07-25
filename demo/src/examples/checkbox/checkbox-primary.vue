<template>
  <yk-space direction="vertical">
    <yk-space align="center">
      <span>受控：</span>
      <yk-checkbox v-model:checked="value">Option 1</yk-checkbox>
    </yk-space>
    <yk-space align="center">
      非受控：
      <yk-checkbox :checked="value" @change="handleChange">
        Option 1
      </yk-checkbox>
    </yk-space>
    <yk-space align="center">
      默认值：
      <yk-checkbox :default-checked="value">Option 1</yk-checkbox>
    </yk-space>
  </yk-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const value = ref(true)
const handleChange = (e: boolean) => {
  value.value = e
}
</script>
