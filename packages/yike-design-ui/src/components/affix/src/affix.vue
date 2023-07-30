<template>
  <div ref="rootRef" :class="[ns()]" :style="calcRootStyle">
    <div :class="[ns('postion', { active: isFixed })]" :style="calcFixedStyle">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { AffixProps } from './affix'
import { createCssScope } from '../../utils/bem'
import '../style'
import {
  CSSProperties,
  computed,
  shallowRef,
  ref,
  watchEffect,
  onMounted,
  watch,
  nextTick,
} from 'vue'
import {
  useElementBounding,
  useWindowSize,
  useEventListener,
} from '@vueuse/core'
import { getTargetRect, isWindow } from './utils'
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

const scrollContainer = shallowRef<HTMLElement | Window>()

const targetRect = ref<{ top: number; bottom: number }>({ top: 0, bottom: 0 })

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

const updateFixed = () => {
  if (props.position === 'bottom') {
    isFixed.value = targetRect.value!.bottom - props.offset <= bottom.value
  } else {
    isFixed.value = top.value - targetRect.value!.top <= props.offset
  }
}

// 窗口变化更新
watch(
  () => winHeight.value,
  () => {
    if (isWindow(scrollContainer.value)) {
      targetRect.value.bottom = winHeight.value
    }
    updateFixed()
  },
)

const calcFixedStyle = computed<CSSProperties>(() => {
  if (!isFixed.value) {
    return {}
  }
  return {
    bottom:
      props.position === 'bottom'
        ? `${winHeight.value - targetRect.value.bottom + props.offset}px`
        : '',
    top:
      props.position === 'top'
        ? `${targetRect.value.top + props.offset}px`
        : '',
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

const handleUpdate = () => {
  targetRect.value = getTargetRect(scrollContainer.value!)
  update()
}

const initTarget = async () => {
  if (props.target) {
    if (typeof props.target === 'string') {
      scrollContainer.value =
        document.querySelector<HTMLElement>(props.target) ?? window
    } else {
      scrollContainer.value = props.target
    }
  } else {
    scrollContainer.value = window || document.documentElement
  }
  await nextTick()
  targetRect.value = getTargetRect(scrollContainer.value)
  update()
}

// 传入target时重新初始化容器
watch(
  () => props.target,
  () => initTarget(),
)
onMounted(() => {
  initTarget()
})

useEventListener(scrollContainer, 'scroll', handleUpdate)

watchEffect(updateFixed)

defineExpose({
  /**
   * 主动更新位置函数
   */
  updatePosition: handleUpdate,
})
</script>
