<template>
  <div :class="['yk-avatar', size && 'yk-avatar-group']" :style="style">
    <slot></slot>
    <div v-show="!imgUrl" class="disembark">
      <yk-icon :name="icon"></yk-icon>
    </div>
    <img v-show="imgUrl" :src="imgUrl" />
  </div>
</template>
<script setup lang="ts">
import { YkIcon } from '../../../index'
import { inject, computed, CSSProperties } from 'vue'
import { AvatarProps } from './avatar'
// FIXME 之后不需要在这边引样式
import '../style'
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
  const finalSize = getSize(size || props.size) + 'px'
  return {
    width: finalSize,
    height: finalSize,
    borderRadius: getShape(shape || props.shape) + 'px',
  }
})
</script>
