<template>
  <yk-space>
    <yk-switch v-model="unchecked" loading></yk-switch>
    <yk-switch v-model="checked" loading></yk-switch>
  </yk-space>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const unchecked = ref(false)
const checked = ref(true)
</script>
