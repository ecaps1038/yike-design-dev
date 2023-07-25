<template>
  <yk-upload
    :upload-url="uploadUrl"
    :file-list="fileUrl"
    desc="上传内容要求"
    :max-size="0"
    @handle-success="handleSuccess"
    @handle-error="handleError"
    @handle-before-upload="handleBeforeUpload"
    @handle-delete="handleDelete"
  ></yk-upload>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const uploadUrl = 'http://chat.finecoder.cn:3976/upload'
const fileUrl = ref([
  {
    url: 'https://www.huohuo90.com:3005/assets/logo-11aefb4c.svg',
    name: '默认图片',
  },
])
const handleSuccess = (res, currentList) => {
  console.log(
    '🚀 ~ file: upload-callback.vue:20 ~ handleSuccess ~ currentList:',
    currentList,
  )
  console.log('🚀 ~ file: upload-callback.vue:20 ~ handleSuccess ~ res:', res)
}
const handleError = (error, currentList) => {
  console.log(
    '🚀 ~ file: upload-callback.vue:28 ~ handleError ~ currentList:',
    currentList,
  )
  console.log('🚀 ~ file: upload-callback.vue:28 ~ handleError ~ error:', error)
}
const handleBeforeUpload = (file) => {
  console.log(
    '🚀 ~ file: upload-callback.vue:36 ~ handleBeforeUpload ~ file:',
    file,
  )
}
const handleDelete = (currentList) => {
  console.log(
    '🚀 ~ file: upload-callback.vue:43 ~ handleDelete ~ currentList:',
    currentList,
  )
}
</script>
