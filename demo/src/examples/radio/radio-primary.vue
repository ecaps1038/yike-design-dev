<template>
  <yk-space direction="vertical">
    <yk-radio v-model="radio" value="1">单选框</yk-radio>
    <yk-radio v-model="radio" value="1" :disabled="true">禁用</yk-radio>
  </yk-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const radio = ref('')
</script>
