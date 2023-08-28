<template>
  <div class="container">
    <ul id="list" class="list">
      <li v-for="(_, index) of Array(40)" :key="index">This is the content</li>
    </ul>
    <yk-back-top
      target="#list"
      :style="{ position: 'absolute' }"
      @on-click="handleClick"
    >
      <yk-button size="s">UP</yk-button>
    </yk-back-top>
  </div>
</template>
<script setup lang="ts">
import { getCurrentInstance } from 'vue'
const proxy: any = getCurrentInstance()?.proxy
const handleClick = () => {
  proxy.$message({ type: 'success', message: '点击了自定义按钮' })
}
</script>
<style>
.container {
  position: relative;
}
.list {
  overflow-y: auto;
  height: 200px;
}
li {
  line-height: 30px;
}
</style>
