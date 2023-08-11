<template>
  <div :class="ns()">
    <yk-tab-nav></yk-tab-nav>
    <slots />
  </div>
</template>
<script setup lang="ts">
import { TabsProps } from './tabs'
import { PaneOptionsProp } from './pane'
import { createCssScope } from '../../utils/bem'
import YkTabNav from './tab-nav.vue'
import { provide, reactive, ref } from 'vue'
const ns = createCssScope('tabs')
defineOptions({
  name: 'YkTabs',
})
const props = withDefaults(defineProps<TabsProps>(), {
  id: '',
})

const paneOptions = ref<PaneOptionsProp[]>([])
const provideState = reactive({})
provide(provideState, {
  paneOptions,
})
</script>
