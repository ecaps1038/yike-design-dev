<template>
  <div :class="bem()">
    <div :class="bem('label')" :style="{ width: `${labelWidth}px` }">
      {{ label }}
    </div>
    <slot />
  </div>
</template>
<script setup lang="ts">
import { FormItemProps } from './form'
import { createCssScope } from '../../utils/bem'

const bem = createCssScope('form-item')

defineOptions({
  name: 'YkForm',
})
withDefaults(defineProps<FormItemProps>(), {
  labelWidth: 60,
})

const handleSubmit = (e: Event) => {
  console.log('🚀 ~ file: form.vue:22 ~ handleSubmit ~ e:', e)
}
</script>
