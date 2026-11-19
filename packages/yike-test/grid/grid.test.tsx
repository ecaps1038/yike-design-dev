import { mount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { defineComponent } from 'vue'
import { YkCol, YkRow } from '@yike-design/ui/components/grid/index'

const wrappers: VueWrapper[] = []

afterEach(() => {
  while (wrappers.length) {
    wrappers.pop()?.unmount()
  }
  document.body.innerHTML = ''
})

function mountGrid(props: Record<string, any> = {}) {
  const Host = defineComponent({
    setup() {
      return () => (
        <YkRow gutter={16} justify="center" align="center" {...props}>
          <YkCol span={12}>A</YkCol>
          <YkCol span={6} offset={6}>
            B
          </YkCol>
          <YkCol xs={24} sm={12} md={8} lg={6}>
            C
          </YkCol>
        </YkRow>
      )
    },
  })
  const wrapper = mount(Host, { attachTo: document.body })
  wrappers.push(wrapper as VueWrapper)
  return wrapper
}

describe('Grid', () => {
  it('renders row/col classes and gutter styles', () => {
    const wrapper = mountGrid()
    const row = wrapper.find('.yk-row')
    expect(row.classes()).toContain('yk-row--justify-center')
    expect(row.classes()).toContain('yk-row--align-center')
    expect(row.attributes('style')).toContain('margin-left: -8px')
    expect(row.attributes('style')).toContain('margin-right: -8px')

    const cols = wrapper.findAll('.yk-col')
    expect(cols).toHaveLength(3)
    expect(cols[0].classes()).toContain('yk-col-12')
    expect(cols[0].attributes('style')).toContain('padding-left: 8px')
    expect(cols[1].classes()).toContain('yk-col-6')
    expect(cols[1].classes()).toContain('yk-col-offset-6')
    expect(cols[2].classes()).toEqual(
      expect.arrayContaining([
        'yk-col-xs-24',
        'yk-col-sm-12',
        'yk-col-md-8',
        'yk-col-lg-6',
      ]),
    )
  })

  it('supports wrap and vertical gutter', () => {
    const wrapper = mountGrid({ wrap: false, gutter: [16, 24] })
    const row = wrapper.find('.yk-row')
    expect(row.classes()).toContain('yk-row--nowrap')
    expect(row.attributes('style')).toContain('row-gap: 24px')
  })
})
