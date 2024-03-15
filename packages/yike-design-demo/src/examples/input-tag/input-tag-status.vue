<template>
  <div style="width: 360px">
    <yk-input-tag
      v-for="(status, index) in statusList"
      :key="index"
      v-model="tag"
      class="input-tag-item"
      placeholder="请输入"
      :status="status"
    ></yk-input-tag>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const tag = ref(['测试'])
const statusList = ['success', 'warning', 'danger', 'primary']
</script>

<style lang="less">
.input-tag-item {
  margin-bottom: 20px;
}
</style>
