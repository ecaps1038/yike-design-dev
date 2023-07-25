<template>
  <div
    :class="YkInputClass"
    class="yk-input"
    @mouseenter="mouseenter"
    @mouseleave="mouseleave"
  >
    <div class="yk-input-inner" :class="YkInputInnerClass">
      <div v-if="$slots.prefix" :class="bem('slot')">
        <slot name="prefix" />
      </div>
      <input
        :id="id"
        ref="inputRef"
        :name="name"
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
        @compositionstart="compositionstart"
        @compositionend="compositionend"
      />
      <div :class="bem('buttons')">
        <button
          v-if="shouldShowVisiblePasswordButton"
          aria-label="查看/隐藏密码"
          class="yk-input-button"
          :class="YkInputButtonClass"
          @click="switchType"
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
      <div v-if="showCounter" :class="bem('counter')">
        <span>{{ valueCounter }}&nbsp;</span>
        <span v-if="shouldShowLimit">/&nbsp;{{ limit }}</span>
      </div>
      <div v-if="loading" :class="bem('spinner')">
        <svg id="spinner" viewBox="25 25 50 50">
          <circle r="20" cy="50" cx="50"></circle>
        </svg>
      </div>
      <div v-if="$slots.suffix" :class="bem('slot')">
        <slot name="suffix" />
      </div>
    </div>
    <slot name="append" />
  </div>
</template>
<script setup lang="ts">
import { InputProps } from './input'
import '../style'
import { computed, ref, toRef } from 'vue'
import { createCssScope } from '../../../utils/bem'
defineOptions({
  name: 'YkInput',
})
const props = withDefaults(defineProps<InputProps>(), {
  id: '',
  name: '',
  size: 'l',
  type: 'text',
  placeholder: '',
  value: '',
  disabled: false,
  visible: true,
  clearable: true,
  status: 'primary',
  loading: false,
  showCounter: false,
  limit: -1, // 不限制输入字数
})
const bem = createCssScope('input')
const isTyping = ref(false)
const shouldLimitInput = props.limit > 0
const shouldShowLimit = props.showCounter && shouldLimitInput
const shouldShowVisiblePasswordButton =
  props.type === 'password' && !props.disabled && props.visible
// 红色波浪线说并不能直接 props.value，所以另辟蹊径。
let realValue = toRef(props, 'value')
let lastValue = realValue.value
const valueCounter = ref<number>(lastValue.length)
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
  if (shouldLimitInput && !isTyping.value && lastValue.length > props.limit) {
    lastValue = lastValue.slice(0, props.limit)
    inputRef.value!.value = lastValue
  }
  ;(realValue as any) = lastValue
  shouldShowButton.value = lastValue.length > 0 ? true : false
  valueCounter.value = lastValue.length
  emits('update:value', lastValue)
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
// 开始使用中文输入法 暂停字数限制
const compositionstart = () => {
  isTyping.value = true
}
// 结束使用中文输入法
const compositionend = () => {
  isTyping.value = false
}
const switchType = () => {
  inputType.value = inputType.value === 'text' ? 'password' : 'text'
}
const YkInputClass = computed(() => {
  return {
    'yk-input--loading': props.loading,
    [`yk-input--${props.size}`]: true,
  }
})
const YkInputInnerClass = computed(() => {
  return {
    'yk-input-bd--disabled': props.disabled,
    [`yk-input--${props.size}`]: true,
    [`yk-input-size--${props.size}`]: true,
    'yk-input__disabled': props.disabled,
    [`yk-input__${props.status}`]: !props.disabled,
    [`yk-input__${props.status}-focus`]: isFocus.value,
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
