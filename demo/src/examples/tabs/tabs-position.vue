<template>
  <div class="mb">
    <yk-button class="ml" @click="change('top')">top</yk-button>
    <yk-button class="ml" @click="change('bottom')">bottom</yk-button>
    <yk-button class="ml" @click="change('left')">left</yk-button>
    <yk-button class="ml" @click="change('right')">right</yk-button>
  </div>
  <yk-tabs v-model="acitve" :tab-position="position">
    <yk-tab-pane name="1" label="tab1">Content of Tab Panel 1</yk-tab-pane>
    <yk-tab-pane name="2" label="tab2">Content of Tab Panel 2</yk-tab-pane>
    <yk-tab-pane name="3" label="tab3">Content of Tab Panel 3</yk-tab-pane>
  </yk-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const acitve = ref('1')
const position = ref<'top' | 'bottom' | 'left' | 'right'>('top')
const change = (v: any) => {
  position.value = v
}
</script>
<style>
.ml {
  margin-left: 10px;
}
.mb {
  margin-bottom: 20px;
}
</style>
