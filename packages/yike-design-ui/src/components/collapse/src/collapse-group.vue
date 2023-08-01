<template>
  <div
    :class="[
      bem(),
      bem({
        noborder: !border,
      }),
    ]"
  >
    <slot />
  </div>
</template>
<script setup lang="ts">
import { CollapseGroupProps } from './collapse'
import { createCssScope } from '../../utils/bem'

const bem = createCssScope('collapse-group')

defineOptions({
  name: 'YkCollapseGroup',
})
const props = withDefaults(defineProps<CollapseGroupProps>(), {
  border: true,
})
</script>
