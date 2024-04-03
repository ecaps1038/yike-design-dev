<template>
  <yk-slider v-model="value" :min="1" :max="1000" :step="1" />
  <yk-pagination fix-width :total="value" style="margin-top: 12px" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(30)
</script>
