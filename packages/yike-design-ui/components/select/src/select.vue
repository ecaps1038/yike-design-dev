<template>
  <div class="yk-select">Select</div>
</template>
<script setup lang="ts">
import { SelectProps } from './select'
import { createCssScope } from '../../utils'

const bem = createCssScope('select')

defineOptions({
  name: 'YkSelect',
})
const props = withDefaults(defineProps<SelectProps>(), {
  id: '',
})
</script>
