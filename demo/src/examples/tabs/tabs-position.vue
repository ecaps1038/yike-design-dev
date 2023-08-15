<template>
  <div>
    <yk-button @click="change('top')">top</yk-button>
    <yk-button @click="change('bottom')">bottom</yk-button>
    <yk-button @click="change('left')">left</yk-button>
    <yk-button @click="change('right')">right</yk-button>
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
const position = ref('top')
const change = (v: string) => {
  position.value = v
}
</script>
