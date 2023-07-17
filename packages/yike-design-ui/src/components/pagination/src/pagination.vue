<template>
  <div :class="nsPagination.b()">
    <prev></prev>
    <pager :total="total"></pager>
    <next></next>
  </div>
</template>

<script setup lang="ts">
import { provide } from 'vue'
import { PaginationProps, PaginationEmits, defaultProps } from './pagination'
import { useNamespace } from '../../../utils/hooks'

import Prev from './components/prev.vue'
import Pager from './components/pager.vue'
import Next from './components/next.vue'
import '../style'

defineOptions({
  name: 'YkPagination',
})

withDefaults(defineProps<PaginationProps>(), defaultProps)
defineEmits<PaginationEmits>()

const namespace = 'pagination'
provide('namespace', namespace)

const nsPagination = useNamespace(namespace)
</script>
