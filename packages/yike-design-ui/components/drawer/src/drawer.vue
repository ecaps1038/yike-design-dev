<template>
  <Teleport :to="target">
    <div
      v-if="shouldVisible || show"
      :class="
        bem({
          'other-el': !isFullscreenDrawer,
        })
      "
      :aria-modal="show"
      aria-label="抽屉"
      tabindex="-1"
    >
      <Transition name="mask" appear>
        <div
          v-if="showMask && show"
          :class="bem('mask')"
          aria-hidden="true"
        ></div>
      </Transition>
      <div
        ref="focuser"
        aria-hidden="true"
        aria-label="按 TAB 聚焦到抽屉"
        :class="bem('focus')"
        tabindex="0"
      ></div>
      <Transition
        :name="`${placement}-drawer`"
        appear
        @after-enter="onAfterOpen"
        @after-leave="onDestory"
      >
        <div
          v-if="show"
          ref="drawerMain"
          :class="
            bem({
              main: true,
              shadow: !props.showMask,
              [`${props.placement}`]: true,
            })
          "
          :style="ykDrawerMainStyle"
        >
          <div :class="bem('wrapper')">
            <div :class="bem('header')" :aria-label="title">
              <div :class="bem('title')">
                <slot name="header">{{ props.title }}</slot>
              </div>
              <button v-if="closable" :class="bem('close')" @click="close">
                <IconCrossOutline />
              </button>
            </div>
            <YkScrollbar>
              <div :class="bem('content')">
                <slot></slot>
              </div>
            </YkScrollbar>
            <div :class="bem('footer')">
              <slot name="footer"></slot>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { DrawerProps } from './drawer'
import { computed, ref, nextTick, watch, onMounted } from 'vue'
import { getElement, getDrawerOrder, drawerStats } from './utils'
import { createCssScope } from '../../utils'
import { YkScrollbar } from '../../scrollbar'
import { IconCrossOutline } from '../../svg-icon'

defineOptions({
  name: 'YkDrawer',
})

const props = withDefaults(defineProps<DrawerProps>(), {
  show: false,
  size: '360px',
  title: '抽屉标题',
  scrollable: false,
  closable: true,
  escapable: true,
  showMask: true,
  placement: 'right',
  to: 'body',
})

const target = ref<HTMLElement | Element>(document.body)
const drawerId = ref<number>(getDrawerOrder())
const emits = defineEmits(['close', 'open', 'before-close'])
const focuser = ref<HTMLElement>()
const drawerMain = ref<HTMLElement>()
const shouldVisible = ref<boolean>()
const isFullscreenDrawer = ref<boolean>(props.to === 'body')
const bem = createCssScope('drawer')

nextTick(() => {
  target.value = getElement(props.to)
  isFullscreenDrawer.value = target.value === document.body
})

const onAfterOpen = () => {
  target.value!.addEventListener('click', onClickOutside)
  focuser.value?.focus()
}

const onOpen = () => {
  // 非附加在 body 的抽屉不记录
  if (isFullscreenDrawer.value) {
    drawerStats.open(drawerId.value)
  }
  shouldVisible.value = true
  if (!props.scrollable) {
    document.body.style.overflow = 'hidden'
  }
  if (props.escapable) {
    document.body.addEventListener('keydown', onEscape)
  }
  emits('open')
}

const close = () => {
  // 当前抽屉不是最后一个抽屉 直接 return 不关闭
  if (!drawerStats.isLast(drawerId.value)) {
    return
  }
  emits('before-close')
  emits('close')
}

const onDestory = () => {
  target.value!.removeEventListener('click', onClickOutside)
  document.body.removeEventListener('keydown', onEscape)
  if (isFullscreenDrawer.value) {
    drawerStats.close()
  }
  if (drawerStats.isLast(drawerId.value) && !props.scrollable) {
    document.body.style.overflow = ''
  }
  shouldVisible.value = false
}

const onEscape = (ev: KeyboardEvent) => {
  if (ev.key === 'Escape') close()
}

const onClickOutside = (ev: Event) => {
  if (!drawerMain.value?.contains(ev.target as Node)) {
    close()
  }
}

onMounted(() => {
  if (props.show) {
    onOpen()
  }
})

watch(props, (oldValue, newValue) => {
  if (newValue.show) {
    onOpen()
  }
})

const ykDrawerMainStyle = computed(() => {
  return {
    height:
      props.placement === 'left' || props.placement === 'right'
        ? '100%'
        : props.size,
    width:
      props.placement === 'left' || props.placement === 'right'
        ? props.size
        : '100%',
  }
})
</script>
