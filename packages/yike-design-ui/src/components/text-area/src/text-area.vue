<template>
  <div
    ref="containerRef"
    :class="bem({ focus: isFocus }, { disabled: props.disabled })"
  >
    <div
      v-if="props.autoSize"
      ref="contentRef"
      :style="mirrorStyle"
      :class="[bem('content')]"
    >
      {{ textVal }}
    </div>
    <textarea
      ref="textAreaRef"
      :value="textVal"
      rows="5"
      cols=""
      :placeholder="props.placeholder"
      :class="[bem('inner', { autoSize: !!props?.autoSize })]"
      :disabled="props.disabled"
      :style="areaStyle"
      @focus="onFocus"
      @blur="onBlur"
      @input="onInput"
      @compositionstart="onComposition"
      @compositionupdate="onComposition"
      @compositionend="onComposition"
    ></textarea>
    <span v-if="props.showWordLimit" class="word-limit">{{ limitNum }}</span>
    <button
      v-if="clearable && !disabled"
      aria-label="清空内容"
      :class="[bem('button')]"
      @click="clear"
    >
      <IconCloseOutline />
    </button>
  </div>
</template>
<script setup lang="ts">
import { TextAreaProps } from './text-area'
import { createCssScope } from '../../utils'
import {
  ref,
  computed,
  shallowRef,
  CSSProperties,
  onMounted,
  nextTick,
  watch,
} from 'vue'
import { IconCloseOutline } from '../../svg-icon'
import { splitUnit, getSizeStyles, getOutProp } from './utils'
import { useResizeObserver } from '@vueuse/core'
const bem: any = createCssScope('text-area')

defineOptions({
  name: 'YkTextArea',
})

const props = withDefaults(defineProps<TextAreaProps>(), {
  id: '',
  maxLength: 0,
})

const textAreaRef = shallowRef<HTMLInputElement>()
const containerRef = shallowRef<HTMLElement>()
const contentRef = shallowRef<HTMLElement>()
const emits = defineEmits<{
  'update:modelValue': [TextAreaProps['modelValue']]
  input: [TextAreaProps['modelValue']]
  change: [TextAreaProps['modelValue']]
  clear: [TextAreaProps['modelValue']]
  focus: [FocusEvent]
  blur: [FocusEvent]
}>()

const textVal = computed(() => props.modelValue)

const isFocus = ref(false)
const onFocus = (e: FocusEvent) => {
  isFocus.value = true
  emits('focus', e)
}

const onBlur = (e: FocusEvent) => {
  isFocus.value = false
  emits('blur', e)
}

const clearable: any = computed(() => props.clearable && textVal.value)
const clear: any = () => {
  emits('clear', '')
  onChange('')
  emits('update:modelValue', '')
}

const onChange = (value: string) => {
  const isChange = props.modelValue !== value
  isChange && !isFocus.value && emits('change', value)
}
const limitNum: any = computed(() => {
  if (!props.showWordLimit) {
    return ''
  }
  return `${textVal.value ? textVal.value.toString().length : 0}/${
    props.maxLength
  }`
})

// 输入法切换
const isComposition = ref(false)
const onComposition = (e: CompositionEvent) => {
  const { value } = e.target as HTMLInputElement

  if (e.type === 'compositionend') {
    isComposition.value = false
    watchInput(value)
  } else {
    isComposition.value = true
  }
}

const watchInput = (value: string) => {
  let nVal = value
  if (props.maxLength && value.length > props.maxLength) {
    nVal = value.slice(0, Math.max(0, props.maxLength))
    textAreaRef.value!.value = nVal
  }
  onChange(nVal)
  emits('input', nVal)
  emits('update:modelValue', nVal)
}
const onInput = async (e: Event) => {
  if (isComposition.value) {
    return
  }
  const { value } = e.target as HTMLInputElement
  watchInput(value)
}

// 自适应高度计算
const areaStyle = ref<CSSProperties>()
const baseLineHeight = ref(0)
let computedStyle: CSSStyleDeclaration
const mirrorStyle = ref<CSSProperties>()
onMounted(() => {
  computedStyle = getComputedStyle(textAreaRef.value as Element, null)
  if (props.autoSize) {
    mirrorStyle.value = getSizeStyles(computedStyle)
  }

  baseLineHeight.value = splitUnit(
    computedStyle.getPropertyValue('line-height'),
  )
  calcAreaSize()
})
watch(
  () => props.modelValue,
  () => calcAreaSize(),
)
// 计算textarea真实高度
const calcAreaSize = async () => {
  if (!props.autoSize) {
    return
  }
  await nextTick()
  let minH
  let maxH
  let overflow = 'hidden'
  const minRow = props.autoSize?.minRows
  const maxRow = props.autoSize?.maxRows
  const { pt, pb, bw } = getOutProp(computedStyle)
  const outH = pt + pb + bw
  const realH = contentRef.value!.offsetHeight!
  minRow && (minH = baseLineHeight.value * minRow + outH)
  maxRow && (maxH = baseLineHeight.value * maxRow + outH)

  let height = realH ?? 0

  if (minH && realH < minH) {
    height = minH
  }
  if (maxH && realH > maxH) {
    height = maxH
    overflow = 'auto'
  }
  areaStyle.value = {
    height: `${height}px`,
    resize: props.autoSize ? 'none' : 'vertical',
    overflow,
  }
}

useResizeObserver(textAreaRef, calcAreaSize)
</script>
