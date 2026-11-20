import { mount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, nextTick, ref } from 'vue'
import { YkMenu } from '@yike-design/ui/components/menu/index'
import type { MenuItem } from '@yike-design/ui/components/menu/index'

const items: MenuItem[] = [
  { key: 'overview', label: '概览' },
  {
    key: 'components',
    label: '组件',
    children: [
      { key: 'button', label: '按钮' },
      { key: 'input', label: '输入框', disabled: true },
    ],
  },
]

const wrappers: VueWrapper[] = []

afterEach(() => {
  while (wrappers.length) {
    wrappers.pop()?.unmount()
  }
  document.body.innerHTML = ''
})

function mountMenu(props: Record<string, any> = {}, value = 'overview') {
  const active = ref(value)
  const Host = defineComponent({
    setup() {
      return () => (
        <YkMenu
          data-testid="menu"
          v-model={active.value}
          items={items}
          {...props}
        />
      )
    },
  })
  const wrapper = mount(Host, { attachTo: document.body })
  wrappers.push(wrapper as VueWrapper)
  return { wrapper, active }
}

describe('Menu', () => {
  it('renders items and selects leaf item', async () => {
    const { wrapper, active } = mountMenu()
    await nextTick()

    const titles = wrapper.findAll('.yk-menu-item__title')
    expect(titles.map((node) => node.text())).toEqual(
      expect.arrayContaining(['概览', '组件']),
    )
    expect(wrapper.find('.yk-menu').classes()).toContain('yk-menu--vertical')

    await titles[0].trigger('click')
    expect(active.value).toBe('overview')
    expect(titles[0].attributes('aria-selected')).toBe('true')
  })

  it('expands and collapses vertical submenu', async () => {
    const { wrapper } = mountMenu()
    await nextTick()

    const submenu = wrapper.find('.yk-menu-item__sub')
    expect(submenu.attributes('style')).toContain('display: none')

    const parent = wrapper
      .findAll('.yk-menu-item__title')
      .find((node) => node.text().includes('组件'))
    await parent!.trigger('click')
    await nextTick()
    expect(wrapper.find('.yk-menu-item__sub').isVisible()).toBe(true)
    expect(parent!.attributes('aria-expanded')).toBe('true')
  })

  it('does not select disabled item', async () => {
    const onSelect = vi.fn()
    const { wrapper } = mountMenu({ onSelect })
    await nextTick()

    const parent = wrapper
      .findAll('.yk-menu-item__title')
      .find((node) => node.text().includes('组件'))
    await parent!.trigger('click')
    await nextTick()

    const disabledItem = wrapper
      .findAll('.yk-menu-item__title')
      .find((node) => node.text().includes('输入框'))
    await disabledItem!.trigger('click')
    expect(onSelect).not.toHaveBeenCalled()
  })

  it('supports horizontal mode and dark theme', async () => {
    const { wrapper } = mountMenu({ mode: 'horizontal', theme: 'dark' })
    await nextTick()

    const menu = wrapper.find('.yk-menu')
    expect(menu.classes()).toContain('yk-menu--horizontal')
    expect(menu.classes()).toContain('yk-menu--dark')
  })
})
