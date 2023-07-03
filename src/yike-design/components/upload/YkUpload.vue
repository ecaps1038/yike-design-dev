<script setup lang="ts">
import {
  ref,
  type Ref,
  toRef,
  getCurrentInstance,
  reactive,
  computed,
  provide,
} from 'vue'
import { UploadRequest } from './ajax'
import YkUploadContent from './YkUploadContent.vue'
import type { UploadUserFile } from '@/types/upload'
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
  limit: {
    // 上传限制数量 0为不限制
    type: Number,
    default: 0,
  },
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
  existFileList: {
    type: Array<UploadUserFile>,
    default: () => [],
  },
})
const isPicture = ref(false)
const uploadFile: any = ref(null)
const existFileList = ref(props.existFileList)
const uploading = ref(false)
const inputRef: any = ref(null)
const uploadProgress: Ref<number> = ref(0)

const fileListLength = computed(() => {
  return existFileList.value.length
})
const showUploadButton = computed(() => {
  return props.multiple || !fileListLength.value
})

isPicture.value = props.accept.includes('images')
const { proxy }: any = getCurrentInstance()
const handleUpload = async () => {
  inputRef.value.click()
}
const handleInputChange = async (event: any) => {
  uploading.value = true
  uploadFile.value = event.target.files[0]
  const fileName = uploadFile.value.name
  existFileList.value.push({
    name: fileName,
    status: 'uploading',
    raw: uploadFile.value,
  })
  const uploadParams = {
    uploadUrl: props.uploadUrl,
    selectedFile: uploadFile.value,
  }
  const { res, err }: any = await UploadRequest(uploadParams, uploadProgress)
  if (res) {
    proxy.$message({ type: 'success', message: '文件上传成功' })
    uploading.value = false
    existFileList.value[fileListLength.value - 1].url =
      res?.fileUrl || props.uploadUrl + '/' + fileName
    existFileList.value
    existFileList.value[fileListLength.value - 1].status = 'success'
  } else {
    proxy.$message({ type: 'error', message: '文件上传失败' })
    existFileList.value[fileListLength.value - 1].status = 'fail'
    uploading.value = false
  }
}
</script>
<template>
  <div class="yk-upload">
    <div class="yk-uploader">
      <div class="yk-uploader-picture" v-if="isPicture"></div>
      <div class="yk-uploader-file" v-else>
        <Button
          class="yk-uploader-button"
          @click="handleUpload"
          :loading="uploading"
          v-if="showUploadButton"
        >
          <Icon
            name="yk-shangchuan"
            v-if="!uploading"
            class="file-upload-icon"
          />
          <div>上传文件</div>
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
    <div class="yk-uploader-list" v-if="multiple && existFileList.length">
      <div v-for="exiteFile in existFileList" :key="exiteFile.url">
        <YkUploadContent
          :fileContent="exiteFile"
          :isPicture="isPicture"
          :progress="uploadProgress"
        ></YkUploadContent>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
@import '../../assets/style/yk-index.less';

.file-upload-icon {
  margin-right: @space-ss;
  line-height: 14px;
  width: 14px;
  height: 14px;
  margin-top: 2px;
}
.yk-uploader-list {
  width: 100%;
  margin-top: 21px;
  display: flex;
  flex-direction: column-reverse;
}
.progress-bar {
  width: 100%;
  height: 20px;
  background-color: #f0f0f0;
}

/* 进度条样式 */
.progress-bar::before {
  content: '';
  display: block;
  height: 100%;
  background-color: #6ab04c;
}
</style>
