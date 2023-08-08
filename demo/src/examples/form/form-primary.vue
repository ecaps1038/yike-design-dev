<template>
  <yk-form ref="formRef" :model="form">
    <yk-form-item label="姓名" prop="name" :rules="rulesMap.name">
      <yk-input v-model="form.name"></yk-input>
    </yk-form-item>
    <yk-form-item label="性别" prop="sex" :rules="rulesMap.sex">
      <yk-radio-group v-model="form.sex">
        <yk-radio value="man">男</yk-radio>
        <yk-radio value="woman">女</yk-radio>
      </yk-radio-group>
    </yk-form-item>
    <yk-form-item label="日期" prop="date" :required="true">
      <yk-checkbox-group v-model="form.date">
        <yk-checkbox v-for="item in data" :key="item.id" :value="item.id">
          {{ item.label }}
        </yk-checkbox>
      </yk-checkbox-group>
    </yk-form-item>
    <yk-form-item>
      <yk-space>
        <yk-button type="primary" @click="resetForm(formRef)">重置</yk-button>
        <yk-button @click="submitForm(formRef)">提交</yk-button>
      </yk-space>
    </yk-form-item>
  </yk-form>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
const formRef = ref<FormInstance>()
const form = reactive({
  name: '大飞',
  sex: 'man',
  date: ['2'],
})
const rulesMap = {
  name: [
    {
      required: true,
      message: 'Please select Activity count',
      trigger: 'change',
    },
    {
      maxLength: 30,
      trigger: 'change',
    },
  ],
  sex: [
    {
      required: true,
      message: 'Please select Activity count',
      trigger: 'change',
    },
  ],
}
const data = ref([
  { id: '1', label: '昨天' },
  { id: '2', label: '今天' },
  { id: '3', label: '明天' },
])
const resetForm = (formEl) => {
  if (!formEl) {
    return
  }
  formEl.resetFields()
  console.log('reset')
}
const submitForm = (formEl) => {
  if (!formEl) {
    return
  }
  console.log('🚀 ~ file: form-primary.vue:69 ~ submitForm ~ formEl:', formEl)
  formEl.validate()
}
</script>
