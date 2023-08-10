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
const bem = createCssScope('form')

defineOptions({
  name: 'YkForm',
})

const validateMap: ValidateStatusMap = {}

const props = withDefaults(defineProps<FormProps>(), {
  labelWidth: 60,
  disabled: false,
})
const { model, disabled, rules, labelWidth } = toRefs(props)

const validate = async (): Promise<boolean | undefined> => {
  const validateList: Promise<any>[] = []
  let hasError = false
  Object.keys(validateMap).forEach((field) => {
    validateList.push(validateMap[field].validate())
    hasError = hasError || (validateMap[field]?.isError ?? false)
  })
  return !hasError
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

provide(
  formContextKey,
  reactive({
    model,
    labelWidth,
    disabled,
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
