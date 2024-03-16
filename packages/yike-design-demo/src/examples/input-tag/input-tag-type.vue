<template>
  <div style="width: 360px">
    <yk-input-tag
      v-model="tag"
      placeholder="请输入"
      :tag-props="tagProps"
    ></yk-input-tag>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const tag = ref(['测试'])
const tagProps = ref({
  type: 'primary',
})
</script>
