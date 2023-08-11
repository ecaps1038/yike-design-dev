<template>
  <div :id="`pane-${id}`" :class="[ns()]" :style="calcPaneStyle">
    <div :class="[ns('content')]">
      <slot>
        {{ nPane.label }}
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, computed, CSSProperties } from 'vue'
import { createCssScope } from '../../utils/bem'
import { PaneOptionsProp, PaneProp } from './pane'
import { YkTabsProvideKey } from './tabs'

const props = withDefaults(defineProps<PaneProp>(), {})
const ns = createCssScope('tabs-pane')
const optionsCtx = inject(YkTabsProvideKey, {
  paneOptions: [],
  id: 1,
  activedId: 1,
})

const id = optionsCtx.id++
const nPane = computed<PaneOptionsProp>(() => ({
  name: props.name,
  label: props.label,
  id,
}))
const updateCtx = () => {
  optionsCtx.paneOptions.push(nPane.value)
}
const calcPaneStyle = computed<CSSProperties>(() => ({
  display: optionsCtx.activedId === id ? 'block' : 'none',
}))
onMounted(() => {
  updateCtx()
})
</script>

<style scoped></style>
