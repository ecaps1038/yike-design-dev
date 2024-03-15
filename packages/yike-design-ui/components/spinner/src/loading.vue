<template>
  <div ref="loadingRef" :class="bem()">
    <Spinner size="l" />
  </div>
</template>

<script setup lang="ts">
import { createCssScope } from '../../utils'
import Spinner from './spinner.vue'

const bem = createCssScope('loading')
</script>
