<template>
  <yk-modal v-model="visible" title="这里是标题" @onCloseModal="closeModal">
    <span>这一块是modal对话框的内容部分，这里支持各种标签，组件</span>
  </yk-modal>
  <yk-button @click="showModal">modal 对话框</yk-button>
</template>
<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const proxy: any = getCurrentInstance()?.proxy
const visible = ref<boolean>(false)
const showModal = () => {
  visible.value = true
}
const closeModal = () => {
  proxy.$message({ type: 'success', message: '这里是对话框关闭的回调函数' })
}
</script>
<style lang="scss" scoped></style>
