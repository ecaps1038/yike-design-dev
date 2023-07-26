import { mount } from '@vue/test-utils'
import Button from '../src/button.vue'

const UI = 'yike design'

describe('Button', () => {
  it('create', () => {
    const wrapper = mount(() => <Button />)

    expect(wrapper.classes()).toContain('yk-button--primary')
  })

  it('type', () => {
    const wrapper = mount(() => <Button type="secondary" />)

    expect(wrapper.classes()).toContain('yk-button--secondary')
  })

  it('size', () => {
    const wrapper = mount(() => <Button size="s" />)

    expect(wrapper.classes()).toContain('yk-button--s')
  })

  it('shape', () => {
    const wrapper = mount(() => <Button />)

    expect(wrapper.classes()).toContain('yk-button--default')
  })

  it('status', () => {
    const wrapper = mount(() => <Button status="danger" />)

    expect(wrapper.classes()).toContain('yk-button--danger')
  })

  it('disabled', async () => {
    const wrapper = mount(() => <Button disabled />)

    expect(wrapper.classes()).toContain('yk-button--disabled')
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })

  it('loading', () => {
    const wrapper = mount(() => <Button loading />)

    expect(wrapper.classes()).toContain('yk-button--loading')
    expect(wrapper.get('svg').isVisible()).toBeTruthy()
  })

  it('should disabled when loading', async () => {
    const wrapper = mount(() => (
      <Button
        v-slots={{
          default: () => UI,
        }}
        loading
      />
    ))

    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })

  it('render text', () => {
    const wrapper = mount(() => (
      <Button
        v-slots={{
          default: () => UI,
        }}
      />
    ))

    expect(wrapper.text()).toEqual(UI)
  })

  it('handle click', async () => {
    const wrapper = mount(() => (
      <Button
        v-slots={{
          default: () => UI,
        }}
      />
    ))

    await wrapper.trigger('click')
    expect(wrapper.emitted()).toBeDefined()
  })

  it('handle click inside', async () => {
    const wrapper = mount(() => (
      <Button
        v-slots={{
          default: () => <span class="inner-slot"></span>,
        }}
      />
    ))

    await wrapper.find('.inner-slot').trigger('click')
    expect(wrapper.emitted()).toBeDefined()
  })
})
