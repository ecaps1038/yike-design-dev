<template>
  <div :class="cls" :style="sizeStyle">
    <img
      :class="bem('img')"
      :style="fitStyle"
      v-bind="imgAttrs"
      @load="onImgLoaded"
      @error="onImgLoadError"
      @click="onImageClick"
    />
    <div v-if="!isLoaded" :class="bem('overlay-container')">
      <slot v-if="isError" name="error">
        <div :class="bem('overlay', ['error'])">
          <div class="icon">
            <slot name="error-icon">
              <IconImageBackupOutline />
            </slot>
          </div>
          <div v-if="props.alt" class="alt">
            {{ props.alt }}
          </div>
        </div>
      </slot>
      <slot v-if="isLoading" name="loading">
        <div :class="bem('overlay', ['loading'])"></div>
      </slot>
    </div>
    <div v-if="isShowFooter" :class="footerCls">
      <div>
        <div class="title">{{ props.title }}</div>
        <div class="description">{{ props.description }}</div>
      </div>
      <div>
        <slot name="extra"></slot>
      </div>
    </div>
    <Preview
      v-model:visible="previewVOpen"
      :src="props.src"
      :popup-container="props.popupContainer"
      @cancel="props.onCancel"
    ></Preview>
  </div>
</template>
<script setup lang="ts">
import { computed, watch, ref } from 'vue'
import type { CSSProperties } from 'vue'
import { ImageProps } from './image'
import { pick, normalizeImageSizeProp } from './utils'
import { createCssScope } from '../../utils'
import useImageLoadState from './hooks/use-image-load-status'
import { IconImageBackupOutline } from '../../svg-icon'
import Preview from './preview.vue'
import '../style'

defineOptions({
  name: 'YkImage',
})

const props = withDefaults(defineProps<ImageProps>(), {
  preview: true,
  footerPosition: 'inner',
})

const bem = createCssScope('image')

const previewVOpen = ref(false)

const { isLoaded, isError, isLoading, setLoadStatus } = useImageLoadState()

const cls = computed(() => [
  bem(),
  {
    [`${bem('with-error')}`]: isError.value,
    [`${bem('with-loading')}`]: isLoading.value,
  },
])

const footerCls = computed(() => [bem('footer', [props.footerPosition])])

const imgAttrs = computed(() =>
  pick(props, ['src', 'width', 'height', 'title', 'alt']),
)

const fitStyle = computed<CSSProperties>(() => {
  if (props.fit) return { objectFit: props.fit }
  return {}
})

const sizeStyle = computed(() => ({
  width: normalizeImageSizeProp(props.width),
  height: isShowFooter.value ? undefined : normalizeImageSizeProp(props.height),
}))

const isShowFooter = computed(() => props.title || props.description)

watch(
  () => props.src,
  () => setLoadStatus('loading'),
)

const onImgLoaded = () => setLoadStatus('loaded')

const onImgLoadError = () => setLoadStatus('error')

const onImageClick = () => {
  if (!props.preview) return
  previewVOpen.value = true
}
</script>
