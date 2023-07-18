<template>
  <yk-space>
    <yk-button status="primary" @click="handlePrimary">触发成功</yk-button>
    <yk-button status="success" @click="handleSuccess">触发成功</yk-button>
    <yk-button status="warning" @click="handleWarning">触发警告</yk-button>
    <yk-button status="danger" @click="handleError">触发失败</yk-button>
    <yk-button status="primary" :loading="loading" @click="handleLoading">
      触发加载
    </yk-button>
  </yk-space>
</template>
<script setup lang="ts">
import { getCurrentInstance, ref } from 'vue'
const loading = ref(false)
const proxy: any = getCurrentInstance()?.proxy
const handlePrimary = () => {
  proxy.$message({ type: 'primary', message: '成功提示' })
}
const handleSuccess = () => {
  proxy.$message({ type: 'success', message: '成功提示' })
}
const handleWarning = () => {
  proxy.$message({ type: 'warning', message: '警告提示' })
}
const handleError = () => {
  proxy.$message({ type: 'error', message: '失败提示' })
}
const handleLoading = () => {
  loading.value = true
  const messageInstance = proxy.$message({
    type: 'loading',
    message: '正在加载中',
  })
  setTimeout(() => {
    loading.value = false
    messageInstance.close()
  }, 600)
}
</script>
