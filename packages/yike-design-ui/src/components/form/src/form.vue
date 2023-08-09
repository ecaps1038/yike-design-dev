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
  console.log('🚀 ~ file: form.vue:48 ~ addField ~ field:', validateMap)
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
    addField,
    updateValidateState,
    validateMap,
  }),
)

defineExpose({
  validate,
  resetFields,
})
</script>
