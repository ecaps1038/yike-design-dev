<template>
  <yk-image-preview-group
    :src-list="images"
    width="300"
    height="200"
    fit="cover"
  ></yk-image-preview-group>
</template>
<script lang="ts" setup>
const images = [
  '/src/assets/icon/yike.png',
  'https://w.wallhaven.cc/full/gp/wallhaven-gpm5ke.jpg',
  'https://w.wallhaven.cc/full/m9/wallhaven-m9xyg8.jpg',
]
</script>
