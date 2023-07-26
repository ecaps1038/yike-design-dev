<template>
  <yk-space direction="vertical">
    <yk-switch
      v-model="value"
      checked-value="on"
      unchecked-value="off"
    ></yk-switch>
    <span>当前的值：{{ value }}</span>
  </yk-space>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
</script>
