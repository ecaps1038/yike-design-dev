<template>
  <Teleport :to="target" :disabled="isFullscreenDrawer">
    <div
      v-if="show || shouldVisible"
      :class="[
        bem(),
        bem({
          'other-el': !isFullscreenDrawer,
        }),
      ]"
      :aria-modal="show"
      aria-label="抽屉"
      tabindex="-1"
    >
      <Transition name="mask" appear>
        <div
          v-if="showMask && shouldVisible"
          :class="bem('mask')"
          aria-hidden="true"
        ></div>
      </Transition>
      <div
        ref="focuser"
        aria-hidden="true"
        :class="bem('focus')"
        tabindex="0"
      ></div>
      <Transition :name="`${placement}-drawer`" appear @after-leave="destory">
        <div
          v-if="shouldVisible"
          ref="drawerMain"
          :class="
            bem({
              main: true,
              shadow: !isFullscreenDrawer || !props.showMask,
              [`${props.placement}`]: true,
            })
          "
          :style="ykDrawerMainStyle"
        >
          <div :class="bem('wrapper')">
            <button v-if="closable" :class="bem('close')" @click="close">
              <IconCrossOutline />
            </button>
            <div :class="bem('header')" :aria-label="title">
              <slot name="header">{{ props.title }}</slot>
            </div>
            <div :class="bem('content')">
              <slot></slot>
            </div>
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
import '../style'
import { computed, ref, nextTick, watch, onMounted } from 'vue'
import { getElement, getDrawerOrder, drawerStats } from './utils'
import { onClickOutside } from '@vueuse/core'
import { createCssScope } from '../../utils/bem'
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
const emits = defineEmits(['close', 'open'])
const focuser = ref<HTMLElement>()
const drawerMain = ref<HTMLElement>()
const shouldDestory = ref<boolean>(false)
const shouldVisible = ref<boolean>()
const isLast = ref<boolean>(false)
const isFullscreenDrawer = ref<boolean>(props.to === 'body')
const bem = createCssScope('drawer')

nextTick(() => {
  target.value = getElement(props.to)
})

const close = () => {
  isLast.value = drawerStats.isLast(drawerId.value)
  if (!isLast.value) {
    return
  }
  shouldVisible.value = false
}

const destory = () => {
  emits('close')
  shouldDestory.value = true
  document.body.removeEventListener('keydown', escape)
}

const escape = (ev: KeyboardEvent) => {
  if (ev.key === 'Escape') close()
}

onClickOutside(drawerMain, close)

onMounted(() => {
  shouldVisible.value = props.show
})

watch(props, () => {
  if (props.show) {
    // 非附加在 body 的抽屉不记录
    if (isFullscreenDrawer.value) {
      drawerStats.open(drawerId.value)
    }
    shouldVisible.value = true
    if (!props.scrollable) {
      document.body.style.overflow = 'hidden'
    }
    if (props.escapable) {
      document.body.addEventListener('keydown', escape)
    }
    focuser.value?.focus()
    emits('open')
  } else {
    if (isFullscreenDrawer.value) {
      drawerStats.close()
    }
    if (drawerStats.isLast(drawerId.value) && !props.scrollable) {
      document.body.style.overflow = ''
    }
    shouldVisible.value = false
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
