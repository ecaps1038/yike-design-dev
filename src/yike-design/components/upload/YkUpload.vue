<script setup lang="ts">
import { ref } from 'vue'
import { UploadRequest } from './ajax'
const props = defineProps({
  accept: {
    type: String,
    default: '*',
  },
  maxSize: {
    // 最大文件大小，单位字节，0代表不限制
    type: Number,
    default: 0,
  },
  width: {
    type: Number,
    default: 0,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  preview: {
    // 是否开启预览
    type: Boolean,
    default: true,
  },
  // transcode: {
  //   // 是否开启视频转码按钮
  //   type: Boolean,
  //   default: false,
  // },
  downloadable: {
    // 是否可下载
    type: Boolean,
    default: false,
  },
  equalProportion: {
    // 是否等比例限制文件宽高
    type: Boolean,
    default: false,
  },
  uploadUrl: {
    // 上传URL
    type: String,
    default: undefined,
  },
  // size: {
  //   type: String,
  //   default: 'normal',
  //   validator: (value) => ['small', 'normal', 'large'].includes(value),
  // },
})
const isPicture = ref(false)
const uploadFile: any = ref(null)
const inputRef: any = ref(null)
isPicture.value = props.accept.includes('images')
const handleUpload = async () => {
  // console.log('click')
  inputRef.value.click()
}

const handleInputChange = async (event: any) => {
  console.log('🚀 ~ file: YkUpload.vue:63 ~ handleInputChange ~ event:', event)
  uploadFile.value = event.target.files[0]
  console.log(
    '🚀 ~ file: YkUpload.vue:65 ~ handleInputChange ~ uploadFiles.value:',
    uploadFile.value,
  )
  const uploadParams = {
    uploadUrl: props.uploadUrl,
    selectedFile: uploadFile.value,
  }
  const response = await UploadRequest(uploadParams)
  console.log(
    '🚀 ~ file: YkUpload.vue:73 ~ handleInputChange ~ response:',
    response,
  )
}
</script>
<template>
  <div class="yk-upload">
    <div class="yk-uploader">
      <div class="yk-uploader-file" v-if="isPicture"></div>
      <div class="yk-uploader-picture" v-else>
        <Button @click="handleUpload">
          <Icon name="yk-shangchuan" class="file-upload-icon" />
          上传文件
        </Button>
        <input
          style="display: none"
          ref="inputRef"
          :multiple="props.multiple"
          :accept="props.accept"
          type="file"
          @change="handleInputChange"
          @click.stop
        />
      </div>
    </div>
    <div class="yk-uploader-list"></div>
  </div>
</template>
<style scoped lang="less">
@import '../../assets/style/yk-index.less';

// .yk-upload {
//   font-size: @size-s;
// }
// .yk-uploader-file {
//   width: 107px;
//   height: 36px;
//   background-color: @pcolor;
//   border-radius: @radius-m;
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
// }
.file-upload-icon {
  margin-right: @space-ss;
  line-height: 14px;
}
</style>
