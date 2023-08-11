<template>
  <yk-tabs v-model="acitve">
    <yk-tab-pane
      v-for="item in tabs"
      :key="item.name"
      :label="item.label"
      :name="item.name"
    >
      {{ item.label }}
    </yk-tab-pane>
  </yk-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const data = Array.from({ length: 4 }, (i, index) => ({
  name: index,
  label: `${index + 1}_label`,
}))
const acitve = ref(0)
const tabs = ref()
setTimeout(() => {
  tabs.value = data
}, 0)
</script>
