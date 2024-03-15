<template>
  <div :class="cssScope()">共{{ total }}条</div>
</template>

<script lang="ts" setup>
import type { TotalProps } from './pagination-total'
import { useCssScope } from '../../utils'

defineOptions({
  name: 'YkPaginationTotal',
})
defineProps<TotalProps>()
const cssScope = useCssScope('total')
</script>

<style scoped></style>
