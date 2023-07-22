<template>
  <div>
    <yk-upload
      :upload-url="uploadUrl"
      :file-list="fileUrl"
      accept="image/*"
      desc="上传内容要求"
    ></yk-upload>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const uploadUrl = 'http://192.168.1.207:3976/upload'
const fileUrl = ref([
  {
    url: 'https://www.huohuo90.com:3005/assets/logo-11aefb4c.svg',
    name: '默认图片',
    status: 'error',
  },
])
</script>
