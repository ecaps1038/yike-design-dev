<template>
  <yk-space>
    <yk-button @click="avtivate('right')">打开抽屉</yk-button>
  </yk-space>
  <yk-drawer
    :placement="placement"
    title="你好，世界。"
    :show="active"
    @close="onClose"
    @open="onOpen"
  >
    你看到了什么？
  </yk-drawer>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { getCurrentInstance } from 'vue'
const proxy: any = getCurrentInstance()?.proxy
const active = ref(false)
let placement = ref<string>('right')
const avtivate = (placement_to: string) => {
  placement.value = placement_to
  active.value = true
}
const onClose = () => {
  active.value = false
  proxy.$message({ type: 'success', message: '抽屉已关闭。' })
}
const onOpen = () => {
  proxy.$message({ type: 'success', message: '抽屉已打开。' })
}
</script>
