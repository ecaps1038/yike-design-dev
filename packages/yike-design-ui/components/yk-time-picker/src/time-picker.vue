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

    <div v-else class="range-picker-wrapper">
      <yk-input
        v-model="startInputValue"
        placeholder="开始时间"
        size="m"
        style="width: 140px"
        @focus="onFocusInput"
        @change="onChangeInput"
      ></yk-input>
      <div>-</div>
      <yk-input
        v-model="endInputValue"
        placeholder="结束时间"
        size="m"
        style="width: 140px"
        @focus="onFocusInput"
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
const cellMinutRef = ref([])
const cellHourRef = ref([])
const cellSecondRef = ref([])
const halfColRef = ref()
const halfDay = ref<HalfDay>('pm')

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

inputValue.value = normalizedModelValue.value || normalizedDefaultValue.value

function selcetCell(type: TimeType, value: number) {
  if (isDisabled.value(type, value - 1)) return
  selectedValue.value[type] = startWithZero(value - 1)
  // 跳过确认步骤时
  props.disableConfirm &&
    (confirmedValue.value[type] = startWithZero(value - 1))
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
  let { hour, minute, second } = getNowTimeData()
  if (normalizedUse12Hours.value) {
    if (parseInt(hour) < 12) halfDay.value = 'am'
    else {
      halfDay.value = 'pm'
      hour = hour == '12' ? '12' : parseInt(hour) - 12 + ''
    }
    handleColumnScroll('pm', 0, 'smooth')
  }

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

function onClickHalfDay(type: HalfDay) {
  halfDay.value = type
  handleColumnScroll(halfDay.value, 0, 'smooth')
  inputValue.value = joinTimeStr(selectedValue.value)
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
  if (
    !inputValue.value ||
    !checkTimeStr(inputValue.value, normalizedFormat.value)
  )
    return
  const timeArr = inputValue.value.replace(/\s[ap]m/gi, '').split(':')
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
