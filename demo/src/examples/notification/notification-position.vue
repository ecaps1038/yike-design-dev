<template>
  <yk-space>
    <yk-button status="primary" @click="handleTopRight">Top Right</yk-button>
    <yk-button status="success" @click="handleTopLeft">Top Left</yk-button>
    <yk-button status="warning" @click="handleBottomRight">
      Bottom Right
    </yk-button>
    <yk-button status="danger" @click="handleBottomLeft">Bottom Left</yk-button>
  </yk-space>
</template>
<script setup lang="ts">
import { getCurrentInstance } from 'vue'
const proxy: any = getCurrentInstance()?.proxy
const handleTopRight = () => {
  proxy.$notification({
    type: 'primary',
    message: 'Top Right',
    position: 'topRight',
  })
}
const handleTopLeft = () => {
  proxy.$notification({
    type: 'success',
    message: 'Top Left',
    position: 'topLeft',
  })
}
const handleBottomRight = () => {
  proxy.$notification({
    type: 'warning',
    message: 'Bottom Right',
    position: 'bottomRight',
  })
}
const handleBottomLeft = () => {
  proxy.$notification({
    type: 'error',
    message: 'Bottom Left',
    position: 'bottomLeft',
  })
}
</script>
