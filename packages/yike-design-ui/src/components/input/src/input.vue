<template>
  <div
    :class="YkInputClass"
    class="yk-input"
    @mouseenter="mouseenter"
    @mouseleave="mouseleave"
  >
    <div class="yk-input-deco"><slot name="prefix"></slot></div>
    <div class="yk-input-inner">
      <input
        :id="id"
        ref="inputRef"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="YkInputWidgetClass"
        class="yk-input-widget"
        :type="inputType"
        tabindex="0"
        :value="realValue"
        :aria-disabled="disabled"
        @focus="focus"
        @input="update"
        @blur="blur"
      />
      <button
        v-if="type === 'password' && !disabled"
        aria-label="查看/隐藏密码"
        class="yk-input-button"
        :class="YkInputButtonClass"
        @mousedown="switchType"
        @mouseup="switchType"
      >
        <yk-icon name="yk-biyan" />
      </button>
      <button
        v-if="clearable && !disabled"
        aria-label="清空内容"
        class="yk-input-button"
        :class="YkInputButtonClass"
        @click="clear"
      >
        <yk-icon name="yk-cha" />
      </button>
    </div>
    <div v-if="loading" class="yk-input-spinner">
      <svg id="spinner" viewBox="25 25 50 50">
        <circle r="20" cy="50" cx="50"></circle>
      </svg>
    </div>
    <div class="yk-input-deco"><slot name="suffix"></slot></div>
  </div>
</template>
<script setup lang="ts">
import { InputProps } from './input'
import '../style'
import { computed, ref, toRefs } from 'vue'
defineOptions({
  name: 'YkInput',
})
const props = withDefaults(defineProps<InputProps>(), {
  id: '',
  size: 'l',
  type: 'text',
  placeholder: '',
  value: '',
  disabled: false,
  clearable: true,
  status: 'primary',
  loading: false,
})
const receivedProps = toRefs(props)
let realValue = receivedProps.value
let lastValue = realValue.value
const emits = defineEmits(['focus', 'input', 'blur', 'update:value'])
const inputRef = ref<HTMLInputElement>()
const isFocus = ref(false)
const isHovering = ref(false)
const shouldShowButton = ref(lastValue.length > 0)
const inputType = ref(props.type)
const focus = () => {
  // 禁用状态不可被聚焦
  if (props.disabled) return
  isFocus.value = true
  emits('focus', '')
}
const update = () => {
  lastValue = inputRef.value?.value ?? ''
  ;(realValue as any) = lastValue
  shouldShowButton.value = lastValue.length > 0 ? true : false
  emits('update:value', realValue)
}
const blur = () => {
  isFocus.value = false
  emits('blur', '')
}
const mouseenter = () => {
  isHovering.value = true
}
const mouseleave = () => {
  isHovering.value = false
}
const clear = () => {
  inputRef!.value!.value = ''
  inputRef!.value!.focus()
  update()
  emits('input', '')
}
const switchType = () => {
  inputType.value = inputType.value === 'text' ? 'password' : 'text'
}
const YkInputClass = computed(() => {
  return {
    'yk-input--disabled': props.disabled,
    'yk-input--loading': props.loading,
    [`yk-input--${props.status}-focus`]: isFocus.value,
    [`yk-input--${props.size}`]: true,
    [`yk-input--${props.status}`]: true,
  }
})
const YkInputWidgetClass = computed(() => {
  return {
    [`yk-input-size--${props.size}`]: true,
  }
})
const YkInputButtonClass = computed(() => {
  return {
    'yk-input-button-show':
      shouldShowButton.value &&
      props.clearable &&
      (isFocus.value || isHovering.value),
  }
})
</script>
