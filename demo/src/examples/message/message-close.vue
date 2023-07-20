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
import { getCurrentInstance, ref } from 'vue'
const proxy: any = getCurrentInstance()?.proxy
const instances = ref([])
const handlePrimary = () => {
  const primaryInstance = proxy.$message.primary('消息提示')
  instances.value.push(primaryInstance)
}
const handleSuccess = () => {
  const successInstance = proxy.$message.success('成功提示')
  instances.value.push(successInstance)
}
const handleLoading = () => {
  const messageInstance = proxy.$message({
    type: 'loading',
    message: '正在加载中,等待手动关闭',
  })
  instances.value.push(messageInstance)
}
const handleClose = () => {
  instances.value.forEach((instance) => {
    instance.close()
  })
}
</script>
