<template>
  <div style="width: 360px">
    <yk-input-tag
      v-for="(size, index) in sizeList"
      :key="index"
      v-model="tag"
      class="input-tag-item"
      placeholder="请输入"
      :size="size"
    ></yk-input-tag>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const tag = ref(['测试'])
const sizeList = ['s', 'm', 'l', 'xl']
</script>

<style lang="less">
.input-tag-item {
  margin-bottom: 20px;
}
</style>
