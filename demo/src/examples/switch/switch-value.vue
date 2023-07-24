<template>
  <yk-space direction="vertical">
    <yk-switch
      v-model="value"
      checked-value="on"
      unchecked-value="off"
    ></yk-switch>
  </yk-space>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
</script>
