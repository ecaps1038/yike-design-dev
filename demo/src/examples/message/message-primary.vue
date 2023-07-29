<template>
  <yk-space>
    <yk-button status="primary" @click="handlePrimary">通用提示</yk-button>
    <yk-button status="success" @click="handleSuccess">触发成功</yk-button>
    <yk-button status="warning" @click="handleWarning">触发警告</yk-button>
    <yk-button status="danger" @click="handleError">触发失败</yk-button>
    <yk-button status="primary" :loading="loading" @click="handleLoading">
      触发加载
    </yk-button>
  </yk-space>
</template>
<script setup lang="tsx">
import { getCurrentInstance, h, ref } from 'vue'
const loading = ref(false)
const proxy: any = getCurrentInstance()?.proxy
const handlePrimary = () => {
  proxy.$message({ type: 'primary', message: '通用提示' })
}
const handleSuccess = () => {
  proxy.$message({
    type: 'success',
    message: h('span', { style: 'color:green;' }, '成功提示'),
  })
}
const handleWarning = () => {
  proxy.$message({ type: 'warning', message: '警告提示' })
}
const handleError = () => {
  proxy.$message({
    type: 'error',
    message: () => <span style={{ color: 'red' }}>失败提示</span>,
  })
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
  }, 3000)
}
</script>
