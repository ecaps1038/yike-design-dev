<template>
  <Teleport :to="container" :disabled="!container">
    <Transition name="preview-fade">
      <div
        v-if="mounted"
        v-show="props.visible"
        :class="bem()"
        :style="wrapperStyles"
      >
        <div :class="bem('mask')"></div>

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
              @click="resetScale"
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
import { createCssScope, popupManager } from '../../utils'
import {
  scaleAttr,
  getScale,
  formatePercentage,
  getPopupContainer,
} from './utils'

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
/** 缩放的倍率 */
const scale = ref<(typeof scaleAttr)[number]>(1)

const imageRef = ref()

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
  scale.value = getScale(scale.value, 'zoomIn')
}

/** 缩小 */
const scaleOut = () => {
  scale.value = getScale(scale.value, 'zoomOut')
}

/** 原始比例 */
const resetScale = () => {
  scale.value = 1
  resetTranslate()
}
</script>
