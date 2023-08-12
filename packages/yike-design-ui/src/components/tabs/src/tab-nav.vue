<template>
  <div v-if="navItems.length" :class="[ns()]">
    <IconLeftOutline
      :class="[ns('icon', { disabled: disabledMap.disablePre })]"
      @click="preSlide"
    />
    <div ref="wrapRef" :class="ns('wrap')">
      <div ref="scrollRef" :class="ns('scroll')" :style="scrollStyle">
        <div
          v-for="(item, index) in navItems"
          :key="item.name"
          ref="tabRefs"
          :class="[ns('item'), ns('item', { active: isActive(item) })]"
          @click="onNavClick($event, item, index)"
        >
          <component
            :is="getPaneTitleSlot(item.titleSlot())"
            v-if="item?.titleSlot?.()"
          ></component>
          <span v-else>{{ item.label }}</span>
        </div>
      </div>
      <yk-tab-bar
        :offset="barOptions.offset"
        :width="barOptions.width"
        direction="horizontal"
      ></yk-tab-bar>
    </div>
    <IconRightOutline
      :class="[ns('icon', { disabled: disabledMap.disableNext })]"
      @click="nextSlide"
    />
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  inject,
  computed,
  nextTick,
  watch,
  h,
  shallowRef,
  CSSProperties,
} from 'vue'
import { createCssScope } from '../../utils/bem'
import { TabBar } from './tabBar'
import { PaneOptionsProp } from './pane'
import { YkTabsProvideKey } from './tabs'
import YkTabBar from './tab-bar.vue'
import IconLeftOutline from '../../svg-icon/icon-left-outline'
import IconRightOutline from '../../svg-icon/icon-right-outline'
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

const activeVal = ref()
const isActive = (item: PaneOptionsProp) => {
  return activeVal.value === item.name
}
const onNavClick = (v: MouseEvent, item: PaneOptionsProp, index: number) => {
  activeVal.value = item.name
  const target = tabRefs.value![index]
  emits('change', item)
  changePos(target)
}

// bar宽度占比选项卡一半
const changePos = (target: HTMLElement) => {
  // 更新超出滚动位置
  activeTab.value = target
  updateScroll()
  updateBarOptions()
}
const updateBarOptions = () => {
  const target = activeTab.value!
  const w = target.offsetWidth / 2
  const dis = (target.offsetWidth - w) / 2
  barOptions.value = {
    width: w,
    offset: target.offsetLeft + dis + scrollOffset.value,
  }
}

// 超出滚动
const activeTab = shallowRef<HTMLElement>() //激活tab
const scrollRef = shallowRef<HTMLElement>() //滚动容器
const wrapRef = shallowRef<HTMLElement>()
const scrollOffset = ref(0)
const scrollStyle = computed<CSSProperties>(() => {
  return {
    transform: `translateX(${scrollOffset.value}px)`,
  }
})
const updateScroll = () => {
  if (scrollRef.value!.offsetWidth <= wrapRef.value!.offsetWidth) {
    return
  }

  const activeReact = activeTab.value!.getBoundingClientRect()
  const wrapRefReact = wrapRef.value!.getBoundingClientRect()

  if (activeReact.left < wrapRefReact.left) {
    scrollOffset.value += wrapRefReact.left - activeReact.left
  }
  if (activeReact.right > wrapRefReact.right) {
    scrollOffset.value -= activeReact.right - wrapRefReact.right
  }
}
// 禁用

const getScrollAndWrapW = () => {
  const scrollW = scrollRef.value?.offsetWidth
  const wrapW = wrapRef.value?.offsetWidth
  return {
    scrollW: scrollW ?? 0,
    wrapW: wrapW ?? 0,
  }
}
const disabledMap = computed(() => {
  const { scrollW, wrapW } = getScrollAndWrapW()
  return {
    disablePre: scrollOffset.value >= 0,
    disableNext: scrollW + scrollOffset.value - wrapW <= 0,
  }
})
// 切页
const preSlide = () => {
  if (scrollOffset.value >= 0) {
    return
  }
  const { wrapW } = getScrollAndWrapW()

  if (Math.abs(scrollOffset.value) > wrapW) {
    scrollOffset.value += wrapW
  } else {
    scrollOffset.value = 0
  }
  updateBarOptions()
}
const nextSlide = () => {
  const { scrollW, wrapW } = getScrollAndWrapW()
  if (scrollW + scrollOffset.value - wrapW <= 0) {
    return
  }
  if (scrollW + scrollOffset.value > 2 * wrapW) {
    scrollOffset.value -= wrapW
  } else {
    scrollOffset.value -= scrollW + scrollOffset.value - wrapW
  }
  updateBarOptions()
}
const isInit = ref(true)
watch(
  () => navItems.value,
  async (n) => {
    await nextTick()
    if (isInit.value && tabRefs.value) {
      activeVal.value = n[0].name
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
const getPaneTitleSlot = (slot: any) => {
  const vnode = h('div', slot)

  return vnode
}
</script>

<style scoped></style>
