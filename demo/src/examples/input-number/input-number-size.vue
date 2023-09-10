<template>
  <yk-space direction="vertical">
    <yk-input-number
      v-model="number"
      size="s"
      style="width: 300px"
    ></yk-input-number>
    <yk-input-number
      v-model="number"
      size="m"
      style="width: 300px"
    ></yk-input-number>
    <yk-input-number v-model="number" style="width: 300px"></yk-input-number>
    <yk-input-number
      v-model="number"
      size="xl"
      style="width: 300px"
    ></yk-input-number>
  </yk-space>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const number = ref(6)
</script>
