<template>
  <div style="width: 360px">
    <yk-input-tag
      v-model="tag"
      placeholder="请输入"
      :on-change="onChange"
    ></yk-input-tag>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const tag = ref([])
const onChange = (v) => {
  console.log('tag-list:', v)
}
</script>
