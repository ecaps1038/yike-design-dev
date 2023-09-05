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
    message: '这里是全局提示关闭时的回调函数',
    duration: 2000,
    onClose: () => {
      proxy.$message.success('这里是回调函数', 2000)
    },
  })
}
</script>
