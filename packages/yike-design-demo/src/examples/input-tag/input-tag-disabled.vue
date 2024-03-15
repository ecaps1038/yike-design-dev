<template>
  <div style="width: 360px">
    <yk-input-tag v-model="tag" placeholder="请输入" disabled></yk-input-tag>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const tag = ref(['测试'])
</script>
