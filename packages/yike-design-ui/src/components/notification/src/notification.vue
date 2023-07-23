<template>
  <transition
    name="slide-right"
    @before-leave="onClose"
    @after-leave="$emit('destroy')"
  >
    <div
      v-show="visible"
      :id="props.id"
      class="yk-notification"
      :style="positionStyle"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <yk-icon v-if="iconName" :name="iconName" :class="[typeClass]" />
      <div class="content">
        <h2 class="title" v-text="props.title"></h2>
        <div
          v-show="props.message"
          class="message"
          :style="!!props.title ? undefined : { margin: 0 }"
        >
          <slot>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <p v-html="props.message"></p>
          </slot>
        </div>
        <yk-icon
          v-if="props.showClose"
          name="yk-cha"
          class="close"
          @click.stop="close"
        />
      </div>
    </div>
  </transition>
</template>
<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { NotificationProps, NotificationIcon } from './notification'
import { YkIcon } from '../../../index'
import type { CSSProperties } from 'vue'

import '../style'
defineOptions({
  name: 'YkNotification',
})
const props = defineProps(NotificationProps)
defineEmits({ destroy: () => true })

const visible = ref(false)
let timer: number | undefined = undefined

const typeClass = computed(() => `yk-notification-${props.type}`)
const iconName = computed(() => {
  let type = props.type
  if (type) {
    return NotificationIcon[type]
  }
  return ''
})

const positionStyle = computed<CSSProperties>(() => {
  return {
    top: `${props.offset}px`,
    zIndex: props.zIndex,
  }
})

const startTimer = () => {
  if (props.duration > 0) {
    timer = window.setTimeout(() => {
      if (visible.value) close()
      timer = undefined
    }, props.duration)
  }
}
const clearTimer = () => {
  if (timer) window.clearTimeout(timer)
}

onMounted(() => {
  startTimer()
  visible.value = true
})

const close = () => {
  visible.value = false
}

defineExpose({ visible, close })
</script>
