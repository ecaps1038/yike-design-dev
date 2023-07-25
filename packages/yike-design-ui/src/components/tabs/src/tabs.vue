<template>
  <div class="yk-tabs">
    <div class="yk-tabs__header">
      <div
        v-for="tab in tabs"
        :key="tab.name"
        :class="['yk-tabs__item', { 'is-active': tab.name === activeName }]"
        @click="handleClick(tab)"
      >
        {{ tab.label }}
      </div>
      <div class="yk-tabs__active-bar" :style="isActiveStyle"></div>
    </div>
    <div class="yk-tabs__content">
      <slot :active="activeName"></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  useSlots,
  ref,
  provide,
  computed,
  onMounted,
  getCurrentInstance,
} from 'vue'
import type { ComponentInternalInstance } from 'vue'
import { TabsProps, TabPaneProps } from './tabs'
import '../style'
defineOptions({
  name: 'YkTabs',
})
const emit = defineEmits(['update:modelValue'])
const props = withDefaults(defineProps<TabsProps>(), {})
const tabs = useSlots()
  .default?.()
  .filter((item) => item.type.name === 'YkTabPane')
  .map((item) => item.props) as TabPaneProps[]

const activeName = ref(props.modelValue)
const activeIndex = computed(() => {
  return tabs.findIndex((item) => item.name === activeName.value)
})

provide('TABS_PROPS_KEY', {
  active: activeName,
})

const handleClick = (tab: TabPaneProps) => {
  activeName.value = tab.name
  setActiveStyle()
  emit('update:modelValue', tab.name)
}

const instance: ComponentInternalInstance | null = getCurrentInstance()
const isActiveStyle = ref({ left: '0px' })

const setActiveStyle = () => {
  const children: HTMLElement[] = instance?.subTree.el?.querySelectorAll(
    '.yk-tabs__item',
  ) as HTMLElement[]
  const activeEl = children[activeIndex.value]
  const activeStyle = window && window.getComputedStyle(activeEl)
  isActiveStyle.value.left = `calc(${activeEl.offsetLeft}px + ${activeStyle.width} / 2 - 8px)`
}

onMounted(() => {
  setActiveStyle()
})
</script>
