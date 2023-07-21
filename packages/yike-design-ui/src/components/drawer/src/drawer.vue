<template>
  <Teleport to="body" :disabled="!show">
    <Transition :name="placement">
      <div
        v-if="show"
        class="yk-drawer"
        :aria-modal="show"
        aria-label="抽屉"
        tabindex="-1"
      >
        <div class="yk-drawer-mask" @click="close"></div>
        <div>
          <div ref="focuser" class="yk-drawer-focus" tabindex="0"></div>
          <div
            :class="ykDrawerClass"
            :style="ykDrawerStyle"
            class="yk-drawer-main"
          >
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
          <div class="yk-drawer-focus" tabindex="0"></div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
<script setup lang="ts">
import { DrawerProps } from './drawer'
import '../style'
import { computed, onUpdated, ref } from 'vue'
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
})
const emits = defineEmits(['close', 'open'])
const focuser = ref<HTMLElement>()
const close = () => {
  emits('close')
}
const escape = (ev: KeyboardEvent) => {
  if (ev.key === 'Escape') close()
}
onUpdated(() => {
  if (props.show) {
    focuser.value?.focus()
    if (!props.scrollable) {
      document.body.style.overflow = 'hidden'
    }
    if (props.escapable) {
      document.body.addEventListener('keydown', escape)
    }
    emits('open')
  } else {
    document.body.style.overflow = ''
    document.body.removeEventListener('keydown', escape)
  }
})
const ykDrawerStyle = computed(() => {
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
  return {
    [`yk-drawer-${props.placement}`]: true,
  }
})
</script>
