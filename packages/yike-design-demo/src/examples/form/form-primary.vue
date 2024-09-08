<template>
  <yk-form ref="formRef" :model="form" :rules="rulesMap">
    <yk-form-item label="姓名" field="name" :rules="nameExtraRule">
      <yk-input v-model="form.name"></yk-input>
    </yk-form-item>
    <yk-form-item label="昵称" field="nickname">
      <yk-input v-model="form.nickname" placeholder="请输入"></yk-input>
    </yk-form-item>
    <yk-form-item label="手机号" field="phone">
      <yk-input v-model="form.phone" placeholder="请输入"></yk-input>
    </yk-form-item>
    <yk-form-item label="性别" field="sex" :rules="rulesMap.sex">
      <yk-radio-group v-model="form.sex">
        <yk-radio value="man">男</yk-radio>
        <yk-radio value="woman">女</yk-radio>
      </yk-radio-group>
    </yk-form-item>
    <yk-form-item label="年龄" field="age" :rules="rulesMap.age">
      <yk-input-number v-model="form.age"></yk-input-number>
    </yk-form-item>
    <yk-form-item label="日期" field="date" :required="true">
      <yk-checkbox-group v-model="form.date">
        <yk-checkbox v-for="item in data" :key="item.id" :value="item.id">
          {{ item.label }}
        </yk-checkbox>
      </yk-checkbox-group>
    </yk-form-item>
    <yk-form-item label="住址" field="others.address" required>
      <yk-input v-model="form.others.address" placeholder="请输入"></yk-input>
    </yk-form-item>
    <yk-form-item label="我同意" field="agree" :rules="rulesMap.agree">
      <yk-checkbox v-model:checked="form.agree"></yk-checkbox>
    </yk-form-item>
    <yk-form-item>
      <yk-space>
        <yk-button type="primary" @click="resetForm">重置</yk-button>
        <yk-button @click="submitForm">提交</yk-button>
      </yk-space>
    </yk-form-item>
  </yk-form>
</template>
<script lang="ts" setup>
import { FormInstance } from '@yike-design/ui/components/form'
import { RuleType } from '@yike-design/ui/components/utils/validate/interface'
import { reactive, ref, useTemplateRef } from 'vue'
const formRef = useTemplateRef<FormInstance>('formRef')
const form = reactive({
  name: '大飞',
  sex: 'man',
  date: ['2'],
  nickname: '',
  age: 20,
  phone: '',
  agree: false,
  others: {
    address: '南京',
  },
})
const rulesMap = {
  name: [
    {
      required: true,
      message: 'Please select Activity count',
      trigger: 'change',
    },
    {
      minLength: 4,
      trigger: 'change',
    },
  ],
  nickname: [
    {
      required: true,
      message: '请输入昵称',
      trigger: 'blur',
    },
  ],
  sex: [
    {
      required: true,
      message: 'Please select Activity count',
    },
  ],
  age: [
    {
      max: 10,
      required: true,
      message: 'dfdf',
    },
  ],
  phone: [
    {
      validator: (value, callback) => {
        const reg =
          /^1(3\d|4[0-9]|5[0-35-9]|6[567]|7[013-8]|8\d|9[0-35-9])\d{8}$/
        if (reg.test(value)) {
          callback()
        } else {
          callback('请输入正确的手机号')
        }
      },
    },
  ],
  agree: [
    {
      // 规则需要指定类型 type
      type: 'boolean' as RuleType,
      true: true,
      message: '请同意！',
    },
  ],
}
const nameExtraRule = [
  {
    maxLength: 6,
    require: true,
    trigger: ['change', 'blur', 'focus'],
  },
]
const data = ref([
  { id: '1', label: '昨天' },
  { id: '2', label: '今天' },
  { id: '3', label: '明天' },
])
const resetForm = () => {
  formRef.value.resetFields()
  console.log('reset')
}
const submitForm = async () => {
  if (!formRef.value) {
    return
  }
  const res = await formRef.value.validate()
  if (res) {
    console.log('校验失败')
  } else {
    console.log('校验成功')
  }
}
</script>
