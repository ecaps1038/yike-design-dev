<template>
  <yk-input-number
    v-model="number"
    :step="1.3"
    :precision="1"
    style="width: 300px"
  ></yk-input-number>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const number = ref(5.2)
</script>
