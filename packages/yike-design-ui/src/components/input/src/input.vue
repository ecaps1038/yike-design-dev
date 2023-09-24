<template>
  <div
    :class="bem()"
    :style="style"
    v-bind="$attrs"
    @mouseenter="mouseenter"
    @mouseleave="mouseleave"
  >
    <span v-if="$slots.prepend" :class="bem('prepend')">
      <slot name="prepend" />
    </span>
    <div
      :class="[
        bem('inner'),
        bem({
          [`${status}`]: !mergedDisabled,
          [`${status}--focus`]: isFocus && !mergedDisabled && !isError,
          loading: loading,
          disabled: mergedDisabled,
          readonly: readonly,
          rightbr0: !!$slots.append,
          leftbr0: !!$slots.prepend,
          error: isError,
          'error-focus': isError,
        }),
        bem([mergedSize]),
      ]"
    >
      <slot name="prefix" />
      <input
        :id="id"
        ref="inputRef"
        :name="name"
        :placeholder="placeholder"
        :disabled="mergedDisabled"
        :readonly="readonly"
        :required="required"
        :class="bem('widget')"
        :type="inputType"
        tabindex="0"
        :value="lastValue"
        :aria-disabled="mergedDisabled"
        :style="inputStyle"
        @focus="focus"
        @input="update"
        @blur="blur"
        @compositionstart="compositionstart"
        @compositionend="compositionend"
        @keydown="keydown"
      />
      <div :class="bem('buttons')">
        <button
          v-if="shouldShowVisiblePasswordButton"
          aria-label="查看/隐藏密码"
          class="yk-input__button"
          :class="YkInputButtonClass"
          @click="switchType"
        >
          <IconCloseEyeOutline />
        </button>
        <button
          v-if="clearable && !disabled"
          aria-label="清空内容"
          class="yk-input__button"
          :class="YkInputButtonClass"
          @click="clear"
        >
          <IconCloseOutline />
        </button>
      </div>
      <div v-if="showCounter" :class="bem('counter')">
        <span>{{ valueCounter }}</span>
        <span v-if="shouldShowLimit">&nbsp;/&nbsp;{{ limit }}</span>
      </div>
      <div v-if="loading" :class="bem('spinner')">
        <YkSpinner />
      </div>
      <slot name="suffix" />
    </div>
    <span v-if="$slots.append" :class="bem('append')">
      <slot name="append" />
    </span>
  </div>
  <Transition name="fade">
    <div v-if="message" :class="bem('hint', [mergedStatus])">
      {{ message }}
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { InputProps } from './input'
import { computed, ref, watch, toRefs, unref } from 'vue'
import { IconCloseEyeOutline, IconCloseOutline } from '../../svg-icon'
import { useFormItem, createCssScope } from '../../utils'
import { YkSpinner } from '../../spinner'
import '../style'

defineOptions({
  name: 'YkInput',
})

const props = withDefaults(defineProps<InputProps>(), {
  size: 'l',
  type: 'text',
  modelValue: '',
  disabled: false,
  readonly: false,
  required: false,
  visible: true,
  clearable: false,
  status: 'primary',
  loading: false,
  message: '',
  showCounter: false,
  limit: -1, // 不限制输入字数
})
const bem = createCssScope('input')

const { disabled, status, message, size, inputStyle } = toRefs(props)

const { mergedDisabled, isError, mergedStatus, mergedSize, validate } =
  useFormItem({
    disabled,
    status,
    message,
    size,
  })

const isTyping = ref(false)
const shouldLimitInput = props.limit > 0
const shouldShowLimit = props.showCounter && shouldLimitInput
const shouldShowVisiblePasswordButton =
  props.type === 'password' && !props.disabled && props.visible
let lastValue = unref(props.modelValue)
const valueCounter = ref<number>(lastValue.length)
const emits = defineEmits([
  'focus',
  'blur',
  'clear',
  'change',
  'submit',
  'keydown',
  'update:modelValue',
  'hoverin',
  'hoverout',
])
const inputRef = ref<HTMLInputElement>()

const isFocus = ref(false)
const isHovering = ref(false)
const shouldShowButton = ref(lastValue.length > 0)
const inputType = ref(props.type)

const focus = () => {
  // 禁用与只读状态不可被聚焦
  if (props.disabled || props.readonly) return
  isFocus.value = true
  validate('focus')
  emits('focus', lastValue)
}

const update = () => {
  if (props.disabled || props.readonly) return
  lastValue = inputRef.value?.value ?? ''
  if (shouldLimitInput && !isTyping.value && lastValue.length > props.limit) {
    lastValue = lastValue.slice(0, props.limit)
    inputRef.value!.value = lastValue
  }
  shouldShowButton.value = lastValue.length > 0 ? true : false
  valueCounter.value = lastValue.length
  validate('change')
  emits('update:modelValue', lastValue)
  emits('change', lastValue)
}

const blur = () => {
  isFocus.value = false
  validate('blur')
  emits('blur', lastValue)
}

const mouseenter = () => {
  isHovering.value = true
  emits('hoverin')
}

const mouseleave = () => {
  isHovering.value = false
  emits('hoverout')
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
  update()
}

const keydown = (ev: KeyboardEvent) => {
  if (ev.key === 'Enter' && !isTyping.value) {
    emits('submit')
  }
  emits('keydown', ev)
}

const switchType = () => {
  inputType.value = inputType.value === 'text' ? 'password' : 'text'
}

const YkInputButtonClass = computed(() => {
  return {
    'yk-input__button': true,
    'yk-input__button-show':
      shouldShowButton.value &&
      (props.clearable || props.visible) &&
      (isFocus.value || isHovering.value),
  }
})

const setValue = (value: string) => {
  lastValue = value
  emits('update:modelValue', lastValue)
  emits('change', lastValue)
}

watch(
  () => props.modelValue,
  (newValue) => {
    lastValue = newValue
    emits('update:modelValue', lastValue)
  },
)

defineExpose({
  inputRef,
  setValue,
})
</script>
