<template>
  <yk-space>
    <yk-button status="primary" @click="handlePrimary">通用提示</yk-button>
    <yk-button status="success" @click="handleSuccess">触发成功</yk-button>
    <yk-button status="warning" @click="handleWarning">触发警告</yk-button>
    <yk-button status="danger" @click="handleError">触发失败</yk-button>
  </yk-space>
</template>
<script setup lang="ts">
import { getCurrentInstance } from 'vue'
const proxy: any = getCurrentInstance()?.proxy
const handlePrimary = () => {
  proxy.$notify({
    title: '这里是标题',
    type: 'info',
    message: 'info',
  })
}
const handleSuccess = () => {
  proxy.$notify({
    title: '这里是标题',
    type: 'success',
    message: 'success',
  })
}
const handleWarning = () => {
  proxy.$notify({
    title: '这里是标题',
    type: 'warning',
    message: 'warning',
  })
}
const handleError = () => {
  proxy.$notify({
    title: '这里是标题',
    type: 'error',
    message: 'error',
  })
}
</script>
