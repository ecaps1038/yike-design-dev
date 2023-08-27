<template>
  <div
    :style="{
      marginBottom: '10px',
    }"
  >
    <yk-button @click="onAddTab">add tab</yk-button>
  </div>
  <yk-tabs v-model="acitve" closable @delete="onDeleteTab">
    <yk-tab-pane
      v-for="item in tabs"
      :key="item.name"
      :label="item.label"
      :name="item.name"
    >
      <template v-if="item.showSlot" #title>
        <IconTimeOutline />
        <span
          :style="{
            marginLeft: '8px',
          }"
        >
          {{ item.label }}
        </span>
      </template>
      Content of Tab Pane{{ item.name + 1 }}
    </yk-tab-pane>
  </yk-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
let indexL = 0
const data = Array.from({ length: 5 }, (i, index) => {
  indexL++
  return {
    name: index,
    label: `Tab${index + 1}`,
    showSlot: index % 2 === 0,
  }
})
const acitve = ref(0)
const tabs = ref()
setTimeout(() => {
  tabs.value = data
}, 0)
const onAddTab = (v: any) => {
  console.log('add', v)
  indexL++
  tabs.value.push({
    name: indexL,
    label: `Tab${indexL + 1}`,
    showSlot: indexL % 2 === 0,
  })
  acitve.value = indexL
}
const onDeleteTab = (v: any) => {
  console.log('del', v)
  if (v.name === acitve.value) {
    const index = tabs.value.findIndex((i) => i.name === v.name)
    const next = tabs.value[index + 1] || tabs.value[index - 1]
    acitve.value = next?.name
  }
  tabs.value = tabs.value.filter((i) => i.name !== v.name)
}
</script>
