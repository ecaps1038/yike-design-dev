<template>
  <div ref="rootRef" :class="[ns()]" :style="calcRootStyle">
    <div :class="[ns('postion', { active: isFixed })]" :style="calcFixedStyle">
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
  watch,
} from 'vue'
import {
  useElementBounding,
  useWindowSize,
  useEventListener,
} from '@vueuse/core'

defineOptions({
  name: 'YkAffix',
})
const props = withDefaults(defineProps<AffixProps>(), {
  offset: 0,
  position: 'top',
  zIndex: 100,
})

const emits = defineEmits<{ change: [boolean] }>()
// 在root内层再套一层容器：解决一旦fixed后，滚动不会对元素更新无法触发watchEffect
const ns = createCssScope('affix')

const rootRef = shallowRef<HTMLElement>()
const {
  top,
  bottom,
  update,
  height: rootHeight,
  width: rootWidth,
} = useElementBounding(rootRef, {
  windowScroll: false,
})

const { height: winHeight } = useWindowSize()

const isFixed = ref(false)

const updatePos = () => {
  if (props.position === 'bottom') {
    isFixed.value = winHeight.value - props.offset <= bottom.value
  } else {
    isFixed.value = top.value <= props.offset
  }
}

const calcFixedStyle = computed<CSSProperties>(() => {
  if (!isFixed.value) {
    return {}
  }
  return {
    bottom: props.position === 'bottom' ? `${props.offset}px` : '',
    top: props.position === 'top' ? `${props.offset}px` : '',
    zIndex: props.zIndex,
  }
})

// 当触发fixed时，root会坍缩，导致反复计算offset距离，出现闪动bug
const calcRootStyle = computed<CSSProperties>(() => {
  return {
    height: isFixed.value ? `${rootHeight.value}px` : '',
    width: isFixed.value ? `${rootWidth.value}px` : '',
  }
})

watch(
  () => isFixed.value,
  () => emits('change', isFixed.value),
)
const scrollContainer = shallowRef<HTMLElement | Window>()
const handleUpdate = () => {
  update()
}
onMounted(() => {
  scrollContainer.value = window || document.documentElement
  update()
})
useEventListener(scrollContainer, 'scroll', handleUpdate)
watchEffect(updatePos)
</script>
