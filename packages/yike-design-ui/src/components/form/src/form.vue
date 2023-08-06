<template>
  <form :class="bem()" @submit.prevent="handleSubmit">
    <slot />
  </form>
</template>
<script setup lang="ts">
import { provide, reactive } from 'vue'
import { FormProps, formContextKey } from './form'
import { createCssScope } from '../../utils/bem'
const bem = createCssScope('form')

defineOptions({
  name: 'YkForm',
})

const props = withDefaults(defineProps<FormProps>(), {
  labelWidth: 60,
  disabled: false,
})

const validateForm = () => {
  console.log('表单整体校验')
}

const handleSubmit = (e: Event) => {
  console.log('🚀 ~ file: form.vue:22 ~ handleSubmit ~ e:', e)
}

provide(
  formContextKey,
  reactive({
    labelWidth: props.labelWidth,
    rules: props.rules,
    disabled: props.disabled,
    validateForm,
  }),
)
</script>
