<template>
  <div style="position: relative">
    <ul id="list" style="height: 200px; overflow-y: auto">
      <li
        style="line-height: 30px"
        v-for="(_, index) of Array(40)"
        :key="index"
      >
        This is the content
      </li>
    </ul>
    <yk-back-top
      target="#list"
      :style="{ position: 'absolute' }"
      @onClick="click"
    >
      <yk-button size="s">UP</yk-button>
    </yk-back-top>
  </div>
</template>
<script setup lang="ts">
import { getCurrentInstance } from 'vue'
const proxy: any = getCurrentInstance()?.proxy
const click = () => {
  proxy.$message({ type: 'success', message: '点击了自定义按钮' })
}
</script>
