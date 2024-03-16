<template>
  <div style="width: 360px">
    <yk-input-tag
      v-model="tag"
      placeholder="请输入3个"
      :max="max"
      @keydown="onKeydown"
    ></yk-input-tag>
  </div>
</template>
<script setup>
import { getCurrentInstance, ref } from 'vue'
const proxy = getCurrentInstance()?.proxy

const max = 3
const tag = ref(['测试'])

const onKeydown = (type, { curLength }) => {
  if (type === 'enter' && curLength > max) {
    proxy.$message.error('最大输入三个标签')
  }
}
</script>
