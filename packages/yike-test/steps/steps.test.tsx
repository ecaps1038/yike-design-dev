import { mount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { defineComponent } from 'vue'
import { YkSteps } from '@yike-design/ui/components/steps/index'
import type { StepItem } from '@yike-design/ui/components/steps/index'

const items: StepItem[] = [
  { title: '填写信息' },
  { title: '确认信息' },
  { title: '完成' },
]

const wrappers: VueWrapper[] = []

afterEach(() => {
  while (wrappers.length) {
    wrappers.pop()?.unmount()
  }
  document.body.innerHTML = ''
})

function mountSteps(props: Record<string, any> = {}) {
  const Host = defineComponent({
    setup() {
      return () => <YkSteps items={items} {...props} />
    },
  })
  const wrapper = mount(Host, { attachTo: document.body })
  wrappers.push(wrapper as VueWrapper)
  return wrapper
}

describe('Steps', () => {
  it('derives step status from current', () => {
    const wrapper = mountSteps({ current: 1 })
    const steps = wrapper.findAll('.yk-steps__step')
    expect(steps[0].classes()).toContain('yk-steps__step--finish')
    expect(steps[1].classes()).toContain('yk-steps__step--process')
    expect(steps[2].classes()).toContain('yk-steps__step--wait')
    expect(steps[1].attributes('aria-current')).toBe('step')
  })

  it('supports error status', () => {
    const wrapper = mountSteps({ current: 1, status: 'error' })
    expect(wrapper.findAll('.yk-steps__step')[1].classes()).toContain(
      'yk-steps__step--error',
    )
  })

  it('emits change when clickable', async () => {
    const onChange = vi.fn()
    const wrapper = mountSteps({ current: 0, clickable: true, onChange })
    await wrapper.findAll('.yk-steps__step')[2].trigger('click')
    expect(onChange).toHaveBeenCalledWith(2)
  })

  it('does not emit when not clickable', async () => {
    const onChange = vi.fn()
    const wrapper = mountSteps({ current: 0, onChange })
    await wrapper.findAll('.yk-steps__step')[2].trigger('click')
    expect(onChange).not.toHaveBeenCalled()
  })

  it('supports vertical direction', () => {
    const wrapper = mountSteps({ direction: 'vertical' })
    expect(wrapper.find('.yk-steps').classes()).toContain('yk-steps--vertical')
  })
})
