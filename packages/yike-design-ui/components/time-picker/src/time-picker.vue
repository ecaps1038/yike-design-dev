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
      v-if="type === 'time'"
      v-model="inputValue"
      placeholder="请选择时间"
      :size="size"
      :style="style"
      :disabled="disabled"
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

    <div v-else ref="rangeWrapperRef" class="range-picker-wrapper">
      <yk-input
        ref="startInputRef"
        v-model="startInputValue"
        placeholder="开始时间"
        size="m"
        style="width: 140px"
        @focus="onFocusStartInput"
        @change="onChangeInput"
      ></yk-input>
      <div>-</div>
      <yk-input
        ref="endInputRef"
        v-model="endInputValue"
        placeholder="结束时间"
        size="m"
        style="width: 140px"
        @focus="onFocusEndInput"
        @change="onChangeInput"
      ></yk-input>
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
    </div>

    <template #content>
      <div class="yk-timepicker-container">
        <div class="yk-timepicker">
          <div v-if="hourColumn" ref="hourColRef" class="yk-timepicker-column">
            <ul>
              <li
                v-for="h in hourNum"
                ref="cellHourRef"
                :class="[
                  'yk-timepicker-cell',
                  { 'yk-timepicker-cell-selected': selected.hour[h - 1] },
                  { 'yk-timepicker-cell-disabled': isDisabled('hour', h - 1) },
                ]"
                @click.left="selcetCell('hour', h)"
              >
                {{ getNeededValue('hour', h - 1) }}
              </li>
            </ul>
          </div>
          <div v-if="minuteColumn" ref="minColRef" class="yk-timepicker-column">
            <ul>
              <li
                v-for="m in 60"
                ref="cellMinutRef"
                :class="[
                  'yk-timepicker-cell',
                  { 'yk-timepicker-cell-selected': selected.minute[m - 1] },
                  {
                    'yk-timepicker-cell-disabled': isDisabled('minute', m - 1),
                  },
                ]"
                @click.left="selcetCell('minute', m)"
              >
                {{ getNeededValue('minute', m - 1) }}
              </li>
            </ul>
          </div>
          <div v-if="secondColumn" ref="secColRef" class="yk-timepicker-column">
            <ul>
              <li
                v-for="s in 60"
                ref="cellSecondRef"
                :class="[
                  'yk-timepicker-cell',
                  { 'yk-timepicker-cell-selected': selected.second[s - 1] },
                  {
                    'yk-timepicker-cell-disabled': isDisabled('second', s - 1),
                  },
                ]"
                @click.left="selcetCell('second', s)"
              >
                {{ getNeededValue('second', s - 1) }}
              </li>
            </ul>
          </div>
          <div
            v-if="normalizedUse12Hours"
            ref="halfColRef"
            class="yk-timepicker-column"
          >
            <ul>
              <li
                :class="[
                  'yk-timepicker-cell',
                  { 'yk-timepicker-cell-selected': halfDay === 'am' },
                ]"
                @click.left="onClickHalfDay('am')"
              >
                AM
              </li>
              <li
                :class="[
                  'yk-timepicker-cell',
                  { 'yk-timepicker-cell-selected': halfDay === 'pm' },
                ]"
                @click.left="onClickHalfDay('pm')"
              >
                PM
              </li>
            </ul>
          </div>
        </div>
        <div v-if="$slots.extra" class="yk-timepicker-footer-extra-wrapper">
          <slot name="extra"></slot>
        </div>
        <div v-if="!disableConfirm" class="yk-timepicker-footer">
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
import { computed, ref } from 'vue'
import { startWithZero, getNowTimeData, checkTimeStr } from './util'
import type {
  TimeSelected,
  TimeType,
  TimeValue,
  ScrollBehavior,
  TimePickerProps,
  HalfDay,
  PickerValue,
  RangeTime,
} from './time-picker'

const props = withDefaults(defineProps<TimePickerProps>(), {
  modelValue: '',
  defaultValue: '',
  size: 'l',
  style: null,
  disabled: false,
  disableConfirm: false,
  step: null,
  type: 'time',
  use12Hours: false,
  format: 'hh:mm:ss',
  disabledHours: () => [],
  disabledMinutes: () => [],
  disabledSeconds: () => [],
})
const emit = defineEmits(['update:modelValue'])

