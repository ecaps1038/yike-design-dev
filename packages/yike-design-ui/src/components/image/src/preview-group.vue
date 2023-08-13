<template>
  <yk-space v-if="props.isRender">
    <yk-image
      v-for="(item, index) in props.srcList"
      :key="item"
      :src="item"
      :width="props.width"
      :height="props.height"
      :preview="false"
      :fit="props.fit"
      @click="() => onImageClick(index)"
    ></yk-image>
  </yk-space>
  <yk-image-preview
    :visible="previewVisible"
    :src="currentSrc"
    :closable="props.closable"
    :mask-closable="props.maskClosable"
    preview-group
    @onNext="onNext"
    @onPrev="onPrev"
    @cancel="onCancel"
  ></yk-image-preview>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { ImagePreviewGroupProps } from './preview'

const props = withDefaults(defineProps<ImagePreviewGroupProps>(), {
  closable: true,
  maskClosable: true,
  isRender: true,
  defaultCurrent: 0,
})

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
}>()

const currentIndex = ref(props.defaultCurrent)
console.log('🚀 ~ file: preview-group.vue:42 ~ currentIndex:', currentIndex)
const previewVisible = ref(!!props.visible)
const imageCount = computed(() => props.srcList?.length)

const currentSrc = computed(() => {
  if (props.srcList && props.srcList.length)
    return props.srcList[currentIndex.value]
  return undefined
})

watch(
  () => props.visible,
  (v) => (previewVisible.value = v),
)

const setVisible = (visible: boolean) => {
  previewVisible.value = visible
  emit('update:visible', visible)
}

const onImageClick = (index: number) => {
  currentIndex.value = index
  setVisible(true)
}

const onCancel = () => {
  setVisible(false)
  props.onCancel?.()
}

const onNext = () => {
  if (imageCount.value)
    if (currentIndex.value >= imageCount.value - 1) currentIndex.value = 0
    else currentIndex.value++
}

const onPrev = () => {
  if (imageCount.value)
    if (currentIndex.value <= 0) currentIndex.value = imageCount.value - 1
    else currentIndex.value--
}
</script>
