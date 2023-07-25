<template>
  <yk-upload
    :upload-url="uploadUrl"
    :file-list="fileUrl"
    :limit="3"
    desc="限制上传三个文件，此demo演示上传失败"
  ></yk-upload>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const uploadUrl = 'http://192.168.1.207:3976/upload'
const fileUrl = ref([
  {
    url: 'https://www.huohuo90.com:3005/assets/logo-11aefb4c.svg',
    name: '默认图片',
  },
])
</script>