const inputValue = ref<string | undefined>()
const startInputValue = ref<string | undefined>()
const endInputValue = ref<string | undefined>()
const selectedValue = ref<PickerValue>({
  time: { hour: '', minute: '', second: '' },
  startTime: { hour: '', minute: '', second: '' },
  endTime: { hour: '', minute: '', second: '' },
})
const confirmedValue = ref<PickerValue>({
  time: { hour: '', minute: '', second: '' },
  startTime: { hour: '', minute: '', second: '' },
  endTime: { hour: '', minute: '', second: '' },
})
const selected = ref<TimeSelected>({
  hour: Array(24).fill(false),
  minute: Array(60).fill(false),
  second: Array(60).fill(false),
})
const hourColRef = ref<HTMLElement>()
const minColRef = ref<HTMLElement>()
const secColRef = ref<HTMLElement>()
const rangeWrapperRef = ref<HTMLElement>()
const startInputRef = ref()
const endInputRef = ref()
const openTimepicker = ref(false)
const isDelete = ref(false)
const cellMinutRef = ref([])
const cellHourRef = ref([])
const cellSecondRef = ref([])
const halfColRef = ref()
const halfDay = ref<HalfDay>('pm')
const isStartTime = ref(false)
const isEndTime = ref(false)
let itemHeight: number

// 计算单个时间选项是否禁用
const isDisabled = computed(() => {
  const disabledHourArr = props.disabledHours()
  const disabledMinutesArr = props.disabledMinutes()
  const disabledSecondsArr = props.disabledSeconds()
  return (type: TimeType, index: number) => {
    let _arr: number[] = []
    switch (type) {
      case 'hour':
        _arr = disabledHourArr
        break
      case 'minute':
        _arr = disabledMinutesArr
        break
      case 'second':
        _arr = disabledSecondsArr
        break
      default:
        break
    }
    return _arr.includes(index)
  }
})
const hourNum = computed(() => {
  return normalizedUse12Hours.value ? 13 : 24
})
const hourColumn = computed(() => {
  return [/hh:mm:ss/gi, /hh:mm/gi, /hh/gi].some((regex) =>
    regex.test(normalizedFormat.value),
  )
})
const minuteColumn = computed(() => {
  return [/hh:mm:ss/gi, /mm:ss/gi, /mm/gi].some((regex) =>
    regex.test(normalizedFormat.value),
  )
})
const secondColumn = computed(() => {
  return [/hh:mm:ss/gi, /mm:ss/gi, /ss/gi].some((regex) =>
    regex.test(normalizedFormat.value),
  )
})
const normalizedFormat = computed(() => {
  if (/a/gi.test(props.format) && !normalizedUse12Hours.value) {
    return props.format.replace(/\sa/gi, '')
  } else if (!/a/gi.test(props.format) && normalizedUse12Hours.value) {
    return props.format + ' a'
  }
  return props.format
})
const normalizedUse12Hours = computed(() => {
  if (!/hh/gi.test(props.format)) return false
  return props.use12Hours
})
const normalizedDefaultValue = computed(() => {
  if (!checkTimeStr(props.defaultValue, normalizedFormat.value)) {
    return ''
  }
  return props.defaultValue
})
const normalizedModelValue = computed(() => {
  if (!checkTimeStr(props.modelValue, normalizedFormat.value)) {
    return ''
  }
  return props.defaultValue
})
const _range = computed(() =>
  props.type === 'time' ? 'time' : isStartTime.value ? 'startTime' : 'endTime',
)

inputValue.value = normalizedModelValue.value || normalizedDefaultValue.value

