<template>
  <yk-input v-model="inputValue" clearable placeholder="请输入..." />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const inputValue = ref('你好，Yike Design')
</script>
