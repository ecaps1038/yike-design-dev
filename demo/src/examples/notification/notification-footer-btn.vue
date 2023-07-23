<template>
  <yk-space>
    <yk-button status="primary" @click="handleFooterBtn">
      notification with footer btn
    </yk-button>
  </yk-space>
</template>
<script setup lang="ts">
import { getCurrentInstance } from 'vue'
const proxy: any = getCurrentInstance()?.proxy
const handleFooterBtn = () => {
  proxy.$notification({
    type: 'primary',
    message: '展示底部操作按钮',
    showFooterBtn: true,
    handleCancel: () => {
      proxy.$message.success('点击了取消', 1000)
    },
    handleSubmit: () => {
      proxy.$message.success('点击了确定', 1000)
    },
  })
}
</script>
