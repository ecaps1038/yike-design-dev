<template>
  <yk-space>
    <yk-button status="primary" @click="handleSuccess">触发成功</yk-button>
    <yk-button status="warning" @click="handleWarning">触发警告</yk-button>
    <yk-button status="danger" @click="handleError">触发失败</yk-button>
  </yk-space>
</template>
<script setup lang="ts">
import { getCurrentInstance } from 'vue'
const proxy: any = getCurrentInstance()?.proxy
const handleSuccess = () => {
  proxy.$message.success('成功提示')
}
const handleWarning = () => {
  proxy.$message.warning('警告提示')
}
const handleError = () => {
  proxy.$message.error('失败提示')
}
</script>
