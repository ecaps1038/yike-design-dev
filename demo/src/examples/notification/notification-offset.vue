<template>
  <yk-space>
    <yk-button status="primary" @click="handleOffsetY">
      notification with offsetY
    </yk-button>
    <yk-button status="primary" @click="handleOffsetYX">
      notification with offsetY & offsetX
    </yk-button>
  </yk-space>
</template>
<script setup lang="ts">
import { getCurrentInstance } from 'vue'
const proxy: any = getCurrentInstance()?.proxy
const handleOffsetY = () => {
  proxy.$notification({ type: 'primary', message: 'offsetY: 50', offsetY: 50 })
}
const handleOffsetYX = () => {
  proxy.$notification({
    type: 'primary',
    message: 'offsetY: 50, offsetX: 50',
    offsetY: 50,
    offsetX: 50,
  })
}
</script>
