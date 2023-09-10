<template>
  <Teleport :to="container" :disabled="!container">
    <Transition name="preview-fade">
      <div
        v-if="mounted"
        v-show="props.visible"
        ref="wrapperRef"
        :class="bem()"
        :style="wrapperStyles"
      >
        <div :class="bem('mask')" @click="maskClick"></div>

        <div
          :class="bem('body')"
          :style="{
            transform: `scale(${scale}, ${scale})`,
          }"
          @click="maskClick"
        >
          <img
            ref="imageRef"
            :src="props.src"
            :class="bem('img')"
            :style="{
              transform: `rotate(${rotate}deg) translate(${translate[0]}px, ${translate[1]}px)`,
            }"
          />
        </div>

        <button
          v-if="props.closable"
          :class="bem('close-btn')"
          @click="handleCancel"
        >
          <IconCloseOutline />
        </button>

        <template v-if="props.previewGroup">
          <button
            :class="bem('arrow-left')"
            :style="{ zIndex: popupManager.nextIndex() }"
            @click="emit('onPrev')"
          >
            <IconLeftOutline />
          </button>
          <button
            :class="bem('arrow-right')"
            :style="{ zIndex: popupManager.nextIndex() }"
            @click="emit('onNext')"
          >
            <IconRightOutline />
          </button>
        </template>

        <div
          :class="bem('toolbar')"
          :style="{ zIndex: popupManager.nextIndex() }"
        >
          <yk-tooltip placement="top" title="向左旋转" :close-delay="0">
            <button :class="bem('toolbar-btn')" @click="rotateLeft">
              <IconRotateLeftOutline />
            </button>
          </yk-tooltip>
          <yk-tooltip placement="top" title="向右旋转" :close-delay="0">
            <button :class="bem('toolbar-btn')" @click="rotateRight">
              <IconRotateRightOutline />
            </button>
          </yk-tooltip>
          <yk-tooltip placement="top" title="放大" :close-delay="0">
            <button :class="bem('toolbar-btn')" @click="scaleIn">
              <IconZoomInOutline />
            </button>
          </yk-tooltip>
          <yk-tooltip placement="top" title="缩小" :close-delay="0">
            <button :class="bem('toolbar-btn')" @click="scaleOut">
              <IconZoomOutOutline />
            </button>
          </yk-tooltip>
          <yk-tooltip placement="top" title="原始比例" :close-delay="0">
            <button
              :class="bem('toolbar-btn')"
              style="width: 50px"
              @click="restoreScale"
            >
              <span>{{ formatePercentage(scale) }}</span>
            </button>
          </yk-tooltip>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'
import type { CSSProperties } from 'vue'
import { ImagePreviewProps } from './preview'
import { useImageDrag } from './hooks/use-image-drag'
import { useImageScale } from './hooks/use-image-scale'
import { createCssScope, popupManager } from '../../utils'
import { formatePercentage, getPopupContainer } from './utils'
import {
  IconCloseOutline,
  IconLeftOutline,
  IconRightOutline,
  IconRotateLeftOutline,
  IconRotateRightOutline,
  IconZoomInOutline,
  IconZoomOutOutline,
} from '../../svg-icon'

defineOptions({
  name: 'YkImagePreview',
})

const props = withDefaults(defineProps<ImagePreviewProps>(), {
  unmountOnClose: false,
  maskClosable: true,
  closable: true,
  previewGroup: false,
})

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'onNext'): void
  (e: 'onPrev'): void
}>()

const bem = createCssScope('image-preview')
/** 默认是否渲染 */
const mounted = ref(props.visible)
/** 旋转的刻度 */
const ROTATE_STEP = 90
/** 旋转后的角度 */
const rotate = ref(0)

const imageRef = ref()
const wrapperRef = ref()

const { scale, resetScale, adjustZoom } = useImageScale(
  reactive({ wrapperEl: wrapperRef }),
)

const { translate, resetTranslate } = useImageDrag(
  reactive({ imageEl: imageRef, scale }),
)

const container = ref()
onMounted(() => (container.value = getPopupContainer(props.popupContainer)))

const isFixed = computed(() => container.value === document.body)

const wrapperStyles = computed<CSSProperties>(() => {
  const positionStyles: CSSProperties = isFixed.value
    ? { zIndex: popupManager.nextIndex() }
    : { zIndex: 'inherit', position: 'absolute', height: '100%' }

  return { ...positionStyles }
})

watch(
  () => props.visible,
  (value) => {
    if (!value && props.unmountOnClose) mounted.value = false
    else mounted.value = true

    if (container.value) {
      if (value) container.value.style.overflow = 'hidden'
      else container.value.style.overflow = ''
    }
  },
)

const handleCancel = () => {
  emit('update:visible', false)
  props.onCancel?.()
}

const maskClick = (e: MouseEvent) => {
  if (props.maskClosable && e.target === e.currentTarget) handleCancel()
}

/** 向左旋转 */
const rotateLeft = () => {
  rotate.value =
    rotate.value === 0 ? 360 - ROTATE_STEP : rotate.value - ROTATE_STEP
}

/** 向右旋转 */
const rotateRight = () => {
  rotate.value = (rotate.value + ROTATE_STEP) % 360
}

/** 放大 */
const scaleIn = () => {
  adjustZoom('zoomIn')
}

/** 缩小 */
const scaleOut = () => {
  adjustZoom('zoomOut')
}

/** 原始比例 */
const restoreScale = () => {
  resetScale()
  resetTranslate()
}
</script>
