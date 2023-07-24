<template>
  <div>
    <yk-upload
      :upload-url="uploadUrl"
      :file-list="fileUrl"
      shape="circle"
      accept="image/*"
      desc="上传内容要求"
    ></yk-upload>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const uploadUrl = 'http://chat.finecoder.cn:3976/upload'
const fileUrl = ref([])
</script>
