<template>
  <div :class="bem()">
    <div :class="bem('main')">
      <div :class="bem('left')">
        <yk-icon :name="iconName" class="annex-yk-icon" />
        <span :class="bem(status)">{{ name }}</span>
      </div>
      <div :class="bem('right')">
        <yk-icon
          v-if="status !== 'uploading'"
          name="yk-shanchu"
          class="delete-yk-icon"
          @click="handleRemove"
        />
        <yk-icon
          v-if="'success'.includes(status)"
          class="success-yk-icon"
          name="yk-gou1"
        />
        <yk-icon
          v-if="['error', 'pause'].includes(status)"
          class="re-upload-yk-icon"
          name="yk-jiazai1"
          @click="handleReUpload"
        />
        <div
          v-if="['uploading'].includes(status)"
          class="abort-yk-icon-container"
          @click="handlePause"
        >
          <svg width="14" height="14">
            <circle
              cx="7"
              cy="7"
              r="7"
              class="uploading-bg"
              fill-opacity="0.6"
            />
            <path :d="getArcPath(7, 7, 7, progress)" class="uploading-bg" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, toRefs } from 'vue'
import { getArcPath, getFileTypeIconName, generateUid } from './utils'
import { FileItemProps } from './upload'
import { createCssScope } from '../../../utils/bem'
import '../style'
const props = withDefaults(defineProps<FileItemProps>(), {
  progress: 0,
  fileContent: () => ({
    status: 'success',
    name: '',
    uid: generateUid(),
  }),
})

const bem = createCssScope('upload-file')

const { status, name, uid } = toRefs(props.fileContent)

const emits = defineEmits(['handleAbort', 'handleRemove', 'handleReUpload'])

const iconName = computed(() => {
  return getFileTypeIconName(name.value)
})
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
