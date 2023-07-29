<template>
  <div :class="bem()">
    <div v-if="$slots.prepend" :class="bem('prepend')">
      <slot name="prepend" />
    </div>
    <div
      :class="[
        bem('inner'),
        bem({
          [`${status}`]: !disabled,
          [`${status}--focus`]: isFocus && !disabled,
          loading: loading,
          disabled: disabled,
          readonly: readonly,
          rightbr0: !!$slots.append,
          leftbr0: !!$slots.prepend,
        }),
        bem([size]),
      ]"
      @mouseenter="mouseenter"
      @mouseleave="mouseleave"
    >
      <div v-if="$slots.prefix" :class="bem(['slot', 'before'])">
        <slot name="prefix" />
      </div>
      <input
        :id="id"
        ref="inputRef"
        :name="name"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :class="bem('widget')"
        :type="inputType"
        tabindex="0"
        :value="realValue"
        :aria-disabled="disabled"
        @focus="focus"
        @input="update"
        @blur="blur"
        @compositionstart="compositionstart"
        @compositionend="compositionend"
        @keydown.enter="submit"
      />
      <div :class="bem('buttons')">
        <button
          v-if="shouldShowVisiblePasswordButton"
          aria-label="查看/隐藏密码"
          class="yk-input__button"
          :class="YkInputButtonClass"
          @click="switchType"
        >
          <IconClosedEyeFill />
        </button>
        <button
          v-if="clearable && !disabled"
          aria-label="清空内容"
          class="yk-input__button"
          :class="YkInputButtonClass"
          @click="clear"
        >
          <IconCrossOutline />
        </button>
      </div>
      <div v-if="showCounter" :class="bem('counter')">
        <span>{{ valueCounter }}</span>
        <span v-if="shouldShowLimit">&nbsp;/&nbsp;{{ limit }}</span>
      </div>
      <div v-if="loading" :class="bem('spinner')">
        <svg id="spinner" viewBox="25 25 50 50">
          <circle r="20" cy="50" cx="50"></circle>
        </svg>
      </div>
      <div v-if="$slots.suffix" :class="bem(['slot', 'after'])">
        <slot name="suffix" />
      </div>
    </div>
    <div v-if="$slots.append" :class="bem('append')">
      <slot name="append" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { InputProps } from './input'
import '../style'
import { computed, ref, toRef } from 'vue'
import { createCssScope } from '../../utils/bem'
import { useInputTooltip } from './utils'
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
  readonly: false,
  visible: true,
  clearable: false,
  status: 'primary',
  loading: false,
  showCounter: false,
  limit: -1, // 不限制输入字数
  tooltip: '',
})
const bem = createCssScope('input')
const isTyping = ref(false)
const shouldLimitInput = props.limit > 0
const shouldShowLimit = props.showCounter && shouldLimitInput
const shouldShowVisiblePasswordButton =
  props.type === 'password' && !props.disabled && props.visible
let realValue = toRef(props, 'value')
let lastValue = realValue.value
const valueCounter = ref<number>(lastValue.length)
const emits = defineEmits([
  'focus',
  'blur',
  'clear',
  'change',
  'submit',
  'update:value',
])
const inputRef = ref<HTMLInputElement>()

const isFocus = ref(false)
const isHovering = ref(false)
const shouldShowButton = ref(lastValue.length > 0)
const inputType = ref(props.type)
let tooltip = useInputTooltip(inputRef)

const focus = () => {
  // 禁用与只读状态不可被聚焦
  if (props.disabled || props.readonly) return
  isFocus.value = true
  if (props.tooltip && props.tooltip !== '') {
    tooltip!.set(props.tooltip)
  }
  emits('focus', lastValue)
}

const update = () => {
  if (props.disabled || props.readonly) return
  lastValue = inputRef.value?.value ?? ''
  if (shouldLimitInput && !isTyping.value && lastValue.length > props.limit) {
    lastValue = lastValue.slice(0, props.limit)
    inputRef.value!.value = lastValue
  }
  ;(realValue as any) = lastValue // 别删
  shouldShowButton.value = lastValue.length > 0 ? true : false
  valueCounter.value = lastValue.length
  emits('update:value', lastValue)
  emits('change', lastValue)
}

const blur = () => {
  isFocus.value = false
  tooltip.unset()
  emits('blur', lastValue)
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
  emits('clear', '')
}

// 开始使用中文输入法 暂停字数限制
const compositionstart = () => {
  isTyping.value = true
}

// 结束使用中文输入法
const compositionend = () => {
  isTyping.value = false
}

const submit = () => {
  emits('submit', lastValue)
}

const switchType = () => {
  inputType.value = inputType.value === 'text' ? 'password' : 'text'
}

const YkInputButtonClass = computed(() => {
  return {
    'yk-input__button-show':
      shouldShowButton.value &&
      (props.clearable || props.visible) &&
      (isFocus.value || isHovering.value),
  }
})
</script>
