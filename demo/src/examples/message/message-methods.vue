<template>
  <yk-space>
    <yk-button status="primary" @click="handlePrimary">触发消息</yk-button>
    <yk-button status="success" @click="handleSuccess">触发成功</yk-button>
    <yk-button status="warning" @click="handleWarning">触发警告</yk-button>
    <yk-button status="danger" @click="handleError">触发失败</yk-button>
    <yk-button status="primary" @click="handleLoading">触发加载</yk-button>
  </yk-space>
</template>
<script setup lang="ts">
import { getCurrentInstance } from 'vue'
const proxy: any = getCurrentInstance()?.proxy
const handlePrimary = () => {
  proxy.$message.primary('消息提示')
}
const handleSuccess = () => {
  proxy.$message.success('成功提示')
}
const handleWarning = () => {
  proxy.$message.warning('警告提示')
}
const handleError = () => {
  proxy.$message.error('失败提示')
}
const handleLoading = () => {
  const messageInstance = proxy.$message({
    type: 'loading',
    message: '正在加载中,稍后关闭',
  })
  setTimeout(() => {
    messageInstance.close()
  }, 4000)
}
</script>
