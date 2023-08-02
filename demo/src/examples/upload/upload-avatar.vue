<template>
  <div>
    <yk-upload
      :upload-url="uploadUrl"
      :file-list="fileUrl"
      shape="circle"
      accept="image/*"
      :avatar="true"
    ></yk-upload>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const uploadUrl = 'http://chat.finecoder.cn:3976/upload'
const fileUrl = ref([
  {
    name: '默认图片',
    url: 'http://chat.finecoder.cn:3976/upload/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20230801002828.jpg',
  },
])
</script>
