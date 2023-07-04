<script setup lang="ts">
import { ref, type Ref, getCurrentInstance, computed } from 'vue'
import { UploadRequest } from './ajax'
import YkFileContent from './YkFileContent.vue'
import YkImageContent from './YkImageContent.vue'
import type { UploadUserFile } from '@/types/upload'
import { generateUid, generateListUid, imageTypes } from './upload'
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
    default: true,
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
  fileList: {
    type: Array<UploadUserFile>,
    default: () => [],
  },
})
const emits = defineEmits(['handleSuccess', 'handleDelete', 'handleError'])
const isPicture = ref(false)
const existFileList = ref(generateListUid(props.fileList))
const uploading = ref(false)
const inputRef: any = ref(null)
const uploadProgress: Ref<number> = ref(0)
const abortController: Ref<boolean> = ref(false) //中断上传信号实例
const fileListLength = computed(() => {
  return existFileList.value.length
})
const showUploadButton = computed(() => {
  return props.multiple || !fileListLength.value
})
isPicture.value = imageTypes.some((type: any) => props.accept.includes(type))
const { proxy }: any = getCurrentInstance()
const onUploadRequest = async (uploadFile: any) => {
  const fileName = uploadFile.name
  existFileList.value.unshift({
    name: fileName,
    status: 'uploading',
    raw: uploadFile,
    uid: generateUid(),
  })
  const uploadParams = {
    uploadUrl: props.uploadUrl,
    selectedFile: uploadFile,
    fileName,
  }
  try {
    uploading.value = true
    const { res, err }: any = await UploadRequest(
      uploadParams,
      uploadProgress,
      abortController,
    )
    if (res) {
      proxy.$message({ type: 'success', message: '文件上传成功' })
      uploading.value = false
      existFileList.value[0].url =
        res?.fileUrl || props.uploadUrl + '/' + uploadParams.fileName
      existFileList.value[0].status = 'success'
      emits('handleSuccess', res, existFileList.value)
    }
  } catch (error) {
    proxy.$message({ type: 'error', message: '文件上传失败' })
    abortController.value = false
    existFileList.value[0].status = 'fail'
    uploading.value = false
    emits('handleError', error, existFileList.value)
  }
}

const handleUpload = async () => {
  if (showUploadButton.value) {
    inputRef.value.click()
  }
}
const handleInputChange = (event: any) => {
  const uploadFile = event.target.files[0]
  event.target.value = ''
  if (uploadFile) {
    onUploadRequest(uploadFile)
  }
}

//中断上传
const handleAbort = () => {
  abortController.value = true
}
// 删除文件
const handleRemove = (file: any) => {
  existFileList.value.splice(existFileList.value.indexOf(file), 1)
  emits('handleDelete', existFileList.value)
}
// 重新上传
const handleReUpload = (file: any) => {
  handleRemove(file)
  onUploadRequest(file.raw)
}
</script>
<template>
  <div class="yk-upload">
    <input
      style="display: none"
      ref="inputRef"
      :accept="accept"
      type="file"
      @change="handleInputChange"
      @click.stop
    />
    <div class="yk-uploader-files" v-if="!isPicture">
      <div class="yk-uploader-file">
        <Button
          class="yk-uploader-button"
          @click="handleUpload"
          :loading="uploading"
          :disabled="!showUploadButton"
        >
          <Icon
            name="yk-shangchuan"
            v-if="!uploading"
            class="file-upload-icon"
          />
          <div>上传文件</div>
        </Button>
      </div>
      <div class="yk-uploader-list" v-if="multiple || existFileList.length">
        <div v-for="exiteFile in existFileList" :key="exiteFile.url">
          <YkFileContent
            :file-content="exiteFile"
            :progress="uploadProgress"
            @handle-remove="handleRemove"
            @handle-re-upload="handleReUpload"
            @handle-abort="handleAbort"
          ></YkFileContent>
        </div>
      </div>
    </div>
    <div class="yk-uploader-pictures" v-else>
      <div
        class="yk-image-uploader"
        @click="handleUpload"
        v-if="multiple || (!multiple && !existFileList.length)"
      ></div>
      <div class="yk-images-list" v-if="multiple || existFileList.length">
        <div
          v-for="exiteFile in existFileList"
          class="exist-images"
          :key="exiteFile.url"
        >
          <YkImageContent
            :file-content="exiteFile"
            :is-picture="isPicture"
            :progress="uploadProgress"
            @handle-remove="handleRemove"
            @handle-re-upload="handleReUpload"
            @handle-abort="handleAbort"
          ></YkImageContent>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
@import '../../assets/style/yk-index.less';
.yk-uploader-pictures {
  display: flex;
  flex-direction: row;

  .yk-image-uploader {
    min-width: 80px;
    height: 80px;
    margin-right: 40px;
    background: @bg-color-m;
    border: 1px dashed @line-color-m;
    border-radius: 8px;
    cursor: pointer;
    position: relative;
    &::before,
    &::after {
      content: '';
      position: absolute;
      background-color: @line-color-l;
    }
    &::before {
      width: 20px;
      height: 2px;
      top: 39px;
      left: 30px;
    }
    &::after {
      width: 2px;
      height: 20px;
      top: 30px;
      left: 39px;
    }
  }
}
.yk-images-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 100%;
}
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
  flex-direction: column;
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
.yk-uploader-list {
  width: 100%;
  margin-top: 21px;
}
</style>
