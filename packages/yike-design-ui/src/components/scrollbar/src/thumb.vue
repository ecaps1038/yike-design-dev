<script setup lang="ts">
import { computed, CSSProperties, ref, inject, toRef } from 'vue'
import { createCssScope } from '../../utils'
import { scrollbarContextKey } from './scrollbar'
import { useEventListener } from '@vueuse/core'

const bem = createCssScope('scrollbar')
const props = defineProps<{
  vertical?: boolean
  always?: boolean
  size: string
  move: number
  ratio: number
}>()

const context = inject(scrollbarContextKey)

if (!context) throw new Error('can not inject scrollbar context!')

const thumbStyle = computed<CSSProperties>(() => {
  if (props.vertical) {
    return {
      height: props.size,
      transform: `translateY(${props.move}px)`,
    }
  }
  return {
    width: props.size,
    transform: `translateX(${props.move}px)`,
  }
})

let originalOnSelectStart = document.onselectstart
let scrollPos = 0
const visible = ref(false)
const mouseY = ref(0)
const mouseX = ref(0)
const drag = ref(false)
const handleThumbClick = (e: MouseEvent) => {
  // prevent click event of middle and right button
  e.stopPropagation()
  if (e.ctrlKey || [1, 2].includes(e.button)) return
  drag.value = true
  window.getSelection()?.removeAllRanges()
  e.stopImmediatePropagation()
  document.addEventListener('mousemove', mouseMove)
  document.addEventListener('mouseup', mouseUp)
  originalOnSelectStart = document.onselectstart
  document.onselectstart = () => false

  if (props.vertical) {
    scrollPos = context.wrapEl?.scrollTop ?? 0
  } else {
    scrollPos = context.wrapEl?.scrollLeft ?? 0
  }

  mouseY.value = e.screenY
  mouseX.value = e.screenX
}
const mouseMove = (e: MouseEvent) => {
  const wrapEl = context?.wrapEl
  if (!wrapEl) return
  if (props.vertical) {
    const dis = e.screenY - mouseY.value

    wrapEl.scrollTop =
      scrollPos + (dis * wrapEl.scrollHeight) / wrapEl.clientHeight
  } else {
    const dis = e.screenX - mouseX.value
    wrapEl.scrollLeft =
      scrollPos + (dis * wrapEl.scrollWidth) / wrapEl.clientWidth
  }
}
const mouseUp = () => {
  drag.value = false
  document.removeEventListener('mousemove', mouseMove)
  document.removeEventListener('mouseup', mouseUp)
  restoreOnselectstart()
}

const restoreOnselectstart = () => {
  if (document.onselectstart !== originalOnSelectStart)
    document.onselectstart = originalOnSelectStart
}

useEventListener(toRef(context, 'scrollbarEl'), 'mousemove', () => {
  visible.value = true
})
useEventListener(toRef(context, 'scrollbarEl'), 'mouseleave', () => {
  visible.value = false
})

const show = computed(() => {
  if (props.ratio === 1) return false
  if (props.always) return true
  return visible.value || drag.value
})
</script>

<template>
  <Transition :name="`${bem('fade')}`">
    <div
      v-show="show"
      :class="[bem('bar', [vertical ? 'vertical' : 'horizontal'])]"
    >
      <div
        :class="bem('thumb')"
        :style="thumbStyle"
        @mousedown="handleThumbClick"
      ></div>
    </div>
  </Transition>
</template>
