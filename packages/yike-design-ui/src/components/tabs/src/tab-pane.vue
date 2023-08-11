<template>
  <div></div>
</template>

<script setup lang="ts">
import { inject, onMounted } from 'vue'
import { createCssScope } from '../../utils/bem'
import { PaneOptionsProp, PaneProp } from './pane'
import { YkTabsProvideKey } from './tabs'

const props = withDefaults(defineProps<PaneProp>(), {})
const ns = createCssScope('tabs-pane')
const optionsCtx = inject(YkTabsProvideKey, { paneOptions: [] })

const updateCtx = () => {
  const nPane: PaneOptionsProp = { name: props.name, label: props.label }
  optionsCtx.paneOptions.push(nPane)
}
onMounted(() => {
  updateCtx()
})
</script>

<style scoped></style>
