import { mount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { YkTable, YkTableColumn } from '@yike-design/ui/components/table/index'

const data = [
  { id: 1, name: '张三', age: 30, score: 88 },
  { id: 2, name: '李四', age: 20, score: 95 },
  { id: 3, name: '王五', age: 25, score: 76 },
]

const wrappers: VueWrapper[] = []

function mountTable(
  props: Record<string, any> = {},
  slots: Record<string, any> = {},
) {
  const wrapper = mount(YkTable, {
    props: { data, rowKey: 'id', ...props },
    slots: {
      default: () => (
        <>
          <YkTableColumn type="index" label="#" width={64} />
          <YkTableColumn type="checkbox" width={64} />
          <YkTableColumn property="name" label="姓名" />
          <YkTableColumn property="age" label="年龄" sortable />
          <YkTableColumn property="score" label="分数" sortable ellipsis />
        </>
      ),
      ...slots,
    },
    attachTo: document.body,
  })
  wrappers.push(wrapper as VueWrapper)
  return wrapper
}

function getRowTexts(wrapper: VueWrapper) {
  return wrapper.findAll('tbody tr').map((row) => row.text())
}

afterEach(() => {
  while (wrappers.length) {
    wrappers.pop()?.unmount()
  }
  document.body.innerHTML = ''
})

describe('Table', () => {
  it('renders headers and rows', async () => {
    const wrapper = mountTable()
    await nextTick()

    const headers = wrapper.findAll('th').map((th) => th.text())
    expect(headers.some((header) => header.includes('#'))).toBe(true)
    expect(headers.some((header) => header.includes('姓名'))).toBe(true)

    const rows = getRowTexts(wrapper)
    expect(rows).toHaveLength(3)
    expect(rows[0]).toContain('张三')
    expect(rows[0]).toContain('1')
  })

  it('renders empty state', async () => {
    const wrapper = mountTable({ data: [] })
    await nextTick()
    expect(wrapper.find('.yk-table__empty').text()).toContain('暂无数据')
  })

  it('supports custom empty slot', async () => {
    const wrapper = mountTable(
      { data: [] },
      { empty: () => <span class="custom-empty">啥也没有</span> },
    )
    await nextTick()
    expect(wrapper.find('.custom-empty').exists()).toBe(true)
  })

  it('renders loading state', async () => {
    const wrapper = mountTable({ loading: true })
    await nextTick()
    expect(wrapper.find('.yk-table__loading').text()).toContain('加载中')
  })

  it('sorts by sortable column and emits sort-change', async () => {
    const onSortChange = vi.fn()
    const wrapper = mountTable({ onSortChange })
    await nextTick()

    const ageHeader = wrapper
      .findAll('.yk-table__header-cell.is-sortable')
      .find((node) => node.text().includes('年龄'))
    expect(ageHeader).toBeTruthy()

    await ageHeader!.trigger('click')
    await nextTick()
    expect(getRowTexts(wrapper)[0]).toContain('李四')
    expect(onSortChange).toHaveBeenLastCalledWith(
      expect.objectContaining({ prop: 'age', order: 'asc' }),
    )

    await ageHeader!.trigger('click')
    await nextTick()
    expect(getRowTexts(wrapper)[0]).toContain('张三')
    expect(onSortChange).toHaveBeenLastCalledWith(
      expect.objectContaining({ prop: 'age', order: 'desc' }),
    )

    await ageHeader!.trigger('click')
    await nextTick()
    expect(getRowTexts(wrapper)[0]).toContain('张三')
    expect(onSortChange).toHaveBeenLastCalledWith(
      expect.objectContaining({ order: null }),
    )
  })

  it('selects all rows from header checkbox', async () => {
    const onSelectionChange = vi.fn()
    const wrapper = mountTable({ onSelectionChange })
    await nextTick()

    const headerCheckbox = wrapper.find(
      'thead input[type="checkbox"]',
    ) as unknown as HTMLInputElement
    const input = headerCheckbox.element as HTMLInputElement
    input.checked = true
    input.dispatchEvent(new Event('change'))
    await nextTick()

    expect(onSelectionChange).toHaveBeenCalled()
    const selection = onSelectionChange.mock.calls.at(-1)?.[0] as unknown[]
    expect(selection).toHaveLength(3)
  })

  it('selects a single row from body checkbox', async () => {
    const onSelectionChange = vi.fn()
    const onSelect = vi.fn()
    const wrapper = mountTable({ onSelectionChange, onSelect })
    await nextTick()

    const rowCheckbox = wrapper.findAll('tbody input[type="checkbox"]')[0]
    const input = rowCheckbox.element as HTMLInputElement
    input.checked = true
    input.dispatchEvent(new Event('change'))
    await nextTick()

    expect(onSelect).toHaveBeenCalled()
    const selection = onSelectionChange.mock.calls.at(-1)?.[0] as unknown[]
    expect(selection).toHaveLength(1)
    expect(onSelect.mock.calls.at(-1)?.[1]).toMatchObject({ id: 1 })
  })
})
