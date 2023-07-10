<script setup lang="ts">
import { ref } from 'vue'
import '../style'
import { ButtonProps } from './button'

defineOptions({
  name: 'YkButton',
})

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'primary',
  shape: '',
  size: 'l',
  long: false,
  loading: false,
  disabled: false,
})

//获取元素高度
const ykShape = ref(['', ''])

//按钮形状shape设置round/圆角、circle/圆、square/正方
const btShape = (shape: string): [string, string] => {
  switch (shape) {
    case 'round':
      return ['200px', 'auto']
    case 'circle':
      return ['200px', '0']
    case 'square':
      return ['auto', '0']
    default:
      return ['auto', 'auto']
  }
}

//按钮状态normal/success/warning/danger
const btStatus = (status?: string): string => {
  switch (status) {
    case 'primary':
      return 'pcolor'
    case 'success':
      return 'success'
    case 'warning':
      return 'warning'
    case 'danger':
      return 'danger'
    default:
      if (props.type == 'primary') {
        return 'pcolor'
      } else {
        return 'fcolor'
      }
  }
}

ykShape.value = btShape(props.shape)
</script>

<template>
  <div
    :class="{ disabled: disabled, loading: loading }"
    :style="{ width: long ? '100%' : 'auto' }"
    class="yk-buttons"
  >
    <div
      class="yk-button"
      :class="[type, size, btStatus(status)]"
      :style="{ width: long ? '100%' : 'auto' }"
    >
      <div class="yk-button-bg" :style="{ borderRadius: ykShape[0] }"></div>
      <p class="yk-buton-name" :style="{ padding: ykShape[1] }">
        <svg viewBox="25 25 50 50" v-show="loading">
          <circle r="20" cy="50" cx="50"></circle>
        </svg>
        <slot></slot>
      </p>
    </div>
  </div>
</template>
