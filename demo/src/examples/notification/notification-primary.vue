<template>
  <yk-space>
    <yk-button status="primary" @click="handlePrimary">通用通知</yk-button>
    <yk-button status="success" @click="handleSuccess">成功通知</yk-button>
    <yk-button status="warning" @click="handleWarning">警告通知</yk-button>
    <yk-button status="danger" @click="handleError">失败通知</yk-button>
  </yk-space>
</template>
<script setup lang="ts">
import { getCurrentInstance } from 'vue'
const proxy: any = getCurrentInstance()?.proxy
const handlePrimary = () => {
  proxy.$notification({ type: 'primary', message: '通用通知' })
}
const handleSuccess = () => {
  proxy.$notification.success({ message: '成功通知' })
}
const handleWarning = () => {
  proxy.$notification({ type: 'warning', message: '警告通知' })
}
const handleError = () => {
  proxy.$notification({ type: 'error', message: '失败通知' })
}
</script>
