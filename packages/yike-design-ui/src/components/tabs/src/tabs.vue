<template>
  <div :class="ns()">
    <yk-tab-nav
      :type="type"
      @change="onNavChange"
      @add="$emit('add')"
      @delete="$emit('delete', $event)"
    ></yk-tab-nav>
    <slot />
  </div>
</template>
<script setup lang="ts">
import { TabsProps, YkTabsProvideKey } from './tabs'
import { PaneOptionsProp } from './pane'
import { createCssScope } from '../../utils/bem'
import YkTabNav from './tab-nav.vue'
import {
  provide,
  reactive,
  ref,
  computed,
  readonly,
  getCurrentInstance,
} from 'vue'
const ns = createCssScope('tabs')
defineOptions({
  name: 'YkTabs',
})
const props = withDefaults(defineProps<TabsProps>(), {
  id: '',
  type: 'line',
  closable: false,
  addable: false,
  editable: false,
})

const emits = defineEmits<{
  'update:modelValue': [TabsProps['modelValue']]
  add: [void]
  delete: [PaneOptionsProp]
}>()

const { uid } = getCurrentInstance()!
const paneOptions = ref<PaneOptionsProp[]>([])

const activedId = computed(() => {
  if (props.modelValue === undefined) {
    return paneOptions.value[0]?.id
  }
  const active = paneOptions.value.find((i) => i.name === props.modelValue)

  return active?.id
})

const onNavChange = (v: PaneOptionsProp) => {
  emits('update:modelValue', v.name)
}

const destroyPane = (id: number) => {
  paneOptions.value = paneOptions.value.filter((i) => i.id !== id)
}
provide(
  YkTabsProvideKey,
  reactive({
    paneOptions,
    id: uid,
    activedId,
    rootProps: readonly(props),
    destroyPane,
    updateActive: onNavChange,
  }),
)
</script>
