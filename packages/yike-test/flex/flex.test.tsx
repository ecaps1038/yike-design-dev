import { mount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { defineComponent } from 'vue'
import { YkFlex } from '@yike-design/ui/components/flex/index'

const wrappers: VueWrapper[] = []

afterEach(() => {
  while (wrappers.length) {
    wrappers.pop()?.unmount()
  }
  document.body.innerHTML = ''
})

function mountFlex(props: Record<string, any> = {}) {
  const Host = defineComponent({
    setup() {
      return () => (
        <YkFlex {...props}>
          <span>A</span>
          <span>B</span>
        </YkFlex>
      )
    },
  })
  const wrapper = mount(Host, { attachTo: document.body })
  wrappers.push(wrapper as VueWrapper)
  return wrapper
}

describe('Flex', () => {
  it('renders classes and gap style', () => {
    const wrapper = mountFlex({
      gap: '8',
      justify: 'space-between',
      align: 'center',
    })
    const flex = wrapper.find('.yk-flex')
    expect(flex.classes()).toContain('yk-flex--justify-space-between')
    expect(flex.classes()).toContain('yk-flex--align-center')
    expect(flex.attributes('style')).toContain('gap: 8px')
    expect(flex.text()).toContain('A')
  })

  it('supports vertical / wrap / inline modifiers', () => {
    const wrapper = mountFlex({ vertical: true, wrap: true, inline: true })
    const flex = wrapper.find('.yk-flex')
    expect(flex.classes()).toEqual(
      expect.arrayContaining([
        'yk-flex--vertical',
        'yk-flex--wrap',
        'yk-flex--inline',
      ]),
    )
  })

  it('accepts numeric gap', () => {
    const wrapper = mountFlex({ gap: 16 })
    expect(wrapper.find('.yk-flex').attributes('style')).toContain('gap: 16px')
  })
})
