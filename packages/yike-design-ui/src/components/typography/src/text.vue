<template>
  <span class="yk-typography yk-text">
    <span ref="textRef" :class="[type]">
      <slot></slot>
    </span>
  </span>
</template>
<script setup lang="ts">
import { computed, toRefs, ref, onMounted, watch, nextTick } from 'vue'
import { textProps } from './typography'
import { wrapperDecorations } from './utils'
import '../style'

const props = withDefaults(defineProps<textProps>(), {
  strong: false,
  type: 'default',
  mark: false,
  underline: false,
  del: false,
})

const textRef = ref<HTMLElement | undefined>()

const originElement = ref()

const { strong, mark, underline, del } = toRefs(props)

const initWrapper = () => {
  if (!textRef.value) {
    return
  }
  textRef.value.innerHTML = wrapperDecorations(
    {
      strong: strong.value,
      mark: mark.value,
      underline: underline.value,
      delete: del.value,
    },
    originElement.value,
  )
}

watch(
  () => props,
  (val) => {
    nextTick(() => {
      initWrapper()
    })
  },
  {
    deep: true,
  },
)

onMounted(() => {
  if (!textRef.value) {
    return
  }
  originElement.value = textRef.value.innerHTML
  initWrapper()
})
</script>
