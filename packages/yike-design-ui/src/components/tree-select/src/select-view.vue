<template>
  <div
    class="yk-select-view"
    @mouseenter="enterYkSlect"
    @mouseleave="leaveYkSlect"
  >
    <div
      v-if="props.disabled"
      :class="props.disabled ? `yk-select-view--cover` : ``"
    ></div>
    <div
      v-if="props.currentItems.length <= 1"
      :class="
        props.isFocus && props.bordered
          ? `yk-select-view__input yk-select-view__input--focused`
          : `yk-select-view__input`
      "
    >
      <input
        ref="input"
        v-model="inputValue"
        :placeholder="props.placeholder ? props.placeholder : ``"
        :disabled="props.disabled"
        class="yk-select-view__input--default"
        type="text"
        @focus="focus"
      />
      <div
        v-show="
          isOverSelect && inputValue?.toString().length && props.allowClear
        "
        class="yk-select-view__icon--closed"
        @click="clearInputValue"
      >
        <IconCloseOutline />
      </div>
    </div>
    <div
      v-else
      :class="
        props.isFocus && props.bordered
          ? `yk-select-view__input yk-select-view__input--focused`
          : `yk-select-view__input`
      "
      @click="multipleFocus"
    >
      <div ref="scroll" class="scrollContent" @wheel="TagsWheel">
        <div
          v-for="(item, index) in props.currentItems"
          class="yk-select-view__tags"
        >
          <div class="text">{{ item.label }}</div>
          <IconCloseOutline
            class="yk-select-view__icon--closed"
            @click="closedItem(index)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, onMounted, watchEffect } from 'vue'
import { TreeOption } from '../../tree/src/tree'
import { IconCloseOutline } from '../../svg-icon'

const props = defineProps<{
  currentItems: TreeOption[]
  isFocus: boolean
  bordered: boolean
  disabled: boolean
  size: number
  allowClear: boolean
  placeholder: string
  defaultValue: string
}>()
const focusShadow = ref<boolean>(false)
const inputValue = ref<string>('')
const isOverSelect = ref<boolean>(true)

const emits = defineEmits<{
  (e: 'send-focus', focusShadow: Ref<boolean>): void
}>()

const sendFocus = (focusShadow: Ref<boolean>) => {
  emits('send-focus', focusShadow)
}

const input = ref<HTMLElement | null>(null)

const scroll = ref<HTMLElement | null>(null)

const focus = () => {
  focusShadow.value = true
  sendFocus(focusShadow)
}

const multipleFocus = () => {
  focusShadow.value = true
  sendFocus(focusShadow)
}

const enterYkSlect = () => {
  isOverSelect.value = true
}
const leaveYkSlect = () => {
  isOverSelect.value = false
}
const clearInputValue = () => {
  inputValue.value = ''
}

const closedItem = (index: number) => {
  props.currentItems.splice(index, index + 1)
}

const wheelShifting = ref<number>(0)
const scrollWidth = ref<number>(0)
const TagsWheel = (event: WheelEvent) => {
  event.preventDefault()
  const delta = Math.sign(event.deltaY)

  if (delta === -1) {
    if (scroll.value && wheelShifting.value < 0) {
      wheelShifting.value += 30
      scroll.value.style.transform = `translateX(${wheelShifting.value}px)`
    }
  } else if (delta === 1) {
    if (scroll.value) {
      wheelShifting.value -= 30
      scroll.value.style.transform = `translateX(${wheelShifting.value}px)`
    }
  }
}

onMounted(() => {
  inputValue.value = props.defaultValue
  const scrollElement = scroll.value
  if (scrollElement) {
    // 获取属性信息
    const width = scrollElement.offsetWidth
    scrollWidth.value = width
  }
})
watchEffect(() => {
  props.currentItems.length == 1
    ? (inputValue.value = props.currentItems[0].label)
    : (inputValue.value = props.defaultValue)

  if (scroll.value) scroll.value.style.transform = `translateX(0px)`
})
</script>
