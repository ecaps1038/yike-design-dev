import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import {
  FormInstance,
  YkForm,
  YkFormItem,
} from '@yike-design/ui/components/form/index'
import { YkInput } from '@yike-design/ui/components/input'
import { nextTick, reactive, toRaw } from 'vue'
import { YkCheckbox } from '@yike-design/ui/components/checkbox'
import { RuleType } from '@yike-design/ui/components/utils/validate/interface'
describe('Form', () => {
  it('create', () => {
    const wrapper = mount(YkForm)
    expect(wrapper.classes()).toContain('yk-form')
  })

  it('custom validator', async () => {
    const form = reactive({
      phone: '',
    })
    const wrapper = mount({
      setup() {
        const rules = [
          {
            validator: (value, callback) => {
              const reg =
                /^1(3\d|4[0-9]|5[0-35-9]|6[567]|7[013-8]|8\d|9[0-35-9])\d{8}$/
              if (reg.test(value)) {
                callback()
              } else {
                callback('请输入正确的手机号')
              }
            },
            required: true,
          },
        ]

        return () => (
          <YkForm model={form} ref="formRef">
            <YkFormItem label="手机号" field="phone" rules={rules}>
              <YkInput v-model={form.phone} placeholder="请输入"></YkInput>
            </YkFormItem>
          </YkForm>
        )
      },
    })
    await nextTick()
    const formRef = wrapper.findComponent({ ref: 'formRef' }).vm as FormInstance
    const res = await formRef.validate()
    expect(res.phone.message).toBe('请输入正确的手机号')
    form.phone = '17752936113'
    const res2 = await formRef.validate()
    expect(res2).toBe(undefined)
  })
  it('required', async () => {
    const form = reactive({
      check: undefined,
    })
    const wrapper = mount({
      setup() {
        const rules = [
          {
            required: true,
            message: '请勾选',
          },
        ]

        return () => (
          <YkForm model={form} ref="formRef">
            <YkFormItem label="check" field="check" rules={rules}>
              <YkCheckbox v-model:cheked={form.check}></YkCheckbox>
            </YkFormItem>
          </YkForm>
        )
      },
    })
    await nextTick()
    const formRef = wrapper.findComponent({ ref: 'formRef' }).vm as FormInstance
    const res = await formRef.validate()
    expect(res.check.message).toBe('请勾选')
  })
  it('boolean', async () => {
    const form = reactive({
      check: false,
    })
    const wrapper = mount({
      setup() {
        const rules = [
          {
            type: 'boolean' as RuleType,
            true: true,
            message: '请勾选',
          },
        ]

        return () => (
          <YkForm model={form} ref="formRef">
            <YkFormItem label="手机号" field="check" rules={rules} required>
              <YkCheckbox v-model:cheked={form.check}></YkCheckbox>
            </YkFormItem>
          </YkForm>
        )
      },
    })
    await nextTick()
    const formRef = wrapper.findComponent({ ref: 'formRef' }).vm as FormInstance
    const res = await formRef.validate()
    expect(res.check.message).toBe('请勾选')
    form.check = true
    const res2 = await formRef.validate()
    expect(res2).toBe(undefined)
  })

  it('resetFields', async () => {
    const defaultInfo = {
      check: false,
      name: 'momei',
      others: {
        address: 'nanjing',
      },
      toDoList: [
        {
          name: 'codeing',
        },
      ],
    }
    const form = reactive(JSON.parse(JSON.stringify(defaultInfo)))
    const wrapper = mount({
      setup() {
        return () => (
          <YkForm model={form} ref="formRef">
            <YkFormItem label="name" field="name" required>
              <YkInput v-model={form.name}></YkInput>
            </YkFormItem>
            <YkFormItem label="address" field="others.address" required>
              <YkInput v-model={form.others.address}></YkInput>
            </YkFormItem>
            <YkFormItem label="task" field="toDoList[0].name" required>
              <YkInput v-model={form.toDoList[0].name}></YkInput>
            </YkFormItem>
            <YkFormItem label="check" field="check" required>
              <YkCheckbox v-model:cheked={form.check}></YkCheckbox>
            </YkFormItem>
          </YkForm>
        )
      },
    })
    await nextTick()
    const formRef = wrapper.findComponent({ ref: 'formRef' }).vm as FormInstance
    form.name = 'change'
    form.others.address = 'nantong'
    form.toDoList[0].name = 'eat'
    form.check = true
    formRef.resetFields()
    expect(toRaw(form)).toStrictEqual(defaultInfo)
  })
})
