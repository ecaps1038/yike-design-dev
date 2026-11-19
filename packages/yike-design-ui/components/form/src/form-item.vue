<template>
  <div :class="bem([mergedSize])">
    <div :class="bem('label')" :style="{ width: `${mergedLabelWidth}px` }">
      {{ label }}
    </div>
    <div
      :class="bem('field')"
      :aria-invalid="validateStatus.isError"
      :aria-describedby="validateStatus.isError ? errorId : undefined"
    >
      <slot />
      <Transition name="fade">
        <div
          v-if="validateStatus.isError"
          :id="errorId"
          :class="bem('extra')"
          role="alert"
        >
          {{ validateStatus.message }}
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  FormItemProps,
  formContextKey,
  FormItemInstance,
  FormContext,
  formItemContextKey,
  FormItemStatus,
} from './form'
import {
  createCssScope,
  deepClone,
  getObjVal,
  isArray,
  Schema,
} from '../../utils'
import {
  inject,
  computed,
  onMounted,
  onBeforeUnmount,
  reactive,
  provide,
  ref,
} from 'vue'

defineOptions({
  name: 'YkFormItem',
})

const bem = createCssScope('form-item')
const formContext = inject<Partial<FormContext>>(formContextKey, {})
const props = withDefaults(defineProps<FormItemProps>(), {
  labelWidth: 116,
})

const validateStatus = reactive<FormItemStatus>({
  status: 'primary',
  isError: false,
  message: '',
})
const propVal = props.field
  ? getObjVal(formContext.model, props.field)
  : {
      get value(): unknown {
        return undefined
      },
      // 没有 field 时 resetField 不产生实际副作用
      set value(_value: unknown) {
        /* noop */
      },
    }
const errorId = `yk-form-item-${Math.random().toString(36).slice(2, 10)}`
const computedDisabled = computed(() => props.disabled || formContext.disabled)

const mergedLabelWidth = computed(
  () => formContext?.labelWidth ?? props.labelWidth,
)

const mergedRules = computed(() => {
  const rules = []
  if (props.rules) {
    rules.push(...props.rules)
  }
  if (props.field) {
    if (formContext.rules) {
      const formFieldRules = formContext.rules?.[props.field] ?? []
      rules.push(...formFieldRules)
    }
  }
  if (props.required) {
    rules.push({ required: true })
  }
  return rules
})

const mergedSize = computed(() => formContext.size || 'l')

const layout = computed(() => formContext.layout || 'horizontal')

const validateField = (trigger?: string): Promise<any> => {
  let rules = mergedRules.value
  if (trigger) {
    // 根据rules列表中的trigger进行筛选
    rules = rules.filter((rule) => {
      // 未声明 trigger 的规则在任意触发时机都参与校验
      if (!rule.trigger) return true
      if (isArray(rule.trigger)) {
        return rule.trigger.includes(trigger)
      }
      return rule.trigger === trigger
    })
  }
  if (!props.field || rules.length === 0) {
    return Promise.resolve()
  }

  const _field = props.field
  const _value = propVal.value
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
      formContext.updateValidateState?.(_field, {
        isError,
        status: isError ? 'error' : 'primary',
        message: err?.[_field].message ?? '',
      })
      validateStatus.isError = isError
      validateStatus.status = isError ? 'error' : 'primary'
      validateStatus.message = err?.[_field].message ?? ''
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

const resetValidate = () => {
  if (!props.field) {
    return
  }
  formContext.updateValidateState?.(props.field, {
    isError: false,
    status: 'primary',
    message: '',
  })
  validateStatus.isError = false
  validateStatus.status = 'primary'
  validateStatus.message = ''
}
let formItemInfo = ref<FormItemInstance>()

const resetField = () => {
  if (!formItemInfo.value) return
  propVal.value = formItemInfo.value.initValue
  resetValidate()
}
onMounted(() => {
  if (props.field) {
    formItemInfo.value = reactive({
      field: props.field,
      disabled: computedDisabled,
      status: 'primary',
      isError: false,
      rules: mergedRules,
      initValue: deepClone(propVal.value),
      validate: validateField,
      resetValidate,
      resetField,
    })
    formContext.addField?.(formItemInfo.value)
  }
})
onBeforeUnmount(() => {
  if (props.field) formContext.removeField?.(props.field)
})

defineExpose({
  validate: validateField,
  resetValidate,
  resetField,
  get info() {
    return formItemInfo.value
  },
})

provide(
  formItemContextKey,
  reactive({
    size: mergedSize,
    layout,
    validateInstance: validateStatus,
    disabled: computedDisabled,
    validate: validateField,
  }),
)
</script>
