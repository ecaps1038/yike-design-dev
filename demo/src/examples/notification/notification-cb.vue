<template>
  <yk-space>
    <yk-button status="primary" @click="handleClose">
      onClose callback
    </yk-button>
    <yk-button status="primary" @click="handleCancel">
      Button callback
    </yk-button>
  </yk-space>
</template>
<script setup lang="ts">
import { getCurrentInstance } from 'vue'
const proxy: any = getCurrentInstance()?.proxy
const handleClose = () => {
  proxy.$notification({
    type: 'primary',
    message: 'I will call another Notificaiton when I close.',
    onClose: () => {
      proxy.$notification({
        type: 'primary',
        message: 'The Notification has been closed.',
      })
    },
  })
}
const handleCancel = () => {
  proxy.$notification({
    type: 'primary',
    message: 'handleCancel callback',
    showFooterBtn: true,
    handleCancel: () => {
      proxy.$notification({
        type: 'primary',
        message: 'You just clicked the cancel button.',
      })
    },
    handleSubmit: () => {
      proxy.$notification({
        type: 'primary',
        message: 'You just clicked the submit button.',
      })
    },
  })
}
</script>
