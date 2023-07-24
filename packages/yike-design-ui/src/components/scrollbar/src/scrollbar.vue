<template>
  <div class="yk-scrollbar">Scrollbar</div>
</template>
<script setup lang="ts">
import { ScrollbarProps } from './scrollbar'
import '../style'
defineOptions({
  name: 'YkScrollbar',
})
const props = withDefaults(defineProps<ScrollbarProps>(), {
  id: '',
})
</script>
