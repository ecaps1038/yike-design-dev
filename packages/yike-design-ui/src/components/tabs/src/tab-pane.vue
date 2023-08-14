<template>
  <div :id="`pane-${uid}`" :class="[ns()]" :style="calcPaneStyle">
    <div :class="[ns('content')]">
      <!-- <slot name="title" /> -->
      <slot>
        {{ nPane.label }}
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  inject,
  onMounted,
  computed,
  CSSProperties,
  useSlots,
  onUnmounted,
  getCurrentInstance,
} from 'vue'
import { createCssScope } from '../../utils/bem'
import { PaneOptionsProp, ExposePaneProp } from './pane'
import { YkTabsProvideKey } from './tabs'

const props = withDefaults(defineProps<ExposePaneProp>(), {})
const ns = createCssScope('tabs-pane')
const { uid } = getCurrentInstance()!
const slots = useSlots()
const optionsCtx = inject(YkTabsProvideKey, {
  paneOptions: [],
  id: 1,
  activedId: 1,
})

const nPane = computed<PaneOptionsProp>(() => {
  return {
    name: props.name,
    label: props.label,
    id: uid,
    titleSlot: slots.title,
  }
})
const updateCtx = () => {
  optionsCtx.paneOptions.push(nPane.value)
  console.log('addyy', uid)
}
const calcPaneStyle = computed<CSSProperties>(() => ({
  display: optionsCtx.activedId === uid ? 'block' : 'none',
}))

onMounted(() => {
  updateCtx()
})
onUnmounted(() => {
  optionsCtx.destroyPane?.(uid)
})
</script>

<style scoped></style>
