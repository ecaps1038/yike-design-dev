<template>
  <div :class="[bem({ disabled: disabled })]">
    <div
      ref="picker"
      v-click-outside:[pickerPanel]="onClickOutside"
      :class="bem('input')"
    >
      <input
        v-model="inputTimer"
        :disabled="$props.disabled"
        :placeholder="$props.placeholder ?? '请选择'"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <span :class="bem('icon')">
        <slot name="icon">
          <component :is="'IconTimeOutline'" />
        </slot>
      </span>
    </div>
    <teleport to="body">
      <div
        v-show="showPicker"
        ref="pickerPanel"
        :class="bem('panel-container')"
      >
        <div :class="bem('panel-content')">
          <ul :class="bem('panel-column')">
            <li v-for="item in 24" @click="() => handleClickLi(1, item - 1)">
              {{ (item - 1 + '').padStart(2, '0') }}
            </li>
          </ul>
          <ul :class="bem('panel-column')">
            <li v-for="item in 60" @click="() => handleClickLi(2, item - 1)">
              {{ (item - 1 + '').padStart(2, '0') }}
            </li>
          </ul>
          <ul :class="bem('panel-column')">
            <li v-for="item in 60" @click="() => handleClickLi(3, item - 1)">
              {{ (item - 1 + '').padStart(2, '0') }}
            </li>
          </ul>
        </div>
        <div :class="bem('panel-bottom')">
          <div :class="bem('panel-bottom-now')" @click="() => handleClickNow()">
            现在
          </div>
          <div :class="bem('panel-bottom-ok')">
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
import { ref } from 'vue'
import dayjs from 'dayjs'
import { TimePickerProps } from './time-picker'
import { createCssScope } from '../../utils/bem'
import { ClickOutside as vClickOutside } from '../../../directives'
import YkButton from '../../button'
import { getElementPagePosition } from './util'

const bem = createCssScope('time-picker')

defineOptions({
  name: 'YkTimePicker',
})

const emits = defineEmits([
  'input',
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
if (props.value) {
  inputTimer.value = props.value + ''
} else if (props.modelValue) {
  inputTimer.value = props.modelValue + ''
}
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
      getElementPagePosition(picker.value)!.y + 44 + 'px'
    pickerPanel.value!.style.left =
      getElementPagePosition(picker.value)!.x + 'px'
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
  emits('input', inputTimer.value)
  emits('update:model-value', inputTimer.value)
  emits('change', inputTimer.value)
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
  emits('input', inputTimer.value)
  emits('update:model-value', inputTimer.value)
}
function handleClickOk() {
  closePickPanel()
  emits('visible-change')
  emits('input', inputTimer.value)
  emits('update:model-value', inputTimer.value)
}
</script>
