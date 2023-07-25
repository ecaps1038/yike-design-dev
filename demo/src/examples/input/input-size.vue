<template>
  <div class="item">
    <yk-input v-model:value="words" size="s" />
  </div>
  <div class="item">
    <yk-input v-model:value="words" size="m" />
  </div>
  <div class="item">
    <yk-input v-model:value="words" size="l" />
  </div>
  <div class="item">
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
  margin-bottom: 5px;
  width: 350px;
  flex-direction: column;
}
</style>
