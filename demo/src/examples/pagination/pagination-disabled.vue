<template>
  <yk-pagination v-model:current="current" disabled :total="7"></yk-pagination>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const current = ref<number>(5)
</script>
