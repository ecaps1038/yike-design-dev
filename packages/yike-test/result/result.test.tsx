import { mount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { YkResult } from '@yike-design/ui/components/result/index'

const wrappers: VueWrapper[] = []

afterEach(() => {
  while (wrappers.length) {
    wrappers.pop()?.unmount()
  }
  document.body.innerHTML = ''
})

function mountResult(
  props: Record<string, any> = {},
  slots: Record<string, any> = {},
) {
  const wrapper = mount(YkResult, {
    props,
    slots,
    attachTo: document.body,
  })
  wrappers.push(wrapper as VueWrapper)
  return wrapper
}

describe('Result', () => {
  it('renders status, title and subtitle', () => {
    const wrapper = mountResult({
      status: 'success',
      title: '提交成功',
      subtitle: '我们会尽快处理',
    })
    expect(wrapper.find('.yk-result').classes()).toContain('yk-result--success')
    expect(wrapper.find('.yk-result__title').text()).toBe('提交成功')
    expect(wrapper.find('.yk-result__subtitle').text()).toBe('我们会尽快处理')
    expect(wrapper.find('.yk-result__icon').exists()).toBe(true)
  })

  it('supports error status', () => {
    const wrapper = mountResult({ status: 'error', title: '提交失败' })
    expect(wrapper.find('.yk-result').classes()).toContain('yk-result--error')
  })

  it('renders extra slot', () => {
    const wrapper = mountResult(
      { status: 'info' },
      { extra: () => <button class="result-action">重新加载</button> },
    )
    expect(wrapper.find('.result-action').exists()).toBe(true)
  })
})
