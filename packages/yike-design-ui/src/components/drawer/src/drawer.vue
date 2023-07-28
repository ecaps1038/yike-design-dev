<template>
  <Teleport :to="target" :disabled="!show && shouldDestory">
    <Transition :name="placement" @after-leave="destory">
      <div
        v-if="show"
        class="yk-drawer"
        :class="ykDrawerClass"
        :aria-modal="show"
        aria-label="抽屉"
        tabindex="-1"
      >
        <div aria-hidden="true" class="yk-drawer-mask"></div>
        <div
          ref="focuser"
          aria-hidden="true"
          class="yk-drawer-focus"
          tabindex="0"
        ></div>
        <div
          ref="drawerMain"
          :class="ykDrawerMainClass"
          :style="ykDrawerMainStyle"
          class="yk-drawer-main"
        >
          <div class="yk-drawer-wrapper">
            <button v-if="closable" class="yk-drawer-close" @click="close">
              <yk-icon name="yk-cha" />
            </button>
            <div class="yk-drawer-header" :aria-label="title">
              <slot name="header">{{ props.title }}</slot>
            </div>
            <div class="yk-drawer-content">
              <slot></slot>
            </div>
            <div class="yk-drawer-footer">
              <slot name="footer"></slot>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
<script setup lang="ts">
import { DrawerProps } from './drawer'
import '../style'
import { computed, onUpdated, ref, nextTick } from 'vue'
import { getElement, getDrawerOrder, drawerStats } from './utils'
import { onClickOutside } from '@vueuse/core'
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
  placement: 'right',
  to: 'body',
})

const target = ref<HTMLElement | Element>(document.body)
const drawerId = ref<number>(getDrawerOrder())

nextTick(() => {
  target.value = getElement(props.to)
})

const emits = defineEmits(['close', 'open'])
const focuser = ref<HTMLElement>()
const drawerMain = ref<HTMLElement>()
const shouldDestory = ref<boolean>(false)
const isLast = ref<boolean>(false)

const close = () => {
  isLast.value = drawerStats.isLast(drawerId.value)
  console.log('(func) close: ', isLast.value, drawerId.value)
  if (!isLast.value) {
    return
  }
  emits('close')
}

const destory = () => {
  drawerStats.close()
  if (isLast.value) {
    console.log('(func) destory: ', isLast.value, drawerId.value)
    document.body.style.overflow = ''
  }
  console.log('==================== End ======================')
  shouldDestory.value = true
  document.body.removeEventListener('keydown', escape)
}

const escape = (ev: KeyboardEvent) => {
  if (ev.key === 'Escape') close()
}

onClickOutside(drawerMain, close)

onUpdated(() => {
  if (props.show) {
    shouldDestory.value = false
    focuser.value?.focus()
    if (!props.scrollable) {
      document.body.style.overflow = 'hidden'
    }
    if (props.escapable) {
      document.body.addEventListener('keydown', escape)
    }
    drawerStats.open(drawerId.value)
    console.log('=================== New =======================')
    console.log('id', drawerId.value, 'is opened')
    emits('open')
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
const ykDrawerClass = computed(() => {
  let appentToBody = props.to === 'body'
  return {
    'yk-drawer-other-el': !appentToBody,
  }
})
const ykDrawerMainClass = computed(() => {
  return {
    [`yk-drawer-${props.placement}`]: true,
  }
})
</script>
