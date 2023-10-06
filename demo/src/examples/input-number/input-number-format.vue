<template>
  <yk-space dir="vertical">
    <yk-input-number
      v-model="number"
      style="width: 300px"
      :formatter="priceFormatter"
    ></yk-input-number>
  </yk-space>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const number = ref(6)
const priceFormatter = (value: string) => {
  return value + ' 元'
}
</script>
