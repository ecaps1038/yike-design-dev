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

defineOptions({
  name: 'YkBreadcrumb',
})

const slots = useSlots()
const props = withDefaults(defineProps<BreadcrumbProps>(), {
  separator: '/',
})

provide(breadcrumbName, { props, slots })
</script>
