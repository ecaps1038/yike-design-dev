<template>
  <yk-space direction="vertical">
    <yk-space>
      <yk-button status="primary" @click="handlePrimary">常规消息</yk-button>
      <yk-button status="primary" @click="close">关闭</yk-button>
    </yk-space>
  </yk-space>
</template>
<script setup lang="ts">
import { getCurrentInstance, ref } from 'vue'
const proxy: any = getCurrentInstance()?.proxy
const instances = ref(null)
const handlePrimary = () => {
  instances.value = proxy.$notify({
    type: 'success',
    title: '这里是标题',
    message: '这里可以自定义提示时长',
    duration: 2000,
  })
}
const close = () => {
  instances.value?.close()
}
</script>
