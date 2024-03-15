<template>
  <yk-space>
    <yk-progress type="circle" status="success" size="s"></yk-progress>
    <yk-progress type="circle" :percent="50" size="m"></yk-progress>
    <yk-progress type="circle" :percent="99" size="l">
      <template #format="{ percent }">
        <div style="color: red">剩余{{ percent }}</div>
      </template>
    </yk-progress>
    <yk-progress type="circle" :percent="num" size="l"></yk-progress>
  </yk-space>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const num = ref(10)
setInterval(() => {
  if (num.value === 100) return
  num.value += 10
}, 1000)
</script>
