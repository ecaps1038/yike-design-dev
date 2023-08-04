<template>
  <div ref="$scrollbar" :class="[bem()]">
    <div
      ref="$wrap"
      :class="[bem('wrap', [!props.native && 'default-hide'])]"
      :style="wrapStyle"
      @scroll="handleScroll"
    >
      <div ref="$content" :class="[bem('content')]">
        <slot />
      </div>
    </div>
    <template v-if="!props.native">
      <Thumb vertical :size="thumbHeight" :move="moveY" :show="showThumbY" />
      <Thumb :size="thumbWidth" :move="moveX" :show="showThumbX" />
    </template>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  CSSProperties,
  shallowRef,
  unref,
  ref,
  provide,
  reactive,
  watch,
} from 'vue'
import { createCssScope, toPx } from '../../utils'
import { ScrollbarProps, scrollbarContextKey } from './scrollbar'
import Thumb from './thumb.vue'
import { useEventListener, useResizeObserver } from '@vueuse/core'

const GAP = 4

defineOptions({
  name: 'YkScrollbar',
})
const props = withDefaults(defineProps<ScrollbarProps>(), {
  size: 5,
  space: 2,
  show: true,
  always: false,
  xScrollable: false,
  noresize: false,
  minSize: 10,
})
const emits = defineEmits<{
  scroll: [e: Event]
}>()

const bem = createCssScope('scrollbar')

const wrapStyle = computed<CSSProperties>(() => {
  return {
    height: toPx(props.height),
  }
})

const $scrollbar = shallowRef<HTMLDivElement>()
const $wrap = shallowRef<HTMLDivElement>()
const $content = shallowRef<HTMLDivElement>()

const moveY = ref(0)
const moveX = ref(0)
const mouseEnterShow = ref(false)
const showThumbY = computed(() => {
  mouseEnterShow.value
  if (!$wrap.value || !$content.value) return false
  if (props.always) return true

  if ($wrap.value.clientHeight < $wrap.value.scrollHeight) {
    return mouseEnterShow.value
  }
  return false
})
const showThumbX = computed(() => {
  if (!$wrap.value || !$content.value) return false
  if ($wrap.value.clientWidth < $wrap.value.scrollWidth) {
    if (props.always) return true
    return mouseEnterShow.value
  }
  return false
})

const handleScroll = (e: Event) => {
  mouseEnterShow.value
  const wrap = unref($wrap)
  const content = unref($content)
  if (!wrap || !content) return
  const offsetHeight = wrap.offsetHeight - GAP
  const offsetWidth = wrap.offsetWidth - GAP
  moveY.value = (wrap.scrollTop * offsetHeight) / content.scrollHeight
  moveX.value = (wrap.scrollLeft * offsetWidth) / content.scrollWidth
}

useEventListener($scrollbar, 'mousemove', () => {
  mouseEnterShow.value = true
})
useEventListener($scrollbar, 'mouseleave', () => {
  mouseEnterShow.value = false
})
const ratioY = ref(1)
const ratioX = ref(1)
const thumbHeight = ref('0')
const thumbWidth = ref('0')
const update = () => {
  const wrap = unref($wrap)
  if (!wrap) return
  const offsetHeight = wrap.offsetHeight
  const offsetWidth = wrap.offsetWidth
  const ogH = offsetHeight ** 2 / wrap.scrollHeight // 计算出来实际的滚动条高度
  const ogW = offsetWidth ** 2 / wrap.scrollWidth // 计算出来实际的滚动条宽度
  thumbHeight.value = ogH + 'px'
  thumbWidth.value = ogW + 'px'

  ratioY.value = ogH / offsetHeight
  ratioX.value = ogW / offsetWidth

  moveY.value = (wrap.scrollTop * offsetHeight) / wrap.scrollHeight
  moveX.value = (wrap.scrollLeft * offsetWidth) / wrap.scrollWidth
}

let stopResizeObs: () => void
let stopWindowResize: () => void
watch(
  () => props.noresize,
  (noresize) => {
    if (noresize) {
      stopResizeObs?.()
      stopWindowResize?.()
    } else {
      ;({ stop: stopResizeObs } = useResizeObserver($content, update))
      stopWindowResize = useEventListener('resize', update)
    }
  },
  { immediate: true },
)

provide(
  scrollbarContextKey,
  reactive({
    scrollbarEl: $scrollbar,
    wrapEl: $wrap,
  }),
)
</script>
