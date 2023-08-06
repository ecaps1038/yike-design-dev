<template>
  <div :class="bem()">Form</div>
</template>
<script setup lang="ts">
import { FormProps } from './form'
import { createCssScope } from '../../utils/bem'

const bem = createCssScope('form')

defineOptions({
  name: 'YkForm',
})
const props = withDefaults(defineProps<FormProps>(), {
  id: '',
})
</script>
