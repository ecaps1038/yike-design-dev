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
  'https://www.huohuo90.com:3005/logo/yike.png',
  'https://www.huohuo90.com:3005/logo/yike1.png',
  'https://www.huohuo90.com:3005/logo/yike2.png',
  'https://www.huohuo90.com:3005/logo/yike3.png',
]
</script>
7
