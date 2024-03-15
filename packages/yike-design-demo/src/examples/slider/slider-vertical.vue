<template>
  <yk-slider v-model="value" direction="vertical"></yk-slider>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const value = ref(40)
</script>
