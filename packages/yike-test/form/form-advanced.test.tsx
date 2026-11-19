import { mount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { nextTick, reactive } from 'vue'
import { YkForm, YkFormItem } from '@yike-design/ui/components/form/index'
import { YkInput } from '@yike-design/ui/components/input'

const wrappers: VueWrapper[] = []

function mountForm(onSubmit = vi.fn(), onReset = vi.fn()) {
  const form = reactive({ name: '', remark: '' })
  const Host = {
    setup() {
      return () => (
        <YkForm
          ref="formRef"
          model={form}
          onSubmit={onSubmit}
          onReset={onReset}
        >
          <YkFormItem label="名称" field="name" required>
            <YkInput v-model={form.name} />
          </YkFormItem>
          <YkFormItem label="备注" field="remark">
            <YkInput v-model={form.remark} />
          </YkFormItem>
        </YkForm>
      )
    },
  }
  const wrapper = mount(Host, { attachTo: document.body })
  wrappers.push(wrapper as VueWrapper)
  const formRef = (wrapper.vm as any).$refs.formRef
  return { wrapper, form, formRef }
}

afterEach(() => {
  while (wrappers.length) {
    wrappers.pop()?.unmount()
  }
  document.body.innerHTML = ''
})

describe('Form advanced api', () => {
  it('emits submit event', async () => {
    const onSubmit = vi.fn()
    const { wrapper } = mountForm(onSubmit)
    await wrapper.find('form').trigger('submit')
    expect(onSubmit).toHaveBeenCalled()
  })

  it('validates a single field with validateField', async () => {
    const { form, formRef } = mountForm()
    await nextTick()

    const error = await formRef.validateField('name')
    expect(error?.message).toBeTruthy()
    await nextTick()
    expect(formRef.$el.querySelector('.yk-form-item__extra')).toBeTruthy()

    form.name = 'yike'
    await nextTick()
    const passed = await formRef.validateField('name')
    expect(passed).toBeUndefined()
  })

  it('clears validate state with clearValidate', async () => {
    const { formRef } = mountForm()
    await nextTick()
    await formRef.validate()
    await nextTick()
    expect(document.body.querySelector('.yk-form-item__extra')).toBeTruthy()

    formRef.clearValidate()
    await nextTick()
    expect(document.body.querySelector('.yk-form-item__extra')).toBeNull()
  })

  it('emits reset event when resetFields is called', async () => {
    const onReset = vi.fn()
    const { form, formRef } = mountForm(vi.fn(), onReset)
    await nextTick()
    form.name = 'changed'
    formRef.resetFields()
    await nextTick()
    expect(form.name).toBe('')
    expect(onReset).toHaveBeenCalled()
  })

  it('form level validate accepts trigger filter', async () => {
    const { formRef } = mountForm()
    await nextTick()
    const errors = await formRef.validate(undefined, 'change')
    expect(errors?.name).toBeTruthy()
  })
})
