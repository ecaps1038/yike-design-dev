<template>
  <yk-tooltip
    :arrow="false"
    placement="bottom"
    :trigger="['focus', 'none']"
    :open="openTimepicker"
    :close-delay="0"
    :overlay-style="{
      backgroundColor: '#fff',
      color: '#000',
      padding: '2px 0 8px',
      transform: 'translateY(-8px)',
    }"
    @open-change="onOpenPickerChange"
  >
    <yk-input
      v-model="inputValue"
      placeholder="请选择时间"
      size="m"
      :style="{ width: '200px' }"
      @focus="onFocusInput"
      @change="onChangeInput"
    >
      <template #suffix>
        <IconCloseOutline
          v-if="isDelete"
          class="input-icon delete-icon"
          @mouseleave="isDelete = false"
          @click="onClickDelete"
        />
        <IconTimeOutline
          v-else
          class="input-icon"
          @mouseenter="isDelete = true"
        />
      </template>
    </yk-input>
    <template #content>
      <div class="yk-timepicker-container">
        <div class="yk-timepicker">
          <div ref="hourColRef" class="yk-timepicker-column">
            <ul>
              <li
                v-for="h in 24"
                ref="cellRef"
                :class="[
                  'yk-timepicker-cell',
                  { 'yk-timepicker-cell-selected': selected.hour[h - 1] },
                ]"
                @click.left="selcetCell('hour', h)"
              >
                {{ startWithZero(h - 1) }}
              </li>
            </ul>
          </div>
          <div ref="minColRef" class="yk-timepicker-column">
            <ul>
              <li
                v-for="m in 60"
                :class="[
                  'yk-timepicker-cell',
                  { 'yk-timepicker-cell-selected': selected.minute[m - 1] },
                ]"
                @click.left="selcetCell('minute', m)"
              >
                {{ startWithZero(m - 1) }}
              </li>
            </ul>
          </div>
          <div ref="secColRef" class="yk-timepicker-column">
            <ul>
              <li
                v-for="s in 60"
                :class="[
                  'yk-timepicker-cell',
                  { 'yk-timepicker-cell-selected': selected.second[s - 1] },
                ]"
                @click.left="selcetCell('second', s)"
              >
                {{ startWithZero(s - 1) }}
              </li>
            </ul>
          </div>
        </div>
        <div class="yk-timepicker-footer">
          <yk-button type="secondary" size="s" @click="onClickNow">
            此刻
          </yk-button>
          <yk-button size="s" @click="onConfirm">确定</yk-button>
        </div>
      </div>
    </template>
  </yk-tooltip>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { startWithZero, getNowTimeData } from './util'
import type {
  TimeSelected,
  TimeType,
  TimeValue,
  ScrollBehavior,
} from './time-picker'

const props = defineProps(['modelValue', 'defaultValue'])
const emit = defineEmits(['update:modelValue'])

const inputValue = ref<string | undefined>(
  props.modelValue || props.defaultValue,
)
const selectedValue = ref<TimeValue>({
  hour: '',
  minute: '',
  second: '',
})
const confirmedValue = ref<TimeValue>({
  hour: '',
  minute: '',
  second: '',
})
const selected = ref<TimeSelected>({
  hour: Array(24).fill(false),
  minute: Array(60).fill(false),
  second: Array(60).fill(false),
})
const hourColRef = ref<HTMLElement>()
const minColRef = ref<HTMLElement>()
const secColRef = ref<HTMLElement>()
const openTimepicker = ref(false)
const isDelete = ref(false)
const cellRef = ref([])

let itemHeight: number

function selcetCell(type: TimeType, value: number) {
  selectedValue.value[type] = startWithZero(value - 1)
  initOtherUnit(type)
  inputValue.value = joinTimeStr(selectedValue.value)
  handleHighlight(type, value)
  handleColumnScroll(type, value, 'smooth')
}

// 选中数字后的高亮效果
function handleHighlight(type: TimeType, value: number) {
  for (let i = 0; i < selected.value[type].length; i++) {
    selected.value[type][i] = false
  }
  selected.value[type][value - 1] = true
}

// 拼接时间字符串
function joinTimeStr(selectedValue: TimeValue): string {
  return `${selectedValue.hour.length ? selectedValue.hour : '00'}:${
    selectedValue.minute.length ? selectedValue.minute : '00'
  }:${selectedValue.second.length ? selectedValue.second : '00'}`
}

// 关闭选择器时重置为上一次确定值的状态
function resetStatus() {
  // 尚未有已保存的值
  if (!confirmedValue.value.hour) {
    inputValue.value = ''
  } else {
    inputValue.value = joinTimeStr(confirmedValue.value)
  }
  for (let key in selectedValue.value) {
    selectedValue.value[key] = confirmedValue.value[key]
  }
  for (let key in selected.value) {
    for (let i = 0; i < selected.value[key].length; i++) {
      selected.value[key][i] = parseInt(confirmedValue.value[key]) === i
    }
  }
}

