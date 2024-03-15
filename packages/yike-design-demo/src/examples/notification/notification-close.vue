<template>
  <yk-space>
    <yk-button status="primary" @click="handleClose">
      notification without close btn
    </yk-button>
  </yk-space>
</template>
<script setup lang="ts">
import { getCurrentInstance } from 'vue'
const proxy: any = getCurrentInstance()?.proxy
const handleClose = () => {
  proxy.$notification({
    type: 'primary',
    message: '隐藏关闭按钮',
    closable: false,
  })
}
</script>
