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
const fileUrl = ref([])
</script>
