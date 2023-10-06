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
            @click="closedItem(item, index)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, onMounted, watchEffect, watch } from 'vue'
import { IconCloseOutline } from '../../svg-icon'
import { TreeOption } from '../../tree'
import { Key } from '../../utils'

const props = defineProps<{
  currentItems: TreeOption[]
  isFocus: boolean
  bordered: boolean
  disabled: boolean
  size: number
  allowClear: boolean
  placeholder: string
  defaultValue: string
  treeOptions: TreeOption[]
}>()
const focusShadow = ref<boolean>(false)
const inputValue = ref<string>('')
const isOverSelect = ref<boolean>(true)

const emits = defineEmits<{
  (e: 'send-focus', focusShadow: Ref<boolean>): void
  (e: 'send-un-select-key', unSelectKey: Ref<Key>): void
  (e: 'send-select-key', selectKey: Ref<Key>): void
}>()

const sendFocus = (focusShadow: Ref<boolean>) => {
  emits('send-focus', focusShadow)
}
const sendUnSelectKey = (unSelectKey: Ref<Key>) => {
  emits('send-un-select-key', unSelectKey)
}
const sendSelectKey = (selectKey: Ref<Key>) => {
  emits('send-select-key', selectKey)
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
  sendUnSelectKey(ref(findByLabel(props.treeOptions, inputValue.value)[0].key))
}

const closedItem = (item: TreeOption, index: number) => {
  props.currentItems.splice(index, 1)
  unRefKey.value = item.key
  sendUnSelectKey(ref(item.key))
}

const wheelShifting = ref<number>(0)
const scrollWidth = ref<number>(0)
const TagsWheel = (event: WheelEvent) => {
  // console.log(props.size * 200 - wheelShifting.value, scrollWidth.value)

  event.preventDefault()
  const delta = Math.sign(event.deltaY)

  if (delta === -1) {
    if (scroll.value && wheelShifting.value < 0) {
      wheelShifting.value += 20
      scroll.value.style.transform = `translateX(${wheelShifting.value}px)`
    }
  } else if (delta === 1) {
    if (
      scroll.value &&
      props.size * 200 - wheelShifting.value < scrollWidth.value
    ) {
      wheelShifting.value -= 20
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
  if (props.currentItems.length == 1) {
    inputValue.value = props.currentItems[0].label
  }

  if (scroll.value) {
    // console.log(`变化了`, scroll.value.scrollWidth)

    scroll.value.style.transform = `translateX(0px)`
    // scroll.value.addEventListener('wheel', TagsWheel, { passive: false })
    scrollWidth.value = scroll.value.scrollWidth
  }
})
const unRefKey = ref<Key>('')
watch(inputValue, (newVal) => {
  // console.log(newVal)

  try {
    unRefKey.value = findByLabel(props.treeOptions, newVal)[0].key
  } catch (error) {
    if (unRefKey.value) {
      sendUnSelectKey(unRefKey)
    }
  }
})

const findByLabel = (options: TreeOption[], label: string): TreeOption[] => {
  const list: TreeOption[] = []
  const findItem = (items: TreeOption[]) => {
    for (const item of items) {
      if (item.label === label) {
        list.push(item)
      }
      if (item.children) {
        findItem(item.children)
      }
    }
  }
  findItem(options)
  return list
}
</script>
