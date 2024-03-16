<template>
  <yk-modal v-model="visible" title="这里是标题">
    <span>这一块是modal对话框的内容部分，这里支持各种标签，组件</span>
  </yk-modal>
  <yk-button @click="showModal">modal 对话框</yk-button>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const visible = ref<boolean>(false)
const showModal = () => {
  visible.value = true
}
</script>
<style lang="scss" scoped></style>
