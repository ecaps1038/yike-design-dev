<template>
  <div :class="[bem(), bem(isFocus ? 'focus' : 'blur')]">
    <YkInput
      ref="ykTagInput"
      v-bind="inputProps"
      v-model="inputVal"
      :placeholder="placeholder"
      :size="mergedSize"
      :input-style="inputStyle"
      @fucus="onInputFocus"
      @keydown="onKeydown"
      @blur="onBlur"
      @click.stop="onClick"
    >
      <template #prefix>
        <div :class="bem('tag-list')">
          <YkTag
            v-for="(tag, index) in tagList"
            :key="index"
            :class="bem('tag-list-item')"
            closeable
            size="s"
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

const emits = defineEmits(['focus', 'blur', 'keydown', 'click'])

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

const onInputFocus = () => {
  isFocus.value = true
  emits('focus')
}

const onKeydownEnter = () => {
  const inputValue = inputVal.value.trim()
  if (!inputValue) return
  // 新增一个tag
  setTagList(tagList.value.concat(inputValue))
  inputVal.value = ''
  emits('keydown', 'enter')
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

const onClick = () => {
  ykTagInput.value?.inputRef.focus()
}

const onCloseTag = (tag) => {
  console.log(tag)
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
  console.log('宽度：', ykTagInput.value?.inputRef, paddingLeft + paddingRight)
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
  inputVal.value = ''
  tagInputWidth.value = getTagInputPlaceholderWidth()
  emits('blur')
}
</script>
