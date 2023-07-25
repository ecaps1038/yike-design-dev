<template>
  <div :class="bem()">
    <input
      ref="inputRef"
      style="display: none"
      :accept="accept"
      :multiple="multiple"
      type="file"
      @change="handleInputChange"
      @click.stop
    />
    <div v-if="!isPicture" :class="bem('files')">
      <!-- file uploader -->
      <div v-if="!draggable" :class="bem('file')">
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
      <!-- dragger uploader -->
      <div v-if="draggable" :class="bem('draggle')">
        <upload-draggle
          :desc="desc"
          :disabled="uploadDisabled"
          :accept="accept"
          @handle-upload="handleUpload"
          @handle-draggle-files="handleDraggleFiles"
        ></upload-draggle>
      </div>
      <!-- file list -->
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
    <!-- picture list -->
    <div v-if="isPicture && !draggable" :class="bem('pictures')">
      <span v-for="item in currentList" :class="bem('picture')">
        <upload-picture-item
          :key="item.uid"
          :file-content="item"
          :is-picture="isPicture"
          :progress="item.progress"
          :shape="shape"
          :avatar="avatar"
          @handle-remove="handleRemove"
          @handle-re-upload="handleReUpload"
          @handle-abort="handleAbort"
          @handle-edit="handleEdit"
        ></upload-picture-item>
      </span>
      <div
        v-if="!(avatar && currentLength) && !uploadDisabled"
        :class="[
          bem('picture-button', { disabled: uploadDisabled }),
          bem([shape]),
        ]"
        @click="handleUpload"
      >
        <div class="picture-desc">
          <yk-icon
            :class="bem('picture-button-icon')"
            name="yk-jiahao"
          ></yk-icon>
          <span v-if="desc" :class="bem('picture-button-desc')">
            {{ desc }}
          </span>
        </div>
      </div>
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
import uploadDraggle from './upload-draggle.vue'
import UploadPictureItem from './upload-picture-item.vue'
import '../style'
defineOptions({
  name: 'YkUpload',
})

const bem = createCssScope('upload')
const props = withDefaults(defineProps<UploadProps>(), {
  accept: '*',
  maxSize: 3 * 1024 * 1024,
  multiple: true,
  shape: 'default',
  limit: 0,
  uploadUrl: '',
  fileList: () => [],
  desc: '',
  avatar: false,
  draggable: false,
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
  proxy.$message.success('上传成功')
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
  if (props.maxSize && uploadFile.size > props.maxSize) {
    proxy.$message.error('超出限制大小，请压缩后上传')
    return false
  }
  if (props.limit && props.limit <= currentLength.value) {
    proxy.$message.error('数量超出限制')
    return false
  }
  return true
}

const handleInputChange = (event) => {
  if (props.avatar) {
    currentList.value = []
  }
  const uploadFiles = Array.from(event.target.files) as File[]
  uploadFiles.forEach((upload: File) => {
    const validate = handleBeforeUpload(upload)
    if (upload && validate) {
      onUploadRequest(upload)
    }
  })
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
  proxy.$message.success(`已删除`)
}

const handleReUpload = (uid: number) => {
  const idx = findFileByUid(uid, currentList.value)
  const raw = currentList.value[idx]!.raw as File
  currentList.value.splice(idx, 1)
  onUploadRequest(raw)
}

const handleEdit = (uid: number) => {
  const idx = findFileByUid(uid, currentList.value)
  // ToDo use idx filter file to edit
  handleUpload()
}

// dragger methods
const handleDraggleFiles = (files: File[]) => {
  files.forEach((file) => {
    onUploadRequest(file)
  })
}
</script>
