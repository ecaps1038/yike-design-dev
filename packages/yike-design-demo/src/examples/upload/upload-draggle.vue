<template>
  <div>
    <yk-upload
      :upload-url="uploadUrl"
      :file-list="fileUrl"
      accept="*"
      desc="上传内容要求"
      :draggable="true"
    ></yk-upload>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const uploadUrl = 'https://www.huohuo90.com:3005/upload'
const fileUrl = ref([])
</script>
