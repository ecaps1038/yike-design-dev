import { mount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { defineComponent } from 'vue'
import { YkDescriptions } from '@yike-design/ui/components/descriptions/index'
import type { DescriptionItem } from '@yike-design/ui/components/descriptions/index'

const items: DescriptionItem[] = [
  { label: '用户名', value: 'yike' },
  { label: '手机号', value: '138****8888' },
  { label: '地址', value: '杭州市', span: 2 },
]

const wrappers: VueWrapper[] = []

afterEach(() => {
  while (wrappers.length) {
    wrappers.pop()?.unmount()
  }
  document.body.innerHTML = ''
})

function mountDescriptions(props: Record<string, any> = {}) {
  const Host = defineComponent({
    setup() {
      return () => <YkDescriptions items={items} {...props} />
    },
  })
  const wrapper = mount(Host, { attachTo: document.body })
  wrappers.push(wrapper as VueWrapper)
  return wrapper
}

describe('Descriptions', () => {
  it('renders labels and values', () => {
    const wrapper = mountDescriptions()
    expect(wrapper.findAll('.yk-descriptions__item')).toHaveLength(3)
    expect(wrapper.text()).toContain('用户名')
    expect(wrapper.text()).toContain('138****8888')
  })

  it('supports column and span', () => {
    const wrapper = mountDescriptions({ column: 2 })
    const body = wrapper.find('.yk-descriptions__body')
    expect(body.attributes('style')).toContain('--yk-descriptions-column: 2')
    const item = wrapper.findAll('.yk-descriptions__item')[2]
    expect(item.attributes('style')).toContain('grid-column: span 2')
  })

  it('supports border and vertical direction', () => {
    const wrapper = mountDescriptions({ border: true, direction: 'vertical' })
    const root = wrapper.find('.yk-descriptions')
    expect(root.classes()).toContain('yk-descriptions--border')
    expect(root.classes()).toContain('yk-descriptions--vertical')
  })

  it('renders title and extra slots', () => {
    const wrapper = mountDescriptions({ title: '用户信息' })
    expect(wrapper.find('.yk-descriptions__title').text()).toBe('用户信息')
  })
})
