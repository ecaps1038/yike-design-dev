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
      <yk-icon name="yk-tushangchuanshibai"></yk-icon>
    </div>
    <div v-if="['error', 'pause'].includes(status)" class="hover-icons">
      <yk-icon name="yk-shangchuan2" @click="handleReUpload"></yk-icon>
      <yk-icon name="yk-shanchu" @click="handleRemove"></yk-icon>
    </div>
    <div v-if="status === 'success' && !avatar" class="hover-icons">
      <yk-icon name="yk-yanjing" @click="handleReview"></yk-icon>
      <yk-icon name="yk-shanchu" @click="handleRemove"></yk-icon>
    </div>
    <div v-if="status === 'success' && avatar" class="hover-icons">
      <yk-icon name="yk-xiugai" @click="handleEdit"></yk-icon>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, toRefs, getCurrentInstance } from 'vue'
import { generateUid, getArcPath } from './utils'
import { createCssScope } from '../../../utils/bem'
import { FileItemProps } from './upload'
const proxy: any = getCurrentInstance()?.proxy
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
])

const handleReview = () => {
  proxy.$message.success('此处唤起图片组件进行预览')
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
  console.log('edit')
  // emits('handleEdit', uid.value)
  proxy.$message.success('先走重传，后续修改为裁剪逻辑')
  emits('handleEdit', uid.value)
}
</script>
