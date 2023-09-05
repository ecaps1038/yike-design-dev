<template>
  <div style="width: 360px">
    <yk-input-tag
      v-model="tag"
      :placeholder="'请输入xxxxx'"
      :max="max"
    ></yk-input-tag>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const tag = ref([])
const max = 3
</script>
