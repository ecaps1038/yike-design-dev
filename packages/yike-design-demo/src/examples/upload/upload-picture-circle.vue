<template>
  <div>
    <yk-upload
      :upload-url="uploadUrl"
      :file-list="fileUrl"
      shape="circle"
      accept="image/*"
      desc="上传图片"
      :limit="2"
    ></yk-upload>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
// const uploadUrl = 'http://chat.foder.cn:3976/upload'
const uploadUrl = 'https://www.huohuo90.com:3005/upload'
const fileUrl = ref([
  {
    name: '默认图片',
    url: 'https://www.huohuo90.com:3005/logo/yike.png',
  },
])
</script>