// 选中时间数字时
function selcetCell(type: TimeType, value: number) {
  if (isDisabled.value(type, value - 1)) return
  if (props.type !== 'time-range') {
    selectedValue.value.time[type] = startWithZero(value - 1)
    // 跳过确认步骤时
    props.disableConfirm &&
      (confirmedValue.value.time[type] = startWithZero(value - 1))
    initOtherUnit(type)
    inputValue.value = joinTimeStr(selectedValue.value.time)
  } else {
    // 范围选择器
    if (isStartTime.value) {
      selectedValue.value.startTime[type] = startWithZero(value - 1)
      // 跳过确认步骤时
      props.disableConfirm &&
        (confirmedValue.value.startTime[type] = startWithZero(value - 1))
      initOtherUnit(type, 'startTime')
      startInputValue.value = joinTimeStr(selectedValue.value.startTime)
    } else if (isEndTime.value) {
      selectedValue.value.endTime[type] = startWithZero(value - 1)
      // 跳过确认步骤时
      props.disableConfirm &&
        (confirmedValue.value.endTime[type] = startWithZero(value - 1))
      initOtherUnit(type, 'endTime')
      endInputValue.value = joinTimeStr(selectedValue.value.endTime)
    }
  }

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
  const hour = hourColumn.value
    ? selectedValue.hour.length
      ? selectedValue.hour
      : '00'
    : ''
  const minute = minuteColumn.value
    ? (hourColumn.value ? ':' : '') +
      (selectedValue.minute.length ? selectedValue.minute : '00')
    : ''
  const second = secondColumn.value
    ? (minuteColumn.value ? ':' : '') +
      (selectedValue.second.length ? selectedValue.second : '00')
    : ''
  const half = normalizedUse12Hours.value
    ? ` ${halfDay.value.toUpperCase()}`
    : ''
  return `${hour}${minute}${second}${half}`
}

// 关闭选择器时重置为上一次确定值的状态
function resetStatus() {
  if (props.type === 'time') {
    // 尚未有已保存的值
    if (!confirmedValue.value.time.hour) {
      inputValue.value = ''
    } else {
      inputValue.value = joinTimeStr(confirmedValue.value.time)
    }
    for (let key in selectedValue.value.time) {
      selectedValue.value.time[key] = confirmedValue.value.time[key]
    }
    for (let key in selected.value) {
      for (let i = 0; i < selected.value[key].length; i++) {
        selected.value[key][i] = parseInt(confirmedValue.value.time[key]) === i
      }
    }
  } else {
    // 尚未有已保存的值
    if (
      !(
        confirmedValue.value.startTime.hour && confirmedValue.value.endTime.hour
      )
    ) {
      startInputValue.value = ''
      endInputValue.value = ''
    } else {
      startInputValue.value = joinTimeStr(confirmedValue.value.startTime)
      endInputValue.value = joinTimeStr(confirmedValue.value.endTime)
    }
    for (let key in selectedValue.value.startTime) {
      selectedValue.value.startTime[key] = confirmedValue.value.startTime[key]
      selectedValue.value.endTime[key] = confirmedValue.value.endTime[key]
    }
    for (let key in selected.value) {
      for (let i = 0; i < selected.value[key].length; i++) {
        selected.value[key][i] =
          parseInt(confirmedValue.value.startTime[key]) === i
      }
    }
  }
}

function resetConfirmedValue() {
  if (props.type === 'time') {
    for (let key in confirmedValue.value.time) {
      confirmedValue.value.time[key] = ''
    }
  } else {
    for (let key in confirmedValue.value.startTime) {
      confirmedValue.value.startTime[key] = ''
      confirmedValue.value.endTime[key] = ''
    }
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
    if (props.type === 'time') {
      for (let key in confirmedValue.value.time) {
        handleColumnScroll(
          key as TimeType,
          parseInt(confirmedValue.value.time[key]) + 1,
          'instant',
        )
      }
      getCellHeight()
      handleTimeString('instant', 'time')
    } else if (isStartTime.value) {
      for (let key in confirmedValue.value.startTime) {
        handleColumnScroll(
          key as TimeType,
          parseInt(confirmedValue.value.startTime[key]) + 1,
          'instant',
        )
      }
      getCellHeight()
      handleTimeString('instant', 'startTime')
    } else if (isEndTime.value) {
      for (let key in confirmedValue.value.endTime) {
        handleColumnScroll(
          key as TimeType,
          parseInt(confirmedValue.value.endTime[key]) + 1,
          'instant',
        )
      }
      getCellHeight()
      handleTimeString('instant', 'endTime')
    }
  }
}

function onChangeInput() {
  if (_range.value === 'time') {
    if (!inputValue.value && selectedValue.value.time.hour) {
      inputValue.value = joinTimeStr(selectedValue.value.time)
    } else if (inputValue.value) {
      handleTimeString('smooth', 'time')
    }
  } else if (_range.value === 'startTime') {
    if (!startInputValue.value && selectedValue.value.startTime.hour) {
      startInputValue.value = joinTimeStr(selectedValue.value.startTime)
    } else if (startInputValue.value) {
      handleTimeString('smooth', 'startTime')
    }
  } else if (_range.value === 'endTime') {
    if (!endInputValue.value && selectedValue.value.endTime.hour) {
      endInputValue.value = joinTimeStr(selectedValue.value.endTime)
    } else if (endInputValue.value) {
      handleTimeString('smooth', 'endTime')
    }
  }
}

