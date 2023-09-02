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
import { createCssScope } from '../../utils'

defineOptions({
  name: 'YkCollapseGroup',
})

const bem = createCssScope('collapse-group')
const props = withDefaults(defineProps<CollapseGroupProps>(), {
  border: true,
})
</script>
