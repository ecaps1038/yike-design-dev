<template>
  <div class="yk-image-content">
    <img v-if="blobRaw || url" :src="url || blobRaw" alt="" />
    <div class="overlay overlay-primary-hover"></div>
    <div v-if="status === 'error'" class="overlay overlay-fail"></div>
    <div
      v-if="status === 'uploading'"
      class="overlay overlay-uploading-icons"
    ></div>
    <div class="icon uploading-icons">
      <svg width="36" height="36">
        <circle cx="18" cy="18" r="18" fill-opacity="0.5" />
        <path :d="getArcPath(18, 18, 18, 80)" class="progress-path" />
      </svg>
    </div>
    <div v-if="status === 'error'" class="icon fail-icon"></div>
    <div v-if="status === 'error'" class="icon fail-hover-icons"></div>
    <div v-if="status === 'success'" class="icon success-hover-icons">
      <yk-icon
        class="preview-yk-icon"
        name="yk-yanjing"
        @click="handleReview"
      ></yk-icon>
      <yk-icon
        class="delete-yk-icon"
        name="yk-shanchu"
        @click="handleRemove"
      ></yk-icon>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, toRefs } from 'vue'
import { generateUid, getArcPath } from './utils'
import { FileItemProps } from './upload'
const props = withDefaults(defineProps<FileItemProps>(), {
  progress: 0,
  fileContent: () => ({
    status: 'success',
    name: '',
    uid: generateUid(),
  }),
})
const { status, name, uid, raw, url } = toRefs(props.fileContent)

const blobRaw = computed(() => {
  if (raw?.value) {
    const blobUrl = URL.createObjectURL(raw.value)
    return blobUrl
  }
  return ''
})

const overlayStyle = computed(() => {
  return true
})

const emits = defineEmits(['handleAbort', 'handleRemove', 'handleReUpload'])

const handleReview = () => {
  console.log('review')
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
</script>
