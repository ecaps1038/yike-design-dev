<template>
  <div :class="ns()">
    <keep-alive>
      <component
        :is="props.tabPosition === 'bottom' ? pannes : ''"
        key="1"
        class="top"
      ></component>
      <yk-tab-nav
        :type="type"
        @change="onNavChange"
        @add="$emit('add')"
        @delete="$emit('delete', $event)"
      ></yk-tab-nav>

      <component
        :is="props.tabPosition === 'top' ? pannes : ''"
        key="1"
        class="bottom"
      ></component>
    </keep-alive>
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
  useSlots,
  h,
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
  tabPosition: 'top',
})

const emits = defineEmits<{
  'update:modelValue': [TabsProps['modelValue']]
  add: [void]
  delete: [PaneOptionsProp]
}>()

const { uid } = getCurrentInstance()!
const slots = useSlots()
const renderPanes = () => {
  console.log()

  return h('div', slots?.default?.())
}
const pannes = computed(() => renderPanes())
const paneOptions = ref<PaneOptionsProp[]>([])

const activedId = computed(() => {
  if (props.modelValue === undefined) {
    return paneOptions.value[0]?.id
  }
  const active = paneOptions.value.find((i) => i.name === props.modelValue)

  return active?.id
})

// const activedId = ref(props.modelValue)
// watch(
//   () => [props.modelValue, paneOptions.value],
//   async ([n1, n2], [o1, o2]) => {
//     await nextTick()
//     if (!paneOptions.value.length) {
//       return
//     }
//     if (props.modelValue === undefined) {
//       activedId.value = paneOptions.value[0]?.id
//       return
//     }
//     const active = paneOptions.value.find((i) => i.name === props.modelValue)

//     activedId.value = active?.id
//     console.log(666, activedId.value, paneOptions.value)
//   },
//   {
//     immediate: true,
//     deep: true,
//   },
// )

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
