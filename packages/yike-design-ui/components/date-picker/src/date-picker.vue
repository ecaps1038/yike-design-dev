<template>
  <div
    ref="wrapperRef"
    :class="bem('wrapper')"
    @focusin="emit('focus')"
    @focusout="handleFocusOut"
  >
    <div
      ref="triggerRef"
      :class="
        bem('trigger', [mergedSize], {
          open: isOpen,
          disabled: mergedDisabled,
          'is-error': isError,
        })
      "
      role="combobox"
      :aria-expanded="isOpen"
      :aria-controls="panelId"
      :aria-disabled="mergedDisabled"
      tabindex="0"
      @click="togglePanel"
      @keydown="handleTriggerKeydown"
    >
      <span :class="[bem('value'), !displayValue && bem('placeholder')]">
        {{ displayValue || placeholder }}
      </span>
      <span :class="bem('suffix')">
        <span
          v-if="showClear"
          :class="bem('clear')"
          role="button"
          aria-label="清空日期"
          @click.stop="handleClear"
        >
          <IconCrossOutline />
        </span>
        <IconDateOutline v-else :class="bem('icon')" aria-hidden="true" />
      </span>
    </div>

    <Teleport to="body">
      <div
        v-if="isOpen"
        :id="panelId"
        ref="panelRef"
        :class="bem('panel')"
        :style="panelStyle"
        role="dialog"
        aria-label="日期选择"
        tabindex="-1"
        @keydown="handlePanelKeydown"
      >
        <div :class="bem('header')">
          <button
            type="button"
            :class="bem('nav')"
            aria-label="上一年"
            @click="changeYear(-1)"
          >
            «
          </button>
          <button
            type="button"
            :class="bem('nav')"
            aria-label="上个月"
            @click="changeMonth(-1)"
          >
            ‹
          </button>
          <div :class="bem('header-label')">
            <select v-model="viewYear" :class="bem('select')" aria-label="年份">
              <option v-for="year in yearOptions" :key="year" :value="year">
                {{ year }} 年
              </option>
            </select>
            <select
              v-model="viewMonth"
              :class="bem('select')"
              aria-label="月份"
            >
              <option v-for="month in monthOptions" :key="month" :value="month">
                {{ month + 1 }} 月
              </option>
            </select>
          </div>
          <button
            type="button"
            :class="bem('nav')"
            aria-label="下个月"
            @click="changeMonth(1)"
          >
            ›
          </button>
          <button
            type="button"
            :class="bem('nav')"
            aria-label="下一年"
            @click="changeYear(1)"
          >
            »
          </button>
        </div>

        <div :class="bem('weekdays')">
          <span v-for="week in WEEK_DAYS" :key="week">{{ week }}</span>
        </div>

        <div :class="bem('grid')" role="grid">
          <button
            v-for="cell in cells"
            :key="cell.key"
            type="button"
            role="gridcell"
            :class="
              bem('cell', {
                outside: cell.outside,
                today: cell.today,
                selected: cell.selected,
                focused: cell.focused,
                disabled: cell.disabled,
              })
            "
            :aria-selected="cell.selected"
            :aria-disabled="cell.disabled"
            :disabled="cell.disabled"
            @click="selectCell(cell)"
          >
            {{ cell.day }}
          </button>
        </div>

        <div :class="bem('footer')">
          <button type="button" :class="bem('footer-btn')" @click="selectToday">
            今天
          </button>
          <button
            v-if="clearable"
            type="button"
            :class="bem('footer-btn')"
            @click="handleClear"
          >
            清空
          </button>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  toRef,
  watch,
} from 'vue'
import type { CSSProperties } from 'vue'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { createCssScope, popupManager, useFormItem } from '../../utils'
import type { DatePickerProps, DatePickerValue } from './date-picker'
import { IconCrossOutline, IconDateOutline } from '../../svg-icon'

dayjs.extend(customParseFormat)

defineOptions({ name: 'YkDatePicker' })

const WEEK_DAYS = ['日', '一', '二', '三', '四', '五', '六']
const MONTH_OPTIONS = Array.from({ length: 12 }, (_, index) => index)
const YEAR_MIN = 1970
const YEAR_MAX = 2100

const props = withDefaults(defineProps<DatePickerProps>(), {
  modelValue: undefined,
  format: 'YYYY-MM-DD',
  valueFormat: undefined,
  placeholder: '请选择日期',
  disabled: false,
  clearable: true,
  size: 'm',
  status: undefined,
  disabledDate: undefined,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: DatePickerValue): void
  (e: 'change', value: DatePickerValue): void
  (e: 'visible-change', visible: boolean): void
  (e: 'clear'): void
  (e: 'focus'): void
  (e: 'blur'): void
}>()

