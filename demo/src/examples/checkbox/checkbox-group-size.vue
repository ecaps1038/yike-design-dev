<template>
  <yk-space direction="vertical" size="s">
    <yk-title :level="5">size="s"</yk-title>
    <yk-checkbox-group size="s" :default-value="['1']">
      <yk-checkbox v-for="item in data" :key="item.id" :value="item.id">
        {{ item.label }}
      </yk-checkbox>
    </yk-checkbox-group>
    <yk-title :level="5">size="m"</yk-title>
    <yk-checkbox-group size="m" :default-value="['1']">
      <yk-checkbox v-for="item in data" :key="item.id" :value="item.id">
        {{ item.label }}
      </yk-checkbox>
    </yk-checkbox-group>
    <yk-title :level="5">size="l"</yk-title>
    <yk-checkbox-group size="l" :default-value="['1']">
      <yk-checkbox v-for="item in data" :key="item.id" :value="item.id">
        {{ item.label }}
      </yk-checkbox>
    </yk-checkbox-group>
    <yk-title :level="5">size="xl"</yk-title>
    <yk-checkbox-group size="xl" :default-value="['1']">
      <yk-checkbox v-for="item in data" :key="item.id" :value="item.id">
        {{ item.label }}
      </yk-checkbox>
    </yk-checkbox-group>
    <yk-title :level="5">size="40"</yk-title>
    <yk-checkbox-group :gap="40" :default-value="['1']">
      <yk-checkbox v-for="item in data" :key="item.id" :value="item.id">
        {{ item.label }}
      </yk-checkbox>
    </yk-checkbox-group>
    <yk-title :level="5">自定义水平和竖直间距 :size="[10, 30]"</yk-title>
    <yk-checkbox-group :gap="[10, 30]" :default-value="['1']">
      <yk-checkbox v-for="item in data2" :key="item.id" :value="item.id">
        {{ item.label }}
      </yk-checkbox>
    </yk-checkbox-group>
  </yk-space>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const data = ref([
  { id: '1', label: 'option1' },
  { id: '2', label: 'option2' },
  { id: '3', label: 'option3' },
])
const data2 = Array.from({ length: 19 }).map((i, index) => ({
  id: `${index}`,
  label: `option${index}`,
}))
</script>
<style scoped></style>
