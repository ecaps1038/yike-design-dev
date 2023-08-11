<template>
  <form :class="bem()" @submit.prevent="handleSubmit">
    <slot />
  </form>
</template>
<script setup lang="ts">
import { provide, reactive, toRefs } from 'vue'
import {
  FormProps,
  formContextKey,
  FormItemInstance,
  ValidateStatusMap,
} from './form'
import { createCssScope } from '../../utils/bem'
import { isFunction } from '../../utils'
const bem = createCssScope('form')

defineOptions({
  name: 'YkForm',
})

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

const updateValidateState = (field: string, formItemInstance: any) => {
  Object.assign(validateMap[field], formItemInstance)
}

const resetFields = () => {
  Object.keys(validateMap).forEach((field) => {
    validateMap[field].resetValidate()
  })
}

const handleSubmit = (e: Event) => {
  console.log('🚀 ~ file: form.vue:22 ~ handleSubmit ~ e:', e)
}

// ToDo
// add function addField removeField validatePartFields

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
  }),
)

defineExpose({
  validate,
  resetFields,
})
</script>
