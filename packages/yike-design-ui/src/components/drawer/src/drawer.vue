<template>
  <Teleport to="body">
    <Transition :name="placement">
      <div v-if="show" class="yk-drawer" @keydown.esc="close">
        <div class="yk-drawer-mask" @click="close"></div>
        <div>
          <div class="yk-drawer-focus" tabindex="0"></div>
          <div :style="ykDrawerStyle" class="yk-drawer-main">
            <button v-if="closable" class="yk-drawer-close" @click="close">
              <yk-icon name="yk-cha" />
            </button>
            <div class="yk-drawer-header">
              <slot name="header">{{ props.title }}</slot>
            </div>
            <div class="yk-drawer-content">
              <slot></slot>
            </div>
            <div class="yk-drawer-footer">
              <slot name="footer"></slot>
            </div>
          </div>
          <div class="yk-drawer-focus" tabindex="0"></div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
<script setup lang="ts">
import { DrawerProps } from './drawer'
import '../style'
import { computed, onUpdated } from 'vue'
defineOptions({
  name: 'YkDrawer',
})
const props = withDefaults(defineProps<DrawerProps>(), {
  show: false,
  size: '360px',
  title: '',
  scrollable: false,
  closable: true,
  escapable: true,
  placement: 'right',
})
const emits = defineEmits(['close', 'open'])
const close = () => {
  emits('close')
}
onUpdated(() => {
  if (props.show) {
    if (!props.scrollable) {
      document.body.style.overflow = 'hidden'
    }
    if (props.escapable) {
      document.body.addEventListener('keydown', close, true)
    }
    emits('open')
  } else {
    document.body.style.overflow = ''
    document.body.removeEventListener('keydown', close, true)
  }
})
let style: any
const ykDrawerStyle = computed(() => {
  switch (props.placement) {
    case 'right':
      return [
        {
          width: props.size,
          right: '0px',
          left: 'unset',
        },
      ]
    case 'left':
      return [
        {
          width: props.size,
          left: '0px',
          right: 'unset',
        },
      ]
    case 'top':
      return [
        {
          height: props.size,
          bottom: 'unset',
          top: '0px',
        },
      ]
    case 'bottom':
      return [
        {
          height: props.size,
          bottom: '0px',
          top: 'unset',
        },
      ]
  }
  return style
})
</script>
