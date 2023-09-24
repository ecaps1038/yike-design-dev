import { ComputedRef, computed, ref } from 'vue';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { CalendarCell, CalendarDateType, CellType } from './calendar';

export function useRows(date: ComputedRef<Dayjs>) {
  // 获取今天是周几 0-周日 6就是周六（可以增加属性让用户设置）
  const firstDayofWeek = dayjs().startOf('week').day();
  const weekMaping = [
    '星期日',
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六',
  ];
  // 表头日期展示
  const weekDays = computed(() => {
    // 从周期计算开始截取 如果从0开始那么就截取 0 然后拼接 剩下的
    return [
      ...weekMaping.slice(firstDayofWeek),
      ...weekMaping.slice(0, firstDayofWeek),
    ];
  });

  const rows = computed(() => {
    let list: CalendarCell[] = [];
    // 获取当前月的第一天是星期几
    const firstDay = date.value.startOf('month').day();
    // 获取上个月的最后一天日期
    const lastDay = date.value.subtract(1, 'month').endOf('month').date();
    // 计算出互补的总数 例如本月第一天是星期二,那么就需要补上个月的两天 星期日-星期1
    const count = firstDay - firstDayofWeek; // 2
    // 上一个月的补上的天数
    const prevMonthDays: CalendarCell[] = Array.from({ length: count })
      .map((_, idx) => {
        // 最后一天就不做操作 31 - (2 - 0 -1)  31 - (2 - 1 - 1) = [30,31]
        return lastDay - (count - idx - 1);
      })
      .map((_) => ({ text: _, type: 'prev' })); // 标识是上个月的
    // 获取这个月有多少天
    const days = date.value.daysInMonth();
    const currentMonthDays: CalendarCell[] = Array.from({ length: days }).map(
      (_, idx) => ({ text: idx + 1, type: 'current' }),
    );
    // 补齐剩余天数
    list = [...prevMonthDays, ...currentMonthDays];
    const remaning = Math.ceil((days + count) / 7) * 7 - list.length;
    const nextMonthDays: CalendarCell[] = Array.from({ length: remaning }).map(
      (_, idx) => ({ text: idx + 1, type: 'next' }),
    );
    list.push(...nextMonthDays);
    return Array.from({ length: 6 }).map((_, idx) => {
      // 开始截取分割数组
      const start = idx * 7;
      return list.slice(start, start + 7);
    });
  });

  return {
    rows,
    weekDays,
  };
}

export function useCallback(date: ComputedRef<Dayjs>, now: Dayjs, emit: any) {
  // 用于标识用户选择的是哪一个
  const selectDay = ref<Dayjs>();
  // 上一月
  const prevMothDay = computed(() =>
    date.value.subtract(1, 'month').date(date.value.date()),
  );
  // 下一月
  const nextMothDay = computed(() =>
    date.value.add(1, 'month').date(date.value.date()),
  );
  // 上一年
  const prevearDay = computed(() =>
    date.value.subtract(1, 'year').date(date.value.date()),
  );
  const nextearDay = computed(() =>
    date.value.add(1, 'year').date(date.value.date()),
  );

  function pickDay(day: Dayjs) {
    selectDay.value = day;
    emit('update:modelValue', day.toDate());
  }
  // 切换事件
  function selectDate(type: CalendarDateType) {
    // 策略模式
    const dateMap: Record<CalendarDateType, Dayjs> = {
      'prev-year': prevearDay.value,
      'prev-month': prevMothDay.value,
      'next-month': nextMothDay.value,
      'next-year': nextearDay.value,
      tody: now,
    };

    const day = dateMap[type]; // 找到日期，更改日期 会自动更新日期计算
    emit('change', day.toDate());
    pickDay(day);
  }

  function formatter(text: number, type: CellType): Dayjs {
    switch (type) {
      case 'prev':
        return date.value.startOf('month').subtract(1, 'month').date(text);
      case 'current':
        return date.value.date(text);
      case 'next':
        return date.value.startOf('month').add(1, 'month').date(text);
    }
  }
  // 单元格切换事件
  function handlePick({ text, type }: CalendarCell) {
    // 格式化更改日期
    const day = formatter(text, type);
    emit('panel-change', day.toDate());
    pickDay(day);
  }
  // 计算样式
  function getCellClass({ text, type }: CalendarCell) {
    const clazz: string[] = [type];
    const day = formatter(text, type);
    // 当前日期与选中日期相同
    if (day.isSame(selectDay.value, 'day')) {
      // 如果选中日期与当前循环列表中的日期相同
      clazz.push('is-selected');
    }
    if (day.isSame(now, 'day')) {
      // 如果当前日期与列表中日期相同，则标识为今天
      clazz.push('tody');
    }
    return clazz;
  }

  // 选中标题
  const currentDate = computed(() => {
    return `${date.value.year()}年${
      date.value.month() + 1
    }月${date.value.date()}日`;
  });

  // 插槽传递参数
  function getSlotData({ text, type }: CalendarCell) {
    const day = formatter(text, type);
    return {
      isSelected: day.isSame(selectDay.value),
      day: day.format('YYYY-MM-DD'),
      date: day.toDate(),
      type,
    };
  }

  // heade 的模板
  function getHeadeSlotData() {
    return {
      selectFn: selectDate,
      title: currentDate,
    };
  }

  return {
    selectDate,
    handlePick,
    getCellClass,
    currentDate,
    getSlotData,
    getHeadeSlotData,
  };
}
