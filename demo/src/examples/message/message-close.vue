<template>
  <yk-space direction="vertical">
    <yk-space>
      <yk-button status="primary" @click="handlePrimary">常规消息</yk-button>
      <yk-button status="success" @click="handleSuccess">成功消息</yk-button>
      <yk-button status="primary" @click="handleLoading">加载消息</yk-button>
    </yk-space>
    <yk-space>
      <yk-button @click="handleClose">关闭所有实例</yk-button>
    </yk-space>
  </yk-space>
</template>
<script setup lang="ts">
import { getCurrentInstance } from 'vue'
const proxy: any = getCurrentInstance()?.proxy
const instances = []
const handlePrimary = () => {
  const primaryInstance = proxy.$message.primary('消息提示')
  instances.push(primaryInstance)
}
const handleSuccess = () => {
  const successInstance = proxy.$message.success('成功提示')
  instances.push(successInstance)
}
const handleLoading = () => {
  const messageInstance = proxy.$message({
    type: 'loading',
    message: '正在加载中,等待手动关闭',
  })
  instances.push(messageInstance)
}
const handleClose = () => {
  instances.forEach((ins) => {
    ins.close()
  })
}
</script>
