<template>
  <yk-space dir="vertical">
    <yk-input-number v-model="number" style="width: 300px"></yk-input-number>
    <yk-input-number
      :model-value="6"
      style="width: 300px"
      disabled
    ></yk-input-number>
  </yk-space>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const number = ref(6)
</script>
