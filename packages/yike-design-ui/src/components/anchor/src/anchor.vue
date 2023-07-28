<template>
  <div ref="$anchor" :class="cls">
    <anchor-list :options="options" :active="active" :root="true" />
    <span
      v-if="props.showMarker && markerY !== undefined"
      class="yk-anchor-marker"
      :style="markerStyle"
    ></span>
  </div>
</template>
<script setup lang="ts">
import { AnchorProps } from './anchor'
import { ref, shallowRef, nextTick, onMounted } from 'vue'
import { computed } from 'vue'
import { useDebounceFn, useEventListener } from '@vueuse/core'

import { onUnmounted } from 'vue'
import { watch } from 'vue'
/* eslint-disable-next-line */
import AnchorList from './anchor-list.vue'

defineOptions({
  name: 'YkAnchor',
})

const props = withDefaults(defineProps<AnchorProps>(), {
  showMarker: true,
  scrollEl: () => window,
  offset: 0,
  ms: 100,
})

const cls = computed(() => {
  return {
    'yk-anchor': true,
    'yk-anchor-show-marker': props.showMarker,
  }
})

const active = ref<string>(decodeURIComponent(location.hash))
const $anchor = shallowRef<HTMLDivElement>()
const markerY = ref<number>()
const markerStyle = computed(() => {
  return (
    active.value && {
      top: `${markerY.value}px`,
      opacity: 1,
    }
  )
})

const handleMarkerPos = async () => {
  if (!props.showMarker || !active.value) return
  await nextTick()
  const activeEl = $anchor.value?.querySelector(
    '.yk-anchor-item-title-active',
  ) as HTMLElement

  if (!activeEl) {
    return
  }
  markerY.value = activeEl.offsetTop
}
useEventListener('hashchange', () => {
  active.value = `${decodeURIComponent(location.hash)}`
})

watch(
  active,
  async () => {
    await nextTick()
    handleMarkerPos()
  },
  { immediate: true },
)

function treeToList(options: AnchorProps['options']) {
  const arr: AnchorProps['options'] = []
  options.forEach((item) => {
    arr.push(item)
    if (item.children && item.children.length > 0) {
      arr.push(...treeToList(item.children))
    }
  })
  return arr
}

// 处理锚点容器滚动逻辑
const anchorList = shallowRef(treeToList(props.options))
const anchorEls = shallowRef<HTMLElement[]>([])

const handleScroll = useDebounceFn(() => {
  // 找到距离容器可见区域顶部最近的锚点元素，并高亮他
  const scrollContainer = props.scrollEl?.()
  if (!scrollContainer || anchorEls.value.length === 0) return
  const distances = ref<{ dis: number; el: HTMLElement }[]>([])

  if (scrollContainer instanceof Window) {
    anchorEls.value.forEach((item, idx) => {
      const rect = item?.getBoundingClientRect()
      distances.value[idx] = {
        dis: rect.top - rect.height - props.offset,
        el: item,
      }
    })
    let closedEL: { dis: number; el: HTMLElement } | undefined
    for (const iterator of distances.value) {
      if (iterator.dis >= 0 && (!closedEL || iterator.dis < closedEL.dis)) {
        closedEL = iterator
      }
    }
    if (closedEL?.el) {
      active.value = `#${closedEL?.el.id}`
    } else {
      active.value = `#${distances.value[distances.value.length - 1].el.id}`
    }
  } else {
    const scrollContainerTop = scrollContainer.getBoundingClientRect().top
    anchorEls.value.forEach((item, idx) => {
      const rect = item.getBoundingClientRect()
      const dis = rect.top - scrollContainerTop
      distances.value[idx] = {
        dis: dis - props.offset!,
        el: item,
      }
    })
    let closedEL = distances.value[0]
    for (const iterator of distances.value) {
      if (iterator.el.id === closedEL?.el.id) continue
      if (iterator.dis < 0 && iterator.dis > closedEL?.dis) {
        closedEL = iterator
      }
    }

    active.value = `#${closedEL?.el.id}`
  }
}, props.ms)

onMounted(() => {
  const scrollContainer = props.scrollEl?.()
  if (!scrollContainer) {
    return
  }
  if (scrollContainer instanceof Window) {
    // 获取到所有被锚点元素
    anchorList.value.forEach((a) => {
      const target = document.querySelector(a.href) as HTMLElement
      if (!target) return
      anchorEls.value.push(target)
    })
  } else {
    // 获取到所有被锚点元素
    anchorList.value.forEach((a) => {
      const target = scrollContainer.querySelector(a.href) as HTMLElement
      if (!target) return
      anchorEls.value.push(target)
    })
  }
  props.scrollEl?.().addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  props.scrollEl?.()?.removeEventListener('scroll', handleScroll)
})
</script>
