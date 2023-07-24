<template>
  <div
    class="yk-time-picker"
    :class="{ 'yk-time-picker--disabled': $props.disabled }"
  >
    <div
      ref="picker"
      v-click-outside:[pickerPanel]="onClickOutside"
      class="yk-time-picker-input"
    >
      <input
        v-model="inputTimer"
        :disabled="$props.disabled"
        :placeholder="$props.placeholder ?? '请选择'"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <span class="yk-icon"><slot name="icon">图标</slot></span>
    </div>
    <teleport to="body">
      <div
        v-show="showPicker"
        ref="pickerPanel"
        class="yk-picker-panel-container"
      >
        <div class="yk-picker-panel-content">
          <ul class="yk-picker-panel-column">
            <li v-for="item in 24" @click="() => handleClickLi(1, item - 1)">
              {{ (item - 1 + '').padStart(2, '0') }}
            </li>
          </ul>
          <ul class="yk-picker-panel-column">
            <li v-for="item in 60" @click="() => handleClickLi(2, item - 1)">
              {{ (item - 1 + '').padStart(2, '0') }}
            </li>
          </ul>
          <ul class="yk-picker-panel-column">
            <li v-for="item in 60" @click="() => handleClickLi(3, item - 1)">
              {{ (item - 1 + '').padStart(2, '0') }}
            </li>
          </ul>
        </div>
        <div class="yk-picker-panel-bottom">
          <div
            class="yk-picker-panel-bottom-now"
            @click="() => handleClickNow()"
          >
            现在
          </div>
          <div class="yk-picker-panel-bottom-ok">
            <yk-button size="s" type="primary" @click="() => handleClickOk()">
              确定
            </yk-button>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>
<script setup lang="ts">
/**
 * @author shuTwT
 * 需要等 scrollbar组件完成后进行重构
 */
import { ref } from 'vue'
import dayjs from 'dayjs'
import { TimePickerProps } from './time-picker'
import { ClickOutside as vClickOutside } from '@yike/directives'
import YkButton from '../../button'
import '../style'
defineOptions({
  name: 'YkTimePicker',
})
const emits = defineEmits([
  'update:model-value',
  'change',
  'focus',
  'blur',
  'visible-change',
])
const props = withDefaults(defineProps<TimePickerProps>(), {})
const picker = ref<HTMLElement>()
const pickerPanel = ref<HTMLElement>()
const showPicker = ref(false)
const inputTimer = ref<string>()
const checkTimer = ref<{
  h: string
  m: string
  s: string
}>({
  h: '00',
  m: '00',
  s: '00',
})
function openPickPanel() {
  //.yk-slide-down-enter
  showPicker.value = true
  pickerPanel.value?.classList.add('yk-slide-down-enter')
  setTimeout(() => {
    pickerPanel.value?.classList.remove('yk-slide-down-enter')
  }, 200)
}
function closePickPanel() {
  pickerPanel.value?.classList.add('yk-slide-down-leave')
  setTimeout(() => {
    pickerPanel.value?.classList.remove('yk-slide-down-leave')
    showPicker.value = false
  }, 200)
}
function handleFocus() {
  if (!props.disabled) {
    openPickPanel()
    emits('visible-change')
    console.log(getElementPagePosition(picker.value))
    pickerPanel.value!.style.top =
      getElementPagePosition(picker.value).y + 44 + 'px'
    pickerPanel.value!.style.left =
      getElementPagePosition(picker.value).x + 'px'
  }
  emits('focus')
}
function handleBlur() {
  //showPicker.value = false
  emits('blur')
}
function handleClickLi(type: number, value: number) {
  if (type == 1) {
    checkTimer.value.h = (value + '').padStart(2, '0')
  } else if (type == 2) {
    checkTimer.value.m = (value + '').padStart(2, '0')
  } else if (type == 3) {
    checkTimer.value.s = (value + '').padStart(2, '0')
  }
  inputTimer.value =
    checkTimer.value.h + ':' + checkTimer.value.m + ':' + checkTimer.value.s
  emits('change', inputTimer.value)
  emits('update:model-value', inputTimer.value)
}
function onClickOutside() {
  closePickPanel()
  emits('visible-change')
}
function handleClickNow() {
  const now = dayjs()
  closePickPanel()
  emits('visible-change')
  inputTimer.value = now.hour() + ':' + now.minute() + ':' + now.second()
  emits('update:model-value', inputTimer.value)
}
function handleClickOk() {
  closePickPanel()
  emits('visible-change')
  emits('update:model-value', inputTimer.value)
}
// 获取元素的绝对位置坐标（相对于页面左上角）
function getElementPagePosition(element) {
  //计算x坐标
  var actualLeft = element.offsetLeft
  var current = element.offsetParent
  while (current !== null) {
    actualLeft += current.offsetLeft
    current = current.offsetParent
  }
  //计算y坐标
  var actualTop = element.offsetTop
  current = element.offsetParent
  while (current !== null) {
    actualTop += current.offsetTop + current.clientTop
    current = current.offsetParent
  }
  //返回结果
  return { x: actualLeft, y: actualTop }
}
// 获取元素的绝对位置坐标（像对于浏览器视区左上角）
function getElementViewPosition(element) {
  //计算x坐标
  let actualLeft = element.offsetLeft
  let current = element.offsetParent
  while (current !== null) {
    actualLeft += current.offsetLeft + current.clientLeft
    current = current.offsetParent
  }
  let elementScrollLeft
  if (document.compatMode == 'BackCompat') {
    elementScrollLeft = document.body.scrollLeft
  } else {
    elementScrollLeft = document.documentElement.scrollLeft
  }
  var left = actualLeft - elementScrollLeft
  //计算y坐标
  var actualTop = element.offsetTop
  current = element.offsetParent
  while (current !== null) {
    actualTop += current.offsetTop + current.clientTop
    current = current.offsetParent
  }
  let elementScrollTop
  if (document.compatMode == 'BackCompat') {
    elementScrollTop = document.body.scrollTop
  } else {
    elementScrollTop = document.documentElement.scrollTop
  }
  var right = actualTop - elementScrollTop
  //返回结果
  return { x: left, y: right }
}
</script>
