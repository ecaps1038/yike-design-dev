<template>
  <div :class="bem()">
    <input
      ref="inputRef"
      style="display: none"
      :accept="accept"
      type="file"
      @change="handleInputChange"
      @click.stop
    />
    <div v-if="!isPicture" :class="bem('files')">
      <div :class="bem('file')">
        <yk-button
          :class="bem('file-button')"
          type="secondary"
          :disabled="uploadDisabled"
          @click="handleUpload"
        >
          <yk-icon name="yk-shangchuan2" :class="bem('file-icon')" />
          <div>上传文件</div>
        </yk-button>
        <yk-text type="third">{{ desc }}</yk-text>
      </div>
      <div v-if="currentList.length" :class="bem('file-list')">
        <upload-file-item
          v-for="item in currentList"
          :key="item.uid"
          :file-content="item"
          :progress="item.progress"
          @handle-remove="handleRemove"
          @handle-re-upload="handleReUpload"
          @handle-abort="handleAbort"
        ></upload-file-item>
      </div>
    </div>
    <div v-else :class="bem('pictures')">
      <span v-for="item in currentList">
        <upload-picture-item
          :key="item.uid"
          :file-content="item"
          :is-picture="isPicture"
          :progress="item.progress"
          @handle-remove="handleRemove"
          @handle-re-upload="handleReUpload"
          @handle-abort="handleAbort"
        ></upload-picture-item>
      </span>
      <span
        :disabled="uploadDisabled"
        :class="[
          bem('picture-button'),
          bem([shape], { disabled: uploadDisabled }),
        ]"
        @click="handleUpload"
      ></span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, getCurrentInstance } from 'vue'
import {
  UploadProps,
  ImageTypes,
  RequestOptions,
  UploadFile,
  RequestInstance,
} from './upload'
import { UploadRequest } from './ajax'
import { generateListUid, generateUid, findFileByUid } from './utils'
import { createCssScope } from '../../../utils/bem'
import UploadFileItem from './upload-file-item.vue'
import UploadPictureItem from './upload-picture-item.vue'
import '../style'
defineOptions({
  name: 'YkUpload',
})

const bem = createCssScope('upload')
const props = withDefaults(defineProps<UploadProps>(), {
  accept: '*',
  maxSize: 0,
  multiple: true,
  shape: 'default',
  limit: 0,
  uploadUrl: '',
  fileList: () => [],
  desc: '',
  avatar: false,
})

const emits = defineEmits([
  'handleSuccess',
  'handleDelete',
  'handleError',
  'handleBeforeUpload',
])
const isPicture = ref(false)
const currentList = ref<UploadFile[]>(generateListUid(props.fileList))
const inputRef = ref<HTMLElement>()
const uploadInstances = new Map<number, RequestInstance>()
const currentLength = computed(() => {
  return currentList.value.length
})
const uploadDisabled = computed(() => {
  return !!(
    (!props.multiple && currentLength.value) ||
    (props.limit && currentLength.value >= props.limit)
  )
})

isPicture.value =
  ImageTypes.some((type) => props.accept.includes(type)) || props.avatar
const { proxy }: any = getCurrentInstance()

const onUploadRequest = async (uploadFile: File) => {
  const fileName = uploadFile?.name
  if (!fileName) {
    proxy.$message.error('文件上传失败，请重新选择文件')
    return
  }
  const uid = generateUid()
  currentList.value.push({
    name: fileName,
    status: 'uploading',
    raw: uploadFile,
    uid,
  })
  const requestOptions: RequestOptions = {
    uid,
    uploadUrl: props.uploadUrl,
    selectedFile: uploadFile,
    fileName,
    onSuccess: handleSuccess,
    onError: handleError,
    onProgress: handleProgress,
  }
  uploadInstances.set(uid, UploadRequest(requestOptions))
}

const handleSuccess = (uid: number, res: string) => {
  proxy.$message.success('文件上传成功')
  const idx = findFileByUid(uid, currentList.value)
  currentList.value[idx].status = 'success'
  emits('handleSuccess', res, currentList.value)
}

const handleProgress = (uid: number, progress: number) => {
  const idx = findFileByUid(uid, currentList.value)
  currentList.value[idx].progress = progress
}

const handleError = (uid: number, err: string) => {
  proxy.$message.error(err || '上传失败')
  const idx = findFileByUid(uid, currentList.value)
  currentList.value[idx].status = 'error'
  emits('handleError', err, currentList.value)
}

const handleUpload = async () => {
  if (!uploadDisabled.value) {
    inputRef.value?.click()
  }
}

const handleBeforeUpload = (uploadFile: File) => {
  emits('handleBeforeUpload', uploadFile)
}

const handleInputChange = (event) => {
  const uploadFile = event.target.files[0]
  handleBeforeUpload(uploadFile)
  event.target.value = ''
  if (uploadFile) {
    onUploadRequest(uploadFile)
  }
}

const handleAbort = (uid: number) => {
  const idx = findFileByUid(uid, currentList.value)
  const request = uploadInstances.get(uid)
  if (request?.abort) {
    request.abort()
    currentList.value[idx].status = 'pause'
    proxy.$message.error('用户中断上传')
  }
}

const handleRemove = (uid: number) => {
  currentList.value.splice(findFileByUid(uid, currentList.value), 1)
  emits('handleDelete', currentList.value)
  proxy.$message.success(`文件已删除`)
}

const handleReUpload = (uid: number) => {
  const idx = findFileByUid(uid, currentList.value)
  const raw = currentList.value[idx]!.raw as File
  currentList.value.splice(idx, 1)
  onUploadRequest(raw)
}
</script>
