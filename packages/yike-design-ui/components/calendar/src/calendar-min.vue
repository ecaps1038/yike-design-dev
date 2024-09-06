<script setup lang="ts">
import { computed } from 'vue'
import { createCssScope } from '../../utils'
import { useRows, useCallback } from './utils'
import { calendarProps, calendarEmits } from './calendar'
import ykButton from '../../button'
import YkSpace from '../../space'
import dayjs from 'dayjs'

defineOptions({
  name: 'YkCalendar',
})

const bem = createCssScope('calendar-min')
const btab = createCssScope('calendar-min-table')
const btaday = createCssScope('calendar-min-day')

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

const { rows, weekDaysMin } = useRows(date)
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
        <yk-space size="s" align="center">
          <yk-button
            type="outline"
            size="s"
            shape="square"
            @click="selectDate('prev-year')"
          >
            <IconLeft1Outline />
          </yk-button>
          <yk-button
            type="outline"
            size="s"
            shape="square"
            @click="selectDate('prev-month')"
          >
            <IconLeftOutline />
          </yk-button>
          <div :class="bem('title')">{{ currentDate }}</div>
          <yk-button type="outline" size="s" @click="selectDate('tody')">
            今天
          </yk-button>
          <yk-button
            type="outline"
            size="s"
            shape="square"
            @click="selectDate('next-month')"
          >
            <IconRightOutline />
          </yk-button>
          <yk-button
            type="outline"
            size="s"
            shape="square"
            @click="selectDate('next-year')"
          >
            <IconRight1Outline />
          </yk-button>
        </yk-space>
      </slot>
    </div>
    <div :class="bem('body')">
      <table :class="btab()" cellpadding="0" cellspacing="0">
        <thead>
          <tr>
            <th v-for="week in weekDaysMin" :key="week">{{ week }}</th>
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
                <p>{{ cell.text }}</p>
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
