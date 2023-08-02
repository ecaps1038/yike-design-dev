<template>
  <yk-space direction="vertical" size="l">
    <yk-checkbox-group
      v-model="value1"
      :options="plainOptions"
      direction="vertical"
    ></yk-checkbox-group>
    <yk-checkbox-group
      v-model="value2"
      :options="options"
      direction="vertical"
    ></yk-checkbox-group>
    <yk-checkbox-group
      v-model="value2"
      :options="options"
      disabled
      direction="vertical"
    >
      <template #label="{ data }">
        <yk-button>{{ data.label }}</yk-button>
      </template>
    </yk-checkbox-group>
  </yk-space>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const value1 = ref(['Plain 1'])
const plainOptions = ['Plain 1', 'Plain 2', 'Plain 3']
const value2 = ref([1])
const options = [
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 },
  { label: 'Option 3', value: 3, disabled: false },
]
</script>
<style scoped>
.yk-mb {
  margin-bottom: 20px;
}
</style>
