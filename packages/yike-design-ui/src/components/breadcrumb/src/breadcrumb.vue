<template>
  <div class="yk-breadcrumb">
    <slot />
    <div v-if="false">
      <slot name="separator" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { provide, useSlots } from 'vue'
import { BreadcrumbProps, breadcrumbName } from './breadcrumb'
import '../style'
defineOptions({
  name: 'YkBreadcrumb',
})
const props = withDefaults(defineProps<BreadcrumbProps>(), {
  separator: '/',
})

const slots = useSlots()

provide(breadcrumbName, { props, slots })
</script>
