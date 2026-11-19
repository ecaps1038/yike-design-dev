import { mount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { defineComponent, nextTick, ref } from 'vue'
import {
  YkLayout,
  YkLayoutContent,
  YkLayoutFooter,
  YkLayoutHeader,
  YkLayoutSider,
} from '@yike-design/ui/components/layout/index'

const wrappers: VueWrapper[] = []

function track(wrapper: VueWrapper) {
  wrappers.push(wrapper)
  return wrapper
}

function mountLayout(children: () => any) {
  const Host = defineComponent({
    setup: () => () => <YkLayout>{children()}</YkLayout>,
  })
  return track(mount(Host, { attachTo: document.body }))
}

afterEach(() => {
  while (wrappers.length) {
    wrappers.pop()?.unmount()
  }
  document.body.innerHTML = ''
})

describe('Layout', () => {
  it('renders header/content/footer in vertical direction', async () => {
    const wrapper = mountLayout(() => (
      <>
        <YkLayoutHeader>Header</YkLayoutHeader>
        <YkLayoutContent>Content</YkLayoutContent>
        <YkLayoutFooter>Footer</YkLayoutFooter>
      </>
    ))
    await nextTick()

    expect(wrapper.find('.yk-layout').classes()).toContain(
      'yk-layout--vertical',
    )
    expect(wrapper.find('.yk-layout-header').text()).toBe('Header')
    expect(wrapper.find('.yk-layout-content').text()).toBe('Content')
    expect(wrapper.find('.yk-layout-footer').text()).toBe('Footer')
    expect(wrapper.find('.yk-layout-header').attributes('style')).toContain(
      'height: 64px',
    )
  })

  it('switches to horizontal when sider exists', async () => {
    const collapsed = ref(false)
    const Host = defineComponent({
      setup() {
        return () => (
          <YkLayout>
            <YkLayoutSider v-model:collapsed={collapsed.value} collapsible>
              Side
            </YkLayoutSider>
            <YkLayout>
              <YkLayoutContent>Content</YkLayoutContent>
            </YkLayout>
          </YkLayout>
        )
      },
    })
    const wrapper = track(mount(Host, { attachTo: document.body }))
    await nextTick()

    expect(wrapper.find('.yk-layout').classes()).toContain(
      'yk-layout--horizontal',
    )
    const sider = wrapper.find('.yk-layout-sider')
    expect(sider.attributes('style')).toContain('width: 200px')
    expect(sider.classes()).toContain('yk-layout-sider--light')

    await wrapper.find('.yk-layout-sider__trigger').trigger('click')
    await nextTick()
    expect(collapsed.value).toBe(true)
    expect(wrapper.find('.yk-layout-sider').attributes('style')).toContain(
      'width: 64px',
    )
  })

  it('does not render trigger when not collapsible', async () => {
    const wrapper = mountLayout(() => (
      <YkLayoutSider theme="dark">Side</YkLayoutSider>
    ))
    await nextTick()
    expect(wrapper.find('.yk-layout-sider__trigger').exists()).toBe(false)
    expect(wrapper.find('.yk-layout-sider').classes()).toContain(
      'yk-layout-sider--dark',
    )
  })
})
