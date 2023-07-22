<template>
  <div class="yk-badge">Badge</div>
</template>
<script setup lang="ts">
import { BadgeProps } from './badge'
import '../style'
defineOptions({
  name: 'YkBadge',
})
const props = withDefaults(defineProps<BadgeProps>(), {
  id: '',
})
</script>
