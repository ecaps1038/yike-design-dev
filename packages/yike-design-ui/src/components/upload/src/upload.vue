<template>
  <div class="yk-upload">
    <input
      ref="inputRef"
      style="display: none"
      :accept="accept"
      type="file"
      @change="handleInputChange"
      @click.stop
    />
    <div v-if="!isPicture" class="yk-uploader-files">
      <div class="yk-uploader-file">
        <yk-button
          class="yk-uploader-button"
          type="secondary"
          :loading="uploading"
          :disabled="!showUploadButton"
          @click="handleUpload"
        >
          <yk-icon
            v-if="!uploading"
            name="yk-shangchuan2"
            class="file-upload-icon"
          />
          <div>上传文件</div>
        </yk-button>
        <yk-text type="third">{{ desc }}</yk-text>
      </div>
      <div v-if="existFileList.length" class="yk-uploader-list">
        <upload-file-item
          v-for="existFile in existFileList"
          :key="existFile.url"
          :file-content="existFile"
          :progress="uploadProgress"
          @handle-remove="handleRemove"
          @handle-re-upload="handleReUpload"
          @handle-abort="handleAbort"
        ></upload-file-item>
      </div>
    </div>
    <div v-else class="yk-uploader-pictures">
      <div
        v-if="showUploadButton"
        class="yk-image-uploader"
        @click="handleUpload"
      ></div>
      <div v-if="existFileList.length" class="yk-images-list">
        <div v-for="existFile in existFileList" class="exist-images">
          <upload-picture-item
            :file-content="existFile"
            :is-picture="isPicture"
            :progress="uploadProgress"
            @handle-remove="handleRemove"
            @handle-re-upload="handleReUpload"
            @handle-abort="handleAbort"
          ></upload-picture-item>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, getCurrentInstance } from 'vue'
import { UploadProps, ImageTypes } from './upload'
import { UploadRequest } from './ajax'
import { generateListUid, generateUid } from './utils'
import UploadFileItem from './upload-file-item.vue'
import UploadPictureItem from './upload-picture-item.vue'
import '../style'
defineOptions({
  name: 'YkUpload',
})
const props = withDefaults(defineProps<UploadProps>(), {
  accept: '*',
  maxSize: 0,
  multiple: true,
  preview: true,
  limit: 0,
  uploadUrl: '',
  fileList: () => [],
  desc: '',
})

const emits = defineEmits(['handleSuccess', 'handleDelete', 'handleError'])
const isPicture = ref(false)
const existFileList = ref(generateListUid(props.fileList))
const uploading = ref(false)
const inputRef = ref<HTMLElement>()
const uploadProgress = ref<number>(0)
const abortController = ref<boolean>(false) //中断上传信号实例
const fileListLength = computed(() => {
  return existFileList.value.length
})
const showUploadButton = computed(() => {
  return props.multiple || !fileListLength.value
})
isPicture.value = ImageTypes.some((type) => props.accept.includes(type))
const { proxy }: any = getCurrentInstance()
const onUploadRequest = async (uploadFile: File) => {
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
    inputRef.value?.click()
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
