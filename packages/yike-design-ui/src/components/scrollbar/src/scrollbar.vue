<template>
  <div ref="scrollbarRef" class="yk-scrollbar">
    <div
      ref="wrapRef"
      class="yk-scrollbar-wrap"
      :class="{ 'yk-scrollbar-wrap--hidden-default': !$props.native }"
      :style="{ height: scrollbarHeight }"
    >
      <slot></slot>
    </div>
    <div class="yk-scrollbar-bar is-horizontal">
      <div class="yk-scrollbar-thumb"></div>
    </div>
    <div class="yk-scrollbar-bar is-vertical">
      <div class="yk-scrollbar-thumb"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ScrollbarProps } from './scrollbar'
import '../style'
import { computed, ref } from 'vue'
defineOptions({
  name: 'YkScrollbar',
})
const props = withDefaults(defineProps<ScrollbarProps>(), {
  native: false,
  always: false,
})
const scrollbarRef = ref<HTMLElement>()
const wrapRef = ref<HTMLElement>()
const scrollbarHeight = computed(() => {
  if (typeof props.height === 'string') {
    return props.height
  } else if (props.height === 'number') {
    return props.height + 'px'
  } else {
    return '100%'
  }
})
const verticalThumbHeight = computed(() => 1 + 'px')
const update = () => {
  if (!wrapRef.value) return
  const offsetHeight = wrapRef.value.offsetHeight
  const offsetWidth = wrapRef.value.offsetWidth

  const originalHeight = offsetWidth
}
</script>
