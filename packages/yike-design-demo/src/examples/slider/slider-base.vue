<template>
  <yk-slider v-model="value"></yk-slider>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const value = ref(30)
</script>
