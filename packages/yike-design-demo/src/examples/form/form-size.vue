<template>
  <yk-space dir="vertical">
    <div v-for="size in sizeList">
      <yk-button status="success" size="s">{{ `尺寸: ${size}` }}</yk-button>
      <yk-form :model="form" :size="size">
        <yk-form-item label="姓名" field="name">
          <yk-input v-model="form.name"></yk-input>
        </yk-form-item>
        <yk-form-item label="性别" field="sex">
          <yk-radio-group v-model="form.sex">
            <yk-radio value="man">男</yk-radio>
            <yk-radio value="woman">女</yk-radio>
          </yk-radio-group>
        </yk-form-item>
        <yk-form-item label="年龄" field="age">
          <yk-input-number v-model="form.age"></yk-input-number>
        </yk-form-item>
        <yk-form-item label="日期" field="date">
          <yk-checkbox-group v-model="form.date">
            <yk-checkbox v-for="item in data" :key="item.id" :value="item.id">
              {{ item.label }}
            </yk-checkbox>
          </yk-checkbox-group>
        </yk-form-item>
      </yk-form>
    </div>
  </yk-space>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { Size } from '@yike-design/ui/components/utils'
const form = reactive({
  name: '大飞',
  sex: 'man',
  date: ['2'],
  age: 20,
})
const data = ref([
  { id: '1', label: '昨天' },
  { id: '2', label: '今天' },
  { id: '3', label: '明天' },
])
const sizeList = ['s', 'm', 'l', 'xl'] as Size[]
</script>
<style scoped>
.yk-button {
  margin-bottom: 16px;
}
</style>
