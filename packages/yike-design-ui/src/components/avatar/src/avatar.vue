<template>
  <div :class="['yk-avatar', size && 'yk-avatar-group']" :style="style">
    <div v-if="icon" class="disembark">
      <component :is="icon"></component>
    </div>
    <img v-else-if="props.imgUrl" :src="imgUrl" />
    <span v-else ref="$text" class="yk-avatar-text">
      <slot />
    </span>
  </div>
</template>
<script setup lang="ts">
import { YkIcon } from '../../../index'
import { inject, computed, CSSProperties, onMounted, shallowRef } from 'vue'
import { AvatarProps } from './avatar'
// FIXME 之后不需要在这边引样式

import { getShape, getSize } from './util'

defineOptions({
  name: 'YkAvatar',
})

const props = withDefaults(defineProps<AvatarProps>(), {
  shape: 'circle',
  size: 40,
})

const size = inject<AvatarProps['size']>('size', undefined)
const shape = inject<AvatarProps['shape']>('shape', undefined)

const style = computed<CSSProperties>(() => {
  const finalSize = getSize(size || props.size)
  return {
    width: finalSize + 'px',
    height: finalSize + 'px',
    borderRadius: getShape(shape || props.shape) + 'px',
  }
})

const $text = shallowRef<HTMLSpanElement>()
onMounted(() => {
  if (!$text.value) return
  const textWidth = $text.value.clientWidth
  const wrapperWidth = getSize(size || props.size)
  if (textWidth > wrapperWidth) {
    $text.value.style.transform = `scale(${wrapperWidth / textWidth - 0.1})`
  }
})
</script>
