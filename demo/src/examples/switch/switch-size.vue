<template>
  <yk-space>
    <yk-switch v-model="isChecked" size="s"></yk-switch>
    <yk-switch v-model="isChecked"></yk-switch>
  </yk-space>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const isChecked = ref(false)
</script>
