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
  formItemContextKey,
  FieldRule,
} from './form'
import { createCssScope } from '../../utils/bem'
import { inject, reactive, provide, computed, toRefs, onMounted } from 'vue'

const bem = createCssScope('form-item')

defineOptions({
  name: 'YkForm',
})
const formContext = inject(formContextKey, undefined)
const props = withDefaults(defineProps<FormItemProps>(), {
  labelWidth: 60,
})

const { field } = toRefs(props)

const mergedRules = computed(() => {
  const baseRules = ([] as FieldRule[]).concat(
    props.rules ?? formContext?.rules?.[props?.field ?? ''] ?? [],
  )
  const hasRequiredRule = baseRules.some((item) => item.required)

  if (props.required && !hasRequiredRule) {
    return ([{ required: true }] as FieldRule[]).concat(baseRules)
  }
  return baseRules
})

const computedDisabled = computed(
  () => !!props.disabled ?? formContext?.disabled,
)

onMounted(() => {
  if (field?.value) {
    formContext!.addField(field.value)
    formContext!.initFieldRule(field.value, mergedRules.value)
  }
})

provide(
  formItemContextKey,
  reactive({
    disabled: computedDisabled.value,
    stattus: 'error',
    error: 'At least select two items',
  }),
)
</script>
