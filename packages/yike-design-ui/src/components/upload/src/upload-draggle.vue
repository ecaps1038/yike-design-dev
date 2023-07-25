<template>
  <div
    :class="bem()"
    @drop.prevent="handleDrop"
    @dragover.prevent="handleDragover"
    @click="handleUpload"
  >
    <yk-icon :class="bem('icon')" name="yk-shangchuan1"></yk-icon>
    <span :class="bem('methods')">单击或拖动文件到此区域进行上传</span>
    <span :class="bem('desc')">{{ desc }}</span>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { DraggleProps } from './upload'
import { createCssScope } from '../../../utils/bem'
const props = withDefaults(defineProps<DraggleProps>(), {
  desc: '',
  disabled: false,
  accept: '*',
})

const emits = defineEmits(['handleUpload', 'handleDraggleFiles'])
const bem = createCssScope('upload-draggle')
const dragover = ref(false)

const handleDrop = (e: DragEvent) => {
  if (props.disabled) return
  dragover.value = false
  e.stopPropagation()
  const files = Array.from(e.dataTransfer!.files)
  //TODO 根据accept筛文件
  emits('handleDraggleFiles', files)
}

const handleDragover = () => {
  if (!props.disabled) dragover.value = true
}

const handleUpload = () => {
  emits('handleUpload')
}
</script>
