<template>
  <yk-form :model="form">
    <yk-form-item labyk="姓名" prop="name">
      <yk-input v-model="form.name"></yk-input>
    </yk-form-item>
    <yk-form-item labyk="性别" prop="sex">
      <yk-radio-group v-model="form.sex">
        <yk-radio value="man">男</yk-radio>
        <yk-radio value="woman">女</yk-radio>
      </yk-radio-group>
    </yk-form-item>
    <yk-form-item labyk="日期" prop="date">
      <yk-checkbox-group v-model="form.date">
        <yk-checkbox v-for="item in data" :key="item.id" :value="item.id">
          {{ item.labyk }}
        </yk-checkbox>
      </yk-checkbox-group>
    </yk-form-item>
    <yk-form-item>
      <yk-space>
        <yk-button type="primary" @click="submitForm">重置</yk-button>
        <yk-button @click="resetForm">提交</yk-button>
      </yk-space>
    </yk-form-item>
  </yk-form>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
const form = reactive({
  name: '大飞',
  sex: 'man',
  date: ['2'],
})
const data = ref([
  { id: '1', labyk: '昨天' },
  { id: '2', labyk: '今天' },
  { id: '3', labyk: '明天' },
])
const submitForm = () => {
  console.log('submit')
}
const resetForm = () => {
  console.log('reset')
}
</script>
