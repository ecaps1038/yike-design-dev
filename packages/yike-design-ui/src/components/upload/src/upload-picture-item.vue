<template>
  <div class="yk-image-content">
    <img v-if="blobRaw || url" :src="blobRaw" alt="" />
    <div class="overlay"></div>
    <div class="overlay-yk-icons" :style="overlayStyle">
      <svg
        v-if="status === 'uploading'"
        class="overlay-loading-icon"
        width="36"
        height="36"
      >
        <circle cx="18" cy="18" r="18" fill-opacity="0.5" />
        <path :d="getArcPath(18, 18, 18, progress)" class="progress-path" />
      </svg>
      <yk-icon
        v-if="['error', 'pause'].includes(status)"
        name="yk-tushangchuanshibai"
        class="overlay-fail-icon"
      ></yk-icon>
      <yk-icon
        v-if="status === 'success'"
        class="preview-yk-icon"
        name="yk-yanjing"
        @click="handleReview"
      ></yk-icon>
      <yk-icon
        v-if="status === 'success'"
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
