<template>
  <div
    :class="bem()"
    :style="style"
    @mouseenter="mouseenter"
    @mouseleave="mouseleave"
  >
    <div v-if="$slots.prepend" :class="bem('prepend')">
      <slot name="prepend" />
    </div>
    <div
      :class="[
        bem('inner'),
        bem({
          [`${status}`]: true,
          [`${status}--focus`]: isFocus && true,
          loading: loading,
          disabled: disabled,
          readonly: readonly,
          rightbr0: !!$slots.append,
          leftbr0: !!$slots.prepend,
        }),
        bem([size]),
      ]"
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
        :required="required"
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
        @keydown="keydown"
      />
      <div :class="bem('buttons')">
        <button
          v-if="shouldShowVisiblePasswordButton"
          id="yki_switch"
          aria-label="查看/隐藏密码"
          :class="YkInputButtonClass"
          @click="switchType"
        >
          <IconCloseEyeOutline />
        </button>
        <button
          v-if="clearable && !disabled"
          id="yki_clear"
          aria-label="清空内容"
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
import { computed, ref, toRef, watch } from 'vue'
import { createCssScope } from '../../utils/bem'
import { IconCloseEyeOutline, IconCloseOutline } from '../../svg-icon'

defineOptions({
  name: 'YkInput',
})
const props = withDefaults(defineProps<InputProps>(), {
  size: 'l',
  type: 'text',
  value: '',
  disabled: false,
  readonly: false,
  required: false,
  visible: true,
  clearable: false,
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
let realValue = toRef(props, 'value')
let lastValue = realValue.value
const valueCounter = ref<number>((lastValue as string).length)
const emits = defineEmits([
  'focus',
  'blur',
  'clear',
  'change',
  'submit',
  'keydown',
  'update:value',
  'hoverin',
  'hoverout',
])
const inputRef = ref<HTMLInputElement>()

const isFocus = ref(false)
const isHovering = ref(false)
const shouldShowButton = ref((lastValue as string).length > 0)
const inputType = ref(props.type)

const focus = () => {
  // 禁用与只读状态不可被聚焦
  if (props.disabled || props.readonly) return
  isFocus.value = true
  emits('focus', lastValue)
}

const update = () => {
  if (props.disabled || props.readonly) return
  lastValue = inputRef.value?.value ?? ''
  if (shouldLimitInput && !isTyping.value && lastValue.length > props.limit) {
    lastValue = lastValue.slice(0, props.limit)
    inputRef.value!.value = lastValue
  }
  ;(realValue as any) = lastValue
  shouldShowButton.value = lastValue.length > 0 ? true : false
  valueCounter.value = lastValue.length
  emits('update:value', lastValue)
  emits('change', lastValue)
}

const blur = () => {
  isFocus.value = false
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
}

const keydown = (ev: KeyboardEvent) => {
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

watch(props, () => {
  lastValue = props.value
  ;(realValue as any) = lastValue
  emits('update:value', lastValue)
})

defineExpose({
  inputRef,
})
</script>
