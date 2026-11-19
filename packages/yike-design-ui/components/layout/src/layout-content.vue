<template>
  <main :class="bem()">
    <slot />
  </main>
</template>

<script setup lang="ts">
import { createCssScope } from '../../utils'

defineOptions({ name: 'YkLayoutContent' })

const bem = createCssScope('layout-content')
</script>
