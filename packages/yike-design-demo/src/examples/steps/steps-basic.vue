<template>
  <yk-space dir="vertical" style="width: 100%">
    <yk-steps
      :items="items"
      :current="current"
      clickable
      @change="current = $event"
    />
    <yk-space>
      <yk-button :disabled="current === 0" @click="current--">上一步</yk-button>
      <yk-button :disabled="current === items.length - 1" @click="current++">
        下一步
      </yk-button>
    </yk-space>
  </yk-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const current = ref(1)
const items = [
  { title: '填写信息', description: '填写基础信息' },
  { title: '确认信息', description: '核对提交内容' },
  { title: '完成', description: '等待审核结果' },
]
</script>
