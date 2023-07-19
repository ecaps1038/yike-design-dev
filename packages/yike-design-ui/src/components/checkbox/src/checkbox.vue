<template>
  <div class="yk-checkbox">Checkbox</div>
</template>
<script setup lang="ts">
import { CheckboxProps } from './checkbox'
import '../style'
defineOptions({
  name: 'YkCheckbox',
})
const props = withDefaults(defineProps<CheckboxProps>(), {
  id: '',
})
</script>
