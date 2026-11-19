import { mount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, nextTick, ref } from 'vue'
import type { Ref } from 'vue'
import { YkTreeSelect } from '@yike-design/ui/components/tree-select/index'

const options = [
  { key: '1', label: '节点1' },
  { key: '2', label: '节点2' },
  { key: '3', label: '节点3', children: [{ key: '31', label: '节点3-1' }] },
]

const wrappers: VueWrapper[] = []

function mountTreeSelect(props: Record<string, any> = {}) {
  const wrapper = mount(YkTreeSelect, {
    props: { options, ...props },
    attachTo: document.body,
  })
  wrappers.push(wrapper as VueWrapper)
  return wrapper
}

function mountHost(value: Ref<any>, componentProps: Record<string, any> = {}) {
  const Host = defineComponent({
    setup() {
      return () => (
        <YkTreeSelect
          v-model={value.value}
          options={options}
          {...componentProps}
        />
      )
    },
  })
  const wrapper = mount(Host, { attachTo: document.body })
  wrappers.push(wrapper as VueWrapper)
  return wrapper
}

function getDropdown() {
  return document.body.querySelector('.yk-tree-select__dropdown')
}

function getNodeContents() {
  return Array.from(
    document.body.querySelectorAll('.yk-tree-node__content'),
  ) as HTMLElement[]
}

async function openTreeSelect(wrapper: VueWrapper) {
  await wrapper.find('.yk-select-view__trigger').trigger('click')
  await nextTick()
}

afterEach(() => {
  while (wrappers.length) {
    wrappers.pop()?.unmount()
  }
  document.body.innerHTML = ''
})

describe('TreeSelect', () => {
  it('renders selected label from modelValue', async () => {
    const wrapper = mountTreeSelect({ modelValue: '31' })
    await nextTick()
    expect(wrapper.find('.yk-select-view__trigger').text()).toContain('节点3-1')
  })

  it('opens dropdown and emits single selected key', async () => {
    const value = ref('1')
    const wrapper = mountHost(value)
    await nextTick()
    await openTreeSelect(wrapper)

    expect(getDropdown()).toBeTruthy()
    getNodeContents()[1].click()
    await nextTick()
    await nextTick()

    expect(value.value).toBe('2')
    expect(getDropdown()).toBeNull()
  })

  it('supports multiple selection', async () => {
    const value = ref<string[]>([])
    const wrapper = mountHost(value, { multiple: true })
    await nextTick()
    await openTreeSelect(wrapper)

    getNodeContents()[0].click()
    await nextTick()
    await nextTick()
    expect(value.value).toEqual(['1'])

    getNodeContents()[1].click()
    await nextTick()
    await nextTick()
    expect(value.value).toEqual(['1', '2'])
  })

  it('supports checkable mode', async () => {
    const value = ref<string[]>([])
    const wrapper = mountHost(value, {
      checkable: true,
      checkStrictly: true,
    })
    await nextTick()
    await openTreeSelect(wrapper)

    const input = document.body.querySelector(
      '.yk-tree-node__checkbox input',
    ) as HTMLInputElement
    expect(input).toBeTruthy()
    input.checked = true
    input.dispatchEvent(new Event('change'))
    await nextTick()
    await nextTick()
    await nextTick()

    expect(value.value).toEqual(['1'])
  })

  it('emits clear and resets value', async () => {
    const onUpdate = vi.fn()
    const onClear = vi.fn()
    const wrapper = mountTreeSelect({
      modelValue: '1',
      allowClear: true,
      'onUpdate:modelValue': onUpdate,
      onClear,
    })
    await nextTick()
    await openTreeSelect(wrapper)

    await wrapper.find('.yk-select-view__clear').trigger('click')
    expect(onUpdate).toHaveBeenCalledWith(undefined)
    expect(onClear).toHaveBeenCalled()
  })

  it('does not open when disabled', async () => {
    const wrapper = mountTreeSelect({ disabled: true })
    await openTreeSelect(wrapper)
    expect(getDropdown()).toBeNull()
  })

  it('closes dropdown when clicking outside', async () => {
    const wrapper = mountTreeSelect()
    await openTreeSelect(wrapper)
    expect(getDropdown()).toBeTruthy()

    document.body.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
    await nextTick()
    expect(getDropdown()).toBeNull()
  })
})
