<template>
  <label>
    <input v-model="open" type="checkbox" />
    <span>切换气泡显示状态</span>
  </label>
  <yk-popover v-model:open="open" placement="right" trigger="click">
    <yk-button type="outline">tooltip</yk-button>
  </yk-popover>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const open = ref(false)
</script>
