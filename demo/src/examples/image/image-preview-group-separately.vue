<template>
  <yk-button @click="visible = true">
    <IconEyeOutline />
    <span>预览</span>
  </yk-button>
  <yk-image-preview-group
    v-model:visible="visible"
    :src-list="images"
    :is-render="false"
    width="200"
  ></yk-image-preview-group>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const visible = ref(false)
const images = [
  '/src/assets/icon/yike.png',
  'https://w.wallhaven.cc/full/gp/wallhaven-gpm5ke.jpg',
  'https://w.wallhaven.cc/full/m9/wallhaven-m9xyg8.jpg',
]
</script>
7
