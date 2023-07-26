<template>
  <div
    ref="rootRef"
    :class="[ns(), ns('postion', { active: isFixed })]"
    :style="calcRootStyle"
  >
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { AffixProps } from './affix'
import { createCssScope } from '../../../utils/bem'
import '../style'
import { CSSProperties, computed, shallowRef, ref, watchEffect } from 'vue'
import { useElementBounding } from '@vueuse/core'

defineOptions({
  name: 'YkAffix',
})
const props = withDefaults(defineProps<AffixProps>(), {
  offset: 0,
  position: 'top',
  zIndex: 100,
})

const ns = createCssScope('affix')

const rootRef = shallowRef<HTMLElement>()
const { top, bottom } = useElementBounding(rootRef)

const isFixed = ref(false)

const updatePos = () => {
  console.log(55)

  if (props.position === 'bottom') {
    console.log(666, top.value, isFixed.value)
    isFixed.value = bottom.value <= props.offset
  } else {
    isFixed.value = top.value <= props.offset
    console.log(77777, top.value, isFixed.value)
  }
}

const calcRootStyle = computed<CSSProperties>(() => {
  if (!isFixed.value) {
    return {}
  }

  return {
    bottom: props.position === 'bottom' ? `${props.offset}px` : '',
    top: props.position === 'top' ? `${props.offset}px` : '',
    zIndex: props.zIndex,
  }
})

watchEffect(updatePos)
</script>
