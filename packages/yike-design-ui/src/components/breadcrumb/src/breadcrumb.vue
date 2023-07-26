<template>
  <div class="yk-breadcrumb">
    <slot />
  </div>
</template>
<script setup lang="ts">
import { provide } from 'vue'
import { BreadcrumbProps, breadcrumbName } from './breadcrumb'
import '../style'
defineOptions({
  name: 'YkBreadcrumb',
})
const props = withDefaults(defineProps<BreadcrumbProps>(), {
  separator: '/',
})

provide(breadcrumbName, props)
</script>
