<template>
  <div class="yk-file-content">
    <div class="file-content-main">
      <div class="content-left">
        <yk-icon
          v-if="status !== 'uploading'"
          :name="iconName"
          class="annex-yk-icon"
        />
        <div>{{ name }}</div>
      </div>
      <div class="content-right">
        <yk-icon
          v-if="status !== 'uploading'"
          name="yk-shanchu"
          class="delete-yk-icon"
          @click="handleRemove"
        />
        <yk-icon
          v-if="status === 'success' || !status"
          class="success-yk-icon"
          name="yk-gou1"
        />
        <yk-icon
          v-if="status === 'fail'"
          class="re-upload-yk-icon"
          name="yk-jiazai1"
          @click="handleReUpload"
        />
        <div
          v-if="status === 'uploading'"
          class="abort-yk-icon-container"
          @click="handlePause"
        >
          <svg v-if="true" width="14" height="14">
            <circle cx="7" cy="7" r="7" class="default-bg" fill-opacity="0.6" />
            <path :d="getArcPath(7, 7, 7, progress)" class="default-bg" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, toRefs } from 'vue'
import { getArcPath, getFileTypeIconName } from './utils'
import { FileItemProps } from './upload'
import '../style'
const props = withDefaults(defineProps<FileItemProps>(), {
  progress: 0,
})
const { status, name } = toRefs(props.fileContent)
const emits = defineEmits(['handleAbort', 'handleRemove', 'handleReUpload'])

const iconName = computed(() => {
  return getFileTypeIconName(name.value)
})
const handlePause = () => {
  emits('handleAbort')
}
const handleRemove = () => {
  emits('handleRemove', props.fileContent)
}
const handleReUpload = () => {
  emits('handleReUpload', props.fileContent)
}
</script>