function resetConfirmedValue() {
  for (let key in confirmedValue.value) {
    confirmedValue.value[key] = ''
  }
}

// 打开关闭选择器弹窗回调
function onOpenPickerChange(open: boolean) {
  // 关闭
  if (!open) {
    resetStatus()
    openTimepicker.value = false
  } else {
    // 打开
    for (let key in confirmedValue.value) {
      handleColumnScroll(
        key as TimeType,
        parseInt(confirmedValue.value[key]) + 1,
        'instant',
      )
    }
    getCellHeight()
    handleTimeString('instant')
  }
}

function onChangeInput() {
  if (!inputValue.value && selectedValue.value.hour) {
    inputValue.value = joinTimeStr(selectedValue.value)
  } else if (inputValue.value) {
    handleTimeString()
  }
}

function onConfirm() {
  for (let key in confirmedValue.value) {
    confirmedValue.value[key] = selectedValue.value[key]
  }
  openTimepicker.value = false
  inputValue.value = joinTimeStr(confirmedValue.value)
  emit('update:modelValue', inputValue.value)
}

function onFocusInput() {
  openTimepicker.value = true
}

function onClickDelete() {
  resetConfirmedValue()
  resetStatus()
  openTimepicker.value = false
}

function onClickNow() {
  const { hour, minute, second } = getNowTimeData()
  selectedValue.value.hour = hour
  selectedValue.value.minute = minute
  selectedValue.value.second = second
  inputValue.value = joinTimeStr(selectedValue.value)
  ;['hour', 'minute', 'second'].forEach((item: string) => {
    handleHighlight(item as TimeType, parseInt(selectedValue.value[item]) + 1)
    handleColumnScroll(
      item as TimeType,
      parseInt(selectedValue.value[item]) + 1,
      'smooth',
    )
  })
}

function getCellHeight() {
  const cell: HTMLElement = cellRef.value[0]
  if (!cellRef.value) return
  const margin = parseInt(getComputedStyle(cell).marginTop)
  console.log(cell.scrollHeight)
  itemHeight = cell.clientHeight + margin
}

// 处理选中数字后的列表滚动
function handleColumnScroll(
  type: TimeType,
  value: number,
  behavior: ScrollBehavior,
) {
  const bias = itemHeight * (value - 1)
  if (bias) {
    switch (type) {
      case 'hour':
        hourColRef.value?.scrollTo({ top: bias, behavior })
        break
      case 'minute':
        minColRef.value?.scrollTo({ top: bias, behavior })
        break
      case 'second':
        secColRef.value?.scrollTo({ top: bias, behavior })
        break
      default:
        break
    }
  }
  initColumnScroll()
}

// 处理空值列的滚动
function initColumnScroll() {
  if (selectedValue.value.hour === '00') {
    handleHighlight('hour', 1)
    hourColRef.value?.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }
  if (selectedValue.value.minute === '00') {
    handleHighlight('minute', 1)
    minColRef.value?.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }
  if (selectedValue.value.second === '00') {
    handleHighlight('second', 1)
    secColRef.value?.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }
}

// 当选中某个时间时，要判断另外两个type的selectedValue是否是空，若是则初始化为00跟ui表现保持一致
function initOtherUnit(type: TimeType) {
  for (let key in selectedValue.value) {
    if (key !== type) {
      selectedValue.value[key] === '' && (selectedValue.value[key] = '00')
    }
  }
}

function handleTimeString(scrollBehavior: ScrollBehavior = 'smooth') {
  // todo：这里的逻辑是判断时间字符串是否合法，目前只用了长度判断，后续要正则
  if (!inputValue.value || inputValue.value.length < 8) return
  const timeArr = inputValue.value.split(':')
  timeArr.forEach((item, index) => {
    if (index === 0) {
      if (item.length === 2 && parseInt(item) >= 0 && parseInt(item) <= 23) {
        selectedValue.value.hour = item
        handleHighlight('hour', parseInt(item) + 1)
        handleColumnScroll('hour', parseInt(item) + 1, scrollBehavior)
      }
    } else {
      if (item.length === 2 && parseInt(item) >= 0 && parseInt(item) <= 59) {
        selectedValue.value[index === 1 ? 'minute' : 'second'] = item
        handleHighlight(index === 1 ? 'minute' : 'second', parseInt(item) + 1)
        handleColumnScroll(
          index === 1 ? 'minute' : 'second',
          parseInt(item) + 1,
          scrollBehavior,
        )
      }
    }
  })
}
</script>
