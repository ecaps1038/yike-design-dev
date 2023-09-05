<template>
  <div ref="navRef" :class="[ns(), calcPosCls]">
    <IconLeftOutline
      v-if="showChrols"
      :class="[ns('icon', { disabled: disabledMap.disablePre })]"
      @click="preSlide"
    />
    <div ref="wrapRef" :class="ns('wrap')">
      <div
        v-if="navItems.length"
        ref="scrollRef"
        :class="ns('scroll')"
        :style="scrollStyle"
      >
        <div
          v-for="(item, index) in navItems"
          :key="item.name"
          :ref="(el) => setTabRefs(el, item.id)"
          :class="[
            ns('item', [
              isActive(item) && 'active',
              type,
              item.disabled && 'disabled',
            ]),
          ]"
          @click="onNavClick($event, item, index)"
        >
          <component
            :is="getPaneTitleSlot(item.titleSlot())"
            v-if="item?.titleSlot?.()"
          ></component>
          <span v-else>{{ item.label }}</span>
          <IconCloseOutline
            v-if="rootProps?.closable || rootProps?.editable"
            class="yk-close"
            @click.stop="deleteTab(item)"
          />
        </div>
      </div>
      <yk-tab-bar
        v-if="isLine"
        :offset="barOptions.offset"
        :width="barOptions.width"
        :direction="barDirection"
      ></yk-tab-bar>
    </div>
    <IconRightOutline
      v-if="navItems.length && showChrols"
      :class="[ns('icon', { disabled: disabledMap.disableNext })]"
      @click="nextSlide"
    />
    <div></div>
    <IconPlusOutline
      v-if="rootProps?.addable || rootProps?.editable"
      class="yk-tab-plus"
      @click="onAdd"
    />
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  inject,
  computed,
  watch,
  h,
  shallowRef,
  CSSProperties,
  onMounted,
  nextTick,
} from 'vue'
import { createCssScope } from '../../utils'
import { TabBar } from './tabBar'
import { PaneOptionsProp } from './pane'
import { YkTabsProvideKey } from './tabs'
import YkTabBar from './tab-bar.vue'
import {
  IconLeftOutline,
  IconRightOutline,
  IconPlusOutline,
  IconCloseOutline,
} from '../../svg-icon'
import { NavProp } from './tabNav'
import { useResizeObserver } from '@vueuse/core'

defineOptions({
  name: 'YkTabNav',
})

const ns = createCssScope('tabs-nav')
const props = withDefaults(defineProps<NavProp>(), {
  type: 'line',
})

const emits = defineEmits<{
  change: [PaneOptionsProp]
  add: [void]
  delete: [PaneOptionsProp]
}>()
const optionsCtx = inject(YkTabsProvideKey, {
  paneOptions: [],
  id: 1,
  activedId: 1,
})
const rootProps = optionsCtx.rootProps
const navItems = computed(() => optionsCtx.paneOptions)
const barOptions = ref<Omit<TabBar, 'direction'>>({ width: 0, offset: 0 })

// 存储tabRef

const genTabRef = (id: number) => `tabRef-${id}`
const tabRefsMap: Record<string, Element> = {}
const setTabRefs = (el: any, uid: number) => {
  if (!el) {
    return
  }
  tabRefsMap[genTabRef(uid)] = el as HTMLElement
}
const getTabRef = (id: number) => tabRefsMap[genTabRef(id)]

const isActive = (item: PaneOptionsProp) => {
  return optionsCtx.activedId === item.id
}
const onNavClick = (v: MouseEvent, item: PaneOptionsProp, index: number) => {
  if (item.disabled) {
    return
  }
  emits('change', item)
}

