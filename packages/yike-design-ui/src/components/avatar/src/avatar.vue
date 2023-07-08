<template>
  <div
    class="yk-avatar"
    :class="{ group: nsize }"
    :style="{
      width: getSize(nowSize) + 'px',
      height: getSize(nowSize) + 'px',
      borderRadius: getShape(nowShape) + 'px',
    }"
  >
    <slot></slot>
    <div class="disembark" v-show="!imgUrl">
      <yk-icon :name="icon"></yk-icon>
    </div>
    <img :src="imgUrl" v-show="imgUrl" />
  </div>
</template>
<script setup lang="ts">
import ykIcon from '../../icon/Icon.vue'
import { ref, inject } from 'vue'
import { getSize, getShape } from './util'
import { AvatarProps } from './avatar'
// FIXME 之后不需要在这边引样式
import '../style'

defineOptions({
  name: 'YkAvatar',
})

const props = withDefaults(defineProps<AvatarProps>(), {
  shape: 'circle',
  size: 40,
  icon: 'yk-touxiang1',
})

//需要成组，所以这里需要接受组的变量
const nsize = inject('size')
const nshape = inject('shape')
let nowSize = ref<any>()
let nowShape = ref<any>()

if (nsize) {
  nowSize.value = nsize
} else {
  nowSize.value = props.size
}
if (nshape) {
  nowShape.value = nshape
} else {
  nowShape.value = props.shape
}
</script>
