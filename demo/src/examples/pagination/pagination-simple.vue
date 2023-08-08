<template>
  <yk-pagination v-model:current="current" :total="10" simple></yk-pagination>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const current = ref<number>(1)
</script>
