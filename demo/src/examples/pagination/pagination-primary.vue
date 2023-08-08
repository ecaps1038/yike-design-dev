<template>
  <yk-pagination v-model:current="current" :total="10"></yk-pagination>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const current = ref<number>(3)
</script>
