<template>
  <div :class="bem()">
    <div :class="bem('label')" :style="{ width: `${labelWidth}px` }">
      {{ label }}
    </div>
    <slot />
  </div>
</template>
<script setup lang="ts">
import {
  FormItemProps,
  formContextKey,
  FormItemInstance,
  formItemContextKey,
} from './form'
import { createCssScope } from '../../utils/bem'
import { inject, computed, ref, onMounted, reactive, provide } from 'vue'
import { Schema } from '../../utils/validate'

const bem = createCssScope('form-item')

defineOptions({
  name: 'YkForm',
})
const formContext = inject(formContextKey, undefined)
const props = withDefaults(defineProps<FormItemProps>(), {
  labelWidth: 60,
})
const isError = ref(false)
const mergedRules = computed(() => {
  const rules = []
  if (props.rules) {
    rules.push(...props.rules)
  }
  if (props.field) {
    if (formContext?.rules) {
      const formFieldRules = formContext?.rules?.[props.field] ?? []
      rules.push(...formFieldRules)
    }
  }
  if (props.required) {
    rules.push({ required: true })
  }
  return rules
})

const validateInstance = computed(() => {
  if (props.field) {
    return formContext?.validateMap[props.field]
  }
  return {
    isError: false,
    message: '',
    status: 'primary',
  }
})

const validateField = (): Promise<any> => {
  const rules = mergedRules.value

  if (!props.field || rules.length === 0) {
    return Promise.resolve()
  }

  const _field = props.field
  const _value = formContext?.model[_field]
  const schema = new Schema(
    {
      [_field]: rules.map(({ ...rule }) => {
        if (!rule.type && !rule.validator) {
          rule.type = 'string'
        }
        return rule
      }),
    },
    {
      ignoreEmptyString: true,
    },
  )
  return new Promise((resolve) => {
    schema.validate({ [_field]: _value }, (err: any) => {
      const isError = Boolean(err?.[_field])
      formContext?.updateValidateState(_field, {
        isError,
        status: isError ? 'error' : 'primary',
        message: err?.[_field].message ?? '',
      })

      const error = isError
        ? {
            label: props.label,
            field: props.field,
            value: err[_field].value,
            type: err[_field].type,
            isRequiredError: Boolean(err[_field].requiredError),
            message: err[_field].message,
          }
        : undefined

      resolve(error)
    })
  })
}

const computedDisabled = computed(() => props.disabled || formContext?.disabled)

onMounted(() => {
  if (props.field) {
    const formItemInfo: FormItemInstance = reactive({
      field: props.field,
      disabled: computedDisabled,
      status: 'primary',
      isError: isError.value,
      rules: mergedRules,
      validate: validateField,
    })
    formContext!.addField(formItemInfo)
  }
})

provide(
  formItemContextKey,
  reactive({
    ...validateInstance.value,
    disabled: computedDisabled.value,
  }),
)
</script>
