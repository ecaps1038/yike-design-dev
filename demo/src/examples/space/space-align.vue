<template>
  <yk-radio-group v-model="align" type="button">
    <yk-radio value="start">start</yk-radio>
    <yk-radio value="center">center</yk-radio>
    <yk-radio value="end">end</yk-radio>
    <yk-radio value="baseline">baseline</yk-radio>
    <yk-radio value="stretch">stretch</yk-radio>
  </yk-radio-group>
  <yk-space :align="align" style="margin-top: 12px">
    <yk-button size="s">按钮1</yk-button>
    <yk-button size="m">按钮2</yk-button>
    <yk-button>按钮3</yk-button>
  </yk-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const align = ref('start') as any
</script>
