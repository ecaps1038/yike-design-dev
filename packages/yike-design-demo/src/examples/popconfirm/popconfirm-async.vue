<template>
  <yk-popconfirm
    trigger="click"
    title="异步处理"
    content="这里展示异步处理提示语，当点击确认按钮是执行异步逻辑"
    @cancel="cancel"
    @confirm="confirm"
  >
    <yk-button>气泡弹窗</yk-button>
  </yk-popconfirm>
</template>
<script setup lang="ts">
import { getCurrentInstance } from 'vue'
const proxy: any = getCurrentInstance()?.proxy
function cancel() {
  proxy.$message({ type: 'warning', message: '你点击了取消按钮' })
}
function confirm() {
  return new Promise((resolve) => {
    setTimeout(() => {
      proxy.$message({ type: 'primary', message: '你点击了确认按钮' })
      resolve(true)
    }, 2000)
  })
}
</script>
