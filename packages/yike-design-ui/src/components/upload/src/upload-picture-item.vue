<template>
  <div :class="bem([shape])">
    <img v-if="blobRaw || url" :src="url || blobRaw" alt="" />
    <div :class="bem('overlay-hover', [status])"></div>
    <div
      v-if="status === 'uploading'"
      class="upload-icon uploading-icons"
      @click="handlePause"
    >
      <svg width="36" height="36">
        <circle cx="18" cy="18" r="18" fill-opacity="0.5" />
        <path :d="getArcPath(18, 18, 18, progress)" class="progress-path" />
      </svg>
    </div>
    <div
      v-if="['error', 'pause'].includes(status)"
      class="upload-icon fail-icon"
    >
      <IconImageBackupOutline />
    </div>
    <div v-if="['error', 'pause'].includes(status)" class="hover-icons">
      <IconUpload2Outline @click="handleReUpload" />
      <IconDeleteOutline @click="handleRemove" />
    </div>
    <div v-if="status === 'success' && !avatar" class="hover-icons">
      <IconEyeOutline @click="handleReview" />
      <IconDeleteOutline @click="handleRemove" />
    </div>
    <div v-if="status === 'success' && avatar" class="hover-icons">
      <IconModifyOutline @click="handleEdit" />
      <IconDeleteOutline @click="handleRemove" />
    </div>

    <yk-modal
      v-if="editModalVisible"
      v-model="editModalVisible"
      :scrollable="false"
      title="图片裁剪"
      size="small"
      @on-submit="handleSubmit"
    >
      <cropPicture ref="cropRef" :file-content="fileContent" />
    </yk-modal>
  </div>
</template>
<script setup lang="ts">
import cropPicture from './crop-picture.vue'
import { YkModal } from '../../modal'
import { computed, toRefs, ref } from 'vue'
import { getArcPath } from './utils'
import { generateUid, createCssScope } from '../../utils'
import type { FileItemProps } from './upload'

const props = withDefaults(defineProps<FileItemProps>(), {
  progress: 0,
  fileContent: () => ({
    status: 'success',
    name: '',
    uid: generateUid(),
    avatar: false,
  }),
  shape: 'default',
})
const bem = createCssScope('upload-picture')
const { status, uid, raw, url } = toRefs(props.fileContent)

const editModalVisible = ref(false)

const cropRef = ref()

const blobRaw = computed(() => {
  if (raw?.value) {
    const blobUrl = URL.createObjectURL(raw.value)
    return blobUrl
  }
  return ''
})

const emits = defineEmits([
  'handleAbort',
  'handleRemove',
  'handleReUpload',
  'handleEdit',
  'handleReview',
])

const handleReview = () => {
  emits('handleReview', uid.value)
}

const handlePause = () => {
  emits('handleAbort', uid.value)
}
const handleRemove = () => {
  emits('handleRemove', uid.value)
}
const handleReUpload = () => {
  emits('handleReUpload', uid.value)
}
const handleEdit = () => {
  editModalVisible.value = true
}
const handleSubmit = async () => {
  const { blobRaw, uid } = await cropRef.value.handleCrop()
  emits('handleEdit', blobRaw, uid)
  editModalVisible.value = false
}
</script>