const { mergedDisabled, mergedSize, isError, validate } = useFormItem({
  disabled: toRef(props, 'disabled'),
  status: toRef(props, 'status'),
  size: toRef(props, 'size'),
})

const bem = createCssScope('date-picker')
const panelId = `yk-date-picker-panel-${Math.random().toString(36).slice(2, 10)}`

const wrapperRef = ref<HTMLElement>()
const triggerRef = ref<HTMLElement>()
const panelRef = ref<HTMLElement>()

const isOpen = ref(false)
const panelStyle = ref<CSSProperties>({})
let zIndex = popupManager.nextIndex()

const toDayjs = (value: DatePickerValue) => {
  if (value === undefined || value === null || value === '') return null
  if (dayjs.isDayjs(value)) return value as Dayjs
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : dayjs(value)
  }
  if (props.valueFormat) {
    const parsed = dayjs(value as string, props.valueFormat)
    return parsed.isValid() ? parsed : null
  }
  const parsed = dayjs(value as string | number)
  return parsed.isValid() ? parsed : null
}

const parsedValue = computed(() => toDayjs(props.modelValue))
const displayValue = computed(() =>
  parsedValue.value ? parsedValue.value.format(props.format) : '',
)
const showClear = computed(
  () => props.clearable && !!parsedValue.value && !mergedDisabled.value,
)

const now = dayjs()
const viewYear = ref((parsedValue.value ?? now).year())
const viewMonth = ref((parsedValue.value ?? now).month())
const focusedDate = ref(parsedValue.value ?? now)

const yearOptions = computed(() => {
  const list: number[] = []
  for (let year = YEAR_MIN; year <= YEAR_MAX; year++) list.push(year)
  return list
})
const monthOptions = MONTH_OPTIONS

const isSameDay = (a: Dayjs, b: Dayjs) => a.isSame(b, 'day')

type DayCell = {
  key: string
  day: number
  date: Dayjs
  outside: boolean
  today: boolean
  selected: boolean
  focused: boolean
  disabled: boolean
}

const cells = computed<DayCell[]>(() => {
  const monthStart = dayjs().year(viewYear.value).month(viewMonth.value).date(1)
  const firstCell = monthStart.startOf('week')
  const selected = parsedValue.value
  return Array.from({ length: 42 }, (_, index) => {
    const date = firstCell.add(index, 'day')
    return {
      key: date.format('YYYY-MM-DD'),
      day: date.date(),
      date,
      outside: date.month() !== viewMonth.value,
      today: date.isSame(now, 'day'),
      selected: selected ? isSameDay(date, selected) : false,
      focused: isSameDay(date, focusedDate.value),
      disabled: props.disabledDate ? props.disabledDate(date.toDate()) : false,
    }
  })
})

function syncViewFromValue() {
  const current = parsedValue.value
  if (current) {
    viewYear.value = current.year()
    viewMonth.value = current.month()
    focusedDate.value = current
  }
}

function emitValue(value: DatePickerValue, close = true) {
  validate('change')
  emit('update:modelValue', value)
  emit('change', value)
  if (close) closePanel(true)
}

function handleSelectDate(date: Dayjs) {
  if (props.disabledDate?.(date.toDate())) return
  const next = props.valueFormat
    ? date.format(props.valueFormat)
    : date.toDate()
  emitValue(next)
}

function selectCell(cell: DayCell) {
  if (cell.disabled) return
  handleSelectDate(cell.date)
}

function selectToday() {
  const today = dayjs()
  if (props.disabledDate?.(today.toDate())) return
  handleSelectDate(today)
}

function handleClear() {
  if (mergedDisabled.value) return
  emitValue(undefined)
  emit('clear')
}

function changeMonth(step: number) {
  const next = dayjs()
    .year(viewYear.value)
    .month(viewMonth.value + step)
    .date(1)
  viewYear.value = next.year()
  viewMonth.value = next.month()
}

function changeYear(step: number) {
  const nextYear = Math.min(Math.max(viewYear.value + step, YEAR_MIN), YEAR_MAX)
  viewYear.value = nextYear
}