// bar宽度占比选项卡一半
const changePos = (target: HTMLElement) => {
  // 更新超出滚动位置
  activeTab.value = target
  updateScrollFitActive()
  updateBarOptions()
}
// 更新指示条位置
const updateBarOptions = () => {
  if (!isLine.value) {
    return
  }
  const target = activeTab.value!
  const targetWH = isX.value ? target.offsetWidth : target.offsetHeight
  const targetLT = isX.value ? target.offsetLeft : target.offsetTop
  const w = targetWH / 2
  const dis = (targetWH - w) / 2
  barOptions.value = {
    width: w,
    offset: targetLT + dis + scrollOffset.value,
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
const updateScrollFitActive = async () => {
  const activeReact = activeTab.value!.getBoundingClientRect()
  const wrapRefReact = wrapRef.value!.getBoundingClientRect()
  const scrollReact = scrollRef.value!.getBoundingClientRect()

  if (
    scrollReact.left >= wrapRefReact.left &&
    scrollReact.right <= wrapRefReact.right
  ) {
    return
  }

  const disR = wrapRefReact.right - scrollReact.right
  const disL = wrapRefReact.left - scrollReact.left
  if (disR > 0 && disR < wrapRefReact.width && disL > 0) {
    scrollOffset.value += Math.min(disR, disL)
    return
  }
  if (activeReact.left < wrapRefReact.left) {
    scrollOffset.value += wrapRefReact.left - activeReact.left
  }
  if (activeReact.right > wrapRefReact.right) {
    scrollOffset.value -= activeReact.right - wrapRefReact.right
  }
}
// 更新容器偏移位置
const updateScroll = () => {
  if (wrapW.value < scrollW.value) {
    if (scrollW.value + scrollOffset.value < wrapW.value) {
      scrollOffset.value = wrapW.value - scrollW.value
    }
  } else {
    if (scrollOffset.value < 0) {
      scrollOffset.value = 0
    }
  }
}

// 禁用
const scrollW = ref(0)
const wrapW = ref(0)
const updateScrollAndWrapW = () => {
  scrollW.value = scrollRef.value?.offsetWidth ?? 0
  wrapW.value = wrapRef.value?.offsetWidth ?? 0
  return {
    scrollW: scrollW.value,
    wrapW: wrapW.value,
  }
}
const showChrols = computed(() => {
  const { scrollW, wrapW } = updateScrollAndWrapW()
  return scrollW > wrapW
})
const disabledMap = computed(() => {
  const { scrollW, wrapW } = updateScrollAndWrapW()
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
  const { wrapW } = updateScrollAndWrapW()

  if (Math.abs(scrollOffset.value) > wrapW) {
    scrollOffset.value += wrapW
  } else {
    scrollOffset.value = 0
  }
  updateBarOptions()
}
const nextSlide = () => {
  const { scrollW, wrapW } = updateScrollAndWrapW()
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

watch(
  () => navItems.value,
  async () => {
    await nextTick()
    updateScrollAndWrapW()
    // 解决同时触发active和items增减冲突

    setTimeout(() => {
      updateScroll()
      updateBarOptions()
    })
  },
  {
    deep: true,
    flush: 'post',
  },
)

watch(
  () => optionsCtx.activedId,
  async (nId, oId) => {
    await nextTick()
    if (typeof nId === 'number' && nId !== oId) {
      const target = getTabRef(nId) as HTMLElement
      changePos(target)
    }
  },
  {
    immediate: true,
    deep: true,
  },
)
onMounted(() => {
  setTimeout(() => {
    const id = optionsCtx.activedId!
    const target = getTabRef(id) as HTMLElement
    changePos(target)
  })
})
const getPaneTitleSlot = (slot: any) => {
  const vnode = h('div', slot)
  return vnode
}

// 判断是否线型风格
const isLine = computed(() => props.type === 'line')
const calcPosCls = computed(() => `is-${rootProps?.tabPosition}`)
// 动态增减
const onAdd = () => {
  emits('add')
}
const deleteTab = (item: PaneOptionsProp) => {
  if (item.disabled) {
    return
  }
  emits('delete', item)
}

const barDirection = computed(() => {
  const pos = optionsCtx.rootProps?.tabPosition
  const h = ['bottom', 'top']
  return h.includes(pos || '') ? 'horizontal' : 'vertical'
})
const isX = computed(() => barDirection.value === 'horizontal')
const navRef = ref<HTMLElement>()
useResizeObserver(navRef, async () => {
  await nextTick()
  updateScrollAndWrapW()
  setTimeout(() => {
    updateScroll()
    updateBarOptions()
  })
})
</script>
