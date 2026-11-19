import { mount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { defineComponent, nextTick, ref } from 'vue'
import type { Ref } from 'vue'
import {
  YkCollapse,
  YkCollapseGroup,
} from '@yike-design/ui/components/collapse/index'

const wrappers: VueWrapper[] = []

function track(wrapper: VueWrapper) {
  wrappers.push(wrapper)
  return wrapper
}

function mountCollapse(props: Record<string, any> = {}) {
  return track(
    mount(YkCollapse, {
      props: { title: '面板一', ...props },
      slots: { default: () => '面板内容' },
      attachTo: document.body,
    }),
  )
}

function mountGroup(
  value: Ref<any>,
  groupProps: Record<string, any> = {},
  itemNames: string[] = ['a', 'b'],
) {
  const Host = defineComponent({
    setup() {
      return () => (
        <YkCollapseGroup v-model={value.value} {...groupProps}>
          {itemNames.map((name) => (
            <YkCollapse key={name} name={name} title={`面板 ${name}`}>
              内容 {name}
            </YkCollapse>
          ))}
        </YkCollapseGroup>
      )
    },
  })
  return track(mount(Host, { attachTo: document.body }))
}

afterEach(() => {
  while (wrappers.length) {
    wrappers.pop()?.unmount()
  }
  document.body.innerHTML = ''
})

describe('Collapse', () => {
  it('toggles on click and updates aria-expanded', async () => {
    const wrapper = mountCollapse()
    const header = wrapper.find('.yk-collapse__header')
    expect(header.attributes('aria-expanded')).toBe('false')

    await header.trigger('click')
    expect(header.attributes('aria-expanded')).toBe('true')

    await header.trigger('click')
    expect(header.attributes('aria-expanded')).toBe('false')
  })

  it('toggles by keyboard space', async () => {
    const wrapper = mountCollapse()
    const header = wrapper.find('.yk-collapse__header')
    await header.trigger('keydown', { key: ' ' })
    expect(header.attributes('aria-expanded')).toBe('true')
  })

  it('does not toggle when disabled', async () => {
    const wrapper = mountCollapse({ disabled: true })
    const header = wrapper.find('.yk-collapse__header')
    await header.trigger('click')
    expect(header.attributes('aria-expanded')).toBe('false')
  })

  it('supports standalone v-model:active', async () => {
    const active = ref(false)
    const Host = defineComponent({
      setup() {
        return () => (
          <YkCollapse v-model:active={active.value} title="面板">
            内容
          </YkCollapse>
        )
      },
    })
    track(mount(Host, { attachTo: document.body }))
    await nextTick()

    await document.body
      .querySelector('.yk-collapse__header')!
      .dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await nextTick()
    expect(active.value).toBe(true)
  })

  it('accordion mode only keeps one panel open', async () => {
    const active = ref<string>()
    const wrapper = mountGroup(active, { accordion: true })
    await nextTick()

    const headers = wrapper.findAll('.yk-collapse__header')
    await headers[0].trigger('click')
    expect(active.value).toBe('a')
    expect(headers[0].attributes('aria-expanded')).toBe('true')

    await headers[1].trigger('click')
    expect(active.value).toBe('b')
    expect(headers[0].attributes('aria-expanded')).toBe('false')
    expect(headers[1].attributes('aria-expanded')).toBe('true')
  })

  it('multiple mode collects opened names', async () => {
    const active = ref<string[]>([])
    const wrapper = mountGroup(active)
    await nextTick()

    const headers = wrapper.findAll('.yk-collapse__header')
    await headers[0].trigger('click')
    await headers[1].trigger('click')
    expect(active.value).toEqual(['a', 'b'])

    await headers[0].trigger('click')
    expect(active.value).toEqual(['b'])
  })

  it('supports defaultValue in group', async () => {
    const active = ref<any>()
    const wrapper = mountGroup(active, { defaultValue: 'a' })
    await nextTick()
    const headers = wrapper.findAll('.yk-collapse__header')
    expect(headers[0].attributes('aria-expanded')).toBe('true')
  })

  it('auto-generates unique names so only clicked item expands', async () => {
    const active = ref<any>()
    const Host = defineComponent({
      setup() {
        return () => (
          <YkCollapseGroup v-model={active.value}>
            <YkCollapse title="面板 1">内容 1</YkCollapse>
            <YkCollapse title="面板 2">内容 2</YkCollapse>
            <YkCollapse title="面板 3">内容 3</YkCollapse>
          </YkCollapseGroup>
        )
      },
    })
    const wrapper = track(mount(Host, { attachTo: document.body }))
    await nextTick()

    const headers = wrapper.findAll('.yk-collapse__header')
    await headers[1].trigger('click')

    expect(headers[0].attributes('aria-expanded')).toBe('false')
    expect(headers[1].attributes('aria-expanded')).toBe('true')
    expect(headers[2].attributes('aria-expanded')).toBe('false')
    expect(Array.isArray(active.value)).toBe(true)
    expect(active.value).toHaveLength(1)
  })
})
