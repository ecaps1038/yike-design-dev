<template>
  <div class="item">
    <yk-title level="5">S 号</yk-title>
    <yk-input v-model:value="words" size="s" />
  </div>
  <div class="item">
    <yk-title level="5">M 号</yk-title>
    <yk-input v-model:value="words" size="m" />
  </div>
  <div class="item">
    <yk-title level="5">L 号</yk-title>
    <yk-input v-model:value="words" size="l" />
  </div>
  <div class="item">
    <yk-title level="5">XL 号</yk-title>
    <yk-input v-model:value="words" size="xl" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const words = ref<string>('你好，Yike Design')
</script>
<style scoped>
.item {
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 5px;
}
.item h5 {
  margin: 0px;
  width: 65px;
}
</style>
