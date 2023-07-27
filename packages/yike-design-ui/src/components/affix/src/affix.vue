<template>
  <div ref="rootRef" :class="[ns()]">
    <div :class="[ns('postion', { active: isFixed })]" :style="calcRootStyle">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { AffixProps } from './affix'
import { createCssScope } from '../../../utils/bem'
import '../style'
import {
  CSSProperties,
  computed,
  shallowRef,
  ref,
  watchEffect,
  onMounted,
} from 'vue'
import { useElementBounding, useEventListener } from '@vueuse/core'

defineOptions({
  name: 'YkAffix',
})
const props = withDefaults(defineProps<AffixProps>(), {
  offset: 0,
  position: 'top',
  zIndex: 100,
})

// 在root内层再套一层容器：解决一旦fixed后，滚动不会对元素更新无法触发watchEffect
const ns = createCssScope('affix')

const rootRef = shallowRef<HTMLElement>()
const { top, bottom, update } = useElementBounding(rootRef)

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

const scrollContainer = shallowRef<HTMLElement>()
const handleUpdate = () => {
  console.log('update')
  update()
}
onMounted(() => {
  scrollContainer.value = window || document.documentElement
  useEventListener(scrollContainer, 'scroll', handleUpdate)
  watchEffect(updatePos)
})
</script>
