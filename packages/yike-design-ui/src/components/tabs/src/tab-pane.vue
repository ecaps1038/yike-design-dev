<template>
  <div v-show="isActive">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { inject, computed } from 'vue'
import { TabPaneProps } from './tabs'
import type { Ref } from 'vue'

defineOptions({
  name: 'YkTabPane',
})

const props = withDefaults(defineProps<TabPaneProps>(), {})

const { active } = inject('TABS_PROPS_KEY') as {
  active: Ref<string>
}
const isActive = computed(() => {
  return active.value === props.name
})
</script>

<style scoped></style>
