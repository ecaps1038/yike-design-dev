<template>
  <div class="yk-image-content">
    <img v-if="blobRaw || url" :src="blobRaw" alt="" />
    <div class="overlay"></div>
    <div class="overlay-yk-icons">
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
import { generateUid } from './utils'
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
