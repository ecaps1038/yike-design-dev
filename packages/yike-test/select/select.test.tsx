import { mount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { YkSelect } from '@yike-design/ui/components/select/index'

const options = [
  { value: 'a', label: '选项 A' },
  { value: 'b', label: '选项 B' },
  { value: 'c', label: '选项 C', disabled: true },
]

const wrappers: VueWrapper[] = []

function mountSelect(props: Record<string, any> = {}) {
  const wrapper = mount(YkSelect, {
    props: { options, ...props },
    attachTo: document.body,
  })
  wrappers.push(wrapper as VueWrapper)
  return wrapper
}

function getDropdown() {
  return document.body.querySelector('.yk-select__dropdown')
}

function getOptionNodes() {
  return Array.from(
    document.body.querySelectorAll('.yk-select__option'),
  ) as HTMLElement[]
}

async function openSelect(wrapper: VueWrapper) {
  await wrapper.find('.yk-select__trigger').trigger('click')
  await nextTick()
}

afterEach(() => {
  while (wrappers.length) {
    wrappers.pop()?.unmount()
  }
  document.body.innerHTML = ''
})

describe('Select', () => {
  it('renders placeholder and options are closed by default', () => {
    const wrapper = mountSelect()
    const trigger = wrapper.find('.yk-select__trigger')
    expect(trigger.text()).toContain('请选择')
    expect(getDropdown()).toBeNull()
  })

  it('opens dropdown and emits selected value', async () => {
    const onUpdate = vi.fn()
    const wrapper = mountSelect({ 'onUpdate:modelValue': onUpdate })
    await openSelect(wrapper)

    expect(getDropdown()).toBeTruthy()
    getOptionNodes()[0].click()
    await nextTick()

    expect(onUpdate).toHaveBeenCalledWith('a')
    expect(getDropdown()).toBeNull()
  })

  it('supports multiple selection', async () => {
    const onUpdate = vi.fn()
    const wrapper = mountSelect({
      multiple: true,
      modelValue: ['a'],
      'onUpdate:modelValue': onUpdate,
    })
    await openSelect(wrapper)

    getOptionNodes()[1].click()
    await nextTick()
    expect(onUpdate).toHaveBeenLastCalledWith(['a', 'b'])

    // 受控组件：父级同步最新值后再取消选择 a
    await wrapper.setProps({ modelValue: ['a', 'b'] })
    getOptionNodes()[0].click()
    await nextTick()
    expect(onUpdate).toHaveBeenLastCalledWith(['b'])
  })

  it('does not select disabled option', async () => {
    const onUpdate = vi.fn()
    const wrapper = mountSelect({ 'onUpdate:modelValue': onUpdate })
    await openSelect(wrapper)

    getOptionNodes()[2].click()
    await nextTick()
    expect(onUpdate).not.toHaveBeenCalled()
  })

  it('filters options by keyword', async () => {
    const wrapper = mountSelect({ filterable: true })
    await openSelect(wrapper)

    const input = document.body.querySelector(
      '.yk-select__filter-input',
    ) as HTMLInputElement
    expect(input).toBeTruthy()
    input.value = '选项 B'
    input.dispatchEvent(new Event('input'))
    await nextTick()

    const optionLabels = getOptionNodes().map((node) => node.textContent)
    expect(optionLabels).toHaveLength(1)
    expect(optionLabels[0]).toContain('选项 B')
  })

  it('renders filterable dropdown in a fixed layer and focuses search input', async () => {
    const wrapper = mountSelect({ filterable: true })
    await openSelect(wrapper)
    await nextTick()
    await nextTick()

    const dropdown = getDropdown() as HTMLElement
    expect(dropdown.style.position).toBe('fixed')
    const input = document.body.querySelector(
      '.yk-select__filter-input',
    ) as HTMLInputElement
    expect(document.activeElement).toBe(input)
  })

  it('only sets bottom when dropdown flips above the trigger', async () => {
    const originalHeight = window.innerHeight
    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      value: 400,
    })
    const wrapper = mountSelect()
    const trigger = wrapper.find('.yk-select__trigger').element as HTMLElement
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

    await openSelect(wrapper)
    const dropdown = getDropdown() as HTMLElement
    expect(dropdown.style.bottom).toBeTruthy()
    expect(dropdown.style.top).toBe('')

    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      value: originalHeight,
    })
  })

  it('supports keyboard navigation and Enter to select', async () => {
    const onUpdate = vi.fn()
    const wrapper = mountSelect({ 'onUpdate:modelValue': onUpdate })
    const trigger = wrapper.find('.yk-select__trigger')

    await trigger.trigger('keydown', { key: 'ArrowDown' })
    await nextTick()
    expect(getDropdown()).toBeTruthy()

    await trigger.trigger('keydown', { key: 'ArrowDown' })
    await nextTick()
    await trigger.trigger('keydown', { key: 'Enter' })
    await nextTick()

    expect(onUpdate).toHaveBeenCalledWith('b')
  })

  it('closes dropdown with Escape', async () => {
    const wrapper = mountSelect()
    await openSelect(wrapper)
    expect(getDropdown()).toBeTruthy()

    await wrapper
      .find('.yk-select__trigger')
      .trigger('keydown', { key: 'Escape' })
    await nextTick()
    expect(getDropdown()).toBeNull()
  })

  it('emits clear when clicking clear icon', async () => {
    const onUpdate = vi.fn()
    const onClear = vi.fn()
    const wrapper = mountSelect({
      modelValue: 'a',
      clearable: true,
      'onUpdate:modelValue': onUpdate,
      onClear,
    })

    await wrapper.find('.yk-select__clear').trigger('click')
    expect(onUpdate).toHaveBeenCalledWith(undefined)
    expect(onClear).toHaveBeenCalled()
  })

  it('does not open when disabled', async () => {
    const wrapper = mountSelect({ disabled: true })
    await openSelect(wrapper)
    expect(getDropdown()).toBeNull()
  })
})
