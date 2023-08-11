<template>
  <div v-if="navItems.length" :class="[ns()]">
    <div
      v-for="item in navItems"
      :key="item.name"
      ref="tabRefs"
      :class="[ns('item')]"
      @click="onNavClick($event, item)"
    >
      {{ item.label }}
    </div>
    <yk-tab-bar
      :offset="barOptions.offset"
      :width="barOptions.width"
      direction="horizontal"
    ></yk-tab-bar>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, inject, computed, nextTick, watch } from 'vue'
import { createCssScope } from '../../utils/bem'
import { TabBar } from './tabBar'
import { PaneOptionsProp } from './pane'
import { YkTabsProvideKey } from './tabs'
import YkTabBar from './tab-bar.vue'
const ns = createCssScope('tabs-nav')
const emits = defineEmits<{ change: [PaneOptionsProp] }>()
const optionsCtx = inject(YkTabsProvideKey, {
  paneOptions: [],
  id: 1,
  activedId: 1,
})

const navItems = computed(() => optionsCtx.paneOptions)
const barOptions = ref<Omit<TabBar, 'direction'>>({ width: 0, offset: 0 })

const tabRefs = ref<HTMLElement[]>()
const onNavClick = (v: MouseEvent, item: PaneOptionsProp) => {
  const target = v.target as HTMLElement
  emits('change', item)
  changePos(target)
}

const changePos = (target: HTMLElement) => {
  barOptions.value = {
    width: target.offsetWidth,
    offset: target.offsetLeft,
  }
}
const isInit = ref(true)
watch(
  () => navItems.value,
  async (n) => {
    await nextTick()
    if (isInit.value && tabRefs.value) {
      const target = tabRefs.value![0]
      changePos(target)
      isInit.value = false
    }
  },
  {
    immediate: true,
    deep: true,
  },
)
onMounted(async () => {
  // await nextTick()
  // const target = tabRefs.value![0]
  // changePos(target)
})
</script>

<style scoped></style>