// 时间确认点击事件
function onConfirm() {
  for (let key in confirmedValue.value[_range.value]) {
    confirmedValue.value[_range.value][key] =
      selectedValue.value[_range.value][key]
  }
  openTimepicker.value = false
  inputValue.value = joinTimeStr(confirmedValue.value[_range.value])
  emit('update:modelValue', inputValue.value)

  if (props.type === 'time-range') {
    if (isStartTime.value && !endInputValue.value) {
      endInputRef.value.inputRef.focus()
      onFocusEndInput()
    } else if (isEndTime.value && !startInputValue.value) {
      startInputRef.value.inputRef.focus()
      onFocusStartInput()
    }
  }
}

function onFocusInput() {
  openTimepicker.value = true
  if (
    props.type === 'time-range' &&
    startInputValue.value &&
    endInputValue.value
  ) {
    if (isStartTime.value) {
      for (let key in confirmedValue.value.startTime) {
        handleColumnScroll(
          key as TimeType,
          parseInt(confirmedValue.value.startTime[key]) + 1,
          'instant',
        )
      }
      getCellHeight()
      handleTimeString('instant', 'startTime')
    } else if (isEndTime.value) {
      for (let key in confirmedValue.value.endTime) {
        handleColumnScroll(
          key as TimeType,
          parseInt(confirmedValue.value.endTime[key]) + 1,
          'instant',
        )
      }
      getCellHeight()
      handleTimeString('instant', 'endTime')
    }
  }
}

function onFocusStartInput() {
  isStartTime.value = true
  isEndTime.value = false
  rangeWrapperRef.value &&
    rangeWrapperRef.value.dispatchEvent(new Event('focus'))
  onFocusInput()
}

function onFocusEndInput() {
  isStartTime.value = false
  isEndTime.value = true
  rangeWrapperRef.value &&
    rangeWrapperRef.value.dispatchEvent(new Event('focus'))
  onFocusInput()
}

function onClickDelete() {
  resetConfirmedValue()
  resetStatus()
  openTimepicker.value = false
}

function onClickNow() {
  let { hour, minute, second } = getNowTimeData()
  if (normalizedUse12Hours.value) {
    if (parseInt(hour) < 12) halfDay.value = 'am'
    else {
      halfDay.value = 'pm'
      hour = hour == '12' ? '12' : parseInt(hour) - 12 + ''
    }
    handleColumnScroll('pm', 0, 'smooth')
  }

  selectedValue.value[_range.value].hour = hour
  selectedValue.value[_range.value].minute = minute
  selectedValue.value[_range.value].second = second

  if (_range.value === 'time') {
    inputValue.value = joinTimeStr(selectedValue.value.time)
  } else if (_range.value === 'startTime') {
    startInputValue.value = joinTimeStr(selectedValue.value.startTime)
  } else if (_range.value === 'endTime') {
    endInputValue.value = joinTimeStr(selectedValue.value.endTime)
  }
  ;['hour', 'minute', 'second'].forEach((item: string) => {
    handleHighlight(
      item as TimeType,
      parseInt(selectedValue.value[_range.value][item]) + 1,
    )
    handleColumnScroll(
      item as TimeType,
      parseInt(selectedValue.value[_range.value][item]) + 1,
      'smooth',
    )
  })
}

function onClickHalfDay(type: HalfDay) {
  halfDay.value = type
  handleColumnScroll(halfDay.value, 0, 'smooth')
  if (_range.value === 'time') {
    inputValue.value = joinTimeStr(selectedValue.value.time)
  } else if (_range.value === 'startTime') {
    startInputValue.value = joinTimeStr(selectedValue.value.startTime)
  } else if (_range.value === 'endTime') {
    inputValue.value = joinTimeStr(selectedValue.value.endTime)
  }
}

function getCellHeight() {
  const cell: HTMLElement =
    cellHourRef.value[0] || cellMinutRef.value[0] || cellSecondRef.value[0]
  if (!cellMinutRef.value) return
  const margin = parseInt(getComputedStyle(cell).marginTop)
  itemHeight = cell.clientHeight + margin
}

