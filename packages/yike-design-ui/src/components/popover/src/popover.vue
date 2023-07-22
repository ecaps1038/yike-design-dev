<template>
  <div class="yk-popover">Popover</div>
</template>
<script setup lang="ts">
import { PopoverProps } from './popover'
import '../style'
defineOptions({
  name: 'YkPopover',
})
withDefaults(defineProps<PopoverProps>(), {
  id: '',
})
</script>
