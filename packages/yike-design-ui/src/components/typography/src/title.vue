<template>
  <div class="yk-typography">
    <div ref="titleRef" class="yk-title" :class="[type]">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch, nextTick } from 'vue'
import { titleProps } from './typography'
import '../style'
import { wrapperTitles } from './utils'
const props = withDefaults(defineProps<titleProps>(), {
  level: 1,
  type: 'default',
})

const titleRef = ref<HTMLElement | undefined>()
const originElement = ref()

const initWrapper = () => {
  if (!titleRef.value) {
    return
  }
  titleRef.value.innerHTML = wrapperTitles(props.level, originElement.value)
}

watch(
  () => props.level,
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
  if (!titleRef.value) {
    return
  }
  originElement.value = titleRef.value.innerHTML

  initWrapper()
})
</script>
