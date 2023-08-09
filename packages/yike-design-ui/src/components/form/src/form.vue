<template>
  <form :class="bem()" @submit.prevent="handleSubmit">
    <slot />
  </form>
</template>
<script setup lang="ts">
import { provide, reactive } from 'vue'
import {
  FormProps,
  formContextKey,
  Field,
  FormItemContext,
  FieldRule,
} from './form'
import { validator } from './validate'
import { createCssScope } from '../../utils/bem'
const bem = createCssScope('form')

defineOptions({
  name: 'YkForm',
})

// item数据项
const fields: Field[] = []
// item状态
const fieldsMap = new Map<Field, FormItemContext>()

const props = withDefaults(defineProps<FormProps>(), {
  labelWidth: 60,
  disabled: false,
})

const validate = async (): Promise<boolean[]> => {
  const validationPromises = fields.map((field) => validateField(field))

  // 等待所有字段的校验结果
  return Promise.all(validationPromises)
}

const validateField = async (field: string): Promise<boolean> => {
  const fieldValue = props.model[field]
  const rules = fieldsMap.get(field)?.rules as FieldRule[]

  // 校验当前字段的所有规则
  const fieldValidationResults = await Promise.all(
    rules.map(async (rule) => {
      try {
        await validator(fieldValue, rule)
        return true // 校验通过
      } catch (error) {
        return error // 校验失败，返回错误信息
      }
    }),
  )

  // 检查是否有校验失败的结果
  const hasErrors = fieldValidationResults.some(
    (result) => typeof result === 'string',
  )

  return !hasErrors // 返回当前字段是否通过校验
}

const addField = (field: Field) => {
  fields.push(field)
}

const initFieldRule = (field: Field, rules: FieldRule | FieldRule[]) => {
  fieldsMap.set(field, { rules: rules })
}

const resetFields = () => {
  console.log('🚀 ~ file: form.vue:48 ~ addField ~ field:', fields)
}

const handleSubmit = (e: Event) => {
  console.log('🚀 ~ file: form.vue:22 ~ handleSubmit ~ e:', e)
}

provide(
  formContextKey,
  reactive({
    model: props.model,
    labelWidth: props.labelWidth,
    rules: props.rules,
    disabled: props.disabled,
    validateField,
    initFieldRule,
    addField,
    fields,
    fieldsMap,
  }),
)

defineExpose({
  validate,
  resetFields,
})
</script>