function getPanelStyle(panelHeight: number): CSSProperties {
  const trigger = triggerRef.value
  const rect = trigger?.getBoundingClientRect()
  const style: CSSProperties = {
    position: 'fixed',
    left: '0px',
    top: '0px',
    width: '280px',
    zIndex,
  }
  if (!rect) return style

  const viewportHeight =
    window.innerHeight || document.documentElement.clientHeight
  const gap = 4
  const canPlaceBottom =
    rect.bottom + gap + panelHeight <= viewportHeight ||
    rect.top - gap - panelHeight < 0
  const base: CSSProperties = {
    position: 'fixed',
    left: `${Math.max(rect.left, 8)}px`,
    width: '280px',
    zIndex,
  }
  // 向上弹出时必须只设置 bottom，不能同时保留 top，否则 fixed 元素会被拉伸到整屏高
  return canPlaceBottom
    ? { ...base, top: `${rect.bottom + gap}px` }
    : { ...base, bottom: `${viewportHeight - rect.top + gap}px` }
}

function updatePanelPosition() {
  panelStyle.value = getPanelStyle(panelRef.value?.offsetHeight || 320)
}

const handleReposition = () => updatePanelPosition()

function addGlobalListeners() {
  window.addEventListener('scroll', handleReposition, true)
  window.addEventListener('resize', handleReposition)
}

function removeGlobalListeners() {
  window.removeEventListener('scroll', handleReposition, true)
  window.removeEventListener('resize', handleReposition)
}

async function openPanel() {
  if (mergedDisabled.value || isOpen.value) return
  zIndex = popupManager.nextIndex()
  // 首帧就给出 fixed 定位，避免面板以文档流渲染一帧后 focus 触发页面滚动
  panelStyle.value = getPanelStyle(320)
  isOpen.value = true
  syncViewFromValue()
  emit('visible-change', true)
  addGlobalListeners()
  await nextTick()
  updatePanelPosition()
  await nextTick()
  panelRef.value?.focus({ preventScroll: true })
}

function closePanel(restoreFocus = false) {
  if (!isOpen.value) return
  isOpen.value = false
  removeGlobalListeners()
  emit('visible-change', false)
  if (restoreFocus) triggerRef.value?.focus({ preventScroll: true })
}

function togglePanel() {
  if (mergedDisabled.value) return
  if (isOpen.value) closePanel()
  else openPanel()
}

function moveFocusDate(stepDays: number) {
  focusedDate.value = focusedDate.value.add(stepDays, 'day')
  viewYear.value = focusedDate.value.year()
  viewMonth.value = focusedDate.value.month()
}

function handleTriggerKeydown(event: KeyboardEvent) {
  if (mergedDisabled.value) return
  if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
    event.preventDefault()
    if (!isOpen.value) openPanel()
  } else if (event.key === 'Escape' && isOpen.value) {
    event.preventDefault()
    closePanel(true)
  }
}

function handlePanelKeydown(event: KeyboardEvent) {
  switch (event.key) {
    case 'ArrowLeft':
      event.preventDefault()
      moveFocusDate(-1)
      break
    case 'ArrowRight':
      event.preventDefault()
      moveFocusDate(1)
      break
    case 'ArrowUp':
      event.preventDefault()
      moveFocusDate(-7)
      break
    case 'ArrowDown':
      event.preventDefault()
      moveFocusDate(7)
      break
    case 'PageUp':
      event.preventDefault()
      moveFocusDate(-30)
      break
    case 'PageDown':
      event.preventDefault()
      moveFocusDate(30)
      break
    case 'Enter':
      event.preventDefault()
      if (!props.disabledDate?.(focusedDate.value.toDate())) {
        handleSelectDate(focusedDate.value)
      }
      break
    case 'Escape':
      event.preventDefault()
      closePanel(true)
      break
    default:
      break
  }
}

function handleDocumentMouseDown(event: MouseEvent) {
  if (!isOpen.value) return
  const target = event.target as Node
  if (wrapperRef.value?.contains(target)) return
  if (panelRef.value?.contains(target)) return
  closePanel()
}

function handleDocumentKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && isOpen.value) closePanel(true)
}

function handleFocusOut(event: FocusEvent) {
  const next = event.relatedTarget as Node | null
  if (next && wrapperRef.value?.contains(next)) return
  if (next && panelRef.value?.contains(next)) return
  validate('blur')
  emit('blur')
}

watch(
  () => props.modelValue,
  () => {
    if (!isOpen.value) syncViewFromValue()
  },
)

watch(
  () => mergedDisabled.value,
  (disabled) => {
    if (disabled) closePanel()
  },
)

onMounted(() => {
  document.addEventListener('mousedown', handleDocumentMouseDown, true)
  document.addEventListener('keydown', handleDocumentKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleDocumentMouseDown, true)
  document.removeEventListener('keydown', handleDocumentKeydown)
  removeGlobalListeners()
})

defineExpose({
  focus: () => triggerRef.value?.focus(),
  open: openPanel,
  close: () => closePanel(),
})
</script>
