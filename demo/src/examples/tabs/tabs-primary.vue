<template>
  <yk-tabs v-model="acitve">
    <yk-tab-pane
      v-for="(item, index) in tabs"
      :key="item.name"
      :label="item.label"
      :name="item.name"
    >
      <template v-if="item.showSlot" #title>
        <IconTimeOutline />
        <span
          :style="{
            marginLeft: '10px',
          }"
        >
          {{ item.label }}
        </span>
      </template>
      Content of Tab Pane{{ index + 1 }}
    </yk-tab-pane>
  </yk-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const data = Array.from({ length: 10 }, (i, index) => ({
  name: index,
  label: `Tab${index + 1}`,
  showSlot: index % 2 === 0,
}))
const acitve = ref(0)
const tabs = ref()
setTimeout(() => {
  tabs.value = data
  console.log(222, tabs.value)
}, 0)
</script>
