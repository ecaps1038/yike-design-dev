<template>
  <div style="width: 360px">
    <yk-input-tag
      v-model="tag"
      placeholder="最大5个字符"
      :limit="limit"
    ></yk-input-tag>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const limit = 5
const tag = ref([])
</script>
