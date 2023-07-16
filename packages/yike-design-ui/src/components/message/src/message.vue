<template>
  <transition name="down" @before-leave="close" @after-leave="destroy">
    <div v-if="isShow" class="yk-message" :style="Style">
      <div class="message-container">
        <yk-icon
          :name="statusIconName"
          :class="`icon-${props.type} message-icon`"
        ></yk-icon>
        <span class="text">{{ message }}</span>
      </div>
    </div>
  </transition>
</template>
<script setup lang="ts">
import { MessageProps } from './message'
import { ref, onMounted, computed } from 'vue'
import '../style'
import { YkIcon } from '../../../index'
defineOptions({
  name: 'YkMessage',
})
const props = withDefaults(defineProps<MessageProps>(), {
  message: '',
  type: 'success',
  duration: 3000,
  offset: 20,
  zIndex: 100,
  onDestroy: () => ({}),
  onClose: () => ({}),
})
const statusIconName = computed(() => {
  return iconStatusMap[props.type]
})
const Style = computed(() => ({
  top: `${props.offset}px`,
  zIndex: props.zIndex,
}))
const iconStatusMap = {
  primary: 'yike-tixing',
  warning: 'yike-jinggao',
  error: 'yike-cha',
  success: 'yike-gou',
  loading: 'yk-jiazai',
}
const isShow = ref(false)
const startTimer = () => {
  if (!props.duration || props.type === 'loading') {
    return
  }
  setTimeout(() => {
    props.onClose && props.onClose()
    close()
  }, props.duration)
}

const close = () => {
  isShow.value = false
}
const destroy = () => {
  // props.onDestroy()
}

onMounted(() => {
  startTimer()
  isShow.value = true
})

defineExpose({
  close,
})
</script>
