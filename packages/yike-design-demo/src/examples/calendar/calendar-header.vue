<template>
  <yk-calendar v-model="currentRef">
    <template #header="{ data }">
      <div>
        <h1>{{ data.title }}</h1>
        <yk-button type="outline" size="s" @click="data.selectFn('prev-year')">
          前一年
        </yk-button>
        <yk-button type="outline" size="s" @click="data.selectFn('prev-month')">
          上个月
        </yk-button>
        <yk-button type="outline" size="s" @click="data.selectFn('tody')">
          今天
        </yk-button>
        <yk-button type="outline" size="s" @click="data.selectFn('next-month')">
          下个月
        </yk-button>
        <yk-button type="outline" size="s" @click="data.selectFn('next-year')">
          后一年
        </yk-button>
      </div>
    </template>
  </yk-calendar>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const currentRef = ref(new Date())
</script>
