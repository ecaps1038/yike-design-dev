<template>
  <label class="popover-switch">
    <yk-switch v-model="open"></yk-switch>
    <span>切换气泡显示状态</span>
  </label>
  <yk-popover v-model:open="open" placement="right" trigger="none">
    <yk-button type="outline">tooltip</yk-button>
  </yk-popover>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const open = ref(false)
</script>
<style scoped>
.popover-switch {
  display: block;
  margin-bottom: 8px;
}
</style>
