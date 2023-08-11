<template>
  <yk-space direction="vertical" gap="s">
    <yk-title :level="5">gap="s"</yk-title>
    <yk-checkbox-group gap="s" :default-value="['1']">
      <yk-checkbox v-for="item in data" :key="item.id" :value="item.id">
        {{ item.label }}
      </yk-checkbox>
    </yk-checkbox-group>
    <yk-title :level="5">gap="m"</yk-title>
    <yk-checkbox-group gap="m" :default-value="['1']">
      <yk-checkbox v-for="item in data" :key="item.id" :value="item.id">
        {{ item.label }}
      </yk-checkbox>
    </yk-checkbox-group>
    <yk-title :level="5">gap="l"</yk-title>
    <yk-checkbox-group gap="l" :default-value="['1']">
      <yk-checkbox v-for="item in data" :key="item.id" :value="item.id">
        {{ item.label }}
      </yk-checkbox>
    </yk-checkbox-group>
    <yk-title :level="5">gap="xl"</yk-title>
    <yk-checkbox-group gap="xl" :default-value="['1']">
      <yk-checkbox v-for="item in data" :key="item.id" :value="item.id">
        {{ item.label }}
      </yk-checkbox>
    </yk-checkbox-group>
    <yk-title :level="5">gap="40"</yk-title>
    <yk-checkbox-group :gap="40" :default-value="['1']">
      <yk-checkbox v-for="item in data" :key="item.id" :value="item.id">
        {{ item.label }}
      </yk-checkbox>
    </yk-checkbox-group>
    <yk-title :level="5">自定义水平和竖直间距 :gap="[10, 30]"</yk-title>
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
