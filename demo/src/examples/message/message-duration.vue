<template>
  <yk-space>
    <yk-button status="primary" @click="handleSuccess">触发成功</yk-button>
  </yk-space>
</template>
<script setup lang="ts">
import { getCurrentInstance } from 'vue'
const proxy: any = getCurrentInstance()?.proxy
const handleSuccess = () => {
  proxy.$message({
    type: 'success',
    message: '这里可以自定义提示时长',
    duration: 2000,
  })
}
</script>