// 处理选中数字后的列表滚动
function handleColumnScroll(
  type: TimeType | 'am' | 'pm',
  value: number,
  behavior: ScrollBehavior,
) {
  let bias = 0
  switch (type) {
    case 'hour':
      bias = itemHeight * Math.floor((value - 1) / (props.step?.hour || 1))
      hourColRef.value?.scrollTo({ top: bias, behavior })
      break
    case 'minute':
      bias = itemHeight * Math.floor((value - 1) / (props.step?.minute || 1))
      minColRef.value?.scrollTo({ top: bias, behavior })
      break
    case 'second':
      bias = itemHeight * Math.floor((value - 1) / (props.step?.second || 1))
      secColRef.value?.scrollTo({ top: bias, behavior })
      break
    case 'am':
      halfColRef.value?.scrollTo({ top: bias, behavior })
      break
    case 'pm':
      bias = itemHeight
      halfColRef.value?.scrollTo({ top: bias, behavior })
      break
    default:
      break
  }
  initColumnScroll()
}

// 处理空值列的滚动
function initColumnScroll() {
  if (selectedValue.value.time.hour === '00') {
    handleHighlight('hour', 1)
    hourColRef.value?.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }
  if (selectedValue.value.time.minute === '00') {
    handleHighlight('minute', 1)
    minColRef.value?.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }
  if (selectedValue.value.time.second === '00') {
    handleHighlight('second', 1)
    secColRef.value?.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }
}

// 当选中某个时间时，要判断另外两个type的selectedValue是否是空，若是则初始化为00跟ui表现保持一致
function initOtherUnit(type: TimeType, rangeTime: RangeTime = 'time') {
  for (let key in selectedValue.value) {
    if (key !== type) {
      selectedValue.value[rangeTime][key] === '' &&
        (selectedValue.value.time[key] = '00')
    }
  }
}

// 解析时间字符串
function handleTimeString(
  scrollBehavior: ScrollBehavior = 'smooth',
  rangeTime: RangeTime,
) {
  let _timeValue
  const _checkEmpty =
    (rangeTime === 'time' &&
      (!inputValue.value ||
        !checkTimeStr(inputValue.value, normalizedFormat.value))) ||
    (rangeTime === 'startTime' &&
      (!startInputValue.value ||
        !checkTimeStr(startInputValue.value, normalizedFormat.value))) ||
    (rangeTime === 'endTime' &&
      (!endInputValue.value ||
        !checkTimeStr(endInputValue.value, normalizedFormat.value)))

  if (rangeTime === 'time') _timeValue = inputValue.value
  else if (rangeTime === 'startTime') _timeValue = startInputValue.value
  else if (rangeTime === 'endTime') _timeValue = endInputValue.value
  if (!_timeValue || _checkEmpty) return

  const timeArr = _timeValue.replace(/\s[ap]m/gi, '').split(':')
  timeArr.forEach((item, index) => {
    if (index === 0) {
      if (item.length === 2 && parseInt(item) >= 0 && parseInt(item) <= 23) {
        selectedValue.value[rangeTime].hour = item
        handleHighlight('hour', parseInt(item) + 1)
        handleColumnScroll('hour', parseInt(item) + 1, scrollBehavior)
      }
    } else {
      if (item.length === 2 && parseInt(item) >= 0 && parseInt(item) <= 59) {
        selectedValue.value[rangeTime][index === 1 ? 'minute' : 'second'] = item
        handleHighlight(index === 1 ? 'minute' : 'second', parseInt(item) + 1)
        handleColumnScroll(
          index === 1 ? 'minute' : 'second',
          parseInt(item) + 1,
          scrollBehavior,
        )
      }
    }
  })
  if (normalizedUse12Hours.value) {
    handleColumnScroll(halfDay.value, 0, 'instant')
  }
}

// 根据步长过滤出可选数字
function getNeededValue(type: TimeType, raw: number) {
  let step = 1
  if (type === 'hour') step = props.step?.hour || 1
  if (type === 'minute') step = props.step?.minute || 1
  if (type === 'second') step = props.step?.second || 1
  return raw % step === 0 ? startWithZero(Math.floor(raw / step) * step) : ''
}
</script>
