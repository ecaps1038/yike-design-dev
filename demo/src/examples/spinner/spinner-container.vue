<template>
  <yk-button @click="showLoading">显示加载动画</yk-button>
  <div id="spinner-demo" v-loading="loading" data-loading-text="加载中...">
    <yk-title :level="4">点击按钮显示加载动画</yk-title>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const loading = ref(false)
const showLoading = () => {
  if (loading.value) {
    return
  }
  let timerID = undefined
  loading.value = true
  timerID = setTimeout(() => {
    loading.value = false
    clearTimeout(timerID)
  }, 3000)
}
</script>
<style scoped lang="less">
#spinner-demo {
  position: relative;
  overflow: hidden;
  margin-top: 10px;
  width: 100%;
  height: 500px;
  border: 1px solid @gray-1;
  border-radius: 8px;
  h4 {
    text-align: center;
  }
}
</style>
