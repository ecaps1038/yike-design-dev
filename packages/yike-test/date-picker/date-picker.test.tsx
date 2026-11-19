import { mount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, nextTick, ref } from 'vue'
import { YkDatePicker } from '@yike-design/ui/components/date-picker/index'

const wrappers: VueWrapper[] = []
const baseDate = new Date(2026, 0, 15)

function mountDatePicker(props: Record<string, any> = {}) {
  const wrapper = mount(YkDatePicker, {
    props: { modelValue: baseDate, ...props },
    attachTo: document.body,
  })
  wrappers.push(wrapper as VueWrapper)
  return wrapper
}

function getPanel() {
  return document.body.querySelector('.yk-date-picker__panel')
}

function getDayCells() {
  return Array.from(
    document.body.querySelectorAll('.yk-date-picker__cell'),
  ) as HTMLButtonElement[]
}

function findDayCell(day: number) {
  return getDayCells().find(
    (cell) =>
      cell.textContent?.trim() === String(day) &&
      !cell.classList.contains('yk-date-picker__cell--outside'),
  )
}

async function openPanel(wrapper: VueWrapper) {
  await wrapper.find('.yk-date-picker__trigger').trigger('click')
  await nextTick()
}

afterEach(() => {
  while (wrappers.length) {
    wrappers.pop()?.unmount()
  }
  document.body.innerHTML = ''
})

describe('DatePicker', () => {
  it('renders formatted modelValue', async () => {
    const wrapper = mountDatePicker()
    await nextTick()
    expect(wrapper.find('.yk-date-picker__trigger').text()).toContain(
      '2026-01-15',
    )
  })

  it('renders panel in a fixed layer immediately on open', async () => {
    const wrapper = mountDatePicker()
    await nextTick()
    await openPanel(wrapper)

    const panel = getPanel() as HTMLElement
    expect(panel).toBeTruthy()
    expect(panel.style.position).toBe('fixed')
    expect(panel.style.top || panel.style.bottom).toBeTruthy()
  })

  it('only sets bottom when panel flips above the trigger', async () => {
    const originalHeight = window.innerHeight
    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      value: 400,
    })
    const wrapper = mountDatePicker()
    await nextTick()
    const trigger = wrapper.find('.yk-date-picker__trigger')
      .element as HTMLElement
    trigger.getBoundingClientRect = () =>
      ({
        top: 500,
        bottom: 530,
        left: 100,
        right: 340,
        width: 240,
        height: 30,
        x: 100,
        y: 500,
        toJSON: () => ({}),
      }) as DOMRect

    await openPanel(wrapper)
    const panel = getPanel() as HTMLElement
    expect(panel.style.bottom).toBeTruthy()
    expect(panel.style.top).toBe('')

    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      value: originalHeight,
    })
  })

  it('opens panel and selects a date', async () => {
    const onUpdate = vi.fn()
    const wrapper = mountDatePicker({ 'onUpdate:modelValue': onUpdate })
    await nextTick()
    await openPanel(wrapper)

    expect(getPanel()).toBeTruthy()
    expect(getDayCells()).toHaveLength(42)

    findDayCell(10)!.click()
    await nextTick()

    expect(onUpdate).toHaveBeenCalledTimes(1)
    const value = onUpdate.mock.calls[0][0] as Date
    expect(value.getFullYear()).toBe(2026)
    expect(value.getMonth()).toBe(0)
    expect(value.getDate()).toBe(10)
    expect(getPanel()).toBeNull()
  })

  it('supports v-model and today shortcut', async () => {
    const value = ref<Date | null>(null)
    const Host = defineComponent({
      setup() {
        return () => <YkDatePicker v-model={value.value} />
      },
    })
    const wrapper = mount(Host, { attachTo: document.body })
    wrappers.push(wrapper as VueWrapper)

    await wrapper.find('.yk-date-picker__trigger').trigger('click')
    await nextTick()
    const todayBtn = Array.from(
      document.body.querySelectorAll('.yk-date-picker__footer-btn'),
    ).find((btn) => btn.textContent?.includes('今天')) as HTMLButtonElement
    todayBtn.click()
    await nextTick()

    expect(value.value).toBeInstanceOf(Date)
    const today = new Date()
    const selected = value.value as Date
    expect(selected.getFullYear()).toBe(today.getFullYear())
    expect(selected.getMonth()).toBe(today.getMonth())
    expect(selected.getDate()).toBe(today.getDate())
  })

  it('does not select disabled date', async () => {
    const onUpdate = vi.fn()
    const wrapper = mountDatePicker({
      'onUpdate:modelValue': onUpdate,
      disabledDate: () => true,
    })
    await nextTick()
    await openPanel(wrapper)

    const cells = getDayCells()
    expect(cells.every((cell) => cell.disabled)).toBe(true)
    cells[0].click()
    await nextTick()
    expect(onUpdate).not.toHaveBeenCalled()
  })

  it('clears value and emits clear', async () => {
    const onUpdate = vi.fn()
    const onClear = vi.fn()
    const wrapper = mountDatePicker({
      'onUpdate:modelValue': onUpdate,
      onClear,
    })
    await nextTick()

    await wrapper.find('.yk-date-picker__clear').trigger('click')
    expect(onUpdate).toHaveBeenCalledWith(undefined)
    expect(onClear).toHaveBeenCalled()
  })

  it('supports valueFormat output', async () => {
    const onUpdate = vi.fn()
    const wrapper = mountDatePicker({
      valueFormat: 'YYYY/MM/DD',
      'onUpdate:modelValue': onUpdate,
    })
    await nextTick()
    await openPanel(wrapper)

    findDayCell(20)!.click()
    await nextTick()
    expect(onUpdate).toHaveBeenCalledWith('2026/01/20')
  })

  it('closes panel with Escape', async () => {
    const wrapper = mountDatePicker()
    await nextTick()
    await openPanel(wrapper)
    expect(getPanel()).toBeTruthy()

    document.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }),
    )
    await nextTick()
    expect(getPanel()).toBeNull()
  })
})
