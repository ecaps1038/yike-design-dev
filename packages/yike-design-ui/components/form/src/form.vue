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

const bem = createCssScope('form')
const validateMap: ValidateStatusMap = {}
const props = withDefaults(defineProps<FormProps>(), {
  labelWidth: 116,
  disabled: false,
  size: 'l',
  layout: 'horizontal',
})
const { model, disabled, rules, labelWidth, size, layout } = toRefs(props)

const validate = async (
  callback?: (errors: undefined | Record<string, any>) => void,
): Promise<any> => {
  const validateList: Promise<any>[] = []
  let hasError = false
  Object.keys(validateMap).forEach((field) => {
    validateList.push(validateMap[field].validate())
    hasError = hasError || (validateMap[field]?.isError ?? false)
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
  Object.assign(validateMap[field], formItemInstance)
}

const resetFields = () => {
  Object.keys(validateMap).forEach((field) => {
    validateMap[field].resetField()
  })
}

const handleSubmit = (e: Event) => {
  return
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
  resetFields,
})
</script>
