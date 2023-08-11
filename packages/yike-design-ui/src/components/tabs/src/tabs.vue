<template>
  <div :class="bem()">Tabs</div>
</template>
<script setup lang="ts">
import { TabsProps } from './tabs'
import { createCssScope } from '../../utils/bem'

const bem = createCssScope('tabs')

defineOptions({
  name: 'YkTabs',
})
const props = withDefaults(defineProps<TabsProps>(), {
  id: '',
})
</script>
