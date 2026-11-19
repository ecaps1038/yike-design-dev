<template>
  <yk-space dir="vertical" align="start" style="width: 100%">
    <yk-collapse-group v-model="active" accordion style="width: 100%">
      <yk-collapse
        v-for="item in items"
        :key="item.name"
        :name="item.name"
        :title="item.title"
      >
        {{ item.content }}
      </yk-collapse>
    </yk-collapse-group>
    <span>当前展开：{{ active ?? '无' }}</span>
  </yk-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref<string>()
const items = [
  {
    name: '1',
    title: '面板一',
    content: '手风琴模式下，同一时间只会展开一个面板。',
  },
  { name: '2', title: '面板二', content: '再次点击已展开的面板即可收起。' },
  {
    name: '3',
    title: '面板三',
    content: '通过 v-model 可以拿到当前展开面板的 name。',
  },
]
</script>
