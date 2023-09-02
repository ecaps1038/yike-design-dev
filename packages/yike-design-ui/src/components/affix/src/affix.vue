<template>
  <div ref="rootRef" :class="[ns()]" :style="calcRootStyle">
    <div :class="[ns('postion', { active: isFixed })]" :style="calcFixedStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AffixProps, TargetRect } from './affix'
import { createCssScope } from '../../utils'
import { getTargetRect, isWindow } from './utils'

import {
  CSSProperties,
  computed,
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

defineOptions({
  name: 'YkAffix',
})

const ns = createCssScope('affix')
// prettier-ignore
const props = withDefaults(
  defineProps<AffixProps>(), {
    position: 'top',
    offset: 0,
    zIndex: 100,
  }
)

const emits = defineEmits<{ change: [boolean] }>()

// Ref
const rootRef = ref<HTMLElement>()
const scrollContainer = ref<HTMLElement | Window>()
const targetRect = ref<TargetRect>({ top: 0, bottom: 0 })
const isFixed = ref(false)

const { height: winHeight } = useWindowSize()
const {
  top,
  bottom,
  update,
  height: rootHeight,
  width: rootWidth,
} = useElementBounding(rootRef, {
  windowScroll: false,
})

watchEffect(updateFixed)

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

watch(
  () => isFixed.value,
  () => emits('change', isFixed.value),
)

// 传入target时重新初始化容器
watch(
  () => props.target,
  () => initTarget(),
)

useEventListener(scrollContainer, 'scroll', handleUpdate)

defineExpose({
  /**
   * 主动更新位置函数
   */
  updatePosition: handleUpdate,
})

onMounted(() => {
  initTarget()
})

const calcFixedStyle = computed<CSSProperties>(() => {
  if (!isFixed.value) return {}
  const isBottom = props.position === 'bottom'
  const isTop = props.position === 'top'

  return {
    bottom: isBottom
      ? `${winHeight.value - targetRect.value.bottom + props.offset}px`
      : '',
    top: isTop ? `${targetRect.value.top + props.offset}px` : '',
    zIndex: props.zIndex,
  }
})

// 当触发 fixed 时，root 会坍缩，导致反复计算 offset 距离，出现闪动 bug
const calcRootStyle = computed<CSSProperties>(() => {
  return {
    height: isFixed.value ? `${rootHeight.value}px` : '',
    width: isFixed.value ? `${rootWidth.value}px` : '',
  }
})

function handleUpdate() {
  targetRect.value = getTargetRect(scrollContainer.value!)
  update()
}

async function initTarget() {
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

function updateFixed() {
  const { position, offset } = props
  const isBottom = position === 'bottom'
  // prettier-ignore
  const { 
    top: targetTop, 
    bottom: targetBottom 
  } = targetRect.value

  isFixed.value = isBottom
    ? targetBottom - offset <= bottom.value
    : top.value - targetTop <= offset
}
</script>
