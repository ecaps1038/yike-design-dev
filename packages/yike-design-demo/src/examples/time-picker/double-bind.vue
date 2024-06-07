<template>
  <yk-time-picker v-model="value"></yk-time-picker>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const value = ref('23:11:12')
</script>
