<template>
  <yk-upload
    :upload-url="uploadUrl"
    :file-list="fileUrl"
    desc="上传内容要求"
    :max-size="0"
  ></yk-upload>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
// const uploadUrl = 'http://chat.finecoder.cn:3976/upload'
const uploadUrl = 'https://www.huohuo90.com:3005/upload'
const fileUrl = ref([
  {
    url: 'https://www.huohuo90.com:3005/logo/yike.png',
    name: '默认图片',
  },
])
</script>
