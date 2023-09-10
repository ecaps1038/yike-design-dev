<template>
  <div style="margin-bottom: 16px">
    <yk-button @click="timestamp = Date.now().toString()">reload</yk-button>
  </div>
  <yk-space size="xl">
    <yk-image
      :src="`/src/assets/icon/yike.png?timestamp=${timestamp}`"
      width="300"
      height="200"
      fit="cover"
    ></yk-image>
  </yk-space>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const timestamp = ref('')
</script>
