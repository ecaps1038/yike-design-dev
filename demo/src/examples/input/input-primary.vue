<template>
  <yk-input v-model:value="words" placeholder="请输入..." />
  <h4>{{ words }}</h4>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const words = ref<string>('你好，Yike Design')
</script>
