<script setup lang="ts">
import { ref, type Ref, toRef } from 'vue'
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
const { existFileList }: any = toRef(props)
const uploading = ref(false)
const inputRef: any = ref(null)
isPicture.value = props.accept.includes('images')
const handleUpload = async () => {
  inputRef.value.click()
}

const handleInputChange = async (event: any) => {
  uploading.value = true
  uploadFile.value = event.target.files[0]
  const fileName = uploadFile.value.name
  const uploadParams = {
    uploadUrl: props.uploadUrl,
    selectedFile: uploadFile.value,
  }
  const { res, err }: any = await UploadRequest(uploadParams)
  if (res) {
    console.log('文件上传成功')
    uploading.value = false

    existFileList.value.push({
      blob: uploadFile.value,
      src: res?.fileUrl || props.uploadUrl + '/' + fileName,
    })
  } else {
    console.log(err)
    uploading.value = false
  }
}
// 删除某一上传文件
// const handleDelete = async (file) => {}
</script>
<template>
  <div class="yk-upload">
    <div class="yk-uploader">
      <div class="yk-uploader-file" v-if="isPicture"></div>
      <div class="yk-uploader-picture" v-else>
        <Button @click="handleUpload" :loading="uploading">
          <Icon
            name="yk-shangchuan"
            v-if="!uploading"
            class="file-upload-icon"
          />
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
    <div class="yk-uploader-list" v-if="multiple && existFileList.length">
      <div v-for="exiteFile in existFileList" :key="exiteFile.fileUrl">
        <YkUploadContent
          :fileContent="exiteFile"
          :isPicture="isPicture"
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
}
.yk-uploader-list {
  width: 100%;
  margin-top: 21px;
}
</style>
