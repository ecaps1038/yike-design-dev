<template>
  <yk-calendar v-model="currentRef"></yk-calendar>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const currentRef = ref(new Date())
</script>
