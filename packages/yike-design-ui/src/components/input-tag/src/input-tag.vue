<template>
  <div :class="className" @mousedown="onMousedown">
    <YkInput
      ref="ykTagInput"
      v-bind="inputProps"
      v-model="inputVal"
      :placeholder="placeholder"
      :size="mergedSize"
      :input-style="inputStyle"
      :disabled="mergedDisabled"
      @focus="onInputFocus"
      @keydown="onKeydown"
      @blur="onBlur"
      @click.stop="onClick"
      @mouseenter="onMouseenter"
      @mouseleave="onMouseleave"
    >
      <template #prefix>
        <div :class="bem('tag-list')">
          <YkTag
            v-for="(tag, index) in tagList"
            :key="index"
            :class="bem('tag-list-item')"
            closeable
            size="s"
            :disabled="mergedDisabled"
            @close="onCloseTag(index)"
            @click.stop="onClick"
          >
            {{ tag }}
          </YkTag>
        </div>
      </template>
    </YkInput>
    <div ref="tagInputPlaceholder" :class="bem('tag_input_placeholder')">
      {{ inputVal || placeholder }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { toRefs, ref, computed, watch } from 'vue'
import { InputTagProps } from './input-tag'
import { createCssScope } from '../../utils/bem'
import useVModel from '../../utils/hooks/use-v-model'
import { useFormItem } from '../../utils'
import { STATUS_MAP, SIZES_MAP } from '../../utils/constant'
import { calculateElementStyle } from './utils'

const bem = createCssScope('input-tag')

defineOptions({
  name: 'YkInputTag',
})

const props = withDefaults(defineProps<InputTagProps>(), {
  modelValue: undefined,
  value: undefined,
  defaultValue: undefined,
  disabled: false,
  status: STATUS_MAP.primary,
  size: SIZES_MAP.m,
  message: '',
  inputProps: undefined,
})

const emits = defineEmits([
  'focus',
  'blur',
  'keydown',
  'click',
  'hoverin',
  'hoverout',
])

const {
  modelValue,
  value,
  defaultValue,
  disabled,
  status,
  size,
  message,
  inputProps,
  placeholder,
  max,
} = toRefs(props)

const [tagList, setTagList] = useVModel(
  value,
  modelValue,
  defaultValue,
  props.onChange,
)

const { mergedDisabled, isError, mergedStatus, mergedSize, validate } =
  useFormItem({
    disabled,
    status,
    message,
    size,
  })
const inputVal = ref('')
const isFocus = ref(false)
const isHovering = ref(false)

const className = computed(() => {
  return [
    bem(),
    bem(isFocus.value ? 'focus' : 'blur'),
    bem(isHovering.value ? 'hover' : ''),
  ]
})

const setInputVal = (val: string) => {
  inputVal.value = val
}

const onInputFocus = () => {
  isFocus.value = true
  emits('focus')
}

const onKeydownEnter = () => {
  const inputValue = inputVal.value.trim()
  if (!inputValue) return
  if (tagList.value.length >= max.value) {
    emits('keydown', 'enter', inputValue)
    return setInputVal('')
  }
  // 新增一个tag
  setTagList(tagList.value.concat(inputValue))
  emits('keydown', 'enter', inputValue)
  setInputVal('')
}

const onKeydownBackspace = () => {
  // 当无输入内容时，删除最后一个tag
  if (inputVal.value.trim() !== '') return
  setTagList(tagList.value.slice(0, tagList.value.length - 1))
  emits('keydown', 'backspace')
}

// 建立键盘事件映射
const onKeydownMap: { [key: string]: (ev: KeyboardEvent) => void } = {
  Enter: onKeydownEnter,
  Backspace: onKeydownBackspace,
}

const onKeydown = (ev: KeyboardEvent) => {
  // 获取到事件名称，根据键盘事件映射执行对应的方法
  const { key } = ev || {}
  const keydownHandler = onKeydownMap[key]
  keydownHandler && keydownHandler(ev)
}

// 获取ykTagInput的$refs
const ykTagInput = ref(null)
const inputFocus = () => {
  ykTagInput.value?.inputRef.focus()
}

const onMousedown = (e: MouseEvent) => {
  if (ykTagInput.value?.inputRef && e.target !== ykTagInput.value?.inputRef) {
    e.preventDefault()
    inputFocus()
  }
}

const onClick = () => {
  inputFocus()
  emits('click')
}

const onCloseTag = (index: number) => {
  tagList.value.splice(index, 1)
  // 防止失焦
  inputFocus()
}

const onMouseenter = () => {
  isHovering.value = true
  emits('hoverin')
}

const onMouseleave = () => {
  isHovering.value = false
  emits('hoverout')
}

const tagInputPlaceholder = ref<HTMLInputElement | null>(null)
const getTagInputPlaceholderWidth = (): number => {
  const { width } = tagInputPlaceholder.value?.getBoundingClientRect() || {}
  return width || 0
}
// tagInputWidth默认值为tagInputPlaceholder的宽度
const tagInputWidth = ref(0)

watch(
  () => {
    const { width } = tagInputPlaceholder.value?.getBoundingClientRect() || {}
    return width
  },
  (newVal) => {
    console.log('1111', newVal)
    tagInputWidth.value = newVal!
  },
  {
    immediate: true,
  },
)

// 获取ykTagInput元素的padding值
const getYkTagInputPadding = () => {
  if (!ykTagInput.value?.inputRef) return 0
  const { paddingLeft, paddingRight } = calculateElementStyle(
    ykTagInput.value?.inputRef,
  )
  return paddingLeft + paddingRight
}

const inputStyle = computed(() => {
  const paddingW = getYkTagInputPadding()
  return {
    width: `${tagInputWidth.value + paddingW}px`,
  }
})

const onBlur = () => {
  isFocus.value = false
  setInputVal('')
  tagInputWidth.value = getTagInputPlaceholderWidth()
  emits('blur')
}
</script>
