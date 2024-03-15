<template>
  <yk-upload
    :upload-url="uploadUrl"
    :multiple="false"
    :file-list="fileUrl"
    desc="仅允许逐个上传文件"
  ></yk-upload>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
// const uploadUrl = 'http://192.168.1.207:3976/upload'
const uploadUrl = 'https://www.huohuo90.com:3005/upload'
const fileUrl = ref([])
</script>
