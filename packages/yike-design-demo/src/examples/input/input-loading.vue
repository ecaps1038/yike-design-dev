<template>
  <div style="display: flex; gap: 10px">
    <yk-input :loading="loading" :disabled="loading" placeholder="请稍等..." />
    <yk-button @click="loading = !loading">开始/停止加载状态</yk-button>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const loading = ref(true)
</script>
