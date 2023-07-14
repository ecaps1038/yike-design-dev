<template>
  <div class="yk-typography">
    <div class="yk-title">
      <p :class="['lv' + level, type]">
        <slot></slot>
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { toRefs } from 'vue'
import { titleProps } from './typography'
import '../style'
const props = withDefaults(defineProps<titleProps>(), {
  level: 1,
  type: 'default',
})
const { level, type } = toRefs(props)
</script>
