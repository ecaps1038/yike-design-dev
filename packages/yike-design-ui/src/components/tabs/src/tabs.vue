<template>
  <div :class="ns()">
    <yk-tab-nav @change="onNavChange"></yk-tab-nav>
    <slot />
  </div>
</template>
<script setup lang="ts">
import { TabsProps, YkTabsProvideKey } from './tabs'
import { PaneOptionsProp } from './pane'
import { createCssScope } from '../../utils/bem'
import YkTabNav from './tab-nav.vue'
import { provide, reactive, ref, computed } from 'vue'
const ns = createCssScope('tabs')
defineOptions({
  name: 'YkTabs',
})
const props = withDefaults(defineProps<TabsProps>(), {
  id: '',
})

const emits = defineEmits<{
  'update:modelValue': [TabsProps['modelValue']]
}>()
const paneOptions = ref<PaneOptionsProp[]>([])
const pId = ref(1)

const activedId = computed(() => {
  const active = paneOptions.value.find((i) => i.name === props.modelValue)
  return active?.id ?? paneOptions.value[0]?.id
})

const onNavChange = (v: PaneOptionsProp) => {
  emits('update:modelValue', v.name)
}
const provideState = reactive({})
provide(
  YkTabsProvideKey,
  reactive({
    paneOptions,
    id: pId,
    activedId,
  }),
)
</script>
