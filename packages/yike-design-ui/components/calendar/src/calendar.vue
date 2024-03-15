<script setup lang="ts">
import { computed } from 'vue'
import { createCssScope } from '../../utils'
import { useRows, useCallback } from './utils'
import { calendarProps, calendarEmits } from './calendar'
import ykButton from '../../button'
import dayjs from 'dayjs'

defineOptions({
  name: 'YkCalendar',
})

const bem = createCssScope('calendar')
const btab = createCssScope('calendar-table')
const btaday = createCssScope('calendar-day')

const props = defineProps(calendarProps)

const now = dayjs()
// 日期面板部分
const date = computed(() => {
  if (!props.modelValue) {
    return now
  } else {
    return dayjs(props.modelValue)
  }
})
const emit = defineEmits(calendarEmits)

const { rows, weekDays } = useRows(date)
const {
  selectDate,
  handlePick,
  getCellClass,
  currentDate,
  getSlotData,
  getHeadeSlotData,
} = useCallback(date, now, emit)
</script>

<template>
  <div :class="bem()">
    <div :class="bem('header')">
      <slot name="header" :data="getHeadeSlotData()">
        <div :class="bem('title')">{{ currentDate }}</div>
        <div :class="bem('button-group')">
          <yk-button type="outline" size="s" @click="selectDate('prev-year')">
            前一年
          </yk-button>
          <yk-button type="outline" size="s" @click="selectDate('prev-month')">
            上个月
          </yk-button>
          <yk-button type="outline" size="s" @click="selectDate('tody')">
            今天
          </yk-button>
          <yk-button type="outline" size="s" @click="selectDate('next-month')">
            下个月
          </yk-button>
          <yk-button type="outline" size="s" @click="selectDate('next-year')">
            后一年
          </yk-button>
        </div>
      </slot>
    </div>
    <div :class="bem('body')">
      <table :class="btab()" cellpadding="0" cellspacing="0">
        <thead>
          <tr>
            <th v-for="week in weekDays" :key="week">{{ week }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rid) in rows" :key="rid">
            <td
              v-for="(cell, cid) in row"
              :key="cid"
              :class="[btaday(), getCellClass(cell)]"
              @click="handlePick(cell)"
            >
              <slot name="date-cell" :data="getSlotData(cell)">
                {{ cell.text }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
