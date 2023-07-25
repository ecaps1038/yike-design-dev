<template>
  <div>
    <div :class="bem()" :style="Style">
      <yk-icon
        :name="statusIconName"
        :class="`icon-${props.type} message-icon`"
      ></yk-icon>
      <span class="text">{{ message }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { MessageProps } from './message'
import { ref, onMounted, computed } from 'vue'
import '../style'
import { YkIcon } from '../../../index'
import { createCssScope } from '../../../utils/bem'

const bem = createCssScope('message')

defineOptions({
  name: 'YkMessage',
})

const props = withDefaults(defineProps<MessageProps>(), {
  message: '',
  type: 'success',
  duration: 3000,
  offset: 12,
  zIndex: 100,
  onClose: () => ({}),
})

const emits = defineEmits(['close'])

const statusIconName = computed(() => {
  return iconStatusMap[props.type]
})
const Style = computed(() => ({
  marginBottom: `${props.offset}px`,
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
    close()
  }, props.duration)
}

const close = () => {
  emits('close')
  isShow.value = false
}

onMounted(() => {
  startTimer()
  isShow.value = true
})
</script>
