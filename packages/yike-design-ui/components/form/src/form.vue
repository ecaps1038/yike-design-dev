<template>
  <form :class="bem([layout])" @submit.prevent="handleSubmit">
    <slot />
  </form>
</template>

<script setup lang="ts">
import { provide, reactive, toRefs } from 'vue'
import { createCssScope, isFunction } from '../../utils'
import {
  FormProps,
  formContextKey,
  FormItemInstance,
  ValidateStatusMap,
} from './form'

defineOptions({
  name: 'YkForm',
})

const emit = defineEmits<{
  (e: 'submit', event: Event): void
  (e: 'reset'): void
}>()

const bem = createCssScope('form')
const validateMap: ValidateStatusMap = {}
const props = withDefaults(defineProps<FormProps>(), {
  labelWidth: 116,
  disabled: false,
  size: 'l',
  layout: 'horizontal',
})
const { model, disabled, rules, labelWidth, size, layout } = toRefs(props)

/**
 * 校验整个表单。
 * @param callback 校验完成回调，errors 为 undefined 表示通过
 * @param trigger 只校验指定触发方式的规则（如 change / blur）
 */
const validate = async (
  callback?: (errors: undefined | Record<string, any>) => void,
  trigger?: string,
): Promise<any> => {
  const validateList: Promise<any>[] = []
  Object.keys(validateMap).forEach((field) => {
    validateList.push(validateMap[field].validate(trigger))
  })
  return Promise.all(validateList).then((result) => {
    const errors: Record<string, any> = {}
    let hasError = false
    result.forEach((item) => {
      if (item) {
        hasError = true
        errors[item.field] = item
      }
    })

    if (isFunction(callback)) {
      callback(hasError ? errors : undefined)
    }

    return hasError ? errors : undefined
  })
}

/** 校验单个字段 */
const validateField = (field: string, trigger?: string): Promise<any> => {
  const item = validateMap[field]
  if (!item) return Promise.resolve()
  return item.validate(trigger)
}

/** 清除校验状态，不传 fields 时清除全部 */
const clearValidate = (fields?: string | string[]) => {
  const list = fields
    ? Array.isArray(fields)
      ? fields
      : [fields]
    : Object.keys(validateMap)
  list.forEach((field) => validateMap[field]?.resetValidate())
}

const addField = (formItemInstance: FormItemInstance) => {
  const _field = formItemInstance.field
  validateMap[_field] = {
    ...formItemInstance,
  }
}

const removeField = (field: string) => {
  delete validateMap[field]
}

const updateValidateState = (field: string, formItemInstance: any) => {
  if (!validateMap[field]) return
  Object.assign(validateMap[field], formItemInstance)
}

const resetFields = () => {
  Object.keys(validateMap).forEach((field) => {
    validateMap[field]?.resetField()
  })
  emit('reset')
}

const handleSubmit = (event: Event) => {
  emit('submit', event)
}

provide(
  formContextKey,
  reactive({
    model,
    labelWidth,
    disabled,
    size,
    layout,
    rules,
    addField,
    updateValidateState,
    removeField,
  }),
)

defineExpose({
  validate,
  validateField,
  resetFields,
  clearValidate,
})
</script>
