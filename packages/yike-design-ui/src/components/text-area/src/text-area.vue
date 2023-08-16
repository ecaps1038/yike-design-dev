<template>
  <div :class="bem()">TextArea</div>
</template>
<script setup lang="ts">
import { TextAreaProps } from './text-area'
import { createCssScope } from '../../utils/bem'

const bem = createCssScope('text-area')

defineOptions({
  name: 'YkTextArea',
})
const props = withDefaults(defineProps<TextAreaProps>(), {
  id: '',
})
</script>
