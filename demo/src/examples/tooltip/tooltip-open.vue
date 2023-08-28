<template>
  <yk-space direction="vertical">
    <yk-checkbox v-model:checked="open">切换气泡显示状态</yk-checkbox>
    <yk-tooltip v-model:open="open" placement="right" trigger="none">
      <yk-button type="outline">tooltip</yk-button>
    </yk-tooltip>
  </yk-space>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const open = ref(false)
</script>
