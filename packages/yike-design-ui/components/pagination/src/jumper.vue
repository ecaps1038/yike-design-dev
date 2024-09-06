<template>
  <div :class="bem()">
    <div :class="bem('label')">前往</div>
    <YkInputNumber
      v-model="_current"
      :min="1"
      :max="lastPage"
      :controls="false"
      :size="size"
    />
  </div>
</template>

<script setup lang="ts">
import YkInputNumber from '../../input-number'
import { createCssScope } from '../../utils'
import type { PgnInfo } from './pagination'
import { inject } from 'vue'

const { _current, lastPage, size } = inject('info') as PgnInfo
const bem = createCssScope('pagination-jumper')
</script>
