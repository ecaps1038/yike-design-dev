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
import { computed, watch } from 'vue'
import { ImagePreviewGroupProps } from './preview'
import { useState } from './hooks/use-state'
import { YkImage, YkImagePreview } from '..'
import YkSpace from '../../space'
import '../style'

defineOptions({
  name: 'YkImageGroup',
})

const props = withDefaults(defineProps<ImagePreviewGroupProps>(), {
  closable: true,
  maskClosable: true,
  isRender: true,
  current: 0,
  defaultCurrent: 0,
})

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'update:current', value: number): void
}>()

const [currentIndex, setCurrentIndex] = useState<number>(
  props.defaultCurrent,
  props.current,
  (v: number) => emit('update:current', v),
)

const [previewVisible, setPreviewVisible] = useState<boolean>(
  props.visible,
  false,
  (v: boolean) => emit('update:visible', v),
)

const imageCount = computed(() => props.srcList?.length)

const currentSrc = computed(() => {
  if (props.srcList && props.srcList.length)
    return props.srcList[currentIndex.value]
  return undefined
})

watch(
  () => props.visible,
  (v) => setPreviewVisible(v),
)

watch(
  () => props.current,
  (v) => setCurrentIndex(v),
)

const onImageClick = (index: number) => {
  setCurrentIndex(index)
  setPreviewVisible(true)
}

const onCancel = () => {
  setPreviewVisible(false)
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
