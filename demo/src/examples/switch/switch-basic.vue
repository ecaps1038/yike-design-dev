<template>
  <yk-switch v-model="isChecked"></yk-switch>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const isChecked = ref(false)
</script>
