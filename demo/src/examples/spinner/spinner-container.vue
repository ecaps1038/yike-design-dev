<template>
  <yk-button @click="loading = !loading">显示/隐藏加载动画</yk-button>
  <div id="spinner-demo" v-loading="loading" data-loading-text="加载中...">
    <yk-title :level="3">点击按钮显示加载动画</yk-title>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const loading = ref(false)
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
  h3 {
    text-align: center;
  }
}
</style>
