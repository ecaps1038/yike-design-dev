<template>
  <div
    :class="YkInputClass"
    class="yk-input"
    @mouseenter="mouseenter"
    @mouseleave="mouseleave"
  >
    <div class="yk-input-deco"><slot name="prefix"></slot></div>
    <div class="yk-input-inner">
      <div v-if="loading" class="yk-input-spinner">
        <svg v-if="loading" id="spinner" viewBox="25 25 50 50">
          <circle r="20" cy="50" cx="50"></circle>
        </svg>
      </div>
      <input
        :id="id"
        ref="inputRef"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="YkInputWidgetClass"
        class="yk-input-widget"
        :type="type"
        tabindex="0"
        :value="realValue"
        :aria-disabled="disabled"
        @focus="focus"
        @input="update"
        @blur="blur"
      />
      <button
        v-if="clearable && !disabled"
        aria-label="清空内容"
        class="yk-input-clear"
        :class="YkInputClearButtonClass"
        @click="clear"
      >
        <yk-icon name="yk-cha" />
      </button>
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
const emits = defineEmits(['focus', 'blur', 'update:value'])
const inputRef = ref<HTMLInputElement>()
const isFocus = ref(false)
const isHovering = ref(false)
const focus = () => {
  if (props.disabled) return
  isFocus.value = true
}
const update = () => {
  ;(realValue as any) = inputRef.value?.value
  emits('update:value', realValue)
}
const blur = () => {
  isFocus.value = false
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
const YkInputClearButtonClass = computed(() => {
  return {
    'yk-input-show': isFocus.value || isHovering.value,
  }
})
</script>
