<template>
  <div :class="className" @mousedown.stop="onMousedown">
    <yk-input
      ref="ykTagInput"
      v-bind="inputProps"
      v-model="inputVal"
      :placeholder="placeholder"
      :size="mergedSize"
      :input-style="inputStyle"
      :disabled="mergedDisabled"
      :status="mergedStatus"
      :readonly="readonly"
      :limit="limit"
      @change="onChange"
      @focus="onInputFocus"
      @keydown="onKeydown"
      @blur="onBlur"
      @mouseenter="onMouseenter"
      @mouseleave="onMouseleave"
    >
      <template #prefix>
        <div :class="bem('tag-list')">
          <yk-tag
            v-for="(tag, index) in renderTagList"
            :key="index"
            :class="bem('tag-list-item')"
            :disabled="mergedDisabled"
            :closeable="clearable"
            :type="mergedStatus == 'primary' ? 'defualt' : mergedStatus"
            v-bind="tagProps"
            @close="onCloseTag(index)"
          >
            {{ tag }}
          </yk-tag>
          <template v-if="showCollapsedNum">
            <yk-tag
              v-if="!$slots.collapsedItems"
              :class="bem('tag-list-item')"
              :disabled="mergedDisabled"
            >
              +{{ tagList.length - +mincollapsedNum }}
            </yk-tag>
            <slot
              v-else
              name="collapsedItems"
              :collapsed-tags="tagList.slice(mincollapsedNum, tagList.length)"
            ></slot>
          </template>
        </div>
      </template>
      <template #suffix>
        <div v-if="showSuffix" :class="bem('suffix')">
          <button
            v-if="clearable"
            type="button"
            :class="bem('close-icon')"
            @click.stop="onCloseAll"
          >
            <slot name="closeElement">
              <IconCrossOutline />
            </slot>
          </button>
          <slot v-if="$slots.suffix" name="suffix"></slot>
        </div>
      </template>
    </yk-input>
    <div ref="tagInputPlaceholder" :class="bem('tag_input_placeholder')">
      {{ inputVal || placeholder }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { toRefs, ref, computed, watch, nextTick, getCurrentInstance } from 'vue'
import { InputTagProps } from './input-tag'
import { useFormItem, SIZES_MAP, createCssScope, useVModel } from '../../utils'
import { calculateElementStyle } from './utils'
import { IconCrossOutline } from '../../svg-icon'
import YkInput from '../../input'
import YkTag from '../../tag'

const bem = createCssScope('input-tag')
const ctx = getCurrentInstance()

defineOptions({
  name: 'YkInputTag',
})

const props = withDefaults(defineProps<InputTagProps>(), {
  modelValue: undefined,
  value: undefined,
  defaultValue: undefined,
  disabled: false,
  status: 'primary',
  clearable: true,
  size: SIZES_MAP.m,
  inputProps: undefined,
  limit: undefined,
  max: undefined,
  mincollapsedNum: 0,
})

const emits = defineEmits([
  'focus',
  'blur',
  'keydown',
  'click',
  'hoverin',
  'hoverout',
  'update:modelValue',
])

const {
  modelValue,
  value,
  defaultValue,
  disabled,
  status,
  size,
  inputProps,
  placeholder,
  max,
  readonly,
  clearable,
  mincollapsedNum,
  limit,
  tagProps,
} = toRefs(props)

const [tagList, setTagList] = useVModel(
  value,
  modelValue,
  defaultValue,
  props.onChange,
)

const { mergedDisabled, mergedStatus, mergedSize, validate } = useFormItem({
  disabled,
  status,
  size,
})
const inputVal = ref('')
const isFocus = ref(false)
const isHovering = ref(false)

const showSuffix = computed(() => {
  const suffixSlot = ctx?.proxy?.$slots?.suffix
  return !!suffixSlot || clearable.value
})

const showCollapsedNum = computed(() => {
  return !!mincollapsedNum.value && tagList.value.length > mincollapsedNum.value
})

// 需要渲染到tag列表
const renderTagList = computed(() => {
  return (
    tagList.value?.slice(
      0,
      showCollapsedNum.value ? mincollapsedNum.value : tagList.value.length,
    ) || []
  )
})

const className = computed(() => {
  return [
    bem(),
    bem(isFocus.value ? 'focus' : 'blur'),
    bem(isHovering.value ? 'hover' : ''),
    bem(tagList.value.length ? 'has-tag' : ''),
    bem(showSuffix.value ? 'show-suffix' : ''),
    bem(mergedDisabled.value ? 'disabled' : ''),
  ]
})

const setInputVal = (val: string) => {
  inputVal.value = val
}

// 获取ykTagInput的$refs
const ykTagInput = ref<InstanceType<typeof YkInput>>()

// 输入框聚焦方法
const inputFocus = () => {
  ykTagInput.value?.inputRef!.focus()
}

// tagInput占位元素
const tagInputPlaceholder = ref<HTMLInputElement | null>(null)

// 获取ykTagInput元素的padding值
// // 计算padding的总宽度
const calculateYkTagInputPadding = () => {
  if (!ykTagInput.value?.inputRef) return 0
  const { paddingLeft, paddingRight } = calculateElementStyle(
    ykTagInput.value?.inputRef,
  )
  return paddingLeft + paddingRight
}

// 计算需要占位多少宽度
const calculateTagInputPlaceholderWidth = (): number => {
  const { width } = tagInputPlaceholder.value?.getBoundingClientRect() || {}
  const paddingWidth = calculateYkTagInputPadding()
  return (width || 0) + paddingWidth
}

// tagInputWidth默认值为tagInputPlaceholder的宽度
const tagInputWidth = ref<number>(0)
// 更新tagInputWidth方法
const updateTagInputWidth = (v?: number) => {
  nextTick(() => {
    tagInputWidth.value = v || calculateTagInputPlaceholderWidth()
  })
}

// 动态给输入框样式
const inputStyle = computed(() => {
  // 给多2px，防止内容为空的时候，宽度为0
  return {
    width: `${Math.ceil(tagInputWidth.value + 8)}px`,
  }
})

// 鼠标按下事件
const onMousedown = (e: MouseEvent) => {
  // 按下即聚焦
  if (ykTagInput.value?.inputRef && e.target !== ykTagInput.value?.inputRef) {
    e.preventDefault()
    inputFocus()
  }

  // 触发点击事件
  emits('click')
}

// 监听失焦事件
const onBlur = () => {
  // 1、置为失焦状态
  isFocus.value = false
  // 2、清空已输入的值
  setInputVal('')
  // 3、通知外部
  validate('blur')
  emits('blur')
}

// 监听输入change事件
const onChange = () => {
  validate('change')
}

// 监听关闭标签事件
const onCloseTag = (index: number) => {
  // 删除指定位置标签
  tagList.value.splice(index, 1)
}

// 监听清除全部事件
const onCloseAll = () => {
  if (mergedDisabled.value) return
  setTagList([])
  setInputVal('')
}

// 监听鼠标移入事件
const onMouseenter = () => {
  // 将状态置为hover状态
  isHovering.value = true
  // 触发hover外部事件
  emits('hoverin')
}

// 监听鼠标移出事件
const onMouseleave = () => {
  // 将状态置为非hover状态
  isHovering.value = false
  // 触发hover外部事件
  emits('hoverout')
}

// 监听输入聚焦事件
const onInputFocus = () => {
  // 将状态置为focus状态
  isFocus.value = true
  // 触发focus外部事件
  validate('focus')
  emits('focus')
}

// 监听键盘回车事件
const onKeydownEnter = () => {
  // 1、将输入框输入的值空白去掉
  const inputValue = inputVal.value.trim()
  // 2、空白不响应
  if (!inputValue) return
  // 将长度先+1，给外部判断超过限制的场景值
  const curLength = tagList.value.length + 1
  // 判断是否有传tag最大数量，有则仅响应触发外部enter事件
  if (max.value && tagList.value.length >= max.value) {
    emits('keydown', 'enter', { inputValue, curLength })
    return setInputVal('')
  }
  // 3、否则新增一个tag，以及触发事件
  setTagList(tagList.value.concat(inputValue))
  emits('keydown', 'enter', { inputValue, curLength })
  setInputVal('')
}

// 监听键盘回退事件
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

// 监听键盘相关事件
const onKeydown = (ev: KeyboardEvent) => {
  // 获取到事件名称，根据键盘事件映射执行对应的方法
  const { key } = ev || {}
  const keydownHandler = onKeydownMap[key]
  keydownHandler && keydownHandler(ev)
}

// 监听input的输入，动态给input赋予宽度
watch(
  () => inputVal.value,
  (newVal) => {
    if (!newVal) {
      tagInputWidth.value = 0
    }
    nextTick(() => {
      const newWidth = calculateTagInputPlaceholderWidth()
      if (newWidth >= tagInputWidth.value) updateTagInputWidth()
    })
  },
  {
    immediate: true,
  },
)

// 监听tag列表的长度，长度改变的时候，更新输入框宽度
watch(
  () => tagList.value.length,
  () => {
    updateTagInputWidth()
  },
  {
    immediate: true,
  },
)
</script>
