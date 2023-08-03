<template>
  <label class="tooltip-switch">
    <yk-switch v-model="open"></yk-switch>
    <span>切换气泡显示状态</span>
  </label>
  <yk-tooltip v-model:open="open" placement="right" trigger="none">
    <yk-button>tooltip</yk-button>
  </yk-tooltip>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const open = ref(false)
</script>
<style scoped>
.tooltip-switch {
  display: block;
  margin-bottom: 8px;
}
</style>
