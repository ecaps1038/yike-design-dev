<template>
  <div :class="[ns()]">
    <div
      v-for="item in items"
      :key="item.name"
      ref="tabRefs"
      :class="[ns('item')]"
      @click="onNavClick"
    >
      {{ item.label }}
    </div>
    <yk-tab-bar
      :offset="barOptions.offset"
      :width="barOptions.width"
    ></yk-tab-bar>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { createCssScope } from '../../utils/bem'
import { TabBar } from './tabBar'
import YkTabBar from './tab-bar.vue'
const ns = createCssScope('tabs-nav')
const barOptions = ref<Omit<TabBar, 'direction'>>({ width: 0, offset: 0 })
const tabRefs = ref<HTMLElement[]>()
const onNavClick = (v: any) => {
  const target = v.target as HTMLElement
  changePos(target)
}

const changePos = (target: HTMLElement) => {
  barOptions.value = {
    width: target.offsetWidth,
    offset: target.offsetLeft,
  }
}
onMounted(() => {
  const target = tabRefs.value![0]
  changePos(target)
})
const items = [
  {
    name: '1',
    label: 'a',
  },
  {
    name: '2',
    label: 'b',
  },
  {
    name: '3',
    label: 'c',
  },
]
</script>

<style scoped></style>
